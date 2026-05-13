import { ArrowRight, ArrowLeft, Wrench } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SelectableCard from '../components/SelectableCard';
import ScoreBox from '../components/ScoreBox';
import { TOOLS } from '../data/gameData';

const BUDGET = 10;

function calcScore(selectedTools, toolReason) {
  const totalCost = selectedTools.reduce((sum, t) => sum + t.cost, 0);
  let score = 0;
  if (totalCost <= BUDGET) score += 10;
  if (selectedTools.length >= 2) score += 10;
  if (toolReason.trim()) score += 10;
  return score;
}

const STAGE_STEPS = (current) => [
  { label: '🔍 Stage 1: Pain Point', active: current === 1, done: current > 1 },
  { label: '🛠️ Stage 2: Tools', active: current === 2, done: current > 2 },
  { label: '📊 Stage 3: Data', active: current === 3, done: current > 3 },
  { label: '💰 Stage 4: ROI', active: current === 4, done: current > 4 },
];

const COST_COLORS = {
  1: 'bg-green-100 text-green-700 border-green-300',
  2: 'bg-teal-100 text-teal-700 border-teal-300',
  3: 'bg-blue-100 text-blue-700 border-blue-300',
  4: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  5: 'bg-orange-100 text-orange-700 border-orange-300',
  6: 'bg-red-100 text-red-700 border-red-300',
  7: 'bg-red-200 text-red-800 border-red-400',
};

export default function Stage2Page({
  selectedCase,
  selectedPainPoints,
  selectedTools,
  toolReason,
  onUpdate,
  onNext,
  onBack,
}) {
  const totalCost = selectedTools.reduce((sum, t) => sum + t.cost, 0);
  const score = calcScore(selectedTools, toolReason);
  const canNext = selectedTools.length >= 2 && totalCost <= BUDGET;
  const remaining = BUDGET - totalCost;

  const toggleTool = (tool) => {
    if (selectedTools.find((t) => t.id === tool.id)) {
      onUpdate({ selectedTools: selectedTools.filter((t) => t.id !== tool.id) });
    } else if (totalCost + tool.cost <= BUDGET) {
      onUpdate({ selectedTools: [...selectedTools, tool] });
    }
  };

  return (
    <PageLayout
      stageInfo={{
        stages: STAGE_STEPS(2),
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
            {selectedPainPoints.length > 0 && (
              <div className="ml-auto flex flex-wrap gap-1">
                {selectedPainPoints.map((pp) => (
                  <span key={pp} className="text-xs bg-blue-100 text-blue-600 rounded-full px-2 py-0.5">{pp}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stage header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0">
            2
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">Tool Match Challenge</h2>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              <Wrench size={14} /> เลือกเครื่องมือที่เหมาะสมภายในงบประมาณ
            </p>
          </div>
        </div>

        {/* Instruction */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-amber-800 text-sm md:text-base leading-relaxed">
          เลือกเครื่องมือที่เหมาะกับปัญหา <strong>โดยมีงบจำกัด {BUDGET} คะแนน ห้ามเลือกเกินงบ</strong>
        </div>

        {/* Budget bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600 font-semibold text-sm">งบประมาณ</span>
            <span className={`font-bold text-base ${remaining < 0 ? 'text-red-600' : remaining === 0 ? 'text-teal-600' : 'text-slate-700'}`}>
              ใช้ไป {totalCost} / {BUDGET} คะแนน
              {remaining > 0 && <span className="text-slate-400 font-normal text-sm"> (เหลือ {remaining})</span>}
            </span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${totalCost > BUDGET ? 'bg-red-500' : totalCost === BUDGET ? 'bg-teal-500' : 'bg-blue-500'}`}
              style={{ width: `${Math.min((totalCost / BUDGET) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {TOOLS.map((tool) => {
            const selected = !!selectedTools.find((t) => t.id === tool.id);
            const wouldExceed = !selected && totalCost + tool.cost > BUDGET;
            return (
              <SelectableCard
                key={tool.id}
                selected={selected}
                disabled={wouldExceed}
                onClick={() => toggleTool(tool)}
              >
                <div className="pr-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-bold text-slate-800 text-sm">{tool.name}</span>
                    <span className={`shrink-0 text-xs font-bold border rounded-full px-2 py-0.5 ${COST_COLORS[tool.cost] || 'bg-slate-100 text-slate-600 border-slate-300'}`}>
                      {tool.cost} pt
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{tool.use}</p>
                </div>
              </SelectableCard>
            );
          })}
        </div>

        {/* Selected tools summary */}
        {selectedTools.length > 0 && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6">
            <div className="text-sm font-semibold text-teal-700 mb-2">เครื่องมือที่เลือก:</div>
            <div className="flex flex-wrap gap-2">
              {selectedTools.map((t) => (
                <span key={t.id} className="bg-teal-100 text-teal-800 text-sm rounded-lg px-3 py-1 font-medium">
                  {t.name} <span className="text-teal-500">({t.cost} pt)</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reason input */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <label className="block font-semibold text-slate-700 mb-2 text-base">
            💡 เหตุผลที่เลือกเครื่องมือเหล่านี้
          </label>
          <textarea
            rows={3}
            value={toolReason}
            onChange={(e) => onUpdate({ toolReason: e.target.value })}
            placeholder="อธิบายว่าทำไม Tool นี้ช่วยแก้ Pain Point ได้"
            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-teal-500 transition-colors resize-none"
          />
        </div>

        {/* Score */}
        <div className="mb-6">
          <ScoreBox label="คะแนน Stage 2" score={score} maxScore={30} />
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
                ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            ไปขั้นตอนถัดไป: Data Discovery
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
