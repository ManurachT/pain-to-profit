export const CASES = [
  {
    id: 1,
    title: 'รายงานผู้บริหารล่าช้า',
    description: 'ทีมต้องรวมข้อมูลจากหลายระบบด้วย Excel ทุกสัปดาห์',
    icon: '📊',
  },
  {
    id: 2,
    title: 'งานอนุมัติจัดซื้อใช้เวลานาน',
    description: 'เอกสารผ่านหลายคน ทำให้การซื้อของล่าช้า',
    icon: '📋',
  },
  {
    id: 3,
    title: 'งานแจ้งซ่อมลูกบ้านตกหล่น',
    description: 'รับเรื่องหลายช่องทาง ข้อมูลไม่ครบ ติดตามสถานะยาก',
    icon: '🔧',
  },
  {
    id: 4,
    title: 'การติดตามอบรมพนักงานไม่ชัดเจน',
    description: 'ไม่รู้ว่าใครเรียนอะไรแล้ว และผลลัพธ์เป็นอย่างไร',
    icon: '🎓',
  },
  {
    id: 5,
    title: 'งานตรวจหน้างานใช้กระดาษจำนวนมาก',
    description: 'ข้อมูลจากหน้างานส่งกลับช้าและตรวจสอบยาก',
    icon: '📝',
  },
  {
    id: 6,
    title: 'ข้อมูลลูกค้าอยู่หลายระบบ',
    description: 'ฝ่ายขายและบริการลูกค้ามองข้อมูลไม่ตรงกัน',
    icon: '👥',
  },
];

export const PAIN_POINTS = [
  'งานซ้ำซ้อน',
  'ข้อมูลผิดพลาด',
  'ใช้เวลานาน',
  'รออนุมัติหลายขั้น',
  'ไม่มีเจ้าของงานชัดเจน',
  'ลูกค้ารอนาน',
  'รายงานไม่ตรงกัน',
  'ข้อมูลกระจายหลายที่',
  'ตัดสินใจช้า',
  'ตรวจสอบย้อนหลังไม่ได้',
  'มีงานตกหล่น',
  'ต้องใช้ Manual Excel มากเกินไป',
];

export const TOOLS = [
  { id: 'google-form', name: 'Google Form', cost: 1, use: 'เก็บข้อมูลให้เป็นระบบ' },
  { id: 'google-sheet', name: 'Google Sheet', cost: 1, use: 'รวมข้อมูลเบื้องต้น' },
  { id: 'gemini', name: 'Gemini', cost: 2, use: 'ช่วยสรุป วิเคราะห์ และร่างเอกสาร' },
  { id: 'dashboard', name: 'Dashboard', cost: 3, use: 'แสดง KPI และสถานะแบบ Real-time' },
  { id: 'appsheet', name: 'AppSheet', cost: 4, use: 'สร้าง App ใช้งานง่าย' },
  { id: 'workflow', name: 'Workflow Approval', cost: 4, use: 'จัดการอนุมัติเป็นขั้นตอน' },
  { id: 'rpa', name: 'RPA', cost: 5, use: 'ลดงานซ้ำที่มีกฎชัดเจน' },
  { id: 'ocr', name: 'OCR', cost: 3, use: 'แปลงเอกสารเป็นข้อมูล' },
  { id: 'chatbot', name: 'Chatbot', cost: 4, use: 'รับเรื่องและตอบคำถามเบื้องต้น' },
  { id: 'api', name: 'API Integration', cost: 6, use: 'เชื่อมข้อมูลข้ามระบบ' },
  { id: 'dw', name: 'Data Warehouse', cost: 7, use: 'รวมข้อมูลระดับองค์กร' },
];

export const DATA_ITEMS = [
  'Lead Time',
  'Cycle Time',
  'Error Rate',
  'Number of Cases',
  'Backlog',
  'SLA',
  'Cost per Case',
  'Approval Time',
  'Rework Rate',
  'Customer Satisfaction',
  'Employee Time Spent',
  'Defect Type',
  'Training Completion Rate',
  'Sales Conversion Rate',
  'Complaint Volume',
];

export const BADGES = [
  { min: 0, max: 50, label: 'Need More Thinking', color: 'bg-gray-100 text-gray-700', border: 'border-gray-300' },
  { min: 51, max: 80, label: 'Good Process Designer', color: 'bg-blue-100 text-blue-700', border: 'border-blue-300' },
  { min: 81, max: 110, label: 'Transformation Champion', color: 'bg-teal-100 text-teal-700', border: 'border-teal-300' },
  { min: 111, max: Infinity, label: 'Executive Ready', color: 'bg-orange-100 text-orange-700', border: 'border-orange-300' },
];

export const getBadge = (score) => {
  return BADGES.find((b) => score >= b.min && score <= b.max) || BADGES[0];
};
