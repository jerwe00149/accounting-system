// ===== DATA STORE =====
const STORE_KEY = 'archAccounting';
// Server / API config — declared first so seedPayroll's saveData() can use it
const API_BASE = location.origin + '/api/data';
let _useServer = location.protocol === 'http:' || location.protocol === 'https:';
let DB = loadData();

// Auto-seed payroll if empty
// NOTE: this only seeds the LOCAL DB. We deliberately do NOT call saveData() here —
// the server is the source of truth; loadDataFromServer() will overwrite this seed
// with real data shortly after page load. Calling saveData() at boot would push the
// empty seeded state to the server and wipe real data when localStorage is cleared.
(function seedPayroll(){
  if(DB._payrollSeeded3)return;
  DB.payroll=[];
  DB._payrollSeeded3=true;
  const seed=[{"empName":"侯承昕","title":"設計師","month":"2025-01","baseSalary":39000,"overtime":1192,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"yearEndBonus":33330,"netPay":72112},{"empName":"侯承昕","title":"設計師","month":"2025-02","baseSalary":39000,"overtime":542,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"netPay":38132},{"empName":"侯承昕","title":"設計師","month":"2025-03","baseSalary":39000,"overtime":650,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"netPay":38240},{"empName":"侯承昕","title":"設計師","month":"2025-04","baseSalary":39000,"overtime":758,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"netPay":38348},{"empName":"侯承昕","title":"設計師","month":"2025-05","baseSalary":40000,"overtime":333,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"netPay":38923},{"empName":"侯承昕","title":"設計師","month":"2025-06","baseSalary":40000,"overtime":1444,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"netPay":40034},{"empName":"侯承昕","title":"設計師","month":"2025-07","baseSalary":40000,"overtime":1111,"laborIns":870,"healthIns":540,"leaveDeduction":1290,"laborRetirement":2088,"netPay":38411},{"empName":"侯承昕","title":"設計師","month":"2025-08","baseSalary":40000,"overtime":1556,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"netPay":40146},{"empName":"侯承昕","title":"設計師","month":"2025-09","baseSalary":41000,"overtime":1139,"laborIns":870,"healthIns":540,"leaveDeduction":2214,"laborRetirement":2088,"netPay":38515},{"empName":"侯承昕","title":"設計師","month":"2025-10","baseSalary":41000,"overtime":1708,"laborIns":870,"healthIns":540,"leaveDeduction":13667,"laborRetirement":2088,"netPay":27632},{"empName":"侯承昕","title":"設計師","month":"2025-11","baseSalary":41000,"overtime":797,"laborIns":870,"healthIns":540,"leaveDeduction":24600,"laborRetirement":2088,"netPay":15787},{"empName":"侯承昕","title":"設計師","month":"2025-12","baseSalary":41000,"overtime":1367,"laborIns":870,"healthIns":540,"leaveDeduction":20237,"laborRetirement":2088,"netPay":20720},{"empName":"范嘉富","title":"設計師","month":"2025-01","baseSalary":36000,"overtime":2000,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"yearEndBonus":33330,"netPay":69920},{"empName":"范嘉富","title":"設計師","month":"2025-02","baseSalary":36000,"overtime":3725,"laborIns":870,"healthIns":540,"leaveDeduction":262.5,"laborRetirement":2088,"netPay":38052.5},{"empName":"范嘉富","title":"設計師","month":"2025-03","baseSalary":36000,"overtime":3600,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"netPay":38190},{"empName":"范嘉富","title":"設計師","month":"2025-04","baseSalary":36000,"overtime":1600,"laborIns":870,"healthIns":540,"leaveDeduction":300,"laborRetirement":2088,"netPay":35890},{"empName":"范嘉富","title":"設計師","month":"2025-05","baseSalary":36000,"overtime":1400,"laborIns":870,"healthIns":540,"leaveDeduction":300,"laborRetirement":2088,"netPay":35690},{"empName":"范嘉富","title":"設計師","month":"2025-06","baseSalary":37500,"overtime":3020.83,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"netPay":39110.83},{"empName":"范嘉富","title":"設計師","month":"2025-07","baseSalary":37500,"overtime":2604.17,"laborIns":870,"healthIns":540,"leaveDeduction":1210,"laborRetirement":2088,"netPay":37484.17},{"empName":"范嘉富","title":"設計師","month":"2025-08","baseSalary":37500,"overtime":4010.42,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"netPay":40100.42},{"empName":"范嘉富","title":"設計師","month":"2025-09","baseSalary":39500,"overtime":3900,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"netPay":41258.75},{"empName":"范嘉富","title":"設計師","month":"2025-10","baseSalary":39000,"overtime":1408.33,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"netPay":38998.33},{"empName":"范嘉富","title":"設計師","month":"2025-11","baseSalary":39000,"overtime":1625,"laborIns":870,"healthIns":540,"leaveDeduction":1990.62,"laborRetirement":2088,"netPay":37224.38},{"empName":"范嘉富","title":"設計師","month":"2025-12","baseSalary":39000,"overtime":3358.33,"laborIns":870,"healthIns":540,"leaveDeduction":0,"laborRetirement":2088,"netPay":40948.33},{"empName":"鍾宜娟","title":"設計師","month":"2025-01","baseSalary":45000,"overtime":483.87,"laborIns":1002,"healthIns":622,"leaveDeduction":1451.61,"laborRetirement":2406,"yearEndBonus":33330,"netPay":75738.26},{"empName":"鍾宜娟","title":"設計師","month":"2025-02","baseSalary":45000,"overtime":0,"laborIns":1002,"healthIns":622,"leaveDeduction":0,"laborRetirement":2406,"netPay":43376},{"empName":"鍾宜娟","title":"設計師","month":"2025-03","baseSalary":45000,"overtime":750,"laborIns":1002,"healthIns":622,"leaveDeduction":2343.75,"laborRetirement":2406,"netPay":41782.25},{"empName":"鍾宜娟","title":"設計師","month":"2025-04","baseSalary":45000,"overtime":125,"laborIns":1002,"healthIns":622,"leaveDeduction":0,"laborRetirement":2406,"netPay":43501},{"empName":"鍾宜娟","title":"設計師","month":"2025-05","baseSalary":46000,"overtime":0,"laborIns":1002,"healthIns":622,"leaveDeduction":0,"laborRetirement":2406,"netPay":44376},{"empName":"鍾宜娟","title":"設計師","month":"2025-06","baseSalary":96000,"overtime":2044.44,"laborIns":1002,"healthIns":622,"leaveDeduction":0,"laborRetirement":2406,"netPay":96420.44},{"empName":"鍾宜娟","title":"設計師","month":"2025-07","baseSalary":46000,"overtime":1277.78,"laborIns":1002,"healthIns":622,"leaveDeduction":1483.87,"laborRetirement":2406,"netPay":44169.91},{"empName":"鍾宜娟","title":"設計師","month":"2025-08","baseSalary":46000,"overtime":1150,"laborIns":1002,"healthIns":622,"leaveDeduction":766.67,"laborRetirement":2406,"netPay":44759.33},{"empName":"鍾宜娟","title":"設計師","month":"2025-09","baseSalary":47500,"overtime":1436.11,"laborIns":1002,"healthIns":622,"leaveDeduction":0,"laborRetirement":2406,"netPay":47312.11},{"empName":"鍾宜娟","title":"設計師","month":"2025-10","baseSalary":47000,"overtime":1566.67,"laborIns":1002,"healthIns":622,"leaveDeduction":0,"laborRetirement":2406,"netPay":46942.67},{"empName":"鍾宜娟","title":"設計師","month":"2025-11","baseSalary":47000,"overtime":783.33,"laborIns":1002,"healthIns":622,"leaveDeduction":2691.13,"laborRetirement":2406,"netPay":43468.2},{"empName":"鍾宜娟","title":"設計師","month":"2025-12","baseSalary":47000,"overtime":1044.44,"laborIns":1002,"healthIns":622,"leaveDeduction":0,"laborRetirement":2406,"netPay":46420.44}];
  seed.forEach((r,i)=>{r.id=Date.now().toString(36)+Math.random().toString(36).slice(2,7)+i;r.mealAllowance=r.mealAllowance||0;r.travelAllowance=r.travelAllowance||0;r.bonus=r.bonus||0;r.holidayBonus=r.holidayBonus||0;r.yearEndBonus=r.yearEndBonus||0;r.incomeTax=r.incomeTax||0;r.laborInsCompany=r.laborInsCompany||0;r.healthInsCompany=r.healthInsCompany||0;DB.payroll.push(r)});
  localStorage.setItem(STORE_KEY, JSON.stringify(DB));
})();

function defaultDB(){
  return {projects:[],payables:[],payroll:[],settings:{name:'張哲維建築師事務所',taxId:'',addr:''},_migrated:false};
}
function migrateData(db){
  // Migrate old caseNo/name fields to year/businessNo/projectName (runs on every project every load)
  db.projects.forEach(p=>{
    if(p.caseNo!==undefined){
      const code=p.caseNo||'';
      if(!p.businessNo)p.businessNo=code;
      if(!p.year)p.year=code.length>=3?code.slice(0,3):'';
      delete p.caseNo;
    }
    if(p.name!==undefined){
      if(!p.projectName)p.projectName=p.name||'';
      delete p.name;
    }
    if(!p.businessNo)p.businessNo='';
    if(!p.year)p.year=p.businessNo.length>=3?p.businessNo.slice(0,3):'';
    if(!p.projectName)p.projectName='';
  });
  db._migrated=true;
  return db;
}
// === Server-based persistence (primary) + localStorage (fallback) ===
// (API_BASE and _useServer declared above seedPayroll)

function loadData(){
  // Sync load from localStorage first (server load is async, called in init)
  try{const d=localStorage.getItem(STORE_KEY);const db=d?{...defaultDB(),...JSON.parse(d)}:defaultDB();return migrateData(db)}
  catch(e){return defaultDB()}
}

async function loadDataFromServer(){
  if(!_useServer) return;
  try{
    const resp = await fetch(API_BASE + '/archAccounting');
    if(resp.ok){
      const data = await resp.json();
      const db = {...defaultDB(), ...data};
      DB = migrateData(db);
      localStorage.setItem(STORE_KEY, JSON.stringify(DB)); // sync to localStorage too
      console.log('✅ Server data loaded:', DB.projects.length, 'projects');
      refreshAll();
    }
  }catch(e){ console.warn('Server load failed, using localStorage:', e); }
}

// Toggle period received status (click to toggle)
function togglePeriodReceived(projectId, periodNum){
  const p=DB.projects.find(x=>x.id===projectId);
  if(!p)return;
  const amtField='p'+periodNum+'_amt';
  const dateField='p'+periodNum+'_date';
  const recvField='p'+periodNum+'_received';
  const methodField='p'+periodNum+'_method';
  
  const isReceived=p[recvField]||p[dateField];
  
  if(isReceived){
    // If already received, just toggle to unpaid
    p[recvField]=false;
    saveData();
    renderProjects();
    toast(`第${periodNum}期已設為「未收」`);
  } else {
    // Show date picker modal to mark as received
    const today=new Date().toISOString().slice(0,10).replace(/-/g,'.');
    let html=`<h3>第${periodNum}期收款資料</h3>
      <div style="margin:16px 0">
        <label style="display:block;margin-bottom:8px;font-weight:600">收款日期</label>
        <input type="date" id="periodDate" value="${today.replace(/\./g,'-')}" style="padding:8px;border:1px solid var(--border);border-radius:4px;width:100%;font-size:1rem">
      </div>
      <div style="margin:16px 0">
        <label style="display:block;margin-bottom:8px;font-weight:600">收款方式</label>
        <select id="periodMethod" style="padding:8px;border:1px solid var(--border);border-radius:4px;width:100%;font-size:1rem">
          <option value="">請選擇</option>
          <option value="電匯">電匯</option>
          <option value="支票">支票</option>
          <option value="轉帳">轉帳</option>
          <option value="現金">現金</option>
        </select>
      </div>
      <div style="display:flex;gap:8px;margin-top:16px">
        <button class="btn btn-primary" onclick="confirmPeriodReceived('${projectId}',${periodNum})">確認收款</button>
        <button class="btn btn-outline" onclick="closeModal()">取消</button>
      </div>`;
    document.getElementById('modalContent').innerHTML=html;
    document.getElementById('modalOverlay').classList.add('show');
  }
}

function confirmPeriodReceived(projectId, periodNum){
  const p=DB.projects.find(x=>x.id===projectId);
  if(!p)return;
  const dateVal=document.getElementById('periodDate').value;
  const methodVal=document.getElementById('periodMethod').value;
  
  const dateField='p'+periodNum+'_date';
  const recvField='p'+periodNum+'_received';
  const methodField='p'+periodNum+'_method';
  
  // Convert date format from YYYY-MM-DD to YYYY.MM.DD
  p[dateField]=dateVal?dateVal.replace(/-/g,'.'):'';
  p[methodField]=methodVal;
  p[recvField]=true;
  
  saveData();
  renderProjects();
  closeModal();
  toast(`第${periodNum}期已設為「已收」 - ${p[dateField]}`);
}

// Edit period details (date, method, amount)
function editPeriod(projectId, periodNum){
  const p=DB.projects.find(x=>x.id===projectId);
  if(!p)return;
  
  const amtField='p'+periodNum+'_amt';
  const dateField='p'+periodNum+'_date';
  const recvField='p'+periodNum+'_received';
  const methodField='p'+periodNum+'_method';
  
  const today=new Date().toISOString().slice(0,10).replace(/-/g,'.');
  const currentDate=p[dateField]?.replace(/\./g,'-')||'';
  const currentMethod=p[methodField]||'';
  const currentAmt=p[amtField]||0;
  const isReceived=p[recvField]||p[dateField];
  
  let html=`<h3>編輯第${periodNum}期資料</h3>
    <div style="margin:16px 0">
      <label style="display:block;margin-bottom:8px;font-weight:600">金額</label>
      <input type="number" id="periodAmt" value="${currentAmt}" style="padding:8px;border:1px solid var(--border);border-radius:4px;width:100%;font-size:1rem">
    </div>
    <div style="margin:16px 0">
      <label style="display:block;margin-bottom:8px;font-weight:600">收款日期</label>
      <input type="date" id="periodDate" value="${currentDate}" style="padding:8px;border:1px solid var(--border);border-radius:4px;width:100%;font-size:1rem">
    </div>
    <div style="margin:16px 0">
      <label style="display:block;margin-bottom:8px;font-weight:600">收款方式</label>
      <select id="periodMethod" style="padding:8px;border:1px solid var(--border);border-radius:4px;width:100%;font-size:1rem">
        <option value="">請選擇</option>
        <option value="電匯" ${currentMethod==='電匯'?'selected':''}>電匯</option>
        <option value="支票" ${currentMethod==='支票'?'selected':''}>支票</option>
        <option value="轉帳" ${currentMethod==='轉帳'?'selected':''}>轉帳</option>
        <option value="現金" ${currentMethod==='現金'?'selected':''}>現金</option>
      </select>
    </div>
    <div style="margin:16px 0">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
        <input type="checkbox" id="periodReceived" ${isReceived?'checked':''}>
        <span style="font-weight:600">已收款</span>
      </label>
    </div>
    <div style="display:flex;gap:8px;margin-top:16px">
      <button class="btn btn-primary" onclick="savePeriodEdit('${projectId}',${periodNum})">儲存</button>
      <button class="btn btn-outline" onclick="closeModal()">取消</button>
    </div>`;
  document.getElementById('modalContent').innerHTML=html;
  document.getElementById('modalOverlay').classList.add('show');
}

function savePeriodEdit(projectId, periodNum){
  const p=DB.projects.find(x=>x.id===projectId);
  if(!p)return;
  
  const amtField='p'+periodNum+'_amt';
  const dateField='p'+periodNum+'_date';
  const recvField='p'+periodNum+'_received';
  const methodField='p'+periodNum+'_method';
  
  const amtVal=parseFloat(document.getElementById('periodAmt').value)||0;
  const dateVal=document.getElementById('periodDate').value;
  const methodVal=document.getElementById('periodMethod').value;
  const recvVal=document.getElementById('periodReceived').checked;
  
  p[amtField]=amtVal;
  p[dateField]=dateVal?dateVal.replace(/-/g,'.'):'';
  p[methodField]=methodVal;
  p[recvField]=recvVal;
  
  saveData();
  renderProjects();
  closeModal();
  toast(`第${periodNum}期資料已儲存`);
}

// ===== VENDOR EDIT FUNCTIONS =====
function editVendor(projectId, category){
  category = decodeURIComponent(category);
  // Convert projectId to number since it's stored as integer in JSON
  const pidNum = parseInt(projectId);
  const p=DB.projects.find(x=>x.id===pidNum);
  if(!p){
    console.log('Project not found:', projectId, pidNum);
    return;
  }
  
  if(!p.vendors)p.vendors=[];
  const existing = p.vendors.find(v => v.category === category);
  const currentVendor = existing?.vendor || '';
  const currentAmount = existing?.amount || 0;
  
  const cats = ['結構/鑽探','水電/消防','跑照/3D','測量/建築線','綠建築/估算','水保/大地','監造'];
  let catOptions = cats.map(c => `<option value="${c}" ${c===category?'selected':''}>${c}</option>`).join('');
  
  let html = `<h3>編輯複委託支出</h3>
    <div style="margin:16px 0">
      <label style="display:block;margin-bottom:8px;font-weight:600">案件</label>
      <div style="padding:8px;background:#f1f5f9;border-radius:4px;color:#475569">${p.businessNo} - ${p.projectName}</div>
    </div>
    <div style="margin:16px 0">
      <label style="display:block;margin-bottom:8px;font-weight:600">類別</label>
      <select id="editVendorCat" style="padding:8px;border:1px solid var(--border);border-radius:4px;width:100%;font-size:1rem">${catOptions}</select>
    </div>
    <div style="margin:16px 0">
      <label style="display:block;margin-bottom:8px;font-weight:600">廠商名稱</label>
      <input type="text" id="editVendorName" value="${currentVendor}" style="padding:8px;border:1px solid var(--border);border-radius:4px;width:100%;font-size:1rem" placeholder="例如：佰城、黃明煌">
    </div>
    <div style="margin:16px 0">
      <label style="display:block;margin-bottom:8px;font-weight:600">金額</label>
      <input type="number" id="editVendorAmt" value="${currentAmount}" style="padding:8px;border:1px solid var(--border);border-radius:4px;width:100%;font-size:1rem">
    </div>
    <div style="display:flex;gap:8px;margin-top:16px">
      <button class="btn btn-primary" onclick="saveVendorEdit('${projectId}')">儲存</button>
      <button class="btn btn-outline" onclick="closeModal()">取消</button>
      ${existing ? `<button class="btn btn-danger" onclick="deleteVendor('${projectId}','${encodeURIComponent(category)}')" style="margin-left:auto">刪除</button>` : ''}
    </div>`;
  
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('show');
}

function saveVendorEdit(projectId){
  const pidNum = parseInt(projectId);
  const p = DB.projects.find(x => x.id === pidNum);
  if(!p)return;
  
  const category = document.getElementById('editVendorCat').value;
  const vendor = document.getElementById('editVendorName').value.trim();
  const amount = parseFloat(document.getElementById('editVendorAmt').value) || 0;
  
  if(!p.vendors)p.vendors = [];
  p.vendors = p.vendors.filter(v => v.category !== category);
  
  if(vendor || amount > 0){
    p.vendors.push({category, vendor, amount});
  }
  
  saveData();
  renderSubcontractors();
  closeModal();
  toast(`複委託資料已儲存`);
}

function deleteVendor(projectId, category){
  category = decodeURIComponent(category);
  const pidNum = parseInt(projectId);
  const p = DB.projects.find(x => x.id === pidNum);
  if(!p)return;
  
  if(!p.vendors)p.vendors = [];
  p.vendors = p.vendors.filter(v => v.category !== category);
  
  saveData();
  renderSubcontractors();
  closeModal();
  toast(`複委託資料已刪除`);
}

function showAddVendorModal(){
  const cats = ['結構/鑽探','水電/消防','跑照/3D','測量/建築線','綠建築/估算','水保/大地','監造'];
  const yf = document.getElementById('subYearFilter').value;
  
  let projects = DB.projects;
  if(yf) projects = projects.filter(p => p.year === yf);
  
  let projOptions = projects.map(p => `<option value="${p.id}">${p.businessNo||p.year} - ${p.projectName}</option>`).join('');
  let catOptions = cats.map(c => `<option value="${c}">${c}</option>`).join('');
  
  let html = `<h3>新增複委託支出</h3>
    <div style="margin:16px 0">
      <label style="display:block;margin-bottom:8px;font-weight:600">選擇案件</label>
      <select id="addVendorProject" style="padding:8px;border:1px solid var(--border);border-radius:4px;width:100%;font-size:1rem">
        <option value="">請選擇案件</option>
        ${projOptions}
      </select>
    </div>
    <div style="margin:16px 0">
      <label style="display:block;margin-bottom:8px;font-weight:600">類別</label>
      <select id="addVendorCat" style="padding:8px;border:1px solid var(--border);border-radius:4px;width:100%;font-size:1rem">
        ${catOptions}
      </select>
    </div>
    <div style="margin:16px 0">
      <label style="display:block;margin-bottom:8px;font-weight:600">廠商名稱</label>
      <input type="text" id="addVendorName" style="padding:8px;border:1px solid var(--border);border-radius:4px;width:100%;font-size:1rem" placeholder="例如：佰城、黃明煌">
    </div>
    <div style="margin:16px 0">
      <label style="display:block;margin-bottom:8px;font-weight:600">金額</label>
      <input type="number" id="addVendorAmt" style="padding:8px;border:1px solid var(--border);border-radius:4px;width:100%;font-size:1rem" placeholder="0">
    </div>
    <div style="display:flex;gap:8px;margin-top:16px">
      <button class="btn btn-primary" onclick="saveNewVendor()">新增</button>
      <button class="btn btn-outline" onclick="closeModal()">取消</button>
    </div>`;
  
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('show');
}

function saveNewVendor(){
  const projectId = document.getElementById('addVendorProject').value;
  const category = document.getElementById('addVendorCat').value;
  const vendor = document.getElementById('addVendorName').value.trim();
  const amount = parseFloat(document.getElementById('addVendorAmt').value) || 0;
  
  if(!projectId){
    toast('請選擇案件','error');
    return;
  }
  
  if(!vendor && amount <= 0){
    toast('請輸入廠商名稱或金額','error');
    return;
  }
  
  const pidNum = parseInt(projectId);
  const p = DB.projects.find(x => x.id === pidNum);
  if(!p)return;
  
  if(!p.vendors)p.vendors = [];
  p.vendors.push({category, vendor, amount});
  
  saveData();
  renderSubcontractors();
  closeModal();
  toast(`複委託資料已新增`);
}

// Show extra periods (5-8) modal
function showExtraPeriods(projectId){
  const p=DB.projects.find(x=>x.id===projectId);
  if(!p)return;
  let html='<h3>第5-8期資料</h3><table style="width:100%;margin-top:12px"><thead><tr><th>期數</th><th class="text-right">金額</th><th>日期</th><th>收款方式</th><th>狀態</th><th>操作</th></tr></thead><tbody>';
  for(let i=5;i<=8;i++){
    if(p['p'+i+'_amt']){
      const isRec=p['p'+i+'_received']||p['p'+i+'_date'];
      html+=`<tr>
        <td>第${i}期</td>
        <td class="text-right mono">${fmtMoney(p['p'+i+'_amt'])}</td>
        <td>${p['p'+i+'_date']||'-'}</td>
        <td>${p['p'+i+'_method']||'-'}</td>
        <td style="color:${isRec?'var(--success)':'var(--warning)'}">${isRec?'已收':'未收'}</td>
        <td><button class="btn btn-sm" onclick="editPeriod('${p.id}',${i})">編輯</button></td>
      </tr>`;
    }
  }
  html+='</tbody></table><button class="btn btn-primary" style="margin-top:16px" onclick="closeModal()">關閉</button>';
  document.getElementById('modalContent').innerHTML=html;
  document.getElementById('modalOverlay').classList.add('show');
}

function saveData(){
  localStorage.setItem(STORE_KEY, JSON.stringify(DB));
  // Also save to server (fire-and-forget). Server's Pages Function only accepts POST.
  if(_useServer){
    fetch(API_BASE + '/archAccounting', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(DB)
    }).catch(e => console.warn('Server save failed:', e));
  }
}
function clearAllData(){DB=defaultDB();saveData();refreshAll();toast('資料已清除','info')}

// Load from server on startup
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',()=>loadDataFromServer())}
else{loadDataFromServer()}

// Ensure dashboard renders after page load
setTimeout(function(){ if(DB.projects.length===0) loadDataFromServer(); renderDashboard(); }, 2000);

// ===== LINKED PAYABLE HELPERS =====
function getLinkedPayables(projectId){
  if(!projectId)return[];
  return DB.payables.filter(p=>p.projectId===projectId);
}
function getLinkedSubcontractorTotal(projectId){
  return getLinkedPayables(projectId).reduce((s,p)=>s+(p.amount||0),0);
}
function autoMatchProject(vendor,description){
  if(!vendor&&!description)return'';
  const txt=((vendor||'')+' '+(description||'')).toLowerCase();
  for(const p of DB.projects){
    if(p.projectName&&txt.includes(p.projectName.toLowerCase()))return p.id;
    if(p.client&&txt.includes(p.client.toLowerCase()))return p.id;
    if(p.businessNo&&txt.includes(p.businessNo.toLowerCase()))return p.id;
  }
  return'';
}
function projectOptionsHTML(selectedId){
  let html='<option value="">無關聯</option>';
  DB.projects.forEach(p=>{
    html+=`<option value="${p.id}" ${p.id===selectedId?'selected':''}>${p.businessNo||'?'} - ${p.projectName||'未命名'}</option>`;
  });
  return html;
}

// ===== UTILITIES =====
function fmt(n){return n==null?'':Number(n).toLocaleString('zh-TW')}
function fmtMoney(n){if(n==null||isNaN(n))return'-';return'$'+Math.round(Number(n)).toLocaleString('zh-TW')}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function toast(msg,type='success'){
  const c=document.getElementById('toastContainer');
  const t=document.createElement('div');t.className='toast toast-'+type;t.textContent=msg;c.appendChild(t);
  setTimeout(()=>t.remove(),3000);
}
function parseDate(v){
  if(!v)return'';
  if(typeof v==='number'){const d=new Date((v-25569)*86400000);return d.toISOString().slice(0,10)}
  if(typeof v==='string'&&v.includes('/'))return v.replace(/(\d+)\/(\d+)\/(\d+)/,(m,a,b,c)=>{
    const y=a.length===3?parseInt(a)+1911:parseInt(a);return `${y}-${b.padStart(2,'0')}-${c.padStart(2,'0')}`
  });
  return String(v).slice(0,10);
}
function monthKey(dateStr){return dateStr?dateStr.slice(0,7):''}
function getMonths(){
  const s=new Set();
  DB.payables.forEach(p=>{const m=monthKey(p.date);if(m)s.add(m)});
  DB.payroll.forEach(p=>{if(p.month)s.add(p.month)});
  DB.projects.forEach(p=>{for(let i=1;i<=5;i++){const m=monthKey(p['p'+i+'_date']);if(m)s.add(m)}});
  return [...s].sort().reverse();
}
function getYears(){
  const s=new Set();getMonths().forEach(m=>s.add(m.slice(0,4)));
  const cy=new Date().getFullYear();s.add(String(cy));
  // Limit to last 2 years for Excel export
  const years = [...s].sort().reverse().slice(0, 2);
  return years;
}

// ===== PAGE SWITCHING =====
function switchPage(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const targetPage = document.getElementById('page-'+page);
  if(!targetPage){console.warn('Page not found:',page);switchPage('dashboard');return;}
  targetPage.classList.add('active');
  document.querySelectorAll('.sidebar-nav a').forEach(a=>a.classList.toggle('active',a.dataset.page===page));
  const titles={dashboard:'總覽',projects:'案件收支表',subcontractors:'複委託管理',payables:'應付帳款',payroll:'薪資總表',report:'月報表',import:'匯入資料',quotation:'報價單上傳',settings:'設定'};
  document.getElementById('pageTitle').textContent=titles[page]||page;
  document.getElementById('sidebar').classList.remove('open');
  // 應付帳款：全螢幕模式（隱藏側邊欄）
  document.body.classList.toggle('payables-fullscreen', page==='payables');
  if(page==='dashboard')renderDashboard();
  if(page==='projects')renderProjects();
  if(page==='payables')renderPayables();
  if(page==='payroll')renderPayroll();
  if(page==='report')renderReport();
  if(page==='subcontractors'){
    // 切換到複委託頁面時重新載入伺服器數據
    if(typeof loadDataFromServer==='function')loadDataFromServer();
    renderSubcontractors();
  }
  if(page==='settings')renderSettings();
  if(page==='import')renderImportPage();
  if(page==='quotation')initQuotationPage();
}

// ===== DASHBOARD =====
let dashCharts={};
function renderDashboard(){
  const totalContract=DB.projects.reduce((s,p)=>s+(p.contractAmt||0),0);
  const totalReceived=DB.projects.reduce((s,p)=>s+calcReceived(p),0);
  const totalOutstanding=totalContract-totalReceived;
  const totalPayables=DB.payables.filter(p=>p.status==='pending').reduce((s,p)=>s+(p.amount||0),0);
  const totalSalary=DB.payroll.reduce((s,p)=>s+(p.netPay||0),0);

  document.getElementById('dashStats').innerHTML=`
    <div class="stat-card accent"><div class="label">合約總額</div><div class="value">${fmtMoney(totalContract)}</div><div class="sub">${DB.projects.length} 件案件</div></div>
    <div class="stat-card success"><div class="label">已收款</div><div class="value">${fmtMoney(totalReceived)}</div><div class="sub">收款率 ${totalContract?Math.round(totalReceived/totalContract*100):0}%</div></div>
    <div class="stat-card warning"><div class="label">未收款</div><div class="value">${fmtMoney(totalOutstanding)}</div></div>
    <div class="stat-card danger"><div class="label">待付帳款</div><div class="value">${fmtMoney(totalPayables)}</div><div class="sub">${DB.payables.filter(p=>p.status==='pending').length} 筆（複委託: ${fmtMoney(DB.payables.filter(p=>p.status==='pending'&&p.category==='subcontractor').reduce((s,p)=>s+(p.amount||0),0))}）</div></div>
  `;

  // Todo list
  const todos=[];
  DB.projects.forEach(p=>{
    for(let i=1;i<=5;i++){
      if(p['p'+i+'_amt']&&!p['p'+i+'_date']){
        todos.push({type:'收款',desc:`${p.projectName||p.businessNo} 第${i}期`,amount:p['p'+i+'_amt'],due:'未定',status:'warning'});
      }
    }
  });
  DB.payables.filter(p=>p.status==='pending').forEach(p=>{
    todos.push({type:'付款',desc:`${p.vendor} - ${p.description}`,amount:p.amount,due:p.date||'未定',status:'danger'});
  });
  document.getElementById('dashTodo').innerHTML=todos.length?todos.slice(0,10).map(t=>`
    <tr><td>${t.type}</td><td>${t.desc}</td><td class="text-right mono">${fmtMoney(t.amount)}</td><td>${t.due}</td>
    <td><span class="badge badge-${t.status}">${t.status==='warning'?'待收':'待付'}</span></td></tr>
  `).join(''):'<tr><td colspan="5" style="text-align:center;color:var(--text-light);padding:24px">暫無待辦事項</td></tr>';

  // Charts
  renderDashCharts();
}

function renderDashCharts(){
  const months=getMonths().slice(0,12).reverse();
  const incomeByMonth={},expenseByMonth={};
  months.forEach(m=>{incomeByMonth[m]=0;expenseByMonth[m]=0});
  DB.projects.forEach(p=>{for(let i=1;i<=5;i++){const m=monthKey(p['p'+i+'_date']);if(m&&incomeByMonth[m]!==undefined)incomeByMonth[m]+=(p['p'+i+'_amt']||0)}});
  DB.payables.forEach(p=>{const m=monthKey(p.date);if(m&&expenseByMonth[m]!==undefined)expenseByMonth[m]+=(p.amount||0)});
  DB.payroll.forEach(p=>{if(p.month&&expenseByMonth[p.month]!==undefined)expenseByMonth[p.month]+=(p.netPay||0)});

  if(dashCharts.bar)dashCharts.bar.destroy();
  if(dashCharts.line)dashCharts.line.destroy();

  const labels=months.map(m=>m.slice(5)+'月');
  dashCharts.bar=new Chart(document.getElementById('dashIncomeExpense'),{
    type:'bar',data:{labels,datasets:[
      {label:'收入',data:months.map(m=>incomeByMonth[m]),backgroundColor:'rgba(59,130,246,.7)'},
      {label:'支出',data:months.map(m=>expenseByMonth[m]),backgroundColor:'rgba(239,68,68,.7)'}
    ]},options:{responsive:true,plugins:{title:{display:true,text:'收支對比'}},scales:{y:{ticks:{callback:v=>fmtMoney(v)}}}}
  });

  let running=0;const cashData=months.map(m=>{running+=incomeByMonth[m]-expenseByMonth[m];return running});
  dashCharts.line=new Chart(document.getElementById('dashCashFlow'),{
    type:'line',data:{labels,datasets:[{label:'累計現金流',data:cashData,borderColor:'#22c55e',backgroundColor:'rgba(34,197,94,.1)',fill:true,tension:.3}]},
    options:{responsive:true,plugins:{title:{display:true,text:'現金流趨勢'}},scales:{y:{ticks:{callback:v=>fmtMoney(v)}}}}
  });
}

// ===== PROJECTS =====
function calcReceived(p){let t=0;for(let i=1;i<=8;i++){if(p['p'+i+'_received']||p['p'+i+'_date'])t+=(p['p'+i+'_amt']||0)}return t}

// Sorting state for projects
let projSortField='year';
let projSortAsc=false; // descending by default
function sortProjects(field){
  if(projSortField===field){projSortAsc=!projSortAsc}else{projSortField=field;projSortAsc=field==='year'?false:true}
  renderProjects();
}

function renderProjects(){
  // Populate year filter
  const yearSet=new Set();
  DB.projects.forEach(p=>{if(p.year)yearSet.add(p.year)});
  const yearFilter=document.getElementById('projYearFilter');
  const curYearVal=yearFilter.value;
  yearFilter.innerHTML='<option value="">全部年份</option>'+[...yearSet].sort().reverse().map(y=>`<option value="${y}">民國 ${y} 年</option>`).join('');
  yearFilter.value=curYearVal;

  const q=(document.getElementById('projSearch')?.value||'').toLowerCase();
  const yf=yearFilter.value;
  let filtered=DB.projects.filter(p=>{
    if(yf&&p.year!==yf)return false;
    if(!q)return true;
    return p.businessNo?.toLowerCase().includes(q)||p.projectName?.toLowerCase().includes(q)||p.client?.toLowerCase().includes(q)||p.year?.includes(q);
  });

  // Sort
  filtered=[...filtered].sort((a,b)=>{
    let va,vb;
    if(projSortField==='year'){va=a.year||'';vb=b.year||'';if(va===vb){va=a.businessNo||'';vb=b.businessNo||''}}
    else if(projSortField==='businessNo'){va=a.businessNo||'';vb=b.businessNo||''}
    else if(projSortField==='projectName'){va=a.projectName||'';vb=b.projectName||''}
    else if(projSortField==='client'){va=a.client||'';vb=b.client||''}
    else{va='';vb=''}
    if(va<vb)return projSortAsc?-1:1;if(va>vb)return projSortAsc?1:-1;return 0;
  });

  // Update sort icons
  ['year','businessNo','projectName','client'].forEach(f=>{
    const el=document.getElementById('sortIcon_'+f);
    if(el)el.textContent=projSortField===f?(projSortAsc?'▲':'▼'):'';
  });

  let totalContract=0,totalReceived=0;
  document.getElementById('projTable').innerHTML=filtered.map((p)=>{
    const realIdx=DB.projects.indexOf(p);
    const received=calcReceived(p);const outstanding=(p.contractAmt||0)-received;
    totalContract+=p.contractAmt||0;totalReceived+=received;
    const rowClass=outstanding>0?'style="background:#fef2f2"':'';
    return `<tr ${rowClass}>
      <td>${p.year||''}</td><td>${p.businessNo||''}</td><td>${p.projectName||''}</td><td>${p.client||''}</td><td>${p.location||''}</td>
      <td class="text-right mono">${fmtMoney(p.contractAmt)}</td>
      ${[1,2,3,4].map(i=>{
        const isReceived=p['p'+i+'_received']||p['p'+i+'_date'];
        const statusColor=isReceived?'var(--success)':'var(--warning)';
        const statusText=isReceived?'已收':'未收';
        const dateInfo=p['p'+i+'_date']?' '+p['p'+i+'_date']+(p['p'+i+'_method']?' '+p['p'+i+'_method']:''):'';
        return `<td class="text-right mono" style="cursor:pointer" onclick="editPeriod('${p.id}',${i})" title="點擊編輯第${i}期資料${dateInfo}">
          ${p['p'+i+'_amt']?fmtMoney(p['p'+i+'_amt'])+'<br><span style="font-size:.72rem;color:'+statusColor+'">'+statusText+(dateInfo?'<br>'+dateInfo:'')+'</span>':'<span style="color:#cbd5e1">-</span>'}
        </td>`;
      }).join('')}
      ${(()=>{
        // Check if there are more than 4 periods
        const extraPeriods=[];
        for(let i=5;i<=8;i++){if(p['p'+i+'_amt']){const isRec=p['p'+i+'_received']||p['p'+i+'_date'];extraPeriods.push({i,amt:p['p'+i+'_amt'],date:p['p'+i+'_date'],method:p['p'+i+'_method'],received:isRec})}}
        if(extraPeriods.length){
          const detail=extraPeriods.map(x=>`第${x.i}期: ${fmtMoney(x.amt)}${x.received?' ✓已收':' ✗未收'}`).join('\n');
          return'<td class="text-right mono" style="font-size:.72rem;cursor:pointer;color:var(--accent)" onclick="showExtraPeriods(\''+p.id+'\')" title="'+detail+'">'+extraPeriods.length+'期 <span class="tip-box">'+detail+'</span></td>';
        }
        return'<td class="text-right mono" style="color:#cbd5e1">-</td>';
      })()}
      <td class="text-right mono" style="font-weight:600;color:var(--success)">${fmtMoney(received)}</td>
      <td class="text-right mono" style="font-weight:600;color:${outstanding>0?'var(--danger)':'var(--success)'}">${fmtMoney(outstanding)}</td>
      <td style="font-size:.8rem">${(()=>{
        const vendors=p.vendors||[];
        const vendorsTotal=vendors.reduce((s,x)=>s+(x.amount||0),0);
        if(vendors.length && vendorsTotal>0){
          const detail=vendors.map(x=>`${x.vendor||'?'}: ${fmtMoney(x.amount)} (${x.category})`).join('\\n');
          return'<span class="tip-cell" style="color:var(--warning);font-weight:600;cursor:pointer" onclick="showVendorsPopup(\''+p.id+'\')">'+fmtMoney(vendorsTotal)+'<span class="tip-box" style="white-space:pre-line;text-align:left">'+detail+'</span></span>';
        }
        // Fallback: linked subcontractor-category payables (e.g. manually entered in 應付帳款)
        const linkedSub=DB.payables.filter(x=>x.projectId===p.id&&x.category==='subcontractor');
        const linkedTotal=linkedSub.reduce((s,x)=>s+(x.amount||0),0);
        if(linkedTotal>0){
          const detail=linkedSub.map(x=>`${x.vendor||'?'}: ${fmtMoney(x.amount)}\\n  ${x.description||''}`).join('\\n');
          return'<span class="tip-cell" style="color:var(--warning);font-weight:600;cursor:pointer" onclick="showLinkedPayablesPopup(\''+p.id+'\')" title="來自應付帳款">'+fmtMoney(linkedTotal)+'<span class="tip-box" style="white-space:pre-line;text-align:left">'+detail+'</span></span>';
        }
        return'<span style="color:#cbd5e1">-</span>';
      })()}
      ${(()=>{const subCost=getSubcontractorCostForProject(p);const netProfit=received-subCost;const profitRate=p.contractAmt?(netProfit/p.contractAmt*100):0;const tooltip='已收款: '+fmtMoney(received)+' - 複委託: '+fmtMoney(subCost)+' = 純利: '+fmtMoney(netProfit);return '<td class="text-right mono" style="font-weight:600;color:'+(netProfit>=0?'var(--success)':'var(--danger)')+'" title="'+tooltip+'">'+fmtMoney(netProfit)+'</td><td class="text-right mono" style="color:'+(profitRate>=0?'var(--success)':'var(--danger)')+'" title="純利率 = 純利/合約">'+profitRate.toFixed(1)+'%</td>';})()}
      <td style="white-space:nowrap"><button class="btn btn-sm" onclick="editProject(${realIdx})">編輯</button></td>
    </tr>`;
  }).join('');

  const totalOut=totalContract-totalReceived;
  const totalSubAll=filtered.reduce((s,p)=>s+getSubcontractorCostForProject(p),0);
  const totalNetProfit=totalReceived-totalSubAll;
  const totalProfitRate=totalContract?(totalNetProfit/totalContract*100):0;
  document.getElementById('projTfoot').innerHTML=`<tr style="font-weight:700;background:#f1f5f9">
    <td colspan="5">合計</td><td class="text-right mono">${fmtMoney(totalContract)}</td>
    <td colspan="5"></td><td class="text-right mono">${fmtMoney(totalReceived)}</td><td class="text-right mono">${fmtMoney(totalOut)}</td>
    <td class="text-right mono" style="color:${totalNetProfit>=0?'var(--success)':'var(--danger)'}">${fmtMoney(totalNetProfit)}</td>
    <td class="text-right mono" style="color:${totalProfitRate>=0?'var(--success)':'var(--danger)'}">${totalProfitRate.toFixed(1)}%</td>
    <td colspan="2"></td></tr>`;

  // 複委託支出: use the unified vendors-first / payables-fallback calc so it matches
  // the column total in the table and the 純利 column. (Old code summed ALL linked
  // payables including non-subcontractor categories like 代扣所得稅.)
  const totalSubCost=DB.projects.reduce((s,p)=>s+getSubcontractorCostForProject(p),0);
  document.getElementById('projStats').innerHTML=`
    <div class="stat-card accent"><div class="label">案件數</div><div class="value">${filtered.length}${yf?' (篩選)':''}</div></div>
    <div class="stat-card success"><div class="label">合約總額</div><div class="value">${fmtMoney(totalContract)}</div></div>
    <div class="stat-card warning"><div class="label">已收款</div><div class="value">${fmtMoney(totalReceived)}</div></div>
    <div class="stat-card danger"><div class="label">未收款</div><div class="value">${fmtMoney(totalOut)}</div></div>
    <div class="stat-card" style="border-left:4px solid #f59e0b"><div class="label">複委託支出</div><div class="value">${fmtMoney(totalSubCost)}</div></div>
  `;
}

function openProjectModal(idx){
  const p=idx!=null?DB.projects[idx]:{};
  const isEdit=idx!=null;
  document.getElementById('modalContent').innerHTML=`
    <h3>${isEdit?'編輯案件':'新增案件'}</h3>
    <!-- Contract Upload Zone -->
    <div style="margin-bottom:16px;padding:12px;background:#f8fafc;border:1px solid var(--border);border-radius:var(--radius)">
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <label class="btn btn-outline btn-sm" style="margin:0;cursor:pointer">
          📄 上傳合約自動填入 (.doc/.docx)
          <input type="file" accept=".doc,.docx" style="display:none" onchange="handleContractUpload(this.files[0],${idx!=null?idx:'null'})">
        </label>
        <button class="btn btn-outline btn-sm" onclick="toggleContractAiInput()">🤖 AI辨識貼上</button>
        <span id="contractUploadStatus" style="font-size:.8rem;color:var(--text-light)"></span>
      </div>
      <div id="contractAiInputArea" style="display:none;margin-top:10px">
        <textarea id="contractAiJson" rows="8" style="width:100%;font-family:'SF Mono',monospace;font-size:.8rem;padding:8px;border:1px solid var(--border);border-radius:var(--radius)" placeholder='貼上 AI 辨識的 JSON，例如：\n{"businessNo":"11301","projectName":"某某工程","client":"王大明","location":"台中市","contractAmt":500000,"p1_amt":150000,"p2_amt":200000,"p3_amt":100000,"p4_amt":50000,"vendors":[{"category":"結構","vendor":"佰城","amount":12000},{"category":"水電","vendor":"鄭世傑","amount":30000}]}\n也支援舊格式 caseNo/name'></textarea>
        <button class="btn btn-primary btn-sm" style="margin-top:6px" onclick="applyContractAiJson()">套用 JSON</button>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>年份（民國年）</label><input id="mYear" value="${p.year||''}" placeholder="例: 113" oninput="autoFillYear()"></div>
      <div class="form-group"><label>業務編號</label><input id="mBusinessNo" value="${p.businessNo||''}" placeholder="例: 11301" oninput="autoFillYear()"></div>
    </div>
    <div class="form-group"><label>案名</label><input id="mProjectName" value="${p.projectName||''}" placeholder="例: 朱董太平農舍"></div>
    <div class="form-row">
      <div class="form-group"><label>業主</label><input id="mClient" value="${p.client||''}"></div>
      <div class="form-group"><label>地點</label><input id="mLocation" value="${p.location||''}"></div>
    </div>
    <div class="form-group"><label>合約金額</label><input type="number" id="mContractAmt" value="${p.contractAmt||''}"></div>
    ${[1,2,3,4,5,6,7,8].map(i=>`<div class="form-row" style="grid-template-columns:1fr 1fr 1fr;align-items:end"><div class="form-group"><label>第${i}期金額</label><input type="number" id="mP${i}Amt" value="${p['p'+i+'_amt']||''}"></div><div class="form-group"><label>第${i}期收款日</label><input type="date" id="mP${i}Date" value="${rocToIso(p['p'+i+'_date'])||''}"></div><div class="form-group"><label>第${i}期收款方式</label><select id="mP${i}Method"><option value="">—</option><option value="電匯" ${p['p'+i+'_method']==='電匯'?'selected':''}>電匯</option><option value="支票" ${p['p'+i+'_method']==='支票'?'selected':''}>支票</option><option value="轉帳" ${p['p'+i+'_method']==='轉帳'?'selected':''}>轉帳</option><option value="現金" ${p['p'+i+'_method']==='現金'?'selected':''}>現金</option></select></div></div>`).join('')}
    <div class="form-group"><label>複委託（備註）</label><input id="mSub" value="${p.subcontractor||''}"></div>
    <div style="margin-top:16px;padding:16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:var(--radius)">
      <h4 style="margin-bottom:10px;font-size:.9rem;color:#166534">📸 匯款單辨識 — 自動填入收款資料</h4>
      <div style="display:flex;gap:8px;align-items:start;flex-wrap:wrap">
        <label class="btn btn-outline btn-sm" style="cursor:pointer">📷 上傳匯款單圖片
          <input type="file" accept="image/*" style="display:none" onchange="handleReceiptUploadInModal(this.files[0])">
        </label>
        <div id="receiptPreviewInModal" style="flex:1;min-width:200px"></div>
      </div>
      <div style="margin-top:10px">
        <label style="font-size:.8rem;font-weight:500;color:var(--text-light);display:block;margin-bottom:4px">🤖 貼上AI辨識結果 JSON</label>
        <textarea id="receiptAiJson" rows="4" style="width:100%;font-family:'SF Mono',monospace;font-size:.78rem;padding:8px;border:1px solid var(--border);border-radius:var(--radius);resize:vertical" placeholder='{"period":1,"amount":150000,"date":"2024-03-15","method":"電匯","reference":"匯款編號或支票號碼"}'></textarea>
        <button class="btn btn-primary btn-sm" style="margin-top:6px" onclick="applyReceiptAiJson()">🔍 解析並填入期款</button>
        <div id="receiptAiStatus" style="margin-top:4px;font-size:.8rem"></div>
      </div>
    </div>
    ${isEdit?(()=>{
      const linked=getLinkedPayables(p.id);const total=linked.reduce((s,x)=>s+(x.amount||0),0);
      if(!linked.length)return'<div style="margin-top:12px;padding:12px;background:#f8fafc;border-radius:var(--radius);border:1px solid var(--border)"><span style="color:var(--text-light);font-size:.85rem">無關聯複委託費用</span></div>';
      return'<div style="margin-top:16px"><h4 style="margin-bottom:8px;font-size:.9rem;color:var(--accent)">📋 關聯複委託費用</h4><div class="table-wrap"><table><thead><tr><th>日期</th><th>廠商</th><th>說明</th><th class="text-right">金額</th><th>狀態</th></tr></thead><tbody>'+linked.map(x=>'<tr><td>'+x.date+'</td><td>'+x.vendor+'</td><td>'+x.description+'</td><td class="text-right mono">'+fmtMoney(x.amount)+'</td><td><span class="badge badge-'+(x.status==='paid'?'success':'warning')+'">'+(x.status==='paid'?'已付':'待付')+'</span></td></tr>').join('')+'</tbody><tfoot><tr style="font-weight:700;background:#f1f5f9"><td colspan="3">合計</td><td class="text-right mono">'+fmtMoney(total)+'</td><td></td></tr></tfoot></table></div><div style="margin-top:8px;padding:12px;background:#f8fafc;border-radius:var(--radius);display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:.85rem"><div><span style="color:var(--text-light)">合約金額</span><br><strong>'+fmtMoney(p.contractAmt)+'</strong></div><div><span style="color:var(--text-light)">已收款</span><br><strong style="color:var(--success)">'+fmtMoney(calcReceived(p))+'</strong></div><div><span style="color:var(--text-light)">複委託支出</span><br><strong style="color:var(--warning)">'+fmtMoney(total)+'</strong></div><div><span style="color:var(--text-light)">淨利</span><br><strong style="color:'+((p.contractAmt||0)-total>=0?'var(--success)':'var(--danger)')+'">'+fmtMoney((p.contractAmt||0)-total)+'</strong></div></div></div>';
    })():''}
    <div class="modal-actions">
      <button class="btn btn-outline" onclick="closeModal()">取消</button>
      <button class="btn btn-primary" onclick="saveProject(${idx!=null?idx:'null'})">${isEdit?'更新':'新增'}</button>
    </div>`;
  openModal();
}

function toggleContractAiInput(){
  const area=document.getElementById('contractAiInputArea');
  area.style.display=area.style.display==='none'?'block':'none';
}

function autoFillYear(){
  const bno=document.getElementById('mBusinessNo').value.trim();
  if(bno.length>=3&&!document.getElementById('mYear').value){
    document.getElementById('mYear').value=bno.slice(0,3);
  }
}
function fillProjectFormFromData(d){
  // Support both old (caseNo/name) and new (businessNo/projectName) formats
  const businessNo=d.businessNo||d.caseNo||'';
  const projectName=d.projectName||d.name||'';
  const year=d.year||(businessNo.length>=3?businessNo.slice(0,3):'');
  if(businessNo) document.getElementById('mBusinessNo').value=businessNo;
  if(projectName) document.getElementById('mProjectName').value=projectName;
  if(year) document.getElementById('mYear').value=year;
  if(d.client) document.getElementById('mClient').value=d.client;
  if(d.location) document.getElementById('mLocation').value=d.location;
  if(d.contractAmt) document.getElementById('mContractAmt').value=d.contractAmt;
  for(let i=1;i<=8;i++){
    if(d['p'+i+'_amt']) document.getElementById('mP'+i+'Amt').value=d['p'+i+'_amt'];
    if(d['p'+i+'_date']) document.getElementById('mP'+i+'Date').value=d['p'+i+'_date'];
    if(d['p'+i+'_method']) document.getElementById('mP'+i+'Method').value=d['p'+i+'_method'];
  }
  if(d.subcontractor) document.getElementById('mSub').value=d.subcontractor;
}

function applyContractAiJson(){
  try{
    const txt=document.getElementById('contractAiJson').value.trim();
    const d=JSON.parse(txt);
    fillProjectFormFromData(d);
    toast('AI辨識資料已填入，請確認','success');
  }catch(e){toast('JSON 格式錯誤：'+e.message,'error');}
}

async function handleContractUpload(file,editIdx){
  if(!file)return;
  const ext=file.name.split('.').pop().toLowerCase();
  if(ext!=='docx'&&ext!=='doc'){toast('請上傳 .doc 或 .docx 檔案','error');return;}
  const status=document.getElementById('contractUploadStatus');
  status.innerHTML='<span style="color:var(--accent)">⏳ 解析中...</span>';
  try{
    const arrayBuffer=await file.arrayBuffer();
    let text='';
    if(ext==='docx'){const result=await mammoth.extractRawText({arrayBuffer});text=result.value;}
    else{const bytes=new Uint8Array(arrayBuffer);const d16=new TextDecoder('utf-16le',{fatal:false});text=d16.decode(bytes);if(!/[\u4e00-\u9fff]{5,}/.test(text)){const d5=new TextDecoder('big5',{fatal:false});text=d5.decode(bytes);}}
    const d=parseContractText(text);
    fillProjectFormFromData(d);
    status.innerHTML='<span style="color:var(--success)">✓ 已解析 '+file.name+'</span>';
    toast('合約解析完成，請確認資料','success');
  }catch(e){
    status.innerHTML='<span style="color:var(--danger)">✗ 解析失敗</span>';
    toast('合約解析失敗：'+e.message,'error');
    console.error(e);
  }
}

function parseContractText(text){
  const d={};
  const full=text;

  // 案名 / 合約案名 / 工程名稱 / 計畫名稱 (案名)
  // Note: trailing /\s/ matches both \n and whitespace, so "合約案名: XXX" works
  // even if the label and value are on the same line followed by spaces.
  const caseMatch=full.match(/(?:合約案名|工程名稱|計畫名稱|專案名稱|案\s*名)[：:]\s*([^\r\n]+)/);
  if(caseMatch) d.projectName=caseMatch[1].trim();

  // 業務編號 (案號)
  const caseNoMatch=full.match(/(?:業務編號|案\s*號|合約編號|契約編號)[：:]\s*(\S+)/);
  if(caseNoMatch) d.businessNo=caseNoMatch[1].trim();

  // 年份 — priority order:
  //   1. Contract date at cover bottom ("中華民國 XXX 年 X 月 X 日") — use the LAST match,
  //      because that's the actual signing date which is the canonical year.
  //   2. Explicit "年份" / "年度" labels.
  //   3. "民國 XXX 年" anywhere.
  //   4. Fallback: first 3 chars of businessNo (only when it's purely numeric).
  function toRocYear(n){let y=parseInt(n);if(y>1911)y-=1911;return String(y);}
  const datesAtBottom = [...full.matchAll(/(?:中華)?民國\s*(\d{2,3})\s*年\s*\d{1,2}\s*月\s*\d{1,2}\s*日/g)];
  if(datesAtBottom.length){
    d.year=toRocYear(datesAtBottom[datesAtBottom.length-1][1]);
  } else {
    const yearMatch=full.match(/年\s*份[：:]\s*(\d{2,4})/)
      || full.match(/年\s*度[：:]\s*(\d{2,4})/)
      || full.match(/(?:中華)?民國\s*(\d{2,3})\s*年/)
      || full.match(/(\d{2,3})\s*年度/);
    if(yearMatch){
      d.year=toRocYear(yearMatch[1]);
    } else if(d.businessNo && /^\d{3,}/.test(d.businessNo)){
      d.year=d.businessNo.slice(0,3);
    }
  }

  // 委託人 (甲方/業主)
  const ownerMatch=full.match(/委託人\s+(.+?)\s+(?:負責人|[\(（]以下)/);
  if(ownerMatch) d.client=ownerMatch[1].replace(/\s+/g,'').trim();
  if(!d.client){
    const ownerMatch2=full.match(/甲\s*方[：:]\s*(.+?)(?:\r?\n)/);
    if(ownerMatch2) d.client=ownerMatch2[1].trim();
  }

  // 地點
  const siteMatch=full.match(/地段[、，]?\s*地號[：:]\s*(.+?)(?:\r?\n)/);
  if(siteMatch) d.location=siteMatch[1].trim();
  if(!d.location){
    const addrMatch=full.match(/地[點址][：:]\s*(.+?)(?:\r?\n)/);
    if(addrMatch) d.location=addrMatch[1].trim();
  }

  // 合約金額
  const totalMatch=full.match(/新台幣\s*([\d,]+)\s*元整/);
  if(totalMatch) d.contractAmt=parseInt(totalMatch[1].replace(/,/g,''));

  // 各期款項
  const numMap={'一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10};
  const periodLines=full.match(/[（(]?[一二三四五六七八九十]?\s*[)）]?\s*[、，]?\s*第[一二三四五六七八九十\d]+期.+/g)||[];
  const seenPeriods=new Set();
  for(const line of periodLines){
    const pMatch=line.match(/第([一二三四五六七八九十\d]+)期/);
    if(!pMatch)continue;
    const pNum=numMap[pMatch[1]]||parseInt(pMatch[1])||0;
    if(pNum===0||pNum>5||seenPeriods.has(pNum))continue;
    seenPeriods.add(pNum);
    const pctMatch=line.match(/(\d+)\s*%/);
    const pct=pctMatch?parseInt(pctMatch[1]):0;
    const amtMatch=line.match(/([\d,]+)\s*元/);
    let amt=0;
    if(amtMatch) amt=parseInt(amtMatch[1].replace(/,/g,''));
    else if(d.contractAmt&&pct) amt=Math.round(d.contractAmt*pct/100);
    if(amt) d['p'+pNum+'_amt']=amt;
    // Try to extract date from period line
    const dateInLine=line.match(/(\d{2,4})[\/\-\.年](\d{1,2})[\/\-\.月](\d{1,2})/);
    if(dateInLine){
      let y=parseInt(dateInLine[1]);if(y<200)y+=1911;
      d['p'+pNum+'_date']=`${y}-${String(dateInLine[2]).padStart(2,'0')}-${String(dateInLine[3]).padStart(2,'0')}`;
    }
  }

  // 複委託
  const subMatch=full.match(/複委託[：:]\s*(.+?)(?:\r?\n)/);
  if(subMatch) d.subcontractor=subMatch[1].trim();

  return d;
}

function showLinkedPayablesPopup(projectId){
  const linked=getLinkedPayables(projectId);
  const proj=DB.projects.find(p=>p.id===projectId);
  const total=linked.reduce((s,x)=>s+(x.amount||0),0);
  const catMap={subcontractor:'複委託',fixed:'固定開銷',equipment:'設備',misc:'雜支'};
  document.getElementById('modalContent').innerHTML=`
    <h3>關聯複委託費用 — ${proj?(proj.businessNo||'')+' '+(proj.projectName||''):'未知案件'}</h3>
    ${linked.length?`<div class="table-wrap"><table>
      <thead><tr><th>日期</th><th>廠商</th><th>說明</th><th class="text-right">金額</th><th>狀態</th></tr></thead>
      <tbody>${linked.map(p=>`<tr><td>${p.date||''}</td><td>${p.vendor||''}</td><td>${p.description||''}</td>
        <td class="text-right mono">${fmtMoney(p.amount)}</td>
        <td><span class="badge badge-${p.status==='paid'?'success':'warning'}">${p.status==='paid'?'已付':'待付'}</span></td></tr>`).join('')}</tbody>
      <tfoot><tr style="font-weight:700;background:#f1f5f9"><td colspan="3">合計</td><td class="text-right mono">${fmtMoney(total)}</td><td></td></tr></tfoot>
    </table></div>`:'<p style="color:var(--text-light);padding:20px;text-align:center">無關聯複委託費用</p>'}
    ${proj?`<div style="margin-top:16px;padding:16px;background:#f8fafc;border-radius:var(--radius);border:1px solid var(--border)">
      <h4 style="margin-bottom:8px;font-size:.9rem">案件損益概覽</h4>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;font-size:.85rem">
        <div><span style="color:var(--text-light)">合約金額</span><br><strong>${fmtMoney(proj.contractAmt)}</strong></div>
        <div><span style="color:var(--text-light)">已收款</span><br><strong style="color:var(--success)">${fmtMoney(calcReceived(proj))}</strong></div>
        <div><span style="color:var(--text-light)">複委託支出</span><br><strong style="color:var(--warning)">${fmtMoney(total)}</strong></div>
        <div><span style="color:var(--text-light)">淨利</span><br><strong style="color:${(proj.contractAmt||0)-total>=0?'var(--success)':'var(--danger)'}">${fmtMoney((proj.contractAmt||0)-total)}</strong></div>
      </div>
    </div>`:''}
    <div class="modal-actions"><button class="btn btn-outline" onclick="closeModal()">關閉</button></div>`;
  openModal();
}

// Show vendors from Excel import
function showVendorsPopup(projectId){
  const proj=DB.projects.find(p=>p.id===projectId);
  if(!proj || !proj.vendors || !proj.vendors.length){
    document.getElementById('modalContent').innerHTML=`<h3>無廠商資料</h3><p style="padding:20px;text-align:center;color:var(--text-light)">此案件無廠商支出資料</p><div class="modal-actions"><button class="btn btn-outline" onclick="closeModal()">關閉</button></div>`;
    openModal();
    return;
  }
  const vendors=proj.vendors;
  const total=vendors.reduce((s,x)=>s+(x.amount||0),0);
  document.getElementById('modalContent').innerHTML=`
    <h3>廠商支出明細 — ${proj.businessNo||''} ${proj.projectName||''}</h3>
    <div class="table-wrap"><table>
      <thead><tr><th>類別</th><th>廠商</th><th class="text-right">金額</th></tr></thead>
      <tbody>${vendors.map(v=>`<tr><td>${v.category||''}</td><td>${v.vendor||''}</td><td class="text-right mono">${fmtMoney(v.amount)}</td></tr>`).join('')}</tbody>
      <tfoot><tr style="font-weight:700;background:#f1f5f9"><td colspan="2">合計</td><td class="text-right mono">${fmtMoney(total)}</td></tr></tfoot>
    </table></div>
    <div style="margin-top:16px;padding:16px;background:#f8fafc;border-radius:var(--radius);border:1px solid var(--border)">
      <h4 style="margin-bottom:8px;font-size:.9rem">案件損益概覽</h4>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;font-size:.85rem">
        <div><span style="color:var(--text-light)">合約金額</span><br><strong>${fmtMoney(proj.contractAmt)}</strong></div>
        <div><span style="color:var(--text-light)">已收款</span><br><strong style="color:var(--success)">${fmtMoney(calcReceived(proj))}</strong></div>
        <div><span style="color:var(--text-light)">複委託支出</span><br><strong style="color:var(--warning)">${fmtMoney(total)}</strong></div>
        <div><span style="color:var(--text-light)">淨利</span><br><strong style="color:${(proj.contractAmt||0)-total>=0?'var(--success)':'var(--danger)'}">${fmtMoney((proj.contractAmt||0)-total)}</strong></div>
      </div>
    </div>
    <div class="modal-actions"><button class="btn btn-outline" onclick="closeModal()">關閉</button></div>`;
  openModal();
}

function saveProject(idx){
  const businessNo=document.getElementById('mBusinessNo').value.trim();
  const year=document.getElementById('mYear').value.trim()||(businessNo.length>=3?businessNo.slice(0,3):'');
  const obj={
    id:idx!=null?DB.projects[idx].id:uid(),
    year:year,
    businessNo:businessNo,
    projectName:document.getElementById('mProjectName').value,
    client:document.getElementById('mClient').value,
    location:document.getElementById('mLocation').value,
    contractAmt:Number(document.getElementById('mContractAmt').value)||0,
    subcontractor:document.getElementById('mSub').value,
  };
  for(let i=1;i<=5;i++){
    obj['p'+i+'_amt']=Number(document.getElementById('mP'+i+'Amt').value)||0;
    obj['p'+i+'_date']=document.getElementById('mP'+i+'Date').value;
    obj['p'+i+'_method']=document.getElementById('mP'+i+'Method').value;
  }
  if(idx!=null)DB.projects[idx]=obj;else DB.projects.push(obj);
  saveData();closeModal();renderProjects();toast(idx!=null?'案件已更新':'案件已新增');
}
function editProject(idx){openProjectModal(idx)}
function deleteProject(idx){if(confirm('確定刪除此案件？')){DB.projects.splice(idx,1);saveData();renderProjects();toast('已刪除','info')}}

// ===== SUBCONTRACTOR HELPERS =====
function getSubcontractorCostForProject(p){
  // First check vendors array (from Excel import)
  if(p.vendors && p.vendors.length){
    return p.vendors.reduce((s,x)=>s+(x.amount||0),0);
  }
  // Fallback to linked payables with category=subcontractor
  const linked=DB.payables.filter(x=>x.projectId===p.id&&x.category==='subcontractor');
  if(linked.length)return linked.reduce((s,x)=>s+(x.amount||0),0);
  return 0;
}

// ===== SUBCONTRACTORS PAGE =====
let subView='project';
function switchSubView(view){
  subView=view;
  document.querySelectorAll('#page-subcontractors .sub-tab').forEach(t=>t.classList.toggle('active',t.dataset.subview===view));
  renderSubcontractors();
}

// One-click: add placeholder vendor entries (vendor="(待填)", amount=0) for every
// (project, category) combination that doesn't already have an entry. Useful for
// bootstrapping the subcontractor matrix so user can edit cell-by-cell without
// having to upload contracts first.
const DEFAULT_SUB_CATS = ['結構/鑽探','水電/消防','跑照/3D','測量/建築線','綠建築/估算','水保/大地','監造'];
function initAllSubcontractors(){
  // First pass: count what would be added (without mutating).
  let wouldAdd = 0;
  let projectsToTouch = 0;
  DB.projects.forEach(p => {
    const existing = p.vendors || [];
    let touchedThis = false;
    DEFAULT_SUB_CATS.forEach(cat => {
      if(!existing.some(v => v.category === cat)){
        wouldAdd++;
        touchedThis = true;
      }
    });
    if(touchedThis) projectsToTouch++;
  });
  if(wouldAdd === 0){
    toast('所有案件都已有完整副委託欄位，無需預填','info');
    return;
  }
  if(!confirm(`將為 ${projectsToTouch} 個案件補上 ${wouldAdd} 筆空白副委託欄位（廠商=「(待填)」，金額=0）。\n之後可以逐格點開編輯成實際資料。\n\n繼續？`)) return;

  // Second pass: actually mutate.
  DB.projects.forEach(p => {
    if(!p.vendors) p.vendors = [];
    DEFAULT_SUB_CATS.forEach(cat => {
      if(!p.vendors.some(v => v.category === cat)){
        p.vendors.push({category: cat, vendor: '(待填)', amount: 0});
      }
    });
  });
  saveData();
  renderSubcontractors();
  toast(`已預填 ${wouldAdd} 筆空白副委託到 ${projectsToTouch} 個案件`);
}

function renderSubcontractors(){
  // Populate year filter
  const yearSet=new Set();
  DB.projects.forEach(p=>{if(p.year)yearSet.add(p.year)});
  const yearFilter=document.getElementById('subYearFilter');
  const curYearVal=yearFilter.value;
  yearFilter.innerHTML='<option value="">全部年份</option>'+[...yearSet].sort().reverse().map(y=>`<option value="${y}">民國 ${y} 年</option>`).join('');
  yearFilter.value=curYearVal;
  const yf=yearFilter.value;

  // Gather all subcontractor payables (status info comes only from this side)
  const subPayables=DB.payables.filter(p=>p.category==='subcontractor');
  const paidSub=subPayables.filter(p=>p.status==='paid').reduce((s,p)=>s+(p.amount||0),0);

  // 複委託總額 — vendors-first / payables-fallback, summed across all projects.
  // This matches what 案件收支 shows in 複委託支出 column.
  const totalSub=DB.projects.reduce((s,p)=>s+getSubcontractorCostForProject(p),0);
  const pendingSub=totalSub-paidSub;

  // 關聯案件數 — count projects that have ANY subcontractor record (vendors OR payables)
  const linkedProjIds=new Set();
  DB.projects.forEach(p=>{
    const hasVendors=(p.vendors||[]).some(v=>(v.amount||0)>0);
    const hasPayables=DB.payables.some(x=>x.projectId===p.id && x.category==='subcontractor');
    if(hasVendors||hasPayables||p.subcontractor) linkedProjIds.add(p.id);
  });

  document.getElementById('subStats').innerHTML=`
    <div class="stat-card accent"><div class="label">複委託總額</div><div class="value">${fmtMoney(totalSub)}</div><div class="sub">${subPayables.length} 筆帳款</div></div>
    <div class="stat-card success"><div class="label">已付</div><div class="value">${fmtMoney(paidSub)}</div></div>
    <div class="stat-card warning"><div class="label">待付</div><div class="value">${fmtMoney(pendingSub)}</div></div>
    <div class="stat-card" style="border-left:4px solid var(--accent)"><div class="label">關聯案件數</div><div class="value">${linkedProjIds.size}</div></div>
  `;

  const content=document.getElementById('subContent');
  if(subView==='vendor')renderSubByVendor(content,subPayables);
  else if(subView==='project')renderSubByProject(content,subPayables);
  else if(subView==='category')renderSubByCategory(content,subPayables);
  else if(subView==='profit')renderSubProfitAnalysis(content);
  
  // Add click handler for vendor cells using event delegation
  document.getElementById('subContent').addEventListener('click', function(e) {
    const cell = e.target.closest('.vendor-cell');
    if (cell) {
      const pid = cell.dataset.pid;
      const cat = decodeURIComponent(cell.dataset.cat);
      console.log('Click on vendor cell:', pid, cat);
      editVendor(pid, cat);
    }
  });
}

function renderSubByVendor(el,subPayables){
  // Group by vendor (from payables + project subcontractor field)
  const vendorMap={};
  subPayables.forEach(p=>{
    const v=p.vendor||'未指定';
    if(!vendorMap[v])vendorMap[v]={total:0,paid:0,pending:0,projects:{}};
    vendorMap[v].total+=p.amount||0;
    if(p.status==='paid')vendorMap[v].paid+=p.amount||0;else vendorMap[v].pending+=p.amount||0;
    if(p.projectId){
      const proj=DB.projects.find(x=>x.id===p.projectId);
      if(proj){
        if(!vendorMap[v].projects[p.projectId])vendorMap[v].projects[p.projectId]={proj,amount:0,status:p.status};
        vendorMap[v].projects[p.projectId].amount+=p.amount||0;
      }
    }
  });
  // Also add projects with subcontractor name but no payable
  DB.projects.forEach(p=>{
    if(!p.subcontractor)return;
    const v=p.subcontractor;
    if(!vendorMap[v])vendorMap[v]={total:0,paid:0,pending:0,projects:{}};
    if(!vendorMap[v].projects[p.id]){
      vendorMap[v].projects[p.id]={proj:p,amount:0,status:'none'};
    }
  });

  const vendors=Object.entries(vendorMap).sort((a,b)=>b[1].total-a[1].total);
  let html='<div class="table-wrap"><table><thead><tr><th>廠商</th><th class="text-right">總金額</th><th class="text-right">已付</th><th class="text-right">待付</th><th class="text-center">關聯案件數</th><th>展開</th></tr></thead><tbody>';
  vendors.forEach(([v,data],i)=>{
    const projCount=Object.keys(data.projects).length;
    html+=`<tr style="cursor:pointer;font-weight:600" onclick="document.getElementById('subVendorDetail_${i}').style.display=document.getElementById('subVendorDetail_${i}').style.display==='none'?'':'none'">
      <td>${v}</td><td class="text-right mono">${fmtMoney(data.total)}</td><td class="text-right mono" style="color:var(--success)">${fmtMoney(data.paid)}</td>
      <td class="text-right mono" style="color:var(--warning)">${fmtMoney(data.pending)}</td><td class="text-center">${projCount}</td><td>▶</td></tr>`;
    html+=`<tr id="subVendorDetail_${i}" style="display:none"><td colspan="6" style="padding:0"><table style="background:#f8fafc"><thead><tr><th>業務編號</th><th>案名</th><th class="text-right">複委託金額</th><th>付款狀態</th></tr></thead><tbody>`;
    Object.values(data.projects).forEach(({proj,amount,status})=>{
      const badge=status==='paid'?'<span class="badge badge-success">已付</span>':status==='pending'?'<span class="badge badge-warning">待付</span>':'<span class="badge badge-danger">未建立帳款</span>';
      html+=`<tr><td>${proj.businessNo||''}</td><td>${proj.projectName||''}</td><td class="text-right mono">${amount?fmtMoney(amount):'-'}</td><td>${badge}</td></tr>`;
    });
    html+='</tbody></table></td></tr>';
  });
  html+='</tbody></table></div>';
  el.innerHTML=html;
}

function renderSubByProject(el,subPayables){
  const cats=['結構/鑽探','水電/消防','跑照/3D','測量/建築線','綠建築/估算','水保/大地','監造'];
  const catColors={'結構/鑽探':'#3b82f6','水電/消防':'#8b5cf6','跑照/3D':'#f59e0b','測量/建築線':'#10b981','綠建築/估算':'#ec4899','水保/大地':'#6366f1','監造':'#14b8a6'};
  const yf=document.getElementById('subYearFilter').value;
  
  let html=`<div style="margin-bottom:20px;padding:16px;background:linear-gradient(135deg,#1e3a5f,#1a2744);border-radius:12px;color:#fff">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div>
        <h3 style="margin:0;font-size:1.1rem">📊 複委託支出明細</h3>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:.85rem">依案件分類顯示各類別廠商支出</p>
      </div>
    </div>
  </div>
  <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">`;
  
  // Add legend
  cats.forEach(cat=>{
    html+=`<span style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:${catColors[cat]}20;border:1px solid ${catColors[cat]}40;border-radius:20px;font-size:.75rem;color:${catColors[cat]}">
      <span style="width:8px;height:8px;background:${catColors[cat]};border-radius:50%"></span>${cat.replace('/','/')}
    </span>`;
  });
  html+='</div>';
  
  // Add "新增複委託" / "預填" buttons
  html+=`<div style="margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
    <p style="font-size:.8rem;color:#64748b;margin:0">💡 點擊任何儲存格可編輯或新增複委託資料</p>
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary btn-sm" onclick="showAddVendorModal()">＋ 新增複委託</button>
    </div>
  </div>`;
  
  html+='<div class="table-wrap" style="overflow-x:auto"><table style="min-width:1200px"><thead><tr style="background:#f8fafc"><th style="padding:12px 8px;text-align:left;font-weight:600;font-size:.8rem;color:#475569">業務編號</th><th style="padding:12px 8px;text-align:left;font-weight:600;font-size:.8rem;color:#475569">案名</th>';
  
  cats.forEach(cat=>{
    html+=`<th style="padding:12px 6px;text-align:right;font-weight:600;font-size:.75rem;color:${catColors[cat]};white-space:nowrap">${cat.replace('/','<br>/')}</th>`;
  });
  html+='<th style="padding:12px 8px;text-align:right;font-weight:600;font-size:.8rem;color:#dc2626">合計</th><th style="padding:12px 8px;text-align:right;font-weight:600;font-size:.8rem;color:#059669">合約金額</th><th style="padding:12px 8px;text-align:right;font-weight:600;font-size:.8rem;color:#7c3aed">佔比</th></tr></thead><tbody>';
  
  // Show ALL projects so user can fill in subcontractor data even if they haven't
  // uploaded a contract or quotation. Empty cells render as "—" and are clickable
  // to open the inline edit dialog.
  let projectsWithVendors = DB.projects.slice();
  if(yf) projectsWithVendors = projectsWithVendors.filter(p => p.year === yf);
  // Sort: year desc, businessNo asc — newest first, then numeric
  projectsWithVendors.sort((a, b) => {
    const ya = a.year || '', yb = b.year || '';
    if (ya !== yb) return yb.localeCompare(ya);
    return (a.businessNo || '').localeCompare(b.businessNo || '');
  });

  projectsWithVendors.forEach(p => {
    const vendors = p.vendors || [];
    const catAmts = cats.map(cat => {
      const v = vendors.find(x => x.category === cat);
      return v ? v : null;
    });
    // 合計 uses the unified vendors-first / payables-fallback calc so projects that
    // have only linked subcontractor payables (no p.vendors) still show their total
    // here (matches what 案件收支 shows in 複委託費用 column).
    const total = getSubcontractorCostForProject(p);
    const pct = p.contractAmt ? (total / p.contractAmt * 100) : 0;
    
    html += `<tr style="border-bottom:1px solid #e2e8f0">
      <td style="padding:10px 8px;font-weight:500;color:#1e293b">${p.year||''} ${p.businessNo || ''}</td>
      <td style="padding:10px 8px;color:#475569;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${p.projectName||''}">${p.projectName || ''}</td>`;
    
    catAmts.forEach((a,idx) => {
      const cat = cats[idx];
      const catEncoded = encodeURIComponent(cat);
      // 只在「有廠商且金額非 0」時顯示內容，其餘一律顯示可點擊的「-」(不再顯示 (待填)/0 佔位)
      if(a && a.vendor && (a.amount||0)!==0){
        html+=`<td class="vendor-cell" style="padding:8px 6px;text-align:right;cursor:pointer" data-pid="${p.id}" data-cat="${catEncoded}" title="點擊編輯 ${cat}">
          <div style="font-size:.9rem;color:${catColors[cat]};font-weight:600;white-space:nowrap" title="${a.vendor}: ${fmtMoney(a.amount)}">${a.vendor.substring(0,8)}</div>
          <div style="font-size:.92rem;font-weight:700;color:#334155">${fmtMoney(a.amount)}</div>
        </td>`;
      }else{
        html+=`<td class="vendor-cell" style="padding:8px 6px;text-align:right;color:#cbd5e1;cursor:pointer" data-pid="${p.id}" data-cat="${catEncoded}" title="點擊新增 ${cat}">-</td>`;
      }
    });
    
    // Note when the row's 合計 comes from linked payables (not vendor cells), so the
    // user knows why cells show "-" but 合計 is non-zero.
    const vendorsTotal = vendors.reduce((s, v) => s + (v.amount || 0), 0);
    const totalNote = (total > 0 && vendorsTotal === 0) ? '（來自應付帳款）' : '';
    const totalTitle = totalNote ? `${fmtMoney(total)} 來自此案件關聯的應付帳款（subcontractor 類），非從報價單匯入的副委託金額` : '';
    html+=`<td style="padding:10px 8px;text-align:right;font-weight:700;color:#dc2626;background:#fef2f2" title="${totalTitle}">${fmtMoney(total)}${totalNote?'<br><span style=\"font-size:.6rem;font-weight:400;color:#7c2d12\">'+totalNote+'</span>':''}</td>
      <td style="padding:10px 8px;text-align:right;color:#059669;font-weight:500">${fmtMoney(p.contractAmt)}</td>
      <td style="padding:10px 8px;text-align:right"><span style="padding:2px 8px;background:${pct>50?'#fef2f2':pct>30?'#fffbeb':'#f0fdf4'};color:${pct>50?'#dc2626':pct>30?'#d97706':'#059669'};border-radius:4px;font-size:.75rem;font-weight:600">${pct > 0 ? pct.toFixed(1) + '%' : '-'}</span></td></tr>`;
  });
  
  const totalByCat = cats.map(cat =>
    projectsWithVendors.reduce((s, p) => {
      const v = (p.vendors || []).find(x => x.category === cat);
      return s + (v ? v.amount : 0);
    }, 0)
  );
  // grandTotal: same vendors-first / payables-fallback as each row's 合計,
  // matching the 副委託費用 column total in the 案件收支 page.
  const grandTotal = projectsWithVendors.reduce(
    (s, p) => s + getSubcontractorCostForProject(p),
    0
  );
  const totalContract = projectsWithVendors.reduce((s, p) => s + (p.contractAmt || 0), 0);
  const totalPct = totalContract ? (grandTotal / totalContract * 100) : 0;
  
  html += `<tr style="background:linear-gradient(90deg,#f1f5f9,#e2e8f0);font-weight:700">
    <td colspan="2" style="padding:14px 8px;color:#1e293b;font-size:.9rem">💰 合計</td>
    ${totalByCat.map((t,idx) => `<td style="padding:12px 6px;text-align:right">
      <span style="color:${catColors[cats[idx]]};font-weight:600">${fmtMoney(t)}</span>
    </td>`).join('')}
    <td style="padding:14px 8px;text-align:right;color:#dc2626;font-size:1rem">${fmtMoney(grandTotal)}</td>
    <td style="padding:14px 8px;text-align:right;color:#059669;font-size:1rem">${fmtMoney(totalContract)}</td>
    <td style="padding:14px 8px;text-align:right"><span style="padding:4px 12px;background:#7c3aed20;color:#7c3aed;border-radius:6px;font-weight:700">${totalPct.toFixed(1)}%</span></td>
  </tr>`;
  
  html += '</tbody></table></div>';
  el.innerHTML = html;
}

function renderSubByCategory(el,subPayables){
  const CATEGORIES=['結構設計','水電設計','消防設計','鑽探','測量','綠建築','其他'];
  // Group payables by subCategory (if set), otherwise '其他'
  const catMap={};
  CATEGORIES.forEach(c=>catMap[c]=0);
  subPayables.forEach(p=>{
    const cat=p.subCategory||'其他';
    if(!catMap[cat])catMap[cat]=0;
    catMap[cat]+=p.amount||0;
  });
  const total=subPayables.reduce((s,p)=>s+(p.amount||0),0);

  let html='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:20px">';
  Object.entries(catMap).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]).forEach(([cat,amt])=>{
    const pct=total?(amt/total*100):0;
    html+=`<div class="stat-card"><div class="label">${cat}</div><div class="value">${fmtMoney(amt)}</div><div class="sub">${pct.toFixed(1)}%</div></div>`;
  });
  html+='</div>';

  html+=`<div style="margin-bottom:16px;padding:16px;background:#f8fafc;border-radius:var(--radius);border:1px solid var(--border)">
    <p style="font-size:.85rem;color:var(--text-light);margin-bottom:8px">💡 在「應付帳款」中編輯複委託項目時，可設定子類別（結構設計、水電設計、消防設計、鑽探、測量、綠建築等）</p>
    <p style="font-size:.85rem;color:var(--text-light)">子類別會自動顯示在此分類統計中。</p>
  </div>`;

  html+='<div class="table-wrap"><table><thead><tr><th>類別</th><th class="text-right">金額</th><th class="text-right">佔比</th><th class="text-center">筆數</th></tr></thead><tbody>';
  Object.entries(catMap).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]).forEach(([cat,amt])=>{
    const count=subPayables.filter(p=>(p.subCategory||'其他')===cat).length;
    html+=`<tr><td>${cat}</td><td class="text-right mono">${fmtMoney(amt)}</td><td class="text-right mono">${total?(amt/total*100).toFixed(1)+'%':'-'}</td><td class="text-center">${count}</td></tr>`;
  });
  html+='</tbody></table></div>';
  el.innerHTML=html;
}

function renderSubProfitAnalysis(el){
  // All projects with contract amount or subcontractor cost
  let rows=DB.projects.filter(p=>p.contractAmt||p.subcontractor||getSubcontractorCostForProject(p)>0).map(p=>{
    const received=calcReceived(p);
    const subCost=getSubcontractorCostForProject(p);
    const netProfit=received-subCost;
    const profitRate=p.contractAmt?(netProfit/p.contractAmt*100):0;
    return {proj:p,received,subCost,netProfit,profitRate};
  });
  // Sort by profitRate ascending (worst first)
  rows.sort((a,b)=>a.profitRate-b.profitRate);

  const totContract=rows.reduce((s,r)=>s+(r.proj.contractAmt||0),0);
  const totReceived=rows.reduce((s,r)=>s+r.received,0);
  const totSubCost=rows.reduce((s,r)=>s+r.subCost,0);
  const totNetProfit=totReceived-totSubCost;
  const totProfitRate=totContract?(totNetProfit/totContract*100):0;

  let html=`<div style="margin-bottom:16px;padding:16px;background:#f8fafc;border-radius:var(--radius);border:1px solid var(--border);display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px">
    <div><span style="color:var(--text-light);font-size:.8rem">合約總額</span><br><strong>${fmtMoney(totContract)}</strong></div>
    <div><span style="color:var(--text-light);font-size:.8rem">已收款</span><br><strong style="color:var(--success)">${fmtMoney(totReceived)}</strong></div>
    <div><span style="color:var(--text-light);font-size:.8rem">複委託支出</span><br><strong style="color:var(--warning)">${fmtMoney(totSubCost)}</strong></div>
    <div><span style="color:var(--text-light);font-size:.8rem">純利合計</span><br><strong style="color:${totNetProfit>=0?'var(--success)':'var(--danger)'}">${fmtMoney(totNetProfit)}</strong></div>
    <div><span style="color:var(--text-light);font-size:.8rem">平均純利率</span><br><strong style="color:${totProfitRate>=0?'var(--success)':'var(--danger)'}">${totProfitRate.toFixed(1)}%</strong></div>
  </div>`;

  html+='<div class="table-wrap"><table><thead><tr><th>業務編號</th><th>案名</th><th class="text-right">合約金額</th><th class="text-right">已收款</th><th class="text-right">複委託支出</th><th class="text-right">純利</th><th class="text-right">純利率</th></tr></thead><tbody>';
  rows.forEach(r=>{
    const p=r.proj;
    html+=`<tr><td>${p.businessNo||''}</td><td>${p.projectName||''}</td>
      <td class="text-right mono">${fmtMoney(p.contractAmt)}</td>
      <td class="text-right mono">${fmtMoney(r.received)}</td>
      <td class="text-right mono">${r.subCost?fmtMoney(r.subCost):'<span style="color:var(--text-light)">-</span>'}</td>
      <td class="text-right mono" style="font-weight:600;color:${r.netProfit>=0?'var(--success)':'var(--danger)'}">${fmtMoney(r.netProfit)}</td>
      <td class="text-right mono" style="color:${r.profitRate>=0?'var(--success)':'var(--danger)'}">${r.profitRate.toFixed(1)}%</td></tr>`;
  });
  html+=`</tbody><tfoot><tr style="font-weight:700;background:#f1f5f9"><td colspan="2">合計</td>
    <td class="text-right mono">${fmtMoney(totContract)}</td><td class="text-right mono">${fmtMoney(totReceived)}</td>
    <td class="text-right mono">${fmtMoney(totSubCost)}</td>
    <td class="text-right mono" style="color:${totNetProfit>=0?'var(--success)':'var(--danger)'}">${fmtMoney(totNetProfit)}</td>
    <td class="text-right mono" style="color:${totProfitRate>=0?'var(--success)':'var(--danger)'}">${totProfitRate.toFixed(1)}%</td>
  </tr></tfoot></table></div>`;
  el.innerHTML=html;
}

// ===== PAYABLES =====
let payableFilter='all';
function switchPayableTab(tab){
  payableFilter=tab;
  document.querySelectorAll('#page-payables .sub-tab').forEach(t=>t.classList.toggle('active',t.dataset.subtab===tab));
  renderPayables();
}
function renderPayables(){
  // Populate month filter
  const ms=getMonths();
  const sel=document.getElementById('payMonth');
  const curVal=sel.value;
  sel.innerHTML='<option value="">全部月份</option>'+ms.map(function(m){return '<option value="'+m+'">'+m+'</option>';}).join('');
  sel.value=curVal;

  const catMap={subcontractor:'複委託',fixed:'固定開銷',equipment:'設備',misc:'雜支'};
  const monthFilter=sel.value;
  const filtered=DB.payables.filter(p=>{
    if(payableFilter!=='all'&&p.category!==payableFilter)return false;
    if(monthFilter&&monthKey(p.date)!==monthFilter)return false;
    return true;
  });

  let totalAmt=0,totalTax=0,pendingAmt=0;
  document.getElementById('payTable').innerHTML=filtered.length?filtered.map((p,idx)=>{
    const realIdx=DB.payables.indexOf(p);
    totalAmt+=p.amount||0;totalTax+=p.tax||0;
    if(p.status==='pending')pendingAmt+=p.amount||0;
    return `<tr>
      <td>${p.date||''}</td><td>${p.vendor||''}</td><td>${p.description||''}</td>
      <td><span class="badge badge-info">${catMap[p.category]||p.category||''}</span></td>
      <td style="font-size:.8rem">${(()=>{if(!p.projectId)return'-';const proj=DB.projects.find(x=>x.id===p.projectId);return proj?(proj.businessNo||'')+' '+(proj.projectName||''):'-';})()}</td>
      <td class="text-right mono">${fmtMoney(p.amount)}</td><td class="text-right mono">${fmtMoney(p.tax)}</td>
      <td><span class="badge badge-${p.status==='paid'?'success':'warning'}" style="cursor:pointer" onclick="togglePayStatus(${realIdx})">${p.status==='paid'?'已付':'待付'}</span></td>
      <td><button class="btn btn-outline btn-sm" onclick="editPayable(${realIdx})">✏️</button> <button class="btn btn-danger btn-sm" onclick="deletePayable(${realIdx})">✕</button></td>
    </tr>`;
  }).join(''):'<tr><td colspan="9" style="text-align:center;padding:24px;color:var(--text-light)">無資料</td></tr>';

  document.getElementById('payTfoot').innerHTML=`<tr style="font-weight:700;background:#f1f5f9"><td colspan="5">合計</td><td class="text-right mono">${fmtMoney(totalAmt)}</td><td class="text-right mono">${fmtMoney(totalTax)}</td><td colspan="2"></td></tr>`;

  document.getElementById('payStats').innerHTML=`
    <div class="stat-card accent"><div class="label">總筆數</div><div class="value">${filtered.length}</div></div>
    <div class="stat-card warning"><div class="label">總金額</div><div class="value">${fmtMoney(totalAmt)}</div></div>
    <div class="stat-card danger"><div class="label">待付金額</div><div class="value">${fmtMoney(pendingAmt)}</div></div>
    <div class="stat-card success"><div class="label">已付金額</div><div class="value">${fmtMoney(totalAmt-pendingAmt)}</div></div>
  `;
}

function togglePayStatus(idx){DB.payables[idx].status=DB.payables[idx].status==='paid'?'pending':'paid';saveData();renderPayables()}
function deletePayable(idx){if(confirm('確定刪除？')){DB.payables.splice(idx,1);saveData();renderPayables();toast('已刪除','info')}}

function openPayableModal(idx){
  const p=idx!=null?DB.payables[idx]:{status:'pending',category:'misc'};
  const isEdit=idx!=null;
  const showProject=p.category==='subcontractor';
  document.getElementById('modalContent').innerHTML=`
    <h3>${isEdit?'編輯應付帳款':'新增應付帳款'}</h3>
    <div class="form-row">
      <div class="form-group"><label>日期</label><input type="date" id="mPayDate" value="${p.date||new Date().toISOString().slice(0,10)}"></div>
      <div class="form-group"><label>廠商/對象</label><input id="mPayVendor" value="${p.vendor||''}" oninput="tryAutoLinkProject()"></div>
    </div>
    <div class="form-group"><label>說明</label><input id="mPayDesc" value="${p.description||''}" oninput="tryAutoLinkProject()"></div>
    <div class="form-row">
      <div class="form-group"><label>類別</label><select id="mPayCat" onchange="toggleProjectLink()"><option value="subcontractor" ${p.category==='subcontractor'?'selected':''}>複委託</option><option value="fixed" ${p.category==='fixed'?'selected':''}>固定開銷</option><option value="equipment" ${p.category==='equipment'?'selected':''}>設備</option><option value="misc" ${p.category==='misc'?'selected':''}>雜支</option></select></div>
      <div class="form-group"><label>狀態</label><select id="mPayStatus"><option value="pending" ${p.status==='pending'?'selected':''}>待付</option><option value="paid" ${p.status==='paid'?'selected':''}>已付</option></select></div>
    </div>
    <div class="form-group" id="projectLinkGroup" style="display:${showProject?'block':'none'}">
      <label>關聯案件</label>
      <select id="mPayProjectId">${projectOptionsHTML(p.projectId||'')}</select>
    </div>
    <div class="form-group" id="subCategoryGroup" style="display:${showProject?'block':'none'}">
      <label>複委託子類別</label>
      <select id="mPaySubCat">
        <option value="">—</option>
        <option value="結構設計" ${p.subCategory==='結構設計'?'selected':''}>結構設計</option>
        <option value="水電設計" ${p.subCategory==='水電設計'?'selected':''}>水電設計</option>
        <option value="消防設計" ${p.subCategory==='消防設計'?'selected':''}>消防設計</option>
        <option value="鑽探" ${p.subCategory==='鑽探'?'selected':''}>鑽探</option>
        <option value="測量" ${p.subCategory==='測量'?'selected':''}>測量</option>
        <option value="綠建築" ${p.subCategory==='綠建築'?'selected':''}>綠建築</option>
        <option value="其他" ${p.subCategory==='其他'?'selected':''}>其他</option>
      </select>
    </div>
    <div class="form-row">
      <div class="form-group"><label>金額</label><input type="number" id="mPayAmt" value="${p.amount||''}"></div>
      <div class="form-group"><label>稅額</label><input type="number" id="mPayTax" value="${p.tax||''}"></div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-outline" onclick="closeModal()">取消</button>
      <button class="btn btn-primary" onclick="savePayable(${idx!=null?idx:'null'})">${isEdit?'更新':'新增'}</button>
    </div>`;
  openModal();
  // Auto-link on new subcontractor payable
  if(!isEdit&&p.category==='subcontractor')tryAutoLinkProject();
}
function toggleProjectLink(){
  const cat=document.getElementById('mPayCat').value;
  const show=cat==='subcontractor'?'block':'none';
  document.getElementById('projectLinkGroup').style.display=show;
  document.getElementById('subCategoryGroup').style.display=show;
  if(cat==='subcontractor')tryAutoLinkProject();
}
function tryAutoLinkProject(){
  const cat=document.getElementById('mPayCat').value;
  if(cat!=='subcontractor')return;
  const vendor=document.getElementById('mPayVendor').value;
  const desc=document.getElementById('mPayDesc').value;
  const matched=autoMatchProject(vendor,desc);
  if(matched){document.getElementById('mPayProjectId').value=matched;}
}
function editPayable(idx){openPayableModal(idx)}
function savePayable(idx){
  const cat=document.getElementById('mPayCat').value;
  const obj={
    id:idx!=null?DB.payables[idx].id:uid(),
    date:document.getElementById('mPayDate').value,
    vendor:document.getElementById('mPayVendor').value,
    description:document.getElementById('mPayDesc').value,
    category:cat,
    status:document.getElementById('mPayStatus').value,
    amount:Number(document.getElementById('mPayAmt').value)||0,
    tax:Number(document.getElementById('mPayTax').value)||0,
    projectId:cat==='subcontractor'?(document.getElementById('mPayProjectId').value||''):'',
    subCategory:cat==='subcontractor'?(document.getElementById('mPaySubCat')?.value||''):'',
  };
  if(idx!=null)DB.payables[idx]=obj;else DB.payables.push(obj);
  saveData();closeModal();renderPayables();toast(idx!=null?'已更新':'已新增');
}

// ===== PAYROLL =====
function renderPayroll(){
  const ms=getMonths();
  const sel=document.getElementById('salMonth');
  const curVal=sel.value;
  sel.innerHTML='<option value="">年度總覽</option>'+ms.map(m=>`<option value="${m}">${m}</option>`).join('');
  sel.value=curVal;

  const monthFilter=sel.value;
  const filtered=(monthFilter?DB.payroll.filter(p=>p.month===monthFilter):[...DB.payroll])
    .sort((a,b)=>(a.month||'').localeCompare(b.month||'')||(a.empName||'').localeCompare(b.empName||''));

  let tActualSal=0,tBase=0,tLaborRet=0,tSelfIns=0,tCompIns=0,tNetPaid=0;
  document.getElementById('salTable').innerHTML=filtered.length?filtered.map((p,idx)=>{
    const realIdx=DB.payroll.indexOf(p);
    const actualSalary=(p.baseSalary||0)+(p.overtime||0)+(p.mealAllowance||0)+(p.travelAllowance||0)+(p.bonus||0)+(p.holidayBonus||0)+(p.yearEndBonus||0);
    const laborRet=p.laborRetirement||0;
    const selfIns=(p.laborIns||0)+(p.healthIns||0);
    const compIns=(p.laborInsCompany||0)+(p.healthInsCompany||0);
    const netPaid=actualSalary-selfIns-(p.incomeTax||0)-(p.leaveDeduction||0)+laborRet+compIns;
    tActualSal+=actualSalary;tBase+=p.baseSalary||0;tLaborRet+=laborRet;tSelfIns+=selfIns;tCompIns+=compIns;tNetPaid+=netPaid;
    return `<tr>
      <td>${p.month||''}</td>
      <td>${p.empName||''}</td>
      <td class="text-right mono tip-cell">${fmtMoney(actualSalary)}<div class="tip-box">本薪: ${fmtMoney(p.baseSalary)}<br>加班費: ${fmtMoney(p.overtime)}<br>伙食津貼: ${fmtMoney(p.mealAllowance)}<br>獎金: ${fmtMoney((p.bonus||0)+(p.holidayBonus||0)+(p.yearEndBonus||0))}</div></td>
      <td class="text-right mono">${fmtMoney(p.baseSalary)}</td>
      <td class="text-right mono">${fmtMoney(laborRet)}</td>
      <td class="text-right mono tip-cell" style="color:var(--danger)">${fmtMoney(selfIns)}<div class="tip-box">勞保(自付): ${fmtMoney(p.laborIns)}<br>健保(自付): ${fmtMoney(p.healthIns)}</div></td>
      <td class="text-right mono tip-cell">${fmtMoney(compIns)}<div class="tip-box">勞保(公司): ${fmtMoney(p.laborInsCompany)}<br>健保(公司): ${fmtMoney(p.healthInsCompany)}</div></td>
      <td class="text-right mono" style="font-weight:600">${fmtMoney(netPaid)}</td>
      <td><button class="btn btn-outline btn-sm" onclick="editPayroll(${realIdx})">✏️</button> <button class="btn btn-danger btn-sm" onclick="deletePayroll(${realIdx})">✕</button></td>
    </tr>`;
  }).join(''):'<tr><td colspan="9" style="text-align:center;padding:24px;color:var(--text-light)">無資料</td></tr>';

  document.getElementById('salTfoot').innerHTML=filtered.length?`<tr style="font-weight:700;background:#f1f5f9"><td>合計</td><td></td>
    <td class="text-right mono">${fmtMoney(tActualSal)}</td>
    <td class="text-right mono">${fmtMoney(tBase)}</td>
    <td class="text-right mono">${fmtMoney(tLaborRet)}</td>
    <td class="text-right mono" style="color:var(--danger)">${fmtMoney(tSelfIns)}</td>
    <td class="text-right mono">${fmtMoney(tCompIns)}</td>
    <td class="text-right mono">${fmtMoney(tNetPaid)}</td>
    <td></td></tr>`:'';

  document.getElementById('salStats').innerHTML=`
    <div class="stat-card success"><div class="label">實際薪資總額</div><div class="value">${fmtMoney(tActualSal)}</div><div class="sub">${filtered.length} 筆</div></div>
    <div class="stat-card warning"><div class="label">勞健保自負額</div><div class="value">${fmtMoney(tSelfIns)}</div></div>
    <div class="stat-card accent"><div class="label">勞健保公司額</div><div class="value">${fmtMoney(tCompIns)}</div></div>
    <div class="stat-card danger"><div class="label">實付金額合計</div><div class="value">${fmtMoney(tNetPaid)}</div></div>
  `;
}

function openPayrollModal(idx){
  const p=idx!=null?DB.payroll[idx]:{};
  const isEdit=idx!=null;
  document.getElementById('modalContent').innerHTML=`
    <h3>${isEdit?'編輯薪資':'新增薪資'}</h3>
    <div class="form-row">
      <div class="form-group"><label>姓名</label><input id="mEmpName" value="${p.empName||''}"></div>
      <div class="form-group"><label>職稱</label><input id="mTitle" value="${p.title||''}"></div>
      <div class="form-group"><label>月份 (YYYY-MM)</label><input id="mSalMonth" value="${p.month||new Date().toISOString().slice(0,7)}" placeholder="2026-01"></div>
    </div>
    <h4 style="margin:16px 0 8px;color:var(--accent);font-size:.9rem">💰 收入項目</h4>
    <div class="form-row">
      <div class="form-group"><label>本薪</label><input type="number" id="mBase" value="${p.baseSalary||''}"></div>
      <div class="form-group"><label>加班費</label><input type="number" id="mOT" value="${p.overtime||''}"></div>
      <div class="form-group"><label>伙食津貼</label><input type="number" id="mMeal" value="${p.mealAllowance||''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>旅遊津貼</label><input type="number" id="mTravel" value="${p.travelAllowance||''}"></div>
      <div class="form-group"><label>專案/績效獎金</label><input type="number" id="mBonus" value="${p.bonus||''}"></div>
      <div class="form-group"><label>三節獎金</label><input type="number" id="mHolidayBonus" value="${p.holidayBonus||''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>年終獎金</label><input type="number" id="mYearEndBonus" value="${p.yearEndBonus||''}"></div>
    </div>
    <h4 style="margin:16px 0 8px;color:var(--danger);font-size:.9rem">➖ 扣除項目</h4>
    <div class="form-row">
      <div class="form-group"><label>勞保(自付額)</label><input type="number" id="mLabor" value="${p.laborIns||''}"></div>
      <div class="form-group"><label>健保(自付額)</label><input type="number" id="mHealth" value="${p.healthIns||''}"></div>
      <div class="form-group"><label>所得稅</label><input type="number" id="mIncomeTax" value="${p.incomeTax||''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>請假扣薪</label><input type="number" id="mLeaveDeduction" value="${p.leaveDeduction||''}"></div>
    </div>
    <h4 style="margin:16px 0 8px;color:var(--warning);font-size:.9rem">🏢 公司負擔</h4>
    <div class="form-row">
      <div class="form-group"><label>勞退6%</label><input type="number" id="mLaborRetirement" value="${p.laborRetirement||''}"></div>
      <div class="form-group"><label>勞保(公司代繳)</label><input type="number" id="mLaborInsCompany" value="${p.laborInsCompany||''}"></div>
      <div class="form-group"><label>健保(公司代繳)</label><input type="number" id="mHealthInsCompany" value="${p.healthInsCompany||''}"></div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-outline" onclick="closeModal()">取消</button>
      <button class="btn btn-primary" onclick="savePayroll(${idx!=null?idx:'null'})">${isEdit?'更新':'新增'}</button>
    </div>`;
  openModal();
}
function editPayroll(idx){openPayrollModal(idx)}
function deletePayroll(idx){if(confirm('確定刪除？')){DB.payroll.splice(idx,1);saveData();renderPayroll();toast('已刪除','info')}}
function savePayroll(idx){
  const v=id=>Number(document.getElementById(id).value)||0;
  const base=v('mBase'),ot=v('mOT'),meal=v('mMeal'),travel=v('mTravel'),bonus=v('mBonus'),
    holidayBonus=v('mHolidayBonus'),yearEndBonus=v('mYearEndBonus'),
    labor=v('mLabor'),health=v('mHealth'),tax=v('mIncomeTax'),leave=v('mLeaveDeduction'),
    laborRet=v('mLaborRetirement'),laborInsC=v('mLaborInsCompany'),healthInsC=v('mHealthInsCompany');
  const netPay=base+ot+meal+travel+bonus+holidayBonus+yearEndBonus-labor-health-tax-leave;
  const obj={
    id:idx!=null?DB.payroll[idx].id:uid(),
    empName:document.getElementById('mEmpName').value,
    title:document.getElementById('mTitle').value,
    month:document.getElementById('mSalMonth').value,
    baseSalary:base,overtime:ot,mealAllowance:meal,travelAllowance:travel,
    bonus,holidayBonus,yearEndBonus,
    laborIns:labor,healthIns:health,incomeTax:tax,leaveDeduction:leave,
    laborRetirement:laborRet,laborInsCompany:laborInsC,healthInsCompany:healthInsC,
    netPay
  };
  if(idx!=null)DB.payroll[idx]=obj;else DB.payroll.push(obj);
  saveData();closeModal();renderPayroll();toast(idx!=null?'已更新':'已新增');
}

// ===== PAYROLL BATCH & ANNUAL SUMMARY =====
function openPayrollBatch(){
  document.getElementById('modalContent').innerHTML=`
    <h3>📥 批量匯入薪資</h3>
    <div style="margin-bottom:12px">
      <h4 style="font-size:.9rem;margin-bottom:8px">方式一：上傳 Excel 檔案</h4>
      <p style="font-size:.8rem;color:var(--text-light);margin-bottom:8px">支援 .xls / .xlsx，自動辨識姓名、本薪、加班費、勞健保等欄位</p>
      <input type="file" id="payrollBatchFile" accept=".xls,.xlsx" multiple onchange="handlePayrollBatchExcelMulti(this);document.getElementById('payrollBatchFileLabel').textContent=this.files.length+' 個檔案已選擇'" style="display:none">
      <button class="btn btn-primary btn-sm" onclick="document.getElementById('payrollBatchFile').click()">📂 選擇檔案上傳</button>
      <span id="payrollBatchFileLabel" style="margin-left:8px;font-size:.85rem;color:var(--text-light)">未選擇檔案</span>
    </div>
    <hr style="border:none;border-top:1px solid var(--border);margin:16px 0">
    <div>
      <h4 style="font-size:.9rem;margin-bottom:8px">方式二：貼上 JSON 陣列</h4>
      <p style="font-size:.8rem;color:var(--text-light);margin-bottom:8px">格式：[{"empName":"王大明","month":"2026-01","baseSalary":40000,...}, ...]</p>
      <textarea id="payrollBatchJson" rows="8" style="width:100%;font-family:'SF Mono',monospace;font-size:.8rem;padding:8px;border:1px solid var(--border);border-radius:var(--radius)" placeholder='貼上 JSON 陣列...'></textarea>
      <div style="margin-top:8px;text-align:right"><button class="btn btn-primary btn-sm" onclick="importPayrollBatchJson()">匯入 JSON</button></div>
    </div>
    <div style="margin-top:12px">
      <button class="btn btn-outline" onclick="closeModal()">關閉</button>
    </div>`;
  openModal();
}

function handlePayrollBatchExcelMulti(input){
  const files=[...input.files];if(!files.length)return;
  let done=0;
  const allParsed=[];
  files.forEach(file=>{
    const reader=new FileReader();
    reader.onload=function(e){
      const wb=XLSX.read(new Uint8Array(e.target.result),{type:'array'});
      wb.SheetNames.forEach(sn=>{
        const ws=wb.Sheets[sn];
        const parsed=parsePayrollSheet(ws,sn);
        if(parsed.length)allParsed.push(...parsed);
      });
      done++;
      if(done===files.length){
        if(!allParsed.length){
          // Show debug info in modal
          let debugHtml='<h3>⚠️ 未偵測到薪資資料</h3><p>請確認檔案格式。以下為偵測到的工作表內容：</p>';
          files.forEach(f=>{
            try{
              const reader2=new FileReader();reader2.onload=function(e2){
                const wb2=XLSX.read(new Uint8Array(e2.target.result),{type:'array'});
                let info='';
                wb2.SheetNames.forEach(sn=>{
                  const ws2=wb2.Sheets[sn];
                  const rng=XLSX.utils.decode_range(ws2['!ref']||'A1');
                  const cv=(r,c)=>{const v=ws2[XLSX.utils.encode_cell({r,c})];return v?String(v.v).slice(0,15):''};
                  info+=`<div style="margin:8px 0"><strong>${sn}</strong> (${rng.e.r+1}行 × ${rng.e.c+1}欄)</div>`;
                  info+='<div style="font-size:.7rem;overflow:auto;max-height:150px;background:#f8fafc;padding:8px;border-radius:4px;font-family:monospace">';
                  for(let r=0;r<=Math.min(12,rng.e.r);r++){
                    const cells=[];for(let c=0;c<=Math.min(6,rng.e.c);c++)cells.push(cv(r,c));
                    if(cells.some(v=>v))info+='R'+r+': '+cells.join(' | ')+'<br>';
                  }
                  info+='</div>';
                });
                document.getElementById('modalContent').innerHTML=`<h3>⚠️ 未偵測到薪資資料</h3><p style="font-size:.85rem">解析器尋找包含「姓名」的列來辨識員工。以下為檔案前幾行內容：</p>${info}<div style="margin-top:12px"><button class="btn btn-outline" onclick="closeModal()">關閉</button></div>`;
              };reader2.readAsArrayBuffer(f);
            }catch(ex){}
          });
          return;
        }
        showPayrollBatchPreview(allParsed,files.length);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

function parsePayrollSheet(ws,sheetName){
  const range=XLSX.utils.decode_range(ws['!ref']);
  console.log('[PayrollParse] Sheet:',sheetName,'range:',ws['!ref'],'rows:',range.e.r,'cols:',range.e.c);
  const cell=(r,c)=>{const v=ws[XLSX.utils.encode_cell({r,c})];return v?v.v:''};
  const num=(r,c)=>Number(cell(r,c))||0;
  const str=(r,c)=>String(cell(r,c)).trim();
  const clean=s=>s.replace(/\s+/g,'');
  // Debug: print first 10 rows col 0-5
  for(let r=0;r<=Math.min(15,range.e.r);r++){
    const rv=[];for(let c=0;c<=Math.min(5,range.e.c);c++)rv.push(str(r,c));
    if(rv.some(v=>v))console.log('[PayrollParse] R'+r+':',JSON.stringify(rv));
  }
  
  // Step 1: Find all year boundaries (rows with "XXX年度")
  const yearBounds=[];
  for(let r=0;r<=range.e.r;r++){
    const v=String(cell(r,0));
    const m=v.match(/(\d{2,3})年度/);
    if(m)yearBounds.push({row:r,adYear:parseInt(m[1])+1911});
  }
  // Also check sheet name
  if(!yearBounds.length){
    const m=sheetName.match(/(\d{2,3})年度/);
    yearBounds.push({row:0,adYear:m?parseInt(m[1])+1911:new Date().getFullYear()});
  }
  
  function getYearForRow(r){
    let y=yearBounds[0]?.adYear||new Date().getFullYear();
    for(const yb of yearBounds){if(r>=yb.row)y=yb.adYear;else break}
    return y;
  }
  
  // Step 2: Find all employee blocks by scanning for "姓名" in col 0
  const blocks=[];
  for(let r=0;r<=range.e.r;r++){
    if(!clean(str(r,0)).includes('姓名'))continue;
    const name=str(r,1);
    if(!name||name==='合計'||name==='小計')continue;
    
    // Find 職稱 (row above)
    let title='';
    for(let rr=r-1;rr>=Math.max(0,r-3);rr--){
      if(clean(str(rr,0)).includes('職稱')){title=str(rr,1);break}
    }
    
    // Find data rows by scanning col 3 for labels (薪資/扣繳/加班費/伙食費/獎金)
    const dataRows={};
    for(let rr=r-3;rr<=r+5&&rr<=range.e.r;rr++){
      const label=clean(str(rr,3));
      if(label.includes('薪') && label.includes('資'))dataRows.salary=rr;
      else if(label.includes('扣') && label.includes('繳'))dataRows.deduct=rr;
      else if(label.includes('加班'))dataRows.overtime=rr;
      else if(label.includes('伙食'))dataRows.meal=rr;
      else if(label.includes('獎') && label.includes('金'))dataRows.bonus=rr;
    }
    
    // Find month header row (has "一月") to detect monthStartCol
    let monthStartCol=-1;
    for(let rr=r-3;rr<=r;rr++){
      for(let c=3;c<=range.e.c;c++){
        if(clean(str(rr,c)).includes('一月')){monthStartCol=c;break}
      }
      if(monthStartCol>=0)break;
    }
    if(monthStartCol<0)monthStartCol=4; // default fallback
    
    const adYear=getYearForRow(r);
    blocks.push({name,title,row:r,dataRows,monthStartCol,adYear});
  }
  
  console.log('[PayrollParse]',sheetName,'found',blocks.length,'employees:',blocks.map(b=>b.name+'('+b.adYear+')').join(', '));
  
  if(!blocks.length)return [];
  
  // Step 3: Extract monthly data for each employee
  const results=[];
  blocks.forEach(b=>{
    if(!b.dataRows.salary){console.log('[PayrollParse] SKIP',b.name,'no salary row');return}
    
    for(let m=0;m<12;m++){
      const col=b.monthStartCol+m;
      if(col>range.e.c)break;
      
      const base=num(b.dataRows.salary,col);
      const deduct=b.dataRows.deduct?num(b.dataRows.deduct,col):0;
      const ot=b.dataRows.overtime?num(b.dataRows.overtime,col):0;
      const meal=b.dataRows.meal?num(b.dataRows.meal,col):0;
      const bonus=b.dataRows.bonus?num(b.dataRows.bonus,col):0;
      
      // Skip months with zero data
      if(!base&&!ot&&!meal&&!bonus)continue;
      
      const monthStr=b.adYear+'-'+String(m+1).padStart(2,'0');
      const actualSalary=base+ot+meal+bonus;
      const netPay=actualSalary-deduct;
      
      results.push({
        empName:b.name,title:b.title,month:monthStr,
        baseSalary:base,overtime:ot,mealAllowance:meal,travelAllowance:0,
        bonus,holidayBonus:0,yearEndBonus:0,
        laborIns:0,healthIns:0,incomeTax:deduct,leaveDeduction:0,
        laborRetirement:0,laborInsCompany:0,healthInsCompany:0,
        netPay
      });
    }
  });
  
  console.log('[PayrollParse] Total records:',results.length);
  return results;
}

function showPayrollBatchPreview(records,fileCount){
  if(!records.length){toast('未偵測到薪資資料，請確認檔案格式','warning');return}
  // Group by employee for summary
  const empMap={};
  records.forEach(r=>{
    if(!empMap[r.empName])empMap[r.empName]={count:0,months:new Set()};
    empMap[r.empName].count++;empMap[r.empName].months.add(r.month);
  });
  const summaryHtml=Object.entries(empMap).map(([name,info])=>
    `<tr><td>${name}</td><td>${info.count} 筆</td><td>${info.months.size} 個月</td></tr>`
  ).join('');
  
  document.getElementById('modalContent').innerHTML=`
    <h3>📋 匯入預覽（${fileCount} 個檔案）</h3>
    <table style="width:100%;margin:12px 0"><thead><tr><th>姓名</th><th>筆數</th><th>月份數</th></tr></thead><tbody>${summaryHtml}</tbody></table>
    <p style="font-size:.85rem">共 <strong>${records.length}</strong> 筆薪資記錄，<strong>${Object.keys(empMap).length}</strong> 位員工</p>
    <div style="max-height:200px;overflow:auto;margin:12px 0;font-size:.75rem;border:1px solid var(--border);border-radius:var(--radius)">
      <table style="width:100%"><thead><tr style="position:sticky;top:0;background:#f1f5f9"><th>月份</th><th>姓名</th><th>本薪</th><th>加班</th><th>伙食</th><th>獎金</th><th>扣繳</th></tr></thead>
      <tbody>${records.slice(0,50).map(r=>`<tr><td>${r.month}</td><td>${r.empName}</td><td>${fmtMoney(r.baseSalary)}</td><td>${fmtMoney(r.overtime)}</td><td>${fmtMoney(r.mealAllowance)}</td><td>${fmtMoney(r.bonus)}</td><td>${fmtMoney(r.incomeTax)}</td></tr>`).join('')}
      ${records.length>50?`<tr><td colspan="7" style="text-align:center;color:var(--text-light)">...還有 ${records.length-50} 筆</td></tr>`:''}</tbody></table>
    </div>
    <div class="modal-actions">
      <button class="btn btn-outline" onclick="closeModal()">取消</button>
      <button class="btn btn-primary" onclick="confirmPayrollBatchImport()">確認匯入</button>
    </div>`;
  window._pendingPayrollImport=records;
  openModal();
}

function confirmPayrollBatchImport(){
  const records=window._pendingPayrollImport;if(!records)return;
  records.forEach(r=>{r.id=uid();DB.payroll.push(r)});
  delete window._pendingPayrollImport;
  saveData();closeModal();renderPayroll();toast(`已匯入 ${records.length} 筆薪資`);
}

function handlePayrollBatchExcel(input){handlePayrollBatchExcelMulti(input)}

function importPayrollBatchJson(){
  const raw=document.getElementById('payrollBatchJson').value.trim();
  if(!raw){toast('請貼上 JSON','warning');return}
  let arr;
  try{arr=JSON.parse(raw)}catch(e){toast('JSON 格式錯誤: '+e.message,'danger');return}
  if(!Array.isArray(arr)){arr=[arr]}
  let count=0;
  arr.forEach(d=>{
    if(!d.empName&&!d.name){return}
    const base=d.baseSalary||d.base||0,ot=d.overtime||d.ot||0,meal=d.mealAllowance||d.meal||0;
    const travel=d.travelAllowance||d.travel||0,bonus=d.bonus||0;
    const holidayBonus=d.holidayBonus||0,yearEndBonus=d.yearEndBonus||0;
    const labor=d.laborIns||d.labor||0,health=d.healthIns||d.health||0;
    const itax=d.incomeTax||d.tax||0,leave=d.leaveDeduction||d.leave||0;
    const laborRet=d.laborRetirement||0,laborInsC=d.laborInsCompany||0,healthInsC=d.healthInsCompany||0;
    const income=base+ot+meal+travel+bonus+holidayBonus+yearEndBonus;
    const netPay=d.netPay||income-labor-health-itax-leave;
    DB.payroll.push({id:uid(),empName:d.empName||d.name,title:d.title||'',month:d.month||new Date().toISOString().slice(0,7),baseSalary:base,overtime:ot,mealAllowance:meal,travelAllowance:travel,bonus,holidayBonus,yearEndBonus,laborIns:labor,healthIns:health,incomeTax:itax,leaveDeduction:leave,laborRetirement:laborRet,laborInsCompany:laborInsC,healthInsCompany:healthInsC,netPay});
    count++;
  });
  saveData();closeModal();renderPayroll();toast(`已匯入 ${count} 筆薪資`);
}

function clearAllPayroll(){if(!confirm('確定清空所有薪資資料？此操作無法復原。'))return;DB.payroll=[];saveData();renderPayroll();toast('已清空所有薪資資料','info')}

let payrollAnnualVisible=false;
function togglePayrollView(){
  payrollAnnualVisible=!payrollAnnualVisible;
  const div=document.getElementById('payrollAnnualView');
  div.style.display=payrollAnnualVisible?'block':'none';
  if(payrollAnnualVisible)renderPayrollAnnual();
}

function renderPayrollAnnual(){
  const sel=document.getElementById('salMonth');
  let year=sel.value?sel.value.slice(0,4):null;
  if(!year){
    const years=new Set();DB.payroll.forEach(p=>{if(p.month)years.add(p.month.slice(0,4))});
    year=[...years].sort().reverse()[0]||new Date().getFullYear().toString();
  }
  const empMap={};
  DB.payroll.forEach(p=>{
    if(!p.month||!p.month.startsWith(year))return;
    const key=p.empName||'未知';
    if(!empMap[key])empMap[key]={empName:key,title:p.title||'',months:0,baseSalary:0,overtime:0,mealAllowance:0,travelAllowance:0,bonus:0,holidayBonus:0,yearEndBonus:0,laborIns:0,healthIns:0,incomeTax:0,leaveDeduction:0,laborRetirement:0,laborInsCompany:0,healthInsCompany:0,netPay:0};
    const e=empMap[key];e.months++;
    e.baseSalary+=(p.baseSalary||0);e.overtime+=(p.overtime||0);
    e.mealAllowance+=(p.mealAllowance||0);e.travelAllowance+=(p.travelAllowance||0);
    e.bonus+=(p.bonus||0);e.holidayBonus+=(p.holidayBonus||0);e.yearEndBonus+=(p.yearEndBonus||0);
    e.laborIns+=(p.laborIns||0);e.healthIns+=(p.healthIns||0);e.incomeTax+=(p.incomeTax||0);e.leaveDeduction+=(p.leaveDeduction||0);
    e.laborRetirement+=(p.laborRetirement||0);e.laborInsCompany+=(p.laborInsCompany||0);e.healthInsCompany+=(p.healthInsCompany||0);
    e.netPay+=(p.netPay||0);
  });
  const emps=Object.values(empMap).sort((a,b)=>b.netPay-a.netPay);
  const t={months:0,baseSalary:0,overtime:0,allowance:0,bonusAll:0,deduction:0,companyCost:0,netPay:0,totalCost:0};
  const rows=emps.map(e=>{
    const allowance=e.mealAllowance+e.travelAllowance;
    const bonusAll=e.bonus+e.holidayBonus+e.yearEndBonus;
    const income=e.baseSalary+e.overtime+allowance+bonusAll;
    const deduction=e.laborIns+e.healthIns+e.incomeTax+e.leaveDeduction;
    const companyCost=e.laborRetirement+e.laborInsCompany+e.healthInsCompany;
    const totalCost=income+companyCost;
    t.months+=e.months;t.baseSalary+=e.baseSalary;t.overtime+=e.overtime;
    t.allowance+=allowance;t.bonusAll+=bonusAll;t.deduction+=deduction;
    t.companyCost+=companyCost;t.netPay+=e.netPay;t.totalCost+=totalCost;
    return `<tr>
      <td><strong>${e.empName}</strong></td><td>${e.title}</td><td class="text-right">${e.months}</td>
      <td class="text-right mono">${fmtMoney(e.baseSalary)}</td>
      <td class="text-right mono">${fmtMoney(e.overtime)}</td>
      <td class="text-right mono">${fmtMoney(allowance)}</td>
      <td class="text-right mono">${fmtMoney(bonusAll)}</td>
      <td class="text-right mono tip-cell">${fmtMoney(deduction)}<div class="tip-box">勞保: ${fmtMoney(e.laborIns)}<br>健保: ${fmtMoney(e.healthIns)}<br>所得稅: ${fmtMoney(e.incomeTax)}<br>請假扣薪: ${fmtMoney(e.leaveDeduction)}</div></td>
      <td class="text-right mono tip-cell">${fmtMoney(companyCost)}<div class="tip-box">勞退6%: ${fmtMoney(e.laborRetirement)}<br>勞保(公司): ${fmtMoney(e.laborInsCompany)}<br>健保(公司): ${fmtMoney(e.healthInsCompany)}</div></td>
      <td class="text-right mono">${fmtMoney(e.netPay)}</td>
      <td class="text-right mono" style="font-weight:700;color:var(--danger)">${fmtMoney(totalCost)}</td>
    </tr>`;
  }).join('');
  document.getElementById('payrollAnnualView').innerHTML=`
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:16px">
      <h3 style="margin:0 0 12px;font-size:1rem">📊 ${year} 年度員工薪資總覽 <span style="font-size:.8rem;color:var(--text-light)">(${emps.length} 位員工)</span></h3>
      <div class="table-wrap"><table>
        <thead><tr><th>姓名</th><th>職稱</th><th class="text-right">月數</th><th class="text-right">本薪合計</th><th class="text-right">加班費</th><th class="text-right">津貼</th><th class="text-right">獎金</th><th class="text-right">扣除合計</th><th class="text-right">公司負擔</th><th class="text-right">實領合計</th><th class="text-right">年度總支出</th></tr></thead>
        <tbody>${rows||'<tr><td colspan="11" style="text-align:center;padding:24px;color:var(--text-light)">無資料</td></tr>'}</tbody>
        <tfoot>${emps.length?`<tr style="font-weight:700;background:#f1f5f9"><td colspan="2">合計</td><td class="text-right">${t.months}</td>
          <td class="text-right mono">${fmtMoney(t.baseSalary)}</td><td class="text-right mono">${fmtMoney(t.overtime)}</td>
          <td class="text-right mono">${fmtMoney(t.allowance)}</td><td class="text-right mono">${fmtMoney(t.bonusAll)}</td>
          <td class="text-right mono">${fmtMoney(t.deduction)}</td><td class="text-right mono">${fmtMoney(t.companyCost)}</td>
          <td class="text-right mono">${fmtMoney(t.netPay)}</td>
          <td class="text-right mono" style="color:var(--danger)">${fmtMoney(t.totalCost)}</td></tr>`:''}</tfoot>
      </table></div>
      <p style="font-size:.75rem;color:var(--text-light);margin:8px 0 0">💡 年度總支出 = 薪資收入 + 公司負擔（勞退+勞保+健保公司代繳）| 滑鼠移到扣除/公司負擔可查看明細</p>
    </div>`;
}

// ===== MONTHLY REPORT =====
let rptCharts={};
function renderReport(){
  const ySel=document.getElementById('rptYear');
  const years=getYears();
  const curVal=ySel.value||String(new Date().getFullYear());
  ySel.innerHTML=years.map(y=>`<option value="${y}">${y}</option>`).join('');
  ySel.value=years.includes(curVal)?curVal:years[0]||String(new Date().getFullYear());
  const year=ySel.value;

  const months=[];for(let i=1;i<=12;i++)months.push(year+'-'+String(i).padStart(2,'0'));

  const data=months.map(m=>{
    let income=0;
    DB.projects.forEach(p=>{for(let i=1;i<=5;i++){if(monthKey(p['p'+i+'_date'])===m)income+=(p['p'+i+'_amt']||0)}});
    let salary=0;DB.payroll.filter(p=>p.month===m).forEach(p=>salary+=(p.netPay||0));
    let sub=0,fixed=0,equip=0,misc=0;
    const subByProj={};
    DB.payables.filter(p=>monthKey(p.date)===m).forEach(p=>{
      const a=p.amount||0;
      if(p.category==='subcontractor'){sub+=a;
        const proj=p.projectId?DB.projects.find(x=>x.id===p.projectId):null;
        const pName=proj?(proj.businessNo||'?')+' '+(proj.projectName||''):'未關聯';
        subByProj[pName]=(subByProj[pName]||0)+a;
      }else if(p.category==='fixed')fixed+=a;else if(p.category==='equipment')equip+=a;else misc+=a;
    });
    const subByProject=Object.keys(subByProj).length?Object.entries(subByProj).map(([k,v])=>k+': '+fmtMoney(v)).join('\\n'):'';
    const expense=salary+sub+fixed+equip+misc;
    return {month:m,label:(parseInt(m.slice(5)))+'月',income,salary,sub,fixed,equip,misc,expense,net:income-expense,subByProject};
  });

  const totalIncome=data.reduce((s,d)=>s+d.income,0);
  const totalExpense=data.reduce((s,d)=>s+d.expense,0);
  document.getElementById('rptStats').innerHTML=`
    <div class="stat-card success"><div class="label">${year} 年收入</div><div class="value">${fmtMoney(totalIncome)}</div></div>
    <div class="stat-card danger"><div class="label">${year} 年支出</div><div class="value">${fmtMoney(totalExpense)}</div></div>
    <div class="stat-card ${totalIncome-totalExpense>=0?'accent':'warning'}"><div class="label">淨額</div><div class="value">${fmtMoney(totalIncome-totalExpense)}</div></div>
  `;

  document.getElementById('rptTable').innerHTML=data.map(d=>`<tr>
    <td>${d.label}</td><td class="text-right mono">${fmtMoney(d.income)}</td><td class="text-right mono">${fmtMoney(d.salary)}</td>
    <td class="text-right mono tip-cell">${fmtMoney(d.sub)}${d.subByProject?'<span class="tip-box" style="white-space:pre-line;text-align:left">'+d.subByProject+'</span>':''}</td><td class="text-right mono">${fmtMoney(d.fixed)}</td>
    <td class="text-right mono">${fmtMoney(d.equip)}</td><td class="text-right mono">${fmtMoney(d.misc)}</td>
    <td class="text-right mono" style="font-weight:600">${fmtMoney(d.expense)}</td>
    <td class="text-right mono" style="font-weight:600;color:${d.net>=0?'var(--success)':'var(--danger)'}">${fmtMoney(d.net)}</td>
  </tr>`).join('');

  // Charts
  if(rptCharts.bar)rptCharts.bar.destroy();
  if(rptCharts.pie)rptCharts.pie.destroy();
  if(rptCharts.line)rptCharts.line.destroy();

  const labels=data.map(d=>d.label);
  rptCharts.bar=new Chart(document.getElementById('rptBarChart'),{
    type:'bar',data:{labels,datasets:[
      {label:'收入',data:data.map(d=>d.income),backgroundColor:'rgba(59,130,246,.7)'},
      {label:'支出',data:data.map(d=>d.expense),backgroundColor:'rgba(239,68,68,.7)'}
    ]},options:{responsive:true,plugins:{title:{display:true,text:`${year} 年收支對比`}},scales:{y:{ticks:{callback:v=>fmtMoney(v)}}}}
  });

  const totalSalary=data.reduce((s,d)=>s+d.salary,0);
  const totalSub=data.reduce((s,d)=>s+d.sub,0);
  const totalFixed=data.reduce((s,d)=>s+d.fixed,0);
  const totalEquip=data.reduce((s,d)=>s+d.equip,0);
  const totalMisc=data.reduce((s,d)=>s+d.misc,0);
  rptCharts.pie=new Chart(document.getElementById('rptPieChart'),{
    type:'doughnut',data:{
      labels:['薪資','複委託','固定開銷','設備','雜支'],
      datasets:[{data:[totalSalary,totalSub,totalFixed,totalEquip,totalMisc],
        backgroundColor:['#3b82f6','#f59e0b','#8b5cf6','#06b6d4','#6b7280']}]
    },options:{responsive:true,plugins:{title:{display:true,text:'支出類別分佈'}}}
  });

  let running=0;
  rptCharts.line=new Chart(document.getElementById('rptCashFlow'),{
    type:'line',data:{labels,datasets:[{label:'累計現金流',data:data.map(d=>{running+=d.net;return running}),
      borderColor:'#22c55e',backgroundColor:'rgba(34,197,94,.1)',fill:true,tension:.3}]},
    options:{responsive:true,plugins:{title:{display:true,text:`${year} 年現金流趨勢`}},scales:{y:{ticks:{callback:v=>fmtMoney(v)}}}}
  });
}

// ===== IMPORT =====
function renderImportPage(){
  renderManualForm('expense');
  document.getElementById('receiptImportArea').innerHTML=renderReceiptImportSection();
  

// Load default projects if empty
if(!DB.projects||!DB.projects.length){
  fetch('default_projects.json').then(r=>r.json()).then(d=>{
    if(!DB.projects||!DB.projects.length){DB.projects=d;DB.nextId=d.length+1;saveData();refreshAll();}
  }).catch(()=>{});
}

setupUploadZone('receiptImportZone','receiptImportInput',handleReceiptImportUpload);
}

// Excel upload
function setupUploadZone(zoneId,inputId,handler){
  const zone=document.getElementById(zoneId);
  zone.addEventListener('click',()=>document.getElementById(inputId).click());
  zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('dragover')});
  zone.addEventListener('dragleave',()=>zone.classList.remove('dragover'));
  zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('dragover');handler(e.dataTransfer.files[0])});
}

function handleExcelUpload(file){
  if(!file)return;
  const reader=new FileReader();
  reader.onload=function(e){
    const wb=XLSX.read(e.target.result,{type:'array'});
    const preview=document.getElementById('excelPreview');
    let html='<h4 style="margin:12px 0 8px">偵測到工作表：</h4>';
    const sheetInfo=[];
    wb.SheetNames.forEach(name=>{
      const ws=wb.Sheets[name];
      const json=XLSX.utils.sheet_to_json(ws,{defval:''});
      sheetInfo.push({name,data:json,cols:json.length?Object.keys(json[0]):[]});
      html+=`<div style="margin:8px 0;padding:12px;background:#f8fafc;border-radius:8px;border:1px solid var(--border)">
        <strong>${name}</strong> — ${json.length} 列, ${json.length?Object.keys(json[0]).length:0} 欄
        <button class="btn btn-sm btn-primary" style="float:right" onclick="importSheet('${name}')">匯入</button>
      </div>`;
    });
    preview.innerHTML=html;
    window._excelWB=wb;
    toast('Excel 檔案已載入','info');
  };
  reader.readAsArrayBuffer(file);
}

window.importSheet=function(sheetName){
  const wb=window._excelWB;if(!wb)return;
  const ws=wb.Sheets[sheetName];
  const json=XLSX.utils.sheet_to_json(ws,{defval:''});
  if(!json.length){toast('空白工作表','error');return}

  const cols=Object.keys(json[0]).map(c=>c.toString().trim());
  const colLower=cols.map(c=>c.toLowerCase());

  // Auto-detect sheet type
  if(sheetName.includes('設計費')||sheetName.includes('收支')||colLower.some(c=>c.includes('合約')||c.includes('案號')||c.includes('業務編號')||c.includes('案名'))){
    importProjectSheet(json,cols);
  } else if(sheetName.includes('薪資')||sheetName.includes('印領')||colLower.some(c=>c.includes('本薪')||c.includes('實領'))){
    importPayrollSheet(json,cols);
  } else if(sheetName.includes('月支出')||sheetName.includes('支出')){
    importExpenseSheet(json,cols);
  } else {
    // Generic: let user choose
    toast('無法自動辨識工作表類型，嘗試匯入為應付帳款','info');
    importGenericAsPayable(json,cols);
  }
};

function findCol(cols,keywords){return cols.find(c=>{const lc=c.toLowerCase();return keywords.some(k=>lc.includes(k))})}

// Helper function to convert Chinese numerals
function toChineseNum(n){
  const cn=['零','一','二','三','四','五','六','七','八','九','十'];
  if(n<=10)return cn[n];
  if(n<20)return '十'+(n>10?cn[n-10]:'');
  if(n<100){
    const tens=Math.floor(n/10);
    const ones=n%10;
    return cn[tens]+'十'+(ones>0?cn[ones]:'');
  }
  return String(n);
}

function importProjectSheet(json,cols){
  let count=0;
  json.forEach(row=>{
    const yearCol=findCol(cols,['年份','year']);
    const businessNoCol=findCol(cols,['業務編號','案號','編號','no','businessno']);
    const projectNameCol=findCol(cols,['案名','案名','專案','project','projectname','名稱']);
    const clientCol=findCol(cols,['業主','客戶','client']);
    const locCol=findCol(cols,['地點','地址','location']);
    const contractCol=findCol(cols,['合約','金額','contract']);
    if(!projectNameCol&&!businessNoCol)return;
    const pname=row[projectNameCol]||'';
    const bno=String(row[businessNoCol]||'');
    if(!pname&&!bno)return;
    const yr=yearCol?String(row[yearCol]):(bno.length>=3?bno.slice(0,3):'');
    const p={id:uid(),year:yr,businessNo:bno,projectName:String(pname),client:String(row[clientCol]||''),location:String(row[locCol]||''),contractAmt:Number(row[contractCol])||0,subcontractor:''};
    // Try to find period columns - Enhanced with more flexible patterns
    for(let i=1;i<=8;i++){
      const cn=toChineseNum(i);
      // Support: 第1期, 第1期金額, 第一期, 一期, p1, 期款1, 第一期金額, etc.
      const amtCol=findCol(cols,['第'+i+'期','p'+i,'期款'+i,'第'+cn+'期','第'+cn+'期金額',cn+'期',cn+'期金額',cn+'期款']);
      const dateCol=findCol(cols,['日期'+i,'date'+i,'收款日'+i,'第'+i+'期日期','第'+cn+'期日期',cn+'期日期',cn+'日']);
      const methodCol=findCol(cols,['方式'+i,'method'+i,'第'+i+'期方式','第'+cn+'期方式',cn+'期方式',cn+'期收款方式']);
      p['p'+i+'_amt']=amtCol?Number(row[amtCol])||0:0;
      p['p'+i+'_date']=dateCol?parseDate(row[dateCol]):'';
      p['p'+i+'_method']=methodCol?String(row[methodCol]):'';
    }
    // Map "支領或兌現日期" and "現金、支票號碼" columns (original Excel format)
    // Enhanced: Support multiple rows with period-specific columns
    const cashDateCol=findCol(cols,['支領或兌現日期','兌現日期','支領日期','收款日','日期']);
    const checkNoCol=findCol(cols,['現金、支票號碼','支票號碼','現金支票','收款方式','付款方式']);
    
    // Try to find period-specific date columns first
    let hasPeriodDates=false;
    for(let i=1;i<=8;i++){
      const cn=toChineseNum(i);
      const pd=findCol(cols,['第'+i+'期日期','第'+cn+'期日期',cn+'期日期','日期'+i,'date'+i]);
      if(pd && row[pd]){
        p['p'+i+'_date']=parseDate(row[pd]);
        hasPeriodDates=true;
      }
      // Also check for method-specific columns
      const pm=findCol(cols,['第'+i+'期方式','第'+cn+'期方式',cn+'期方式','方式'+i]);
      if(pm && row[pm]){
        p['p'+i+'_method']=String(row[pm]);
      }
    }
    
    if((cashDateCol||checkNoCol) && !hasPeriodDates){
      for(let i=1;i<=8;i++){
        if(p['p'+i+'_amt']&&!p['p'+i+'_date']){
          if(cashDateCol&&row[cashDateCol])p['p'+i+'_date']=parseDate(row[cashDateCol]);
          if(checkNoCol&&row[checkNoCol]){
            const cv=String(row[checkNoCol]).trim().toLowerCase();
            if(cv.includes('電匯')||cv.includes('wire'))p['p'+i+'_method']='電匯';
            else if(cv.includes('支票')||/^\d{5,}$/.test(cv))p['p'+i+'_method']='支票';
            else if(cv.includes('轉帳'))p['p'+i+'_method']='轉帳';
            else if(cv.includes('現金')||cv==='cash')p['p'+i+'_method']='現金';
            else p['p'+i+'_method']=cv;
          }
          break;
        }
      }
    }
    // Parse vendor columns (結構、水電、跑照、測量、綠建築、水保、監造)
    const vendorCats=[
      {key:'結構',cols:['結構','鑽探','鑽心']},
      {key:'水電',cols:['水電','消防']},
      {key:'跑照',cols:['跑照','3D','透視']},
      {key:'測量',cols:['測量','建築線']},
      {key:'綠建築',cols:['綠建築','估算']},
      {key:'水保',cols:['水保','大地']},
      {key:'監造',cols:['監造']}
    ];
    const vendors=[];
    vendorCats.forEach(vc=>{
      const vendorCol=findCol(cols,vc.cols);
      const amtCol=findCol(cols,[...vc.cols.map(c=>c+'金額'),...vc.cols.map(c=>c+'費用')]);
      if(vendorCol||amtCol){
        const vendorName=vendorCol?String(row[vendorCol]||'').trim():'';
        let amount=0;
        if(amtCol){
          const v=row[amtCol];
          amount=typeof v==='number'?v:Number(String(v).replace(/,/g,''))||0;
        }
        if(vendorName||amount>0){
          // Try to extract amount from vendor column if it's combined (e.g., "佰城 12000")
          if(!amtCol && vendorName){
            const match=vendorName.match(/(\d[\d,]*)\s*$/);
            if(match){
              amount=Number(match[1].replace(/,/g,''));
            }
          }
          vendors.push({category:vc.key,vendor:vendorName,amount:amount});
        }
      }
    });
    if(vendors.length)p.vendors=vendors;
    DB.projects.push(p);count++;
  });
  saveData();toast(`已匯入 ${count} 筆案件`);
}

function importPayrollSheet(json,cols){
  // Try block format via new parser
  const wb=window._excelWB;
  if(wb){
    for(const sn of wb.SheetNames){
      if(!sn.includes('薪資')&&!sn.includes('印領'))continue;
      const parsed=parsePayrollSheet(wb.Sheets[sn],sn);
      if(parsed.length){showPayrollBatchPreview(parsed,1);return}
    }
  }
  // Fallback: standard tabular
  let count=0;
  json.forEach(row=>{
    const nameCol=findCol(cols,['姓名','name','員工']);
    if(!nameCol||!row[nameCol])return;
    const name=String(row[nameCol]).trim();
    if(!name||/^\d+$/.test(name)||name==='合計'||name==='小計')return;
    const g=keys=>Number(row[findCol(cols,keys)])||0;
    const base=g(['本薪','底薪','salary']);const ot=g(['加班','overtime']);
    const meal=g(['伙食','meal']);const travel=g(['旅遊津貼','旅遊','travel']);
    const bonus=g(['專案','績效獎金','獎金','bonus']);
    const holidayBonus=g(['三節','holiday']);const yearEndBonus=g(['年終獎金','年終']);
    const labor=g(['勞保自付','勞保(自付','勞保費'])||g(['勞保','labor']);
    const health=g(['健保自付','健保(自付','健保費'])||g(['健保','health']);
    const itax=g(['所得稅','扣繳','tax']);const leave=g(['請假扣薪','請假','leave']);
    const laborRet=g(['勞退6%','勞退','retirement']);
    const laborInsC=g(['勞工保險費(公司','勞保(公司','勞保公司']);
    const healthInsC=g(['全民健保費(公司','健保(公司','健保公司']);
    const netCalc=base+ot+meal+travel+bonus+holidayBonus+yearEndBonus-labor-health-itax-leave;
    const net=Number(row[findCol(cols,['實領','net','實發'])])||netCalc;
    const monthCol=findCol(cols,['月份','month','期間']);
    DB.payroll.push({id:uid(),empName:name,title:String(row[findCol(cols,['職稱','title','職位'])]||''),
      month:monthCol?String(row[monthCol]).slice(0,7):new Date().toISOString().slice(0,7),
      baseSalary:base,overtime:ot,mealAllowance:meal,travelAllowance:travel,
      bonus,holidayBonus,yearEndBonus,laborIns:labor,healthIns:health,incomeTax:itax,leaveDeduction:leave,
      laborRetirement:laborRet,laborInsCompany:laborInsC,healthInsCompany:healthInsC,netPay:net});
    count++;
  });
  saveData();toast(`已匯入 ${count} 筆薪資`);
}

function importExpenseSheet(json,cols){
  let count=0;
  json.forEach(row=>{
    const descCol=findCol(cols,['說明','項目','description','品名']);
    const amtCol=findCol(cols,['金額','amount','合計']);
    if(!amtCol)return;
    const amt=Number(row[amtCol]);if(!amt)return;
    const dateCol=findCol(cols,['日期','date']);
    const catCol=findCol(cols,['類別','category']);
    let cat='misc';
    const catVal=String(row[catCol]||'').toLowerCase();
    if(catVal.includes('委託')||catVal.includes('sub'))cat='subcontractor';
    else if(catVal.includes('固定')||catVal.includes('rent')||catVal.includes('水電'))cat='fixed';
    else if(catVal.includes('設備')||catVal.includes('equip'))cat='equipment';
    DB.payables.push({id:uid(),date:parseDate(row[dateCol])||new Date().toISOString().slice(0,10),
      vendor:String(row[findCol(cols,['廠商','vendor','對象'])]||''),
      description:String(row[descCol]||''),category:cat,status:'pending',
      amount:amt,tax:Number(row[findCol(cols,['稅','tax'])])||0});
    count++;
  });
  saveData();toast(`已匯入 ${count} 筆支出`);
}

function importGenericAsPayable(json,cols){importExpenseSheet(json,cols)}

// ===== AI-ASSISTED INVOICE IMPORT =====
let _aiImageDataUrl=null;

const AI_JSON_PLACEHOLDER=`貼上 AI 辨識的 JSON，格式如：
{
  "date": "2024-01-15",
  "vendor": "廣益工程顧問有限公司",
  "taxId": "86229736",
  "description": "結構設計費",
  "amount": 50000,
  "tax": 5000,
  "total": 55000,
  "category": "複委託"
}

也支援 JSON 陣列（多筆）：
[{ ... }, { ... }]`;

function handleInvoiceUpload(file){
  if(!file)return;
  if(!file.type.startsWith('image/')){
    document.getElementById('invoicePreview').innerHTML=`<div style="padding:16px;background:#fef9c3;border-radius:8px;border:1px solid #fde68a;margin-top:12px">
      <strong>⚠️ 僅支援圖片格式</strong><br><p style="font-size:.85rem;color:#854d0e">請上傳 JPG 或 PNG 格式的發票/收據圖片。</p></div>`;
    return;
  }
  const fr=new FileReader();
  fr.onload=function(e){
    _aiImageDataUrl=e.target.result;
    showAIImportPanel(_aiImageDataUrl);
  };
  fr.readAsDataURL(file);
}

function showAIImportPanel(imageDataUrl){
  let overlay=document.getElementById('ocrOverlay');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.id='ocrOverlay';
    overlay.className='ocr-overlay';
    overlay.addEventListener('click',function(e){if(e.target===overlay)closeOCRPanel()});
    document.body.appendChild(overlay);
  }
  const imgHtml=imageDataUrl?`<div class="ocr-image-side" id="ocrImageSide" onclick="this.classList.toggle('zoomed')"><img src="${imageDataUrl}" alt="發票圖片"></div>`:'';
  const bodyClass=imageDataUrl?'':'style="flex-direction:column"';
  overlay.innerHTML=`<div class="ocr-panel">
    <div class="ocr-panel-header"><h3>🤖 AI辨識結果匯入</h3><button class="btn btn-outline btn-sm" onclick="closeOCRPanel()">✕</button></div>
    <div class="ocr-panel-body" ${bodyClass}>
      ${imgHtml}
      <div class="ocr-form-side">
        <div style="margin-bottom:16px;padding:12px;background:#eff6ff;border-radius:8px;border:1px solid #bfdbfe">
          <strong style="font-size:.85rem;color:#1e40af">📋 貼上AI辨識結果</strong>
          <p style="font-size:.8rem;color:#3b82f6;margin-top:4px">將發票圖片傳給AI助理，取得JSON後貼在下方</p>
        </div>
        <div class="form-group">
          <textarea id="aiJsonInput" rows="6" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:var(--radius);font-family:'SF Mono',monospace;font-size:.8rem;resize:vertical" placeholder="${AI_JSON_PLACEHOLDER.replace(/"/g,'&quot;')}"></textarea>
        </div>
        <button class="btn btn-primary btn-sm" onclick="parseAIJson()" style="margin-bottom:16px">🔍 解析並填入</button>
        <div class="ocr-form-grid">
          <div class="form-group"><label>日期</label><input type="date" id="ocrDate" value="${new Date().toISOString().slice(0,10)}"></div>
          <div class="form-group"><label>廠商/供應商</label><input id="ocrVendor" value=""></div>
          <div class="form-group"><label>統一編號</label><input id="ocrTaxId" value="" maxlength="8"></div>
          <div class="form-group"><label>分類</label><select id="ocrCategory">
            <option value="subcontractor">複委託</option><option value="fixed">固定開銷</option><option value="equipment">設備</option><option value="misc" selected>雜支</option>
          </select></div>
          <div class="form-group full"><label>品項/摘要</label><input id="ocrDesc" value=""></div>
          <div class="form-group"><label>金額（稅前）</label><input type="number" id="ocrAmount" value=""></div>
          <div class="form-group"><label>稅額</label><input type="number" id="ocrTax" value=""></div>
          <div class="form-group"><label>總金額</label><input type="number" id="ocrTotal" value=""></div>
        </div>
      </div>
    </div>
    <div class="ocr-panel-footer">
      <button class="btn btn-outline" onclick="closeOCRPanel()">取消</button>
      <button class="btn btn-success" onclick="confirmOCRImport()">✅ 確認匯入</button>
    </div>
  </div>`;
  overlay.classList.add('show');
}

function mapCategoryValue(cat){
  if(!cat)return'misc';
  const c=cat.toLowerCase();
  if(c.includes('委託')||c==='subcontractor')return'subcontractor';
  if(c.includes('固定')||c==='fixed'||c.includes('rent')||c.includes('水電'))return'fixed';
  if(c.includes('設備')||c==='equipment')return'equipment';
  return'misc';
}

function parseAIJson(){
  const raw=document.getElementById('aiJsonInput').value.trim();
  if(!raw){toast('請先貼上JSON','error');return}
  let parsed;
  try{parsed=JSON.parse(raw)}catch(e){toast('JSON格式錯誤：'+e.message,'error');return}

  // If array, switch to batch mode
  if(Array.isArray(parsed)){
    closeOCRPanel();
    showBatchPreview(parsed);
    return;
  }

  // Single object — fill form
  const f=parsed;
  if(f.date)document.getElementById('ocrDate').value=f.date;
  if(f.vendor)document.getElementById('ocrVendor').value=f.vendor;
  if(f.taxId)document.getElementById('ocrTaxId').value=f.taxId;
  if(f.description)document.getElementById('ocrDesc').value=f.description;
  if(f.amount!=null)document.getElementById('ocrAmount').value=f.amount;
  if(f.tax!=null)document.getElementById('ocrTax').value=f.tax;
  if(f.total!=null)document.getElementById('ocrTotal').value=f.total;
  if(f.category)document.getElementById('ocrCategory').value=mapCategoryValue(f.category);
  toast('已填入表單','success');
}

function openQuickAIImport(){
  showAIImportPanel(null);
}

// ===== BATCH IMPORT =====
function openBatchAIImport(){
  let overlay=document.getElementById('ocrOverlay');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.id='ocrOverlay';
    overlay.className='ocr-overlay';
    overlay.addEventListener('click',function(e){if(e.target===overlay)closeOCRPanel()});
    document.body.appendChild(overlay);
  }
  overlay.innerHTML=`<div class="ocr-panel">
    <div class="ocr-panel-header"><h3>📋 批次匯入 — 貼上JSON陣列</h3><button class="btn btn-outline btn-sm" onclick="closeOCRPanel()">✕</button></div>
    <div style="padding:20px 24px">
      <div style="margin-bottom:12px;padding:12px;background:#eff6ff;border-radius:8px;border:1px solid #bfdbfe">
        <p style="font-size:.85rem;color:#1e40af">貼上 JSON 陣列，每個物件代表一筆發票。支援欄位：date, vendor, taxId, description, amount, tax, total, category</p>
      </div>
      <textarea id="batchJsonInput" rows="10" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:var(--radius);font-family:'SF Mono',monospace;font-size:.8rem;resize:vertical" placeholder='[&#10;  { "date": "2024-01-15", "vendor": "...", "amount": 50000, "tax": 5000, "total": 55000, "category": "複委託" },&#10;  { "date": "2024-01-20", "vendor": "...", "amount": 30000, "tax": 1500, "total": 31500, "category": "雜支" }&#10;]'></textarea>
      <button class="btn btn-primary" onclick="parseBatchJson()" style="margin-top:12px">🔍 解析並預覽</button>
      <div id="batchPreviewArea" style="margin-top:16px"></div>
    </div>
  </div>`;
  overlay.classList.add('show');
}

function parseBatchJson(){
  const raw=document.getElementById('batchJsonInput').value.trim();
  if(!raw){toast('請先貼上JSON','error');return}
  let parsed;
  try{parsed=JSON.parse(raw)}catch(e){toast('JSON格式錯誤：'+e.message,'error');return}
  if(!Array.isArray(parsed)){parsed=[parsed]}
  showBatchPreview(parsed);
}

function showBatchPreview(items){
  // If called from within batch modal, render inline
  const inlineArea=document.getElementById('batchPreviewArea');
  const catMap={subcontractor:'複委託',fixed:'固定開銷',equipment:'設備',misc:'雜支'};

  if(inlineArea){
    // Render inside existing modal
    window._batchItems=items;
    inlineArea.innerHTML=`<div class="table-wrap" style="max-height:400px;overflow:auto">
      <table><thead><tr><th>日期</th><th>廠商</th><th>說明</th><th>類別</th><th class="text-right">金額</th><th class="text-right">稅額</th><th class="text-right">總額</th></tr></thead>
      <tbody>${items.map((it,i)=>`<tr>
        <td>${it.date||'-'}</td><td>${it.vendor||'-'}</td><td>${it.description||'-'}</td>
        <td><span class="badge badge-info">${catMap[mapCategoryValue(it.category)]||it.category||'雜支'}</span></td>
        <td class="text-right mono">${fmtMoney(it.amount)}</td><td class="text-right mono">${fmtMoney(it.tax)}</td>
        <td class="text-right mono">${fmtMoney(it.total||(it.amount||0)+(it.tax||0))}</td>
      </tr>`).join('')}</tbody></table></div>
      <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:.9rem;color:var(--text-light)">共 ${items.length} 筆</span>
        <button class="btn btn-success" onclick="confirmBatchImport()">✅ 全部匯入</button>
      </div>`;
    return;
  }

  // Otherwise open a new overlay for it
  let overlay=document.getElementById('ocrOverlay');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.id='ocrOverlay';
    overlay.className='ocr-overlay';
    overlay.addEventListener('click',function(e){if(e.target===overlay)closeOCRPanel()});
    document.body.appendChild(overlay);
  }
  window._batchItems=items;
  overlay.innerHTML=`<div class="ocr-panel">
    <div class="ocr-panel-header"><h3>📋 批次匯入預覽</h3><button class="btn btn-outline btn-sm" onclick="closeOCRPanel()">✕</button></div>
    <div style="padding:20px 24px">
      <div id="batchPreviewArea"></div>
    </div>
  </div>`;
  overlay.classList.add('show');
  // Re-render now that batchPreviewArea exists
  document.getElementById('batchPreviewArea').innerHTML=`<div class="table-wrap" style="max-height:400px;overflow:auto">
    <table><thead><tr><th>日期</th><th>廠商</th><th>說明</th><th>類別</th><th class="text-right">金額</th><th class="text-right">稅額</th><th class="text-right">總額</th></tr></thead>
    <tbody>${items.map((it,i)=>`<tr>
      <td>${it.date||'-'}</td><td>${it.vendor||'-'}</td><td>${it.description||'-'}</td>
      <td><span class="badge badge-info">${catMap[mapCategoryValue(it.category)]||it.category||'雜支'}</span></td>
      <td class="text-right mono">${fmtMoney(it.amount)}</td><td class="text-right mono">${fmtMoney(it.tax)}</td>
      <td class="text-right mono">${fmtMoney(it.total||(it.amount||0)+(it.tax||0))}</td>
    </tr>`).join('')}</tbody></table></div>
    <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:.9rem;color:var(--text-light)">共 ${items.length} 筆</span>
      <button class="btn btn-success" onclick="confirmBatchImport()">✅ 全部匯入</button>
    </div>`;
}

function confirmBatchImport(){
  const items=window._batchItems;
  if(!items||!items.length){toast('無資料','error');return}
  items.forEach(f=>{
    const total=f.total||(f.amount||0)+(f.tax||0);
    const bCat=mapCategoryValue(f.category);
    DB.payables.push({
      id:uid(),
      date:f.date||new Date().toISOString().slice(0,10),
      vendor:f.vendor||'',
      description:f.description||'',
      category:bCat,
      status:'pending',
      amount:total||f.amount||0,
      tax:f.tax||0,
      taxId:f.taxId||'',
      projectId:bCat==='subcontractor'?autoMatchProject(f.vendor||'',f.description||''):''
    });
  });
  saveData();
  closeOCRPanel();
  toast(`已匯入 ${items.length} 筆至應付帳款`);
  window._batchItems=null;
}

function closeOCRPanel(){
  const overlay=document.getElementById('ocrOverlay');
  if(overlay)overlay.classList.remove('show');
}

function confirmOCRImport(){
  const amount=Number(document.getElementById('ocrAmount').value)||0;
  const tax=Number(document.getElementById('ocrTax').value)||0;
  const total=Number(document.getElementById('ocrTotal').value)||0;

  const ocrCat=document.getElementById('ocrCategory').value;
  const ocrVendor=document.getElementById('ocrVendor').value;
  const ocrDesc=document.getElementById('ocrDesc').value;
  DB.payables.push({
    id:uid(),
    date:document.getElementById('ocrDate').value,
    vendor:ocrVendor,
    description:ocrDesc,
    category:ocrCat,
    status:'pending',
    amount:total||amount+tax,
    tax:tax,
    taxId:document.getElementById('ocrTaxId').value,
    projectId:ocrCat==='subcontractor'?autoMatchProject(ocrVendor,ocrDesc):''
  });
  saveData();
  closeOCRPanel();
  toast('發票已匯入應付帳款');
  document.getElementById('invoicePreview').innerHTML='<p style="color:var(--success);margin-top:12px">✅ 已成功匯入</p>';
  document.getElementById('invoiceInput').value='';
}

// Manual forms
function switchManualTab(tab){
  document.querySelectorAll('#page-import .sub-tab').forEach(t=>t.classList.remove('active'));
  event.target.classList.add('active');
  renderManualForm(tab);
}
function renderManualForm(type){
  const area=document.getElementById('manualFormArea');
  if(type==='expense'){
    area.innerHTML=`<div style="max-width:600px;margin-top:16px">
      <div class="form-row"><div class="form-group"><label>日期</label><input type="date" id="manDate" value="${new Date().toISOString().slice(0,10)}"></div><div class="form-group"><label>廠商</label><input id="manVendor"></div></div>
      <div class="form-group"><label>說明</label><input id="manDesc"></div>
      <div class="form-row"><div class="form-group"><label>類別</label><select id="manCat"><option value="subcontractor">複委託</option><option value="fixed">固定開銷</option><option value="equipment">設備</option><option value="misc" selected>雜支</option></select></div><div class="form-group"><label>金額</label><input type="number" id="manAmt"></div><div class="form-group"><label>稅額</label><input type="number" id="manTax" value="0"></div></div>
      <button class="btn btn-primary" onclick="saveManualExpense()">新增</button></div>`;
  } else if(type==='project'){
    area.innerHTML='<div style="margin-top:16px"><button class="btn btn-primary" onclick="openProjectModal()">開啟案件表單</button></div>';
  } else {
    area.innerHTML='<div style="margin-top:16px"><button class="btn btn-primary" onclick="openPayrollModal()">開啟薪資表單</button></div>';
  }
}
window.saveManualExpense=function(){
  const manCat=document.getElementById('manCat').value;
  const manVendor=document.getElementById('manVendor').value;
  const manDesc=document.getElementById('manDesc').value;
  DB.payables.push({id:uid(),date:document.getElementById('manDate').value,vendor:manVendor,
    description:manDesc,category:manCat,status:'pending',
    amount:Number(document.getElementById('manAmt').value)||0,tax:Number(document.getElementById('manTax').value)||0,
    projectId:manCat==='subcontractor'?autoMatchProject(manVendor,manDesc):''});
  saveData();toast('費用已新增');
  document.getElementById('manAmt').value='';document.getElementById('manDesc').value='';document.getElementById('manVendor').value='';
};

// ===== SETTINGS =====
function renderSettings(){
  const s=DB.settings||{};
  document.getElementById('setName').value=s.name||'';
  document.getElementById('setTaxId').value=s.taxId||'';
  document.getElementById('setAddr').value=s.addr||'';
  document.getElementById('settingsStats').innerHTML=`
    案件（工程）：${DB.projects.length} 筆<br>
    應付帳款：${DB.payables.length} 筆<br>
    薪資紀錄：${DB.payroll.length} 筆<br>
    LocalStorage 使用：${(new Blob([JSON.stringify(DB)]).size/1024).toFixed(1)} KB
  `;
}
function saveSettings(){
  DB.settings={name:document.getElementById('setName').value,taxId:document.getElementById('setTaxId').value,addr:document.getElementById('setAddr').value};
  saveData();toast('設定已儲存');
}

// ===== EXPORT =====
function exportAllToExcel(){
  const wb=XLSX.utils.book_new();
  
  // Helper for formatting
  const wsMerge=ws=>{
    if(!ws['!ref'])return;
    const range=XLSX.utils.decode_range(ws['!ref']);
    // Set column widths
    const colWidths=[];
    for(let c=range.e.c;c>=0;c--){
      let maxW=10;
      for(let r=range.s.r;r<=range.e.r;r++){
        const cell=ws[XLSX.utils.encode_cell({c,r})];
        if(cell&&cell.v)maxW=Math.max(maxW,String(cell.v).length);
      }
      colWidths.push({wch:Math.min(maxW+2,50)});
    }
    ws['!cols']=colWidths;
  };

  // ========== 1. 案件收支 (含廠商資料) ==========
  if(DB.projects.length){
    const rows=DB.projects.map(p=>{
      const r={
        '年份':p.year,
        '業務編號':p.businessNo,
        '案名':p.projectName,
        '業主':p.client,
        '地點':p.location,
        '合約金額':p.contractAmt
      };
      // Periods 1-8
      for(let i=1;i<=8;i++){
        const isRec=p['p'+i+'_received']||p['p'+i+'_date'];
        r['第'+i+'期金額']=p['p'+i+'_amt']||0;
        r['第'+i+'期日期']=p['p'+i+'_date']||'';
        r['第'+i+'期方式']=p['p'+i+'_method']||'';
        r['第'+i+'期狀態']=isRec?'已收':'未收';
      }
      r['已收合計']=calcReceived(p);
      r['未收合計']=(p.contractAmt||0)-calcReceived(p);
      r['複委託商']=p.subcontractor;
      
      // Vendor categories
      const vendors=p.vendors||[];
      r['結構/鑽探']=vendors.find(v=>v.category==='結構/鑽探')?.vendor||'';
      r['結構金額']=vendors.find(v=>v.category==='結構/鑽探')?.amount||0;
      r['水電/消防']=vendors.find(v=>v.category==='水電/消防')?.vendor||'';
      r['水電金額']=vendors.find(v=>v.category==='水電/消防')?.amount||0;
      r['跑照/3D']=vendors.find(v=>v.category==='跑照/3D')?.vendor||'';
      r['跑照金額']=vendors.find(v=>v.category==='跑照/3D')?.amount||0;
      r['測量/建築線']=vendors.find(v=>v.category==='測量/建築線')?.vendor||'';
      r['測量金額']=vendors.find(v=>v.category==='測量/建築線')?.amount||0;
      r['綠建築/估算']=vendors.find(v=>v.category==='綠建築/估算')?.vendor||'';
      r['綠建築金額']=vendors.find(v=>v.category==='綠建築/估算')?.amount||0;
      r['水保/大地']=vendors.find(v=>v.category==='水保/大地')?.vendor||'';
      r['水保金額']=vendors.find(v=>v.category==='水保/大地')?.amount||0;
      r['監造']=vendors.find(v=>v.category==='監造')?.vendor||'';
      r['監造金額']=vendors.find(v=>v.category==='監造')?.amount||0;
      
      return r;
    });
    const ws=XLSX.utils.json_to_sheet(rows);
    wsMerge(ws);
    XLSX.utils.book_append_sheet(wb,ws,'案件收支');
  }

  // ========== 2. 複委託管理 ==========
  if(DB.payables.length){
    const catMap={subcontractor:'複委託',fixed:'固定開銷',equipment:'設備',misc:'雜支'};
    const rows=DB.payables.map(p=>({
      '日期':p.date,
      '廠商':p.vendor,
      '說明':p.description,
      '類別':catMap[p.category]||p.category,
      '關聯案件':p.projectId?DB.projects.find(x=>x.id===p.projectId)?.projectName||'':'',
      '金額':p.amount,
      '稅額':p.tax||0,
      '狀態':p.status==='paid'?'已付':'待付'
    }));
    const ws=XLSX.utils.json_to_sheet(rows);
    wsMerge(ws);
    XLSX.utils.book_append_sheet(wb,ws,'複委託管理');
    
    // Add vendor summary sheet
    const vendorSummary={};
    DB.payables.filter(p=>p.category==='subcontractor').forEach(p=>{
      const v=p.vendor||'未知';
      vendorSummary[v]=(vendorSummary[v]||0)+(p.amount||0);
    });
    const vendorRows=Object.entries(vendorSummary).sort((a,b)=>b[1]-a[1]).map(([v,a])=>({'廠商':v,'總金額':a}));
    const ws2=XLSX.utils.json_to_sheet(vendorRows);
    wsMerge(ws2);
    XLSX.utils.book_append_sheet(wb,ws2,'複委託-依廠商');
  }

  // ========== 3. 薪資總表 ==========
  if(DB.payroll.length){
    const rows=DB.payroll.map(p=>({
      '月份':p.month,
      '姓名':p.empName,
      '職稱':p.title,
      '本薪':p.baseSalary,
      '加班費':p.overtime||0,
      '伙食津貼':p.mealAllowance||0,
      '旅遊津貼':p.travelAllowance||0,
      '專案/績效獎金':p.bonus||0,
      '三節獎金':p.holidayBonus||0,
      '年終獎金':p.yearEndBonus||0,
      '勞保(自付額)':p.laborIns||0,
      '健保(自付額)':p.healthIns||0,
      '所得稅':p.incomeTax||0,
      '請假扣薪':p.leaveDeduction||0,
      '實領金額':p.netPay,
      '勞退6%':p.laborRetirement||0,
      '勞保(公司)':p.laborInsCompany||0,
      '健保(公司)':p.healthInsCompany||0
    }));
    const ws=XLSX.utils.json_to_sheet(rows);
    wsMerge(ws);
    XLSX.utils.book_append_sheet(wb,ws,'薪資總表');
  }

  // ========== 4. 月報表 ==========
  const years=getYears();
  years.forEach(year=>{
    const months=[];
    for(let i=1;i<=12;i++)months.push(year+'-'+String(i).padStart(2,'0'));
    
    const data=months.map(m=>{
      let income=0;
      DB.projects.forEach(p=>{for(let i=1;i<=8;i++){if(monthKey(p['p'+i+'_date'])===m)income+=(p['p'+i+'_amt']||0)}});
      let salary=0;DB.payroll.filter(p=>p.month===m).forEach(p=>salary+=(p.netPay||0));
      let sub=0,fixed=0,equip=0,misc=0;
      DB.payables.filter(p=>monthKey(p.date)===m).forEach(p=>{
        const a=p.amount||0;
        if(p.category==='subcontractor')sub+=a;
        else if(p.category==='fixed')fixed+=a;
        else if(p.category==='equipment')equip+=a;
        else misc+=a;
      });
      const expense=salary+sub+fixed+equip+misc;
      return {
        '月份':m,
        '收入':income,
        '薪資支出':salary,
        '複委託支出':sub,
        '固定開銷':fixed,
        '設備支出':equip,
        '雜支':misc,
        '支出合計':expense,
        '淨額':income-expense
      };
    });
    
    // Add totals row
    const total=data.reduce((s,d)=>({
      '月份':'合計',
      '收入':s['收入']+d['收入'],
      '薪資支出':s['薪資支出']+d['薪資支出'],
      '複委託支出':s['複委託支出']+d['複委託支出'],
      '固定開銷':s['固定開銷']+d['固定開銷'],
      '設備支出':s['設備支出']+d['設備支出'],
      '雜支':s['雜支']+d['雜支'],
      '支出合計':s['支出合計']+d['支出合計'],
      '淨額':s['淨額']+d['淨額']
    }),{'月份':'','收入':0,'薪資支出':0,'複委託支出':0,'固定開銷':0,'設備支出':0,'雜支':0,'支出合計':0,'淨額':0});
    
    const ws=XLSX.utils.json_to_sheet([...data,total]);
    wsMerge(ws);
    XLSX.utils.book_append_sheet(wb,ws,year+'年月報');
  });

  if(!wb.SheetNames.length){
    XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet([{'提示':'目前尚無資料'}]),'空白');
  }
  XLSX.writeFile(wb,'會計報表_'+new Date().toISOString().slice(0,10)+'.xlsx');
  toast('Excel 已匯出 (含案件收支、複委託、薪資、月報)');
}

// ===== BATCH CONTRACT UPLOAD =====
let _batchProjectItems=[];

async function handleBatchContractUpload(files){
  if(!files||!files.length)return;
  const fileArr=[...files].filter(f=>{const n=f.name.toLowerCase();return n.endsWith('.docx')||n.endsWith('.doc');});
  if(!fileArr.length){toast('請選擇 .doc 或 .docx 檔案','error');return;}

  // Show progress overlay
  let overlay=document.getElementById('batchContractOverlay');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.id='batchContractOverlay';
    overlay.className='ocr-overlay';
    overlay.addEventListener('click',function(e){if(e.target===overlay)closeBatchContractPanel()});
    document.body.appendChild(overlay);
  }
  overlay.innerHTML=`<div class="ocr-panel"><div class="ocr-spinner"><div class="spinner"></div><div class="ocr-progress" id="batchContractProgress">正在解析 0/${fileArr.length} 份合約...</div></div></div>`;
  overlay.classList.add('show');

  _batchProjectItems=[];
  for(let i=0;i<fileArr.length;i++){
    document.getElementById('batchContractProgress').textContent=`正在解析 ${i+1}/${fileArr.length} 份合約...`;
    try{
      const buf=await fileArr[i].arrayBuffer();
      const ext2=fileArr[i].name.split('.').pop().toLowerCase();
        let result2;
        if(ext2==='docx'){result2=await mammoth.extractRawText({arrayBuffer:buf});}
        else{const bytes=new Uint8Array(buf);const d16=new TextDecoder('utf-16le',{fatal:false});let t=d16.decode(bytes);if(!/[\u4e00-\u9fff]{5,}/.test(t)){const d5=new TextDecoder('big5',{fatal:false});t=d5.decode(bytes);}result2={value:t};}
        const result=result2;
      const d=parseContractText(result.value);
      d._fileName=fileArr[i].name;
      d._status=(d.projectName||d.name)&&d.contractAmt?'ok':'partial';
      d._checked=true;
      d._expanded=false;
      _batchProjectItems.push(d);
    }catch(e){
      _batchProjectItems.push({_fileName:fileArr[i].name,_status:'error',_statusMsg:e.message,_checked:false,_expanded:false});
    }
  }
  renderBatchContractPreview();
}

function openBatchProjectJsonImport(){
  let overlay=document.getElementById('batchContractOverlay');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.id='batchContractOverlay';
    overlay.className='ocr-overlay';
    overlay.addEventListener('click',function(e){if(e.target===overlay)closeBatchContractPanel()});
    document.body.appendChild(overlay);
  }
  overlay.innerHTML=`<div class="ocr-panel">
    <div class="ocr-panel-header"><h3>📋 批次JSON匯入案件</h3><button class="btn btn-outline btn-sm" onclick="closeBatchContractPanel()">✕</button></div>
    <div style="padding:20px 24px">
      <div style="margin-bottom:12px;padding:12px;background:#eff6ff;border-radius:8px;border:1px solid #bfdbfe">
        <p style="font-size:.85rem;color:#1e40af">貼上 JSON 陣列，每個物件代表一個案件。支援欄位：year, businessNo, projectName, client, location, contractAmt, p1_amt~p8_amt, vendors[{category, vendor, amount}]（也支援舊格式 caseNo, name）</p>
      </div>
      <textarea id="batchProjectJsonInput" rows="10" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:var(--radius);font-family:'SF Mono',monospace;font-size:.8rem;resize:vertical" placeholder='[&#10;  {"year":"113","businessNo":"11301","projectName":"朱董太平農舍","client":"王大明","location":"台中","contractAmt":500000},&#10;  {"year":"113","businessNo":"11302","projectName":"卡登建設住宅","client":"李小華","location":"南屯","contractAmt":300000}&#10;]'></textarea>
      <button class="btn btn-primary" onclick="parseBatchProjectJson()" style="margin-top:12px">🔍 解析並預覽</button>
    </div>
  </div>`;
  overlay.classList.add('show');
}

function parseBatchProjectJson(){
  const raw=document.getElementById('batchProjectJsonInput').value.trim();
  if(!raw){toast('請先貼上JSON','error');return;}
  let parsed;
  try{parsed=JSON.parse(raw)}catch(e){toast('JSON格式錯誤：'+e.message,'error');return;}
  if(!Array.isArray(parsed))parsed=[parsed];
  _batchProjectItems=parsed.map(d=>{
    // Normalize old→new field names
    if(d.caseNo&&!d.businessNo){d.businessNo=d.caseNo;delete d.caseNo;}
    if(d.name&&!d.projectName){d.projectName=d.name;delete d.name;}
    if(!d.year&&d.businessNo&&d.businessNo.length>=3)d.year=d.businessNo.slice(0,3);
    d._fileName='JSON';
    d._status=(d.projectName||d.name)&&d.contractAmt?'ok':'partial';
    d._checked=true;
    d._expanded=false;
    return d;
  });
  renderBatchContractPreview();
}

function renderBatchContractPreview(){
  const overlay=document.getElementById('batchContractOverlay');
  if(!overlay)return;
  const items=_batchProjectItems;
  const checkedCount=items.filter(d=>d._checked).length;

  let tableRows=items.map((d,i)=>{
    const statusBadge=d._status==='ok'?'<span class="badge badge-success">✓ 解析成功</span>'
      :d._status==='partial'?'<span class="badge badge-warning">⚠ 部分資料</span>'
      :'<span class="badge badge-danger">✗ 失敗</span>';
    const periods=[];
    for(let j=1;j<=8;j++){if(d['p'+j+'_amt'])periods.push(`第${j}期:$${fmt(d['p'+j+'_amt'])}`);}
    const periodSummary=periods.length?periods.join(', '):'—';
    const expandIcon=d._expanded?'▼':'▶';
    let row=`<tr style="cursor:pointer" onclick="toggleBatchRow(${i})">
      <td><input type="checkbox" ${d._checked?'checked':''} onclick="event.stopPropagation();toggleBatchCheck(${i})"></td>
      <td>${d.year||'—'}</td><td>${d.businessNo||d.caseNo||'—'}</td><td>${d.projectName||d.name||'—'}</td><td>${d.client||'—'}</td><td>${d.location||'—'}</td>
      <td class="text-right mono">${d.contractAmt?fmtMoney(d.contractAmt):'—'}</td>
      <td style="font-size:.8rem">${periodSummary}</td>
      <td>${statusBadge}</td>
      <td style="font-size:.8rem;color:var(--text-light)">${d._fileName||''}</td>
    </tr>`;
    if(d._expanded){
      row+=`<tr><td colspan="10" style="background:#f8fafc;padding:16px">
        <div class="form-row" style="max-width:700px">
          <div class="form-group"><label>年份</label><input value="${d.year||''}" onchange="_batchProjectItems[${i}].year=this.value"></div>
          <div class="form-group"><label>業務編號</label><input value="${d.businessNo||d.caseNo||''}" onchange="_batchProjectItems[${i}].businessNo=this.value;_updateBatchStatus(${i})"></div>
          <div class="form-group"><label>案名</label><input value="${d.projectName||d.name||''}" onchange="_batchProjectItems[${i}].projectName=this.value;_updateBatchStatus(${i})"></div>
          <div class="form-group"><label>業主</label><input value="${d.client||''}" onchange="_batchProjectItems[${i}].client=this.value"></div>
          <div class="form-group"><label>地點</label><input value="${d.location||''}" onchange="_batchProjectItems[${i}].location=this.value"></div>
        </div>
        <div class="form-row" style="max-width:700px;margin-top:8px">
          <div class="form-group"><label>合約金額</label><input type="number" value="${d.contractAmt||''}" onchange="_batchProjectItems[${i}].contractAmt=Number(this.value)||0;_updateBatchStatus(${i})"></div>
          <div class="form-group"><label>複委託</label><input value="${d.subcontractor||''}" onchange="_batchProjectItems[${i}].subcontractor=this.value"></div>
        </div>
        <div class="form-row" style="max-width:700px;margin-top:8px">
          ${[1,2,3,4,5].map(j=>`<div class="form-group"><label>第${j}期</label><input type="number" value="${d['p'+j+'_amt']||''}" onchange="_batchProjectItems[${i}]['p${j}_amt']=Number(this.value)||0"></div>`).join('')}
        </div>
      </td></tr>`;
    }
    return row;
  }).join('');

  overlay.innerHTML=`<div class="ocr-panel" style="max-width:1200px">
    <div class="ocr-panel-header"><h3>📄 批次合約預覽（${items.length} 份）</h3><button class="btn btn-outline btn-sm" onclick="closeBatchContractPanel()">✕</button></div>
    <div style="padding:16px 24px;overflow:auto;max-height:65vh">
      <div class="table-wrap">
        <table>
          <thead><tr><th style="width:30px"><input type="checkbox" ${checkedCount===items.length?'checked':''} onclick="toggleAllBatchCheck(this.checked)"></th><th>年份</th><th>業務編號</th><th>案名</th><th>業主</th><th>地點</th><th class="text-right">合約金額</th><th>各期款項概要</th><th>狀態</th><th>檔案</th></tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
    </div>
    <div class="ocr-panel-footer">
      <span style="font-size:.85rem;color:var(--text-light);margin-right:auto">已勾選 ${checkedCount}/${items.length} 筆（點擊列可展開編輯）</span>
      <button class="btn btn-outline" onclick="closeBatchContractPanel()">取消</button>
      <button class="btn btn-success" onclick="confirmBatchProjectImport()">全部匯入（${checkedCount} 筆）</button>
    </div>
  </div>`;
}

function toggleBatchRow(i){
  _batchProjectItems[i]._expanded=!_batchProjectItems[i]._expanded;
  renderBatchContractPreview();
}
function toggleBatchCheck(i){
  _batchProjectItems[i]._checked=!_batchProjectItems[i]._checked;
  renderBatchContractPreview();
}
function toggleAllBatchCheck(checked){
  _batchProjectItems.forEach(d=>d._checked=checked);
  renderBatchContractPreview();
}
function _updateBatchStatus(i){
  const d=_batchProjectItems[i];
  d._status=(d.projectName||d.name)&&d.contractAmt?'ok':'partial';
}

function confirmBatchProjectImport(){
  const toImport=_batchProjectItems.filter(d=>d._checked);
  if(!toImport.length){toast('未勾選任何案件','error');return;}
  toImport.forEach(d=>{
    const bno=d.businessNo||d.caseNo||'';
    const yr=d.year||(bno.length>=3?bno.slice(0,3):'');
    const pname=d.projectName||d.name||'';
    const p={id:uid(),year:yr,businessNo:bno,projectName:pname,client:d.client||'',location:d.location||'',
      contractAmt:Number(d.contractAmt)||0,subcontractor:d.subcontractor||''};
    for(let i=1;i<=8;i++){p['p'+i+'_amt']=Number(d['p'+i+'_amt'])||0;p['p'+i+'_date']=d['p'+i+'_date']||'';p['p'+i+'_method']=d['p'+i+'_method']||'';}
    DB.projects.push(p);
  });
  saveData();
  closeBatchContractPanel();
  renderProjects();
  toast(`已匯入 ${toImport.length} 筆案件`);
  _batchProjectItems=[];
}

function closeBatchContractPanel(){
  const overlay=document.getElementById('batchContractOverlay');
  if(overlay)overlay.classList.remove('show');
}

// ===== RECEIPT AI RECOGNITION =====
function handleReceiptUploadInModal(file){
  if(!file||!file.type.startsWith('image/'))return;
  const fr=new FileReader();
  fr.onload=function(e){
    document.getElementById('receiptPreviewInModal').innerHTML=`<img src="${e.target.result}" style="max-width:200px;max-height:120px;border-radius:6px;border:1px solid var(--border);cursor:pointer" onclick="window.open(this.src)" title="點擊放大">`;
  };
  fr.readAsDataURL(file);
}

function applyReceiptAiJson(){
  const status=document.getElementById('receiptAiStatus');
  try{
    const txt=document.getElementById('receiptAiJson').value.trim();
    if(!txt){toast('請先貼上JSON','error');return}
    const d=JSON.parse(txt);
    const period=d.period||d.期別||1;
    if(period<1||period>5){toast('期別必須在1-5之間','error');return}
    const amtField=document.getElementById('mP'+period+'Amt');
    const dateField=document.getElementById('mP'+period+'Date');
    const methodField=document.getElementById('mP'+period+'Method');
    // Check if date already exists
    if(dateField.value&&dateField.value!==d.date){
      if(!confirm(`第${period}期已有收款日 ${dateField.value}，要覆蓋為 ${d.date} 嗎？`))return;
    }
    // Verify amount
    const existingAmt=Number(amtField.value)||0;
    const newAmt=d.amount||d.金額||0;
    if(existingAmt&&newAmt&&existingAmt!==newAmt){
      status.innerHTML=`<span style="color:var(--danger)">⚠️ 金額不符！表單: ${fmtMoney(existingAmt)} vs 匯款單: ${fmtMoney(newAmt)}</span>`;
      if(!confirm(`金額不符！\n表單第${period}期: ${fmtMoney(existingAmt)}\n匯款單: ${fmtMoney(newAmt)}\n\n要繼續填入日期和方式嗎？`))return;
    }
    if(d.date||d.日期)dateField.value=d.date||d.日期;
    if(d.method||d.方式){
      const m=d.method||d.方式;
      if(['電匯','支票','轉帳','現金'].includes(m))methodField.value=m;
    }
    if(newAmt&&!existingAmt)amtField.value=newAmt;
    status.innerHTML=`<span style="color:var(--success)">✅ 已填入第${period}期：${d.date||''} ${d.method||''}</span>`;
    toast(`第${period}期收款資料已填入`);
  }catch(e){status.innerHTML=`<span style="color:var(--danger)">JSON格式錯誤: ${e.message}</span>`;toast('JSON格式錯誤','error')}
}

// ===== RECEIPT RECOGNITION IN IMPORT PAGE =====
function renderReceiptImportSection(){
  return `<div style="margin-top:32px;padding:20px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:var(--radius)">
    <h3 style="margin-bottom:12px">📸 匯款單辨識</h3>
    <p style="font-size:.85rem;color:var(--text-light);margin-bottom:16px">上傳匯款單圖片，透過AI辨識後自動填入案件收款資料</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div>
        <div class="upload-zone" id="receiptImportZone" style="background:#fff">
          <div class="icon">📸</div>
          <p>拖曳匯款單圖片到此處<br>或點擊選擇檔案</p>
          <input type="file" accept="image/*" id="receiptImportInput" onchange="handleReceiptImportUpload(this.files[0])">
        </div>
        <div id="receiptImportPreview" style="margin-top:12px"></div>
      </div>
      <div>
        <div class="form-group"><label>選擇案件</label><select id="receiptProjectSelect" onchange="updateReceiptPeriodOptions()">${projectOptionsHTML('')}</select></div>
        <div class="form-group"><label>選擇期別</label><select id="receiptPeriodSelect"><option value="1">第1期</option><option value="2">第2期</option><option value="3">第3期</option><option value="4">第4期</option><option value="5">第5期</option></select></div>
        <div class="form-group">
          <label>🤖 貼上AI辨識結果 JSON</label>
          <textarea id="receiptImportJson" rows="5" style="width:100%;font-family:'SF Mono',monospace;font-size:.78rem;padding:8px;border:1px solid var(--border);border-radius:var(--radius);resize:vertical" placeholder='{"period":1,"amount":150000,"date":"2024-03-15","method":"電匯","reference":"..."}'></textarea>
        </div>
        <button class="btn btn-primary" onclick="applyReceiptImportJson()">🔍 解析並套用到案件</button>
        <div id="receiptImportStatus" style="margin-top:8px;font-size:.85rem"></div>
      </div>
    </div>
  </div>`;
}

function handleReceiptImportUpload(file){
  if(!file||!file.type.startsWith('image/'))return;
  const fr=new FileReader();
  fr.onload=function(e){
    document.getElementById('receiptImportPreview').innerHTML=`<img src="${e.target.result}" style="max-width:100%;max-height:250px;border-radius:8px;border:1px solid var(--border)">`;
  };
  fr.readAsDataURL(file);
}

function updateReceiptPeriodOptions(){
  const projId=document.getElementById('receiptProjectSelect').value;
  const proj=DB.projects.find(p=>p.id===projId);
  const sel=document.getElementById('receiptPeriodSelect');
  sel.innerHTML=[1,2,3,4,5].map(i=>{
    const info=proj?` — ${proj['p'+i+'_amt']?fmtMoney(proj['p'+i+'_amt']):'未設金額'}${proj['p'+i+'_date']?' (已收)':''}`:'';
    return `<option value="${i}">第${i}期${info}</option>`;
  }).join('');
}

function applyReceiptImportJson(){
  const status=document.getElementById('receiptImportStatus');
  const projId=document.getElementById('receiptProjectSelect').value;
  if(!projId){toast('請先選擇案件','error');return}
  const proj=DB.projects.find(p=>p.id===projId);
  if(!proj){toast('找不到案件','error');return}
  try{
    const txt=document.getElementById('receiptImportJson').value.trim();
    if(!txt){toast('請先貼上JSON','error');return}
    const d=JSON.parse(txt);
    const period=d.period||d.期別||Number(document.getElementById('receiptPeriodSelect').value)||1;
    if(period<1||period>5){toast('期別必須在1-5之間','error');return}
    const existingDate=proj['p'+period+'_date'];
    if(existingDate){
      if(!confirm(`第${period}期已有收款日 ${existingDate}，要覆蓋嗎？`))return;
    }
    const existingAmt=proj['p'+period+'_amt']||0;
    const newAmt=d.amount||d.金額||0;
    if(existingAmt&&newAmt&&existingAmt!==newAmt){
      status.innerHTML=`<span style="color:var(--danger)">⚠️ 金額不符！案件: ${fmtMoney(existingAmt)} vs 匯款單: ${fmtMoney(newAmt)}</span>`;
      if(!confirm(`金額不符！\n案件第${period}期: ${fmtMoney(existingAmt)}\n匯款單: ${fmtMoney(newAmt)}\n\n要繼續填入日期和方式嗎？`))return;
    }
    if(d.date||d.日期)proj['p'+period+'_date']=d.date||d.日期;
    if(d.method||d.方式){
      const m=d.method||d.方式;
      if(['電匯','支票','轉帳','現金'].includes(m))proj['p'+period+'_method']=m;
    }
    if(newAmt&&!existingAmt)proj['p'+period+'_amt']=newAmt;
    if(d.reference)proj['p'+period+'_ref']=d.reference;
    saveData();
    status.innerHTML=`<span style="color:var(--success)">✅ 已更新 ${proj.businessNo} ${proj.projectName} 第${period}期：${d.date||''} ${d.method||''}</span>`;
    toast(`${proj.projectName} 第${period}期收款資料已更新`);
    updateReceiptPeriodOptions();
  }catch(e){status.innerHTML=`<span style="color:var(--danger)">JSON格式錯誤: ${e.message}</span>`;toast('JSON格式錯誤','error')}
}

// ===== MODAL =====
function openModal(){document.getElementById('modalOverlay').classList.add('show')}
function closeModal(){document.getElementById('modalOverlay').classList.remove('show')}

// ===== REFRESH =====
function refreshAll() {
  const activePage = document.querySelector('.page.active');
  const pageId = activePage ? activePage.id.replace('page-', '') : 'dashboard';
  if(pageId==='dashboard') renderDashboard();
  if(pageId==='projects') renderProjects();
  if(pageId==='subcontractors') renderSubcontractors();
  if(pageId==='payables') renderPayables();
  if(pageId==='payroll') renderPayroll();
  if(pageId==='settings') renderSettings();
  if(pageId==='import') renderImportPage();
  if(pageId==='quotation') initQuotationPage();
}

// ===== INIT =====
setupUploadZone('excelZone','excelInput',handleExcelUpload);
setupUploadZone('invoiceZone','invoiceInput',handleInvoiceUpload);
renderDashboard();
// === 2026 月支出表同步 ===
function syncFromMonthlyExpenses() {
  try {
    const raw = localStorage.getItem('exp115v4');
    if (!raw) { toast('月支出表無資料，請先在月支出表中輸入', 'warning'); return; }
    const { empData } = JSON.parse(raw);
    if (!empData || !empData.employees) { toast('找不到員工薪資資料', 'warning'); return; }
    
    // Remove existing 2026 payroll
    DB.payroll = DB.payroll.filter(p => !p.month || !p.month.startsWith('2026'));
    
    empData.employees.forEach(emp => {
      const name = emp.name.replace(/^[a-z]\.\s*/i, '');
      for (let m = 0; m < 12; m++) {
        const getVal = (contains) => {
          const item = emp.items.find(it => it.name.includes(contains));
          return item ? (item.v[m] || 0) : 0;
        };
        
        const base = getVal('本俸底薪') || getVal('底薪');
        if (!base) continue;
        
        DB.payroll.push({
          empName: name,
          title: '',
          month: `2026-${String(m+1).padStart(2,'0')}`,
          baseSalary: base,
          overtime: getVal('加班'),
          mealAllowance: getVal('職務加給') + getVal('技術加給') + getVal('聚餐') + getVal('旅遊'),
          travelAllowance: 0,
          bonus: getVal('獎金'),
          holidayBonus: 0,
          yearEndBonus: 0,
          laborIns: Math.abs(getVal('勞保費') || getVal('勞工保險費(自付')),
          healthIns: Math.abs(getVal('健保費') || getVal('全民健保費(自付')),
          laborInsCompany: Math.abs(getVal('勞工保險費(勞保局)') || getVal('勞保(公司)')),
          healthInsCompany: Math.abs(getVal('全民健保費(公司代繳)') || getVal('健保(公司)')),
          laborRetirement: Math.abs(getVal('勞退')),
          incomeTax: Math.abs(getVal('代扣所得稅')),
          leaveDeduction: Math.abs(getVal('請假扣款')),
        });
      }
    });
    
    saveData();
    renderPayroll();
    toast(`已從月支出表同步 2026 年薪資資料`, 'success');
  } catch(e) {
    toast('同步失敗: ' + e.message, 'error');
  }
}

// 民國年 → 西元年 ISO (107.08.13 → 2018-08-13)
function rocToIso(rocDate) {
  if (!rocDate || rocDate.includes('-')) return rocDate; // 已是 ISO
  const m = rocDate.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return '';
  const year = parseInt(m[1]) + 1911;
  const month = m[2].padStart(2, '0');
  const day = m[3].padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 西元年 → 民國年 (2018-08-13 → 107.08.13)
function isoToRoc(isoDate) {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-');
  return `${parseInt(y) - 1911}.${parseInt(m)}.${parseInt(d)}`;
}
