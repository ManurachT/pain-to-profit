import { ArrowRight, Target } from 'lucide-react';

export default function WelcomePage({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-teal-500 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Logo / Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 rounded-full p-5">
            <Target className="text-white" size={56} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
          Pain to Profit
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-blue-100 mb-4">
          Process Redesign Game
        </h2>

        {/* Thai subtitle */}
        <p className="text-lg md:text-xl text-white/90 mb-3 font-medium">
          เกมฝึกคิดปรับปรุงกระบวนการ จาก Pain Point ไปสู่ ROI
        </p>

        {/* Description card */}
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left border border-white/20">
          <p className="text-white text-base md:text-lg leading-relaxed">
            เกมนี้จะช่วยให้ทีมฝึกคิดจากปัญหาจริง เลือกเครื่องมือที่เหมาะสม
            ค้นหาข้อมูลที่จำเป็น และคำนวณ ROI เพื่อเสนอผู้บริหาร
          </p>
        </div>

        {/* Steps preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { step: '1', label: 'Pain Point', icon: '🔍' },
            { step: '2', label: 'Tools', icon: '🛠️' },
            { step: '3', label: 'Data Discovery', icon: '📊' },
            { step: '4', label: 'ROI Pitch', icon: '💰' },
          ].map((s) => (
            <div key={s.step} className="bg-white/15 rounded-xl p-3 border border-white/20">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-white/70 text-xs font-medium">Step {s.step}</div>
              <div className="text-white font-semibold text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold text-lg md:text-xl px-10 py-4 rounded-2xl shadow-lg transition-all flex items-center gap-3 mx-auto"
        >
          เริ่มเกม
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
