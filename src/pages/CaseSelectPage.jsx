import { ArrowLeft } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { CASES } from '../data/gameData';

export default function CaseSelectPage({ onSelect, onBack }) {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-teal-100 text-teal-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
            เลือก Case
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            เลือกกระบวนการที่ต้องการปรับปรุง
          </h1>
          <p className="text-slate-500 text-base">
            Select Process Case — เลือก 1 กรณีเพื่อเริ่มเกม
          </p>
        </div>

        {/* Case cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CASES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c)}
              className="bg-white rounded-2xl border-2 border-slate-200 p-6 text-left hover:border-teal-400 hover:shadow-lg transition-all group"
            >
              <div className="text-4xl mb-3">{c.icon}</div>
              <div className="inline-block bg-slate-100 text-slate-500 text-xs font-semibold px-2 py-0.5 rounded mb-2">
                Case {c.id}
              </div>
              <h3 className="font-bold text-slate-800 text-base md:text-lg mb-2 group-hover:text-teal-700 transition-colors">
                {c.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{c.description}</p>
              <div className="mt-4 flex items-center gap-1 text-teal-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                เลือก Case นี้ →
              </div>
            </button>
          ))}
        </div>

        {/* Back */}
        <div className="mt-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={18} />
            ย้อนกลับ
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
