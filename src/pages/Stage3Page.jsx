import { ArrowRight, ArrowLeft, BarChart2 } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SelectableCard from '../components/SelectableCard';
import ScoreBox from '../components/ScoreBox';
import { DATA_ITEMS } from '../data/gameData';

const REQUIRED = 4;

function calcScore(selectedData, dataDetails) {
  let score = 0;
  if (selectedData.length === REQUIRED) score += 10;
  const allHaveSource = selectedData.length > 0 && selectedData.every((d) => dataDetails[d]?.source?.trim());
  if (allHaveSource) score += 10;
  const allHaveOwnerUse = selectedData.length > 0 && selectedData.every(
    (d) => dataDetails[d]?.owner?.trim() && dataDetails[d]?.use?.trim()
  );
  if (allHaveOwnerUse) score += 10;
  return score;
}

const STAGE_STEPS = (current) => [
  { label: '🔍 Stage 1: Pain Point', active: current === 1, done: current > 1 },
  { label: '🛠️ Stage 2: Tools', active: current === 2, done: current > 2 },
  { label: '📊 Stage 3: Data', active: current === 3, done: current > 3 },
  { label: '💰 Stage 4: ROI', active: current === 4, done: current > 4 },
];

export default function Stage3Page({
  selectedCase,
  selectedData,
  dataDetails,
  onUpdate,
  onNext,
  onBack,
}) {
  const score = calcScore(selectedData, dataDetails);
  const canNext = selectedData.length === REQUIRED;

  const toggleData = (item) => {
    if (selectedData.includes(item)) {
      onUpdate({ selectedData: selectedData.filter((d) => d !== item) });
    } else if (selectedData.length < REQUIRED) {
      onUpdate({ selectedData: [...selectedData, item] });
    }
  };

  const updateDetail = (dataName, field, value) => {
    onUpdate({
      dataDetails: {
        ...dataDetails,
        [dataName]: { ...(dataDetails[dataName] || {}), [field]: value },
      },
    });
  };

  return (
    <PageLayout
      stageInfo={{
        stages: STAGE_STEPS(3),
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
          <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0">
            3
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">Data Discovery Hunt</h2>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              <BarChart2 size={14} /> ค้นหาข้อมูลที่จำเป็นในการวัดผล
            </p>
          </div>
        </div>

        {/* Instruction */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-amber-800 text-sm md:text-base leading-relaxed">
          เลือก <strong>ข้อมูลที่จำเป็นต่อการวัดผล 4 รายการ</strong> และระบุ Source, Owner, Use สำหรับแต่ละรายการ
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-slate-600 text-sm font-medium">
            เลือกแล้ว {selectedData.length} / {REQUIRED} รายการ
          </span>
          <div className="flex gap-1">
            {Array.from({ length: REQUIRED }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                  i < selectedData.length
                    ? 'bg-indigo-500 border-indigo-500 text-white'
                    : 'border-slate-300 text-slate-300'
                }`}
              >
                {i < selectedData.length ? '✓' : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Data cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {DATA_ITEMS.map((item) => {
            const selected = selectedData.includes(item);
            const disabled = !selected && selectedData.length >= REQUIRED;
            return (
              <SelectableCard
                key={item}
                selected={selected}
                disabled={disabled}
                onClick={() => toggleData(item)}
              >
                <span className="text-xs font-semibold text-slate-700 pr-4 leading-tight">{item}</span>
              </SelectableCard>
            );
          })}
        </div>

        {/* Detail inputs for selected data */}
        {selectedData.length > 0 && (
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-slate-700 text-base">กรอกรายละเอียดข้อมูลที่เลือก</h3>
            {selectedData.map((dataName) => {
              const detail = dataDetails[dataName] || {};
              const isComplete = detail.source?.trim() && detail.owner?.trim() && detail.use?.trim();
              return (
                <div
                  key={dataName}
                  className={`bg-white rounded-xl border-2 p-4 transition-colors ${isComplete ? 'border-teal-300' : 'border-slate-200'}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-indigo-700">{dataName}</span>
                    {isComplete && <span className="text-xs bg-teal-100 text-teal-600 rounded-full px-2 py-0.5">✓ ครบถ้วน</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1 block">
                        Source — ข้อมูลมาจากไหน
                      </label>
                      <input
                        type="text"
                        value={detail.source || ''}
                        onChange={(e) => updateDetail(dataName, 'source', e.target.value)}
                        placeholder="เช่น ERP, Google Sheet"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1 block">
                        Owner — ใครเป็นเจ้าของ
                      </label>
                      <input
                        type="text"
                        value={detail.owner || ''}
                        onChange={(e) => updateDetail(dataName, 'owner', e.target.value)}
                        placeholder="เช่น IT, Finance, HR"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1 block">
                        Use — ใช้ตัดสินใจอะไร
                      </label>
                      <input
                        type="text"
                        value={detail.use || ''}
                        onChange={(e) => updateDetail(dataName, 'use', e.target.value)}
                        placeholder="เช่น วัดประสิทธิภาพ"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Score */}
        <div className="mb-6">
          <ScoreBox label="คะแนน Stage 3" score={score} maxScore={30} />
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
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            ไปขั้นตอนถัดไป: ROI Pitch
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
