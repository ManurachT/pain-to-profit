import { Trophy, RotateCcw, Printer, Download } from 'lucide-react';
import { getBadge } from '../data/gameData';

function formatNumber(n) {
  if (!isFinite(n) || isNaN(n) || !n) return '-';
  return Number(n).toLocaleString('th-TH');
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

const SCORE_CARDS = [
  { label: 'Pain Point Detective', color: 'bg-blue-50 border-blue-200 text-blue-700', max: 30 },
  { label: 'Tool Match Challenge', color: 'bg-teal-50 border-teal-200 text-teal-700', max: 30 },
  { label: 'Data Discovery Hunt', color: 'bg-indigo-50 border-indigo-200 text-indigo-700', max: 30 },
  { label: 'ROI Pitch Builder', color: 'bg-orange-50 border-orange-200 text-orange-700', max: 40 },
];

export default function FinalPage({
  teamName,
  selectedCase,
  totalScore,
  stage1Score,
  stage2Score,
  stage3Score,
  stage4Score,
  selectedPainPoints,
  businessImpact,
  selectedTools,
  toolReason,
  selectedData,
  dataDetails,
  currentHours,
  targetHours,
  costPerHour,
  investmentCost,
  intangibleBenefit,
  pitchSummary,
  onReset,
}) {
  const badge = getBadge(totalScore);
  const { hoursSaved, monthlySavings, annualSavings, paybackMonths } = calcROI(
    currentHours, targetHours, costPerHour, investmentCost
  );
  const stageScores = [stage1Score, stage2Score, stage3Score, stage4Score];

  const handlePrint = () => window.print();

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero result */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-teal-500 rounded-3xl p-8 mb-8 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 rounded-full p-4">
              <Trophy size={48} className="text-yellow-300" />
            </div>
          </div>
          <div className="text-sm font-semibold text-blue-200 mb-1 uppercase tracking-widest">ผลการแข่งขัน</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{teamName || 'ทีมของคุณ'}</h1>
          {selectedCase && (
            <p className="text-blue-100 text-base mb-4">Case: {selectedCase.title}</p>
          )}
          <div className="text-7xl font-black text-yellow-300 mb-2">{totalScore}</div>
          <div className="text-blue-200 text-sm mb-6">คะแนนรวม</div>

          {/* Badge */}
          <div className={`inline-block rounded-2xl border-2 px-6 py-3 font-bold text-lg md:text-xl ${badge.color} ${badge.border}`}>
            🏅 {badge.label}
          </div>
        </div>

        {/* Score breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {SCORE_CARDS.map((s, i) => (
            <div key={i} className={`rounded-xl border-2 p-4 text-center ${s.color}`}>
              <div className="text-2xl font-bold">{stageScores[i]}</div>
              <div className="text-xs font-medium opacity-70 mt-1">{s.label}</div>
              <div className="text-xs opacity-50 mt-0.5">/ {s.max} pts</div>
            </div>
          ))}
        </div>

        {/* Summary sections */}
        <div className="space-y-4 mb-8">
          {/* Pain Point */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-bold text-blue-700 text-lg mb-4 flex items-center gap-2">
              🔍 <span>Stage 1: Pain Point</span>
              <span className="ml-auto text-sm font-semibold text-blue-500">{stage1Score} pts</span>
            </h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedPainPoints.map((pp) => (
                <span key={pp} className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-medium">{pp}</span>
              ))}
            </div>
            {businessImpact && (
              <div className="bg-slate-50 rounded-xl p-3 text-slate-700 text-sm">
                <span className="font-semibold">Business Impact:</span> {businessImpact}
              </div>
            )}
          </div>

          {/* Tools */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-bold text-teal-700 text-lg mb-4 flex items-center gap-2">
              🛠️ <span>Stage 2: Tools</span>
              <span className="ml-auto text-sm font-semibold text-teal-500">{stage2Score} pts</span>
            </h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedTools.map((t) => (
                <span key={t.id} className="bg-teal-100 text-teal-800 rounded-full px-3 py-1 text-sm font-medium">
                  {t.name} ({t.cost} pt)
                </span>
              ))}
            </div>
            {toolReason && (
              <div className="bg-slate-50 rounded-xl p-3 text-slate-700 text-sm">
                <span className="font-semibold">เหตุผล:</span> {toolReason}
              </div>
            )}
          </div>

          {/* Data Discovery */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-bold text-indigo-700 text-lg mb-4 flex items-center gap-2">
              📊 <span>Stage 3: Data Discovery</span>
              <span className="ml-auto text-sm font-semibold text-indigo-500">{stage3Score} pts</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedData.map((d) => {
                const detail = dataDetails[d] || {};
                return (
                  <div key={d} className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                    <div className="font-semibold text-indigo-800 text-sm mb-1">{d}</div>
                    <div className="text-xs text-slate-600 space-y-0.5">
                      {detail.source && <div><span className="font-medium">Source:</span> {detail.source}</div>}
                      {detail.owner && <div><span className="font-medium">Owner:</span> {detail.owner}</div>}
                      {detail.use && <div><span className="font-medium">Use:</span> {detail.use}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ROI */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-bold text-orange-700 text-lg mb-4 flex items-center gap-2">
              💰 <span>Stage 4: ROI Pitch</span>
              <span className="ml-auto text-sm font-semibold text-orange-500">{stage4Score} pts</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                <div className="text-xl font-bold text-blue-700">{hoursSaved}</div>
                <div className="text-xs text-blue-500 mt-1">ชม. ลดได้/เดือน</div>
              </div>
              <div className="bg-teal-50 rounded-xl p-3 text-center border border-teal-100">
                <div className="text-xl font-bold text-teal-700">฿{formatNumber(monthlySavings)}</div>
                <div className="text-xs text-teal-500 mt-1">ประหยัด/เดือน</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
                <div className="text-xl font-bold text-orange-700">฿{formatNumber(annualSavings)}</div>
                <div className="text-xs text-orange-500 mt-1">ประหยัด/ปี</div>
              </div>
              <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                <div className="text-xl font-bold text-green-700">
                  {isFinite(paybackMonths) ? Math.ceil(paybackMonths) : '∞'}
                </div>
                <div className="text-xs text-green-500 mt-1">เดือนคืนทุน</div>
              </div>
            </div>

            {intangibleBenefit && (
              <div className="bg-amber-50 rounded-xl p-3 text-amber-800 text-sm mb-4 border border-amber-100">
                <span className="font-semibold">Intangible Benefits:</span> {intangibleBenefit}
              </div>
            )}

            {pitchSummary && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="font-semibold text-slate-600 text-sm mb-2">🎤 Pitch Summary:</div>
                <p className="text-slate-700 text-sm leading-relaxed">{pitchSummary}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 no-print">
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors text-base"
          >
            <RotateCcw size={20} />
            เริ่มเกมใหม่
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-md transition-colors"
          >
            <Printer size={20} />
            พิมพ์ผลลัพธ์
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-base shadow-md transition-colors"
          >
            <Download size={20} />
            ดาวน์โหลดเป็น PDF
          </button>
        </div>
      </div>
    </div>
  );
}
