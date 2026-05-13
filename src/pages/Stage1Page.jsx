import { ArrowRight, ArrowLeft, Search } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SelectableCard from '../components/SelectableCard';
import ScoreBox from '../components/ScoreBox';
import { PAIN_POINTS } from '../data/gameData';

const MAX_SELECT = 3;

function calcScore(selected, businessImpact) {
  let score = 0;
  if (selected.length === MAX_SELECT) score += 10;
  if (businessImpact.trim()) score += 10;
  if (businessImpact.trim() && /\d/.test(businessImpact)) score += 10;
  return score;
}

const STAGE_STEPS = (current) => [
  { label: '🔍 Stage 1: Pain Point', active: current === 1, done: current > 1 },
  { label: '🛠️ Stage 2: Tools', active: current === 2, done: current > 2 },
  { label: '📊 Stage 3: Data', active: current === 3, done: current > 3 },
  { label: '💰 Stage 4: ROI', active: current === 4, done: current > 4 },
];

export default function Stage1Page({
  selectedCase,
  selectedPainPoints,
  businessImpact,
  onUpdate,
  onNext,
  onBack,
}) {
  const score = calcScore(selectedPainPoints, businessImpact);
  const canNext = selectedPainPoints.length === MAX_SELECT;

  const togglePainPoint = (pp) => {
    if (selectedPainPoints.includes(pp)) {
      onUpdate({ selectedPainPoints: selectedPainPoints.filter((p) => p !== pp) });
    } else if (selectedPainPoints.length < MAX_SELECT) {
      onUpdate({ selectedPainPoints: [...selectedPainPoints, pp] });
    }
  };

  return (
    <PageLayout
      stageInfo={{
        stages: STAGE_STEPS(1),
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
              <div className="text-sm text-blue-600">{selectedCase.description}</div>
            </div>
          </div>
        )}

        {/* Stage header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0">
            1
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">Pain Point Detective</h2>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              <Search size={14} /> ระบุปัญหาและผลกระทบทางธุรกิจ
            </p>
          </div>
        </div>

        {/* Instruction */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-amber-800 text-sm md:text-base leading-relaxed">
          เลือก <strong>Pain Point ที่ตรงกับ Case มากที่สุด 3 ข้อ</strong> และเขียน Business Impact เป็นตัวเลขหรือผลกระทบที่ชัดเจน
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-slate-600 text-sm font-medium">
            เลือกแล้ว {selectedPainPoints.length} / {MAX_SELECT} ข้อ
          </span>
          <div className="flex gap-1">
            {Array.from({ length: MAX_SELECT }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                  i < selectedPainPoints.length
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-slate-300 text-slate-300'
                }`}
              >
                {i < selectedPainPoints.length ? '✓' : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Pain point cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {PAIN_POINTS.map((pp) => {
            const selected = selectedPainPoints.includes(pp);
            const disabled = !selected && selectedPainPoints.length >= MAX_SELECT;
            return (
              <SelectableCard
                key={pp}
                selected={selected}
                disabled={disabled}
                onClick={() => togglePainPoint(pp)}
              >
                <span className="text-sm font-medium text-slate-700 pr-4">{pp}</span>
              </SelectableCard>
            );
          })}
        </div>

        {/* Business Impact input */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <label className="block font-semibold text-slate-700 mb-2 text-base">
            💼 Business Impact: ปัญหานี้กระทบธุรกิจอย่างไร?
          </label>
          <textarea
            rows={3}
            value={businessImpact}
            onChange={(e) => onUpdate({ businessImpact: e.target.value })}
            placeholder="เช่น ใช้เวลา 20 ชม./เดือน, ลูกค้ารอเพิ่ม 3 วัน, ข้อมูลผิดพลาด 10%"
            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
          <div className="mt-2 flex gap-2 flex-wrap">
            {businessImpact.trim() && (
              <span className="text-xs bg-teal-50 text-teal-600 border border-teal-200 rounded-full px-2 py-0.5">✓ มีข้อมูล +10</span>
            )}
            {businessImpact.trim() && /\d/.test(businessImpact) && (
              <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 rounded-full px-2 py-0.5">✓ มีตัวเลข Bonus +10</span>
            )}
          </div>
        </div>

        {/* Score */}
        <div className="mb-6">
          <ScoreBox label="คะแนน Stage 1" score={score} maxScore={30} />
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
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            ไปขั้นตอนถัดไป: Tools
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
