/* ==========================================================================
   ABC POS — shared demo data + helpers
   Every screen derives its numbers from here, so nothing on the dashboard
   can contradict anything on the till.
   Flip CONFIG.MODE to 'live' once the API is deployed.
   ========================================================================== */

const CONFIG = {
  MODE: 'demo',
  API_BASE: 'https://api.bytecraft.live',
  CURRENCY: 'AED',
  VAT_RATE: 0.05
};

/* ---------- money helpers ---------- */
const money  = n => CONFIG.CURRENCY + ' ' + Number(n).toLocaleString('en-AE',{minimumFractionDigits:2,maximumFractionDigits:2});
const money0 = n => CONFIG.CURRENCY + ' ' + Math.round(n).toLocaleString('en-AE');
const num    = n => Number(n).toLocaleString('en-AE');
const $  = (s,r=document) => r.querySelector(s);
const $$ = (s,r=document) => [...r.querySelectorAll(s)];

/* ==========================================================================
   CATALOG — one product model, two verticals.
   Restaurant items are tapped from a grid; grocery items are scanned.
   `weighed` items are priced per kg. `stock` only exists where tracked.
   ========================================================================== */
const CATALOG = {
  RESTAURANT: {
    name:'Al Noor Restaurant',
    outlet:'Main — Al Muntasir Rd',
    groups:[
      { name:'Starters', items:[
        {id:101,name:'Chicken Samosa',note:'4 pieces',price:12},
        {id:102,name:'Veg Pakora',note:'Chickpea batter',price:10},
        {id:103,name:'Hummus & Bread',note:'Warm khubz',price:14},
        {id:104,name:'Dynamite Shrimp',note:'Spicy mayo',price:28},
      ]},
      { name:'Grills', items:[
        {id:201,name:'Chicken Tikka',note:'Charcoal',price:32},
        {id:202,name:'Seekh Kebab',note:'Lamb mince',price:30},
        {id:203,name:'Mixed Grill',note:'Sharing platter',price:68},
        {id:204,name:'Lamb Chops',note:'Four pieces',price:58},
      ]},
      { name:'Curries', items:[
        {id:301,name:'Butter Chicken',note:'Creamy',price:36},
        {id:302,name:'Karahi Chicken',note:'Half',price:42},
        {id:303,name:'Daal Makhani',note:'Slow cooked',price:24},
        {id:304,name:'Palak Paneer',note:'Spinach',price:26},
      ]},
      { name:'Breads', items:[
        {id:401,name:'Butter Naan',price:5},
        {id:402,name:'Garlic Naan',price:6},
        {id:403,name:'Tandoori Roti',price:3},
        {id:404,name:'Cheese Naan',price:9},
      ]},
      { name:'Drinks', items:[
        {id:501,name:'Karak Chai',price:4},
        {id:502,name:'Fresh Lime Mint',price:12},
        {id:503,name:'Mango Lassi',price:14},
        {id:504,name:'Water 500ml',price:2},
      ]},
      { name:'Sweets', items:[
        {id:601,name:'Gulab Jamun',note:'2 pieces',price:10},
        {id:602,name:'Kunafa Slice',price:18},
      ]},
    ]
  },

  GROCERY: {
    name:'Daily Mart',
    outlet:'Al Nakheel Branch',
    groups:[
      { name:'Produce', items:[
        {id:1101,name:'Bananas',barcode:'2000011',price:6.50,weighed:true,unit:'kg',stock:42.5},
        {id:1102,name:'Tomatoes',barcode:'2000012',price:8.00,weighed:true,unit:'kg',stock:28.0},
        {id:1103,name:'Cucumber',barcode:'2000013',price:5.50,weighed:true,unit:'kg',stock:16.4},
        {id:1104,name:'Red Onion',barcode:'2000014',price:4.75,weighed:true,unit:'kg',stock:61.2},
      ]},
      { name:'Dairy', items:[
        {id:1201,name:'Al Ain Milk 1L',barcode:'6291001',price:7.25,stock:48},
        {id:1202,name:'Laban 1L',barcode:'6291002',price:6.00,stock:31},
        {id:1203,name:'Greek Yoghurt 500g',barcode:'6291003',price:12.50,stock:7},
        {id:1204,name:'Halloumi 250g',barcode:'6291004',price:18.75,stock:0},
      ]},
      { name:'Bakery', items:[
        {id:1301,name:'Arabic Bread 5pc',barcode:'6291101',price:3.50,stock:64},
        {id:1302,name:'Croissant',barcode:'6291102',price:4.25,stock:22},
        {id:1303,name:'Brown Loaf',barcode:'6291103',price:9.00,stock:11},
      ]},
      { name:'Pantry', items:[
        {id:1401,name:'Basmati Rice 5kg',barcode:'6291201',price:38.00,stock:19},
        {id:1402,name:'Sunflower Oil 1.8L',barcode:'6291202',price:21.50,stock:26},
        {id:1403,name:'Lentils 1kg',barcode:'6291203',price:9.75,stock:5},
        {id:1404,name:'Sugar 2kg',barcode:'6291204',price:11.00,stock:33},
      ]},
      { name:'Drinks', items:[
        {id:1501,name:'Water 6x1.5L',barcode:'6291301',price:10.50,stock:57},
        {id:1502,name:'Cola 330ml',barcode:'6291302',price:2.50,stock:120},
        {id:1503,name:'Orange Juice 1L',barcode:'6291303',price:13.00,stock:14},
      ]},
      { name:'Household', items:[
        {id:1601,name:'Dish Soap 750ml',barcode:'6291401',price:14.25,stock:18},
        {id:1602,name:'Kitchen Roll 4pc',barcode:'6291402',price:16.00,stock:9},
      ]},
    ]
  }
};

/* flat lookup for barcode scanning */
function flatItems(vertical){
  return CATALOG[vertical].groups.flatMap(g => g.items.map(i => ({...i, group:g.name})));
}
function findByBarcode(vertical, code){
  return flatItems(vertical).find(i => i.barcode === String(code).trim());
}

/* ==========================================================================
   TRADING HISTORY — 14 days. Everything on the dashboard derives from this.
   ========================================================================== */
const DAYS = [
  {date:'2026-07-12',cash:1680,card: 980,orders: 61},
  {date:'2026-07-13',cash:1420,card: 860,orders: 54},
  {date:'2026-07-14',cash:1510,card: 910,orders: 57},
  {date:'2026-07-15',cash:1640,card:1020,orders: 62},
  {date:'2026-07-16',cash:2180,card:1360,orders: 79},
  {date:'2026-07-17',cash:3120,card:2040,orders:112},
  {date:'2026-07-18',cash:2960,card:1880,orders:106},
  {date:'2026-07-19',cash:1720,card:1010,orders: 63},
  {date:'2026-07-20',cash:1380,card: 840,orders: 52},
  {date:'2026-07-21',cash:1560,card: 950,orders: 59},
  {date:'2026-07-22',cash:1700,card:1080,orders: 64},
  {date:'2026-07-23',cash:2240,card:1420,orders: 82},
  {date:'2026-07-24',cash:3260,card:2120,orders:118},
  {date:'2026-07-25',cash:3040,card:1960,orders:110},
];

const TOP_ITEMS = [
  {name:'Karak Chai',     qty:941, value:3764},
  {name:'Chicken Tikka',  qty:312, value:9984},
  {name:'Butter Naan',    qty:288, value:1440},
  {name:'Mixed Grill',    qty:187, value:12716},
  {name:'Butter Chicken', qty:164, value:5904},
];

const DISCOUNT_SHARE = 0.012;   // ~1.2% of net sales discounted
const COGS_SHARE     = 0.40;    // food cost as share of net sales

/* Derived totals — the single source of truth for KPIs and the ledger. */
function totals(days){
  const cash   = days.reduce((a,d)=>a+d.cash,0);
  const card   = days.reduce((a,d)=>a+d.card,0);
  const orders = days.reduce((a,d)=>a+d.orders,0);
  const gross  = cash + card;                        // collected, VAT inclusive
  const vat    = gross - gross/(1+CONFIG.VAT_RATE);
  const net    = gross - vat;
  const disc   = net * DISCOUNT_SHARE;
  const rev    = net + disc;
  const cogs   = net * COGS_SHARE;
  return {cash,card,orders,gross,vat,net,disc,rev,cogs};
}

/* Trial balance built from the same totals, so it always foots. */
function trialBalance(t){
  return [
    {code:'1001',name:'Cash in Drawer',    type:'Asset',     dr:t.cash, cr:0},
    {code:'1002',name:'Card Clearing',     type:'Asset',     dr:t.card, cr:0},
    {code:'1200',name:'Inventory',         type:'Asset',     dr:0,      cr:t.cogs},
    {code:'2101',name:'VAT Payable',       type:'Liability', dr:0,      cr:t.vat},
    {code:'4001',name:'Sales Revenue',     type:'Revenue',   dr:0,      cr:t.rev},
    {code:'4101',name:'Sales Discounts',   type:'Revenue',   dr:t.disc, cr:0},
    {code:'5001',name:'Cost of Goods Sold',type:'Expense',   dr:t.cogs, cr:0},
  ];
}

/* ---------- capability manifest ----------
   One codebase, many verticals. This is what decides which screens exist.   */
const CAPABILITIES = {
  RESTAURANT:{tables:true, orderTypes:true, scanFirst:false, weighed:false, stock:false, kot:true},
  GROCERY:   {tables:false,orderTypes:false,scanFirst:true,  weighed:true,  stock:true,  kot:false},
  FUEL:      {tables:false,orderTypes:false,scanFirst:true,  weighed:false, stock:true,  kot:false},
};

/* ---------- tiny toast ---------- */
function toast(msg, kind='ink'){
  let host = $('#toastHost');
  if(!host){
    host = document.createElement('div');
    host.id = 'toastHost';
    host.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:200;display:flex;flex-direction:column;gap:8px;align-items:center;pointer-events:none';
    document.body.appendChild(host);
  }
  const bg = kind==='jade' ? 'var(--jade)' : kind==='rust' ? 'var(--rust)' : 'var(--espresso)';
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = `background:${bg};color:#F6EFE3;font-size:13.5px;font-weight:500;padding:11px 20px;border-radius:11px;box-shadow:0 12px 30px rgba(21,17,9,.3);opacity:0;transform:translateY(8px);transition:opacity .2s,transform .2s`;
  host.appendChild(el);
  requestAnimationFrame(()=>{el.style.opacity='1';el.style.transform='none'});
  setTimeout(()=>{el.style.opacity='0';el.style.transform='translateY(8px)';setTimeout(()=>el.remove(),260)},2600);
}
