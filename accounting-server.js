
// Load .env
const envPath = require('path').join(__dirname, '.env');
if (require('fs').existsSync(envPath)) {
  require('fs').readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    if (k && v.length) process.env[k.trim()] = v.join('=').trim();
  });
}

const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('path');

const PORT = 9800;
const DATA_DIR = path.join(__dirname, 'accounting-data');
const STATIC_DIR = __dirname;
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', reject);
  });
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// IP 白名單
const ALLOWED_IPS = [
  '127.0.0.1',
  '::1',
  '::ffff:127.0.0.1',
  '192.168.1.184',
  '::ffff:192.168.1.184',
  '192.168.1.128',
  '::ffff:192.168.1.128',
  '192.168.1.149',
  '::ffff:192.168.1.149',
  '192.168.1.163',
  '::ffff:192.168.1.163',
];

// ========== 報價單解析函數 ==========
async function parseQuotationFile(filePath, originalName) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (ext === '.xls' || ext === '.xlsx') {
    return parseExcel(filePath, originalName);
  } else if (ext === '.pdf') {
    return parsePDF(filePath, originalName);
  } else {
    throw new Error('不支援的檔案格式');
  }
}

function parseExcel(filePath, originalName) {
  return new Promise((resolve, reject) => {
    try {
      const XLSX = require('xlsx');
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      
      // 解析報價單
      const result = parseSheetData(data, originalName);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
}

function parseSheetData(data, originalName) {
  const vendors = [];
  let projectName = '';
  let client = '';
  let date = '';
  
  // 嘗試找到專案名稱
  for (let row of data) {
    if (!row) continue;
    const rowStr = String(row);
    if (rowStr.includes('案名:') || rowStr.includes('案件名稱') || rowStr.includes('專案名稱')) {
      const match = rowStr.match(/案名[:：]\s*(.+)/);
      if (match) projectName = match[1].trim();
    }
    if (rowStr.includes('客戶') || rowStr.includes('業主') || rowStr.includes('委託人')) {
      const match = rowStr.match(/[客戶業主委託人]+[:：]\s*(.+)/);
      if (match) client = match[1].trim();
    }
    if (rowStr.includes('/') && rowStr.match(/\d{2}\/\d{2}\/\d{2,4}/)) {
      const match = rowStr.match(/(\d{2,4}\/\d{2}\/\d{2})/);
      if (match) date = match[1];
    }
  }
  
  // 解析副委託費用區塊 (B 部分)
  let inSubSection = false;
  let currentCategory = '';
  
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (!row) continue;
    
    const rowStr = String(row);
    
    // 檢查是否進入副委託費用區塊
    if (rowStr.includes('B.副委託費用') || rowStr.includes('副委託')) {
      inSubSection = true;
      continue;
    }
    
    // 離開副委託費用區塊
    if (inSubSection && (rowStr.includes('A(設計費)') || rowStr.includes('其它費用') || rowStr.includes('C.'))) {
      break;
    }
    
    if (!inSubSection) continue;
    
    // 解析項目資料
    // 格式: [項次, 項目, 單位, 數量, 單價, 複價]
    const itemNo = row[0];
    const itemName = row[1];
    const unit = row[2];
    const qty = parseFloat(row[3]) || 0;
    const unitPrice = parseFloat(row[4]) || 0;
    const totalPrice = parseFloat(row[5]) || 0;
    const remark = row[6] || '';
    
    // 跳過標題列和非數值列
    if (!itemNo || itemNo === '項次' || itemNo === 'NaN') continue;
    if (typeof itemNo !== 'number' && isNaN(parseInt(itemNo))) continue;
    
    // 根據項目名稱分類
    const category = categorizeItem(itemName);
    
    // 跳過金額為 0 的項目
    if (totalPrice <= 0) continue;
    
    // 提取廠商名稱
    const vendorName = extractVendorName(itemName, remark);
    
    vendors.push({
      category: category,
      name: vendorName,
      amount: totalPrice,
      remark: remark
    });
  }
  
  // 嘗試從檔名取得專案資訊
  if (!projectName) {
    projectName = originalName.replace(/\.(xls|xlsx|pdf)$/i, '');
  }
  
  return {
    success: true,
    projectName,
    client,
    date,
    vendors
  };
}

function categorizeItem(itemName) {
  if (!itemName) return '其他';
  const name = String(itemName).toLowerCase();
  
  if (name.includes('結構') || name.includes('鋼筋') || name.includes('技師')) return '結構/鑽探';
  if (name.includes('水電') || name.includes('電氣') || name.includes('弱電') || name.includes('給排水') || name.includes('消防') || name.includes('空調')) return '水電/消防';
  if (name.includes('跑照') || name.includes('建照') || name.includes('執照')) return '跑照/3D';
  if (name.includes('測量') || name.includes('建築線') || name.includes('土地') || name.includes('建物') || name.includes('鑑界')) return '測量/建築線';
  if (name.includes('綠建築') || name.includes('節能') || name.includes('耐')) return '綠建築/估算';
  if (name.includes('水保') || name.includes('大地') || name.includes('地質')) return '水保/大地';
  if (name.includes('監造')) return '監造';
  if (name.includes('室內') || name.includes('裝修')) return '室內裝修';
  if (name.includes('污水') || name.includes('排水') || name.includes('開工')) return '污水/排水';
  if (name.includes('預算') || name.includes('估算')) return '估算';
  
  return '其他';
}

function extractVendorName(itemName, remark) {
  // 從備註或項目名稱中嘗試提取廠商
  const text = String(itemName) + ' ' + String(remark);
  
  // 常見廠商關鍵字
  const knownVendors = [
    '黃明煌', '鋐誠', '國安', '創源', '賴淑芬', '九江',
    '佰城', '天翔', '王偉傑', '王瑋傑', '鄒宗顯', '長新',
    '朋泰', '邱寶止', '張宏暐', '陳雨軒', '睿宇', '中酉',
    '韋鉅', '剛健', '詠翊', '智森', '欣凱'
  ];
  
  for (const vendor of knownVendors) {
    if (text.includes(vendor)) return vendor;
  }
  
  // 沒有找到已知廠商，回傳項目名稱
  return String(itemName).replace(/\n/g, ' ').substring(0, 30);
}

function parsePDF(filePath, originalName) {
  // PDF 解析需要額外處理，這裡先跳過
  return Promise.resolve({
    success: false,
    error: 'PDF 解析功能開發中，請使用 Excel 檔案'
  });
}

// ========== API 路由處理 ==========

// 解析報價單 API
async function handleParseQuotation(req, res) {
  const contentType = req.headers['content-type'] || '';
  
  if (contentType.includes('multipart/form-data')) {
    // 處理檔案上傳
    const boundary = contentType.split('boundary=')[1];
    const body = await readBody(req);
    const parts = body.split('--' + boundary);
    
    let fileContent = null;
    let fileName = 'unknown';
    
    for (const part of parts) {
      if (part.includes('filename=')) {
        const fileMatch = part.match(/filename="([^"]+)"/);
        const contentMatch = part.split('\r\n\r\n');
        if (fileMatch) fileName = fileMatch[1];
        if (contentMatch.length > 1) {
          // 找到檔案內容（二進制）
          const idx = part.indexOf('\r\n\r\n');
          fileContent = part.substring(idx + 4, part.length - 2);
        }
      }
    }
    
    if (!fileContent) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: '無法讀取檔案' }));
      return;
    }
    
    // 儲存上傳的檔案
    const ext = path.extname(fileName);
    const tempPath = path.join(UPLOAD_DIR, 'temp_' + Date.now() + ext);
    fs.writeFileSync(tempPath, Buffer.from(fileContent, 'binary'));
    
    try {
      const result = await parseQuotationFile(tempPath, fileName);
      
      // 清理臨時檔案
      fs.unlinkSync(tempPath);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (e) {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: e.message }));
    }
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: 'Invalid content type' }));
  }
}

// 新增廠商到專案 API
async function handleAddVendors(req, res) {
  let body = await readBody(req);
  let data;
  
  try {
    data = JSON.parse(body);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
    return;
  }
  
  const { projectId, vendors } = data;
  
  if (!projectId || !vendors || !Array.isArray(vendors)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: '缺少必要參數' }));
    return;
  }
  
  // 讀取現有資料
  const dataFile = path.join(DATA_DIR, 'archAccounting.json');
  let accountingData;
  
  try {
    const fileContent = fs.readFileSync(dataFile, 'utf8');
    accountingData = JSON.parse(fileContent);
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: '無法讀取資料庫' }));
    return;
  }
  
  // 找到專案
  const projectIndex = accountingData.projects.findIndex(p => p.id == projectId);
  if (projectIndex === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: '找不到專案' }));
    return;
  }
  
  // 初始化 vendors 陣列
  if (!accountingData.projects[projectIndex].vendors) {
    accountingData.projects[projectIndex].vendors = [];
  }
  
  // 新增廠商（避免重複）
  const existingAmounts = accountingData.projects[projectIndex].vendors.map(v => v.amount);
  let addedCount = 0;
  
  for (const vendor of vendors) {
    if (!existingAmounts.includes(vendor.amount)) {
      accountingData.projects[projectIndex].vendors.push({
        category: vendor.category,
        vendor: vendor.name,
        amount: vendor.amount,
        remark: vendor.remark || ''
      });
      addedCount++;
    }
  }
  
  // 備份並儲存
  const backupPath = dataFile + '.bak_' + Date.now();
  fs.copyFileSync(dataFile, backupPath);
  
  try {
    fs.writeFileSync(dataFile, JSON.stringify(accountingData, null, 2));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      success: true, 
      message: `已新增 ${addedCount} 個廠商項目`,
      addedCount
    }));
  } catch (e) {
    // 恢復備份
    fs.copyFileSync(backupPath, dataFile);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: '儲存失敗: ' + e.message }));
  }
}

// ========== 主伺服器 ==========
const server = http.createServer(async (req, res) => {
  const clientIP = req.socket.remoteAddress;
  const host = req.headers.host || '';
  const isNgrok = host.includes('ngrok') || !!req.headers['x-forwarded-for'];
  
  // IP 白名單檢查（內網）
  const isAllowedIP = ALLOWED_IPS.some(ip => clientIP === ip || clientIP === '::ffff:' + ip);
  
  // 外網存取（ngrok 等）或非白名單 IP，要求密碼 (Basic Auth)
  if (isNgrok || !isAllowedIP) {
    // 預設帳密：admin / 8888
    const expectedAuth = 'Basic ' + Buffer.from('admin:8888').toString('base64');
    const authHeader = req.headers.authorization;
    
    if (authHeader !== expectedAuth) {
      console.log(`🔒 要求外網登入: ${clientIP} via ${host}`);
      res.writeHead(401, {
        'Content-Type': 'text/plain; charset=utf-8',
        'WWW-Authenticate': 'Basic realm="Accounting System"'
      });
      res.end('401 Unauthorized - 請輸入帳號密碼');
      return;
    }
  } else {
    // 內網白名單，但如果不符合還是擋一下
    if (!isAllowedIP) {
      console.log(`🚫 拒絕內網存取: ${clientIP}`);
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('403 Forbidden - 未授權的 IP');
      return;
    }
  }

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  let filePath = decodeURIComponent(url.pathname);

  // Serve Index as home page
  if (filePath === '/') {
    filePath = '/index.html';
  }

  
// === AI 辨識請款單 ===
async function handleParseExpense(req, res) {
  cors(res);
  try {
    const body = await readBody(req);
    const { image, filename } = JSON.parse(body);
    
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    const useGemini = !!process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'No API key set (GEMINI_API_KEY or OPENAI_API_KEY)' }));
      return;
    }

    let mimeType = 'image/jpeg';
    let base64Data = image;
    if (image && image.startsWith('data:')) {
      const m = image.match(/^data:([^;]+);base64,(.+)$/);
      if (m) { mimeType = m[1]; base64Data = m[2]; }
    }
    if (filename && filename.toLowerCase().endsWith('.pdf')) mimeType = 'application/pdf';
    if (filename && filename.toLowerCase().endsWith('.png')) mimeType = 'image/png';

    console.log('[parse-expense] file:', filename, 'mime:', mimeType, 'base64 len:', base64Data?.length, 'engine:', useGemini ? 'Gemini' : 'OpenAI');

    const prompt = '請辨識這張請款單/收據/發票的內容，回傳 JSON 格式：\n{\n  "date": "YYYY-MM-DD",\n  "vendor": "廠商名稱",\n  "category": "分類(房租/水電/電信/文具/交通/餐費/設備/保險/稅費/雜支)",\n  "description": "品項描述",\n  "amount": 數字(含稅總金額),\n  "tax": 數字(稅額,沒有就0),\n  "invoiceNo": "發票號碼(沒有就空字串)",\n  "paymentMethod": "付款方式(現金/匯款/刷卡/未付)",\n  "payDate": "匯款/付款日期(YYYY-MM-DD,沒有就空字串)"\n}\n只回傳 JSON，不要其他文字。';

    let text = '';

    if (useGemini) {
      // Gemini API
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mimeType, data: base64Data } }
            ]
          }]
        })
      });
      const result = await resp.json();
      console.log('[parse-expense] Gemini status:', resp.status);
      if (result.error) {
        console.error('[parse-expense] Gemini error:', result.error);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, raw: result.error.message || JSON.stringify(result.error) }));
        return;
      }
      text = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } else {
      // OpenAI API
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Data}` } }
          ]}],
          max_tokens: 500
        })
      });
      const result = await resp.json();
      if (result.error) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, raw: result.error.message }));
        return;
      }
      text = result.choices?.[0]?.message?.content || '';
    }

    console.log('[parse-expense] Response:', text.substring(0, 300));
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: parsed }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, raw: text }));
    }
  } catch (err) {
    console.error('[parse-expense] Error:', err);
    res.writeHead(500);
    res.end(JSON.stringify({ error: err.message }));
  }
}


  // API: AI 辨識請款單
  if (filePath === '/api/parse-expense' && req.method === 'POST') {
    await handleParseExpense(req, res);
    return;
  }

  // API: 支出列表
  if (filePath === '/api/expenses' && req.method === 'GET') {
    const df = path.join(DATA_DIR, 'archAccounting.json');
    const d = JSON.parse(fs.readFileSync(df, 'utf8'));
    cors(res);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(d.expenses || []));
    return;
  }

  // API: 新增支出
  if (filePath === '/api/expenses' && req.method === 'POST') {
    const body = await readBody(req);
    const expense = JSON.parse(body);
    const df = path.join(DATA_DIR, 'archAccounting.json');
    const d = JSON.parse(fs.readFileSync(df, 'utf8'));
    if (!d.expenses) d.expenses = [];
    expense.id = Date.now();
    expense.createdAt = new Date().toISOString();
    d.expenses.push(expense);
    fs.copyFileSync(df, df + '.bak_' + String(Date.now()));
    fs.writeFileSync(df, JSON.stringify(d, null, 2));
    cors(res);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, expense }));
    return;
  }

  // API: 刪除支出
  if (filePath === '/api/expenses/delete' && req.method === 'POST') {
    const body = await readBody(req);
    const { id } = JSON.parse(body);
    const df = path.join(DATA_DIR, 'archAccounting.json');
    const d = JSON.parse(fs.readFileSync(df, 'utf8'));
    d.expenses = (d.expenses || []).filter(e => e.id !== id);
    fs.copyFileSync(df, df + '.bak_' + String(Date.now()));
    fs.writeFileSync(df, JSON.stringify(d, null, 2));
    cors(res);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

// API: 解析報價單
  if (filePath === '/api/parse-quotation' && req.method === 'POST') {
    await handleParseQuotation(req, res);
    return;
  }

  // API: 新增廠商到專案
  if (filePath === '/api/add-vendors' && req.method === 'POST') {
    await handleAddVendors(req, res);
    return;
  }

  // API handling
  if (filePath.startsWith('/api/data/')) {
    const dataName = path.basename(filePath, '.json');
    const dataFile = path.join(DATA_DIR, `${dataName}.json`);

    if (req.method === 'GET') {
      if (fs.existsSync(dataFile)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        fs.createReadStream(dataFile).pipe(res);
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'File not found' }));
      }
    } else if (req.method === 'PUT') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          // Backup
          if (fs.existsSync(dataFile)) {
            fs.copyFileSync(dataFile, `${dataFile}.bak`);
          }
          fs.writeFileSync(dataFile, body);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
    return;
  }

  // Static files handling
  const absPath = path.join(STATIC_DIR, filePath);
  if (!absPath.startsWith(STATIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(absPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    const ext = path.extname(absPath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache', 'Expires': '0' });
    fs.createReadStream(absPath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log(`報價單上傳頁面: http://0.0.0.0:${PORT}/quotation_upload.html`);
});
