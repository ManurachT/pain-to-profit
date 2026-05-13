import { ArrowRight, ArrowLeft, TrendingUp, Calculator } from 'lucide-react';
import { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import ScoreBox from '../components/ScoreBox';

function formatNumber(n) {
  if (!isFinite(n) || isNaN(n)) return '-';
  return n.toLocaleString('th-TH');
}

function calcROI(currentHours, targetHours, costPerHour, investmentCost) {
  const ch = parseFloat(currentHours) || 0;
  const th = parseFloat(targetHours) || 0;
  const cph = parseFloat(costPerHour) || 0;
  const ic = parseFloat(investmentCost) || 0;
  const hoursSaved = Math.max(0, ch - th);
  const monthlySavings = hoursSaved * cph;
  const annualSavings = monthlySavings * 12;
  const paybackMonths = monthlySavings > 0 ? ic / monthlySavings : Infinity;
  return { hoursSaved, monthlySavings, annualSavings, paybackMonths };
}

function calcScore(currentHours, targetHours, costPerHour, investmentCost, pitchSummary) {
  const allFilled = [currentHours, targetHours, costPerHour, investmentCost].every((v) => v !== '' && !isNaN(parseFloat(v)));
  const { annualSavings, paybackMonths } = calcROI(currentHours, targetHours, costPerHour, investmentCost);
  let score = 0;
  if (allFilled) score += 10;
  if (annualSavings > 0) score += 10;
  if (isFinite(paybackMonths) && paybackMonths > 0) score += 10;
  if (isFinite(paybackMonths) && paybackMonths <= 12) score += 10;
  return score;
}

const STAGE_STEPS = (current) => [
  { label: '🔍 Stage 1: Pain Point', active: current === 1, done: current > 1 },
  { label: '🛠️ Stage 2: Tools', active: current === 2, done: current > 2 },
  { label: '📊 Stage 3: Data', active: current === 3, done: current > 3 },
  { label: '💰 Stage 4: ROI', active: current === 4, done: current > 4 },
];

export default function Stage4Page({
  selectedCase,
  selectedPainPoints,
  selectedTools,
  selectedData,
  currentHours,
  targetHours,
  costPerHour,
  investmentCost,
  intangibleBenefit,
  pitchSummary,
  onUpdate,
  onNext,
  onBack,
}) {
  const { hoursSaved, monthlySavings, annualSavings, paybackMonths } = calcROI(
    currentHours, targetHours, costPerHour, investmentCost
  );
  const score = calcScore(currentHours, targetHours, costPerHour, investmentCost, pitchSummary);
  const allFilled = [currentHours, targetHours, costPerHour, investmentCost].every(
    (v) => v !== '' && !isNaN(parseFloat(v))
  );
  const canNext = allFilled;

  // Auto-generate pitch when ROI values change
  useEffect(() => {
    if (!allFilled) return;
    const caseName = selectedCase?.title || '...';
    const pains = selectedPainPoints.join(', ') || '...';
    const tools = selectedTools.map((t) => t.name).join(', ') || '...';
    const data = selectedData.join(', ') || '...';
    const generated = `ทีมของเราเลือกปรับปรุงกระบวนการ "${caseName}" โดยพบ Pain Point หลักคือ ${pains} เราเสนอใช้ ${tools} เพื่อช่วยลดปัญหา โดยจะใช้ข้อมูล ${data} ในการวัดผล ความคุ้มค่าคือสามารถลดเวลาได้ ${hoursSaved} ชั่วโมงต่อเดือน ประหยัดได้ประมาณ ${formatNumber(annualSavings)} บาทต่อปี และคืนทุนใน ${isFinite(paybackMonths) ? Math.ceil(paybackMonths) : '—'} เดือน`;
    onUpdate({ pitchSummary: generated });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHours, targetHours, costPerHour, investmentCost]);

  const inputCls = 'w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-orange-400 transition-colors';

  return (
    <PageLayout
      stageInfo={{
        stages: STAGE_STEPS(4),
        score,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Case banner */}
        {selectedCase && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 mb-6 flex items-center gap-3">
            <span className="text-2xl">{selectedCase.icon}</span>
            <div>
              <div className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Case ที่เลือก</div>
              <div className="font-bold text-blue-800">{selectedCase.title}</div>
            </div>
          </div>
        )}

        {/* Stage header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0">
            4
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">ROI Pitch Builder</h2>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              <TrendingUp size={14} /> คำนวณความคุ้มค่าและสร้าง Pitch
            </p>
          </div>
        </div>

        {/* Instruction */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-amber-800 text-sm md:text-base leading-relaxed">
          กรอกตัวเลขเพื่อคำนวณความคุ้มค่า และสร้าง <strong>Pitch สำหรับผู้บริหาร</strong>
        </div>

        {/* Input form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator size={18} className="text-orange-500" />
            <h3 className="font-bold text-slate-700">ข้อมูลสำหรับคำนวณ ROI</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                ชั่วโมงทำงานปัจจุบัน / เดือน
              </label>
              <input
                type="number"
                min="0"
                value={currentHours}
                onChange={(e) => onUpdate({ currentHours: e.target.value })}
                placeholder="เช่น 80"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                ชั่วโมงที่ต้องการหลังปรับปรุง / เดือน
              </label>
              <input
                type="number"
                min="0"
                value={targetHours}
                onChange={(e) => onUpdate({ targetHours: e.target.value })}
                placeholder="เช่น 20"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                ค่าใช้จ่ายเฉลี่ยต่อชั่วโมง (บาท)
              </label>
              <input
                type="number"
                min="0"
                value={costPerHour}
                onChange={(e) => onUpdate({ costPerHour: e.target.value })}
                placeholder="เช่น 500"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                ค่าลงทุน (บาท)
              </label>
              <input
                type="number"
                min="0"
                value={investmentCost}
                onChange={(e) => onUpdate({ investmentCost: e.target.value })}
                placeholder="เช่น 120000"
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                ประโยชน์อื่น ๆ ที่วัดเป็นตัวเลขไม่ได้ (Intangible Benefits)
              </label>
              <input
                type="text"
                value={intangibleBenefit}
                onChange={(e) => onUpdate({ intangibleBenefit: e.target.value })}
                placeholder="เช่น ความพึงพอใจลูกค้า, ลดความเครียดพนักงาน"
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* Result cards */}
        {allFilled && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">{hoursSaved}</div>
              <div className="text-xs text-blue-500 mt-1 leading-tight">ลดเวลาได้<br />ชั่วโมงต่อเดือน</div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-teal-700">฿{formatNumber(monthlySavings)}</div>
              <div className="text-xs text-teal-500 mt-1 leading-tight">ประหยัดได้<br />ต่อเดือน</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-700">฿{formatNumber(annualSavings)}</div>
              <div className="text-xs text-orange-500 mt-1 leading-tight">ประหยัดได้<br />ต่อปี</div>
            </div>
            <div className={`rounded-xl p-4 text-center border ${
              isFinite(paybackMonths) && paybackMonths <= 12
                ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
                : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200'
            }`}>
              <div className={`text-2xl font-bold ${
                isFinite(paybackMonths) && paybackMonths <= 12 ? 'text-green-700' : 'text-slate-600'
              }`}>
                {isFinite(paybackMonths) ? Math.ceil(paybackMonths) : '∞'}
              </div>
              <div className={`text-xs mt-1 leading-tight ${
                isFinite(paybackMonths) && paybackMonths <= 12 ? 'text-green-500' : 'text-slate-400'
              }`}>ระยะเวลา<br />คืนทุน (เดือน)</div>
            </div>
          </div>
        )}

        {/* Pitch summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <label className="block font-bold text-slate-700 mb-2 text-base">
            🎤 Pitch Summary สำหรับผู้บริหาร
          </label>
          <textarea
            rows={5}
            value={pitchSummary}
            onChange={(e) => onUpdate({ pitchSummary: e.target.value })}
            placeholder="Pitch summary จะถูกสร้างอัตโนมัติเมื่อกรอกข้อมูล ROI ครบ"
            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-orange-400 transition-colors resize-none"
          />
          <p className="text-xs text-slate-400 mt-1">แก้ไขได้ตามต้องการ</p>
        </div>

        {/* Score */}
        <div className="mb-6">
          <ScoreBox label="คะแนน Stage 4" score={score} maxScore={40} />
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={18} />
            ย้อนกลับ
          </button>
          <button
            onClick={() => onNext(score)}
            disabled={!canNext}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-base transition-all ${
              canNext
                ? 'bg-orange-500 hover:bg-orange-400 text-white shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            ดูผลลัพธ์สุดท้าย
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
