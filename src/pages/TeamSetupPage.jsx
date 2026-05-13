import { ArrowRight, ArrowLeft, Users } from 'lucide-react';
import PageLayout from '../components/PageLayout';

export default function TeamSetupPage({ teamName, playerCount, onUpdate, onNext, onBack }) {
  const isValid = teamName.trim().length > 0;

  return (
    <PageLayout>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 rounded-full p-4">
              <Users className="text-blue-600" size={40} />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">ตั้งค่าทีม</h1>
          <p className="text-slate-500">Team Setup</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
          {/* Team name */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2 text-base">
              ชื่อทีม <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => onUpdate({ teamName: e.target.value })}
              placeholder="เช่น ทีม Innovators, ทีม Alpha"
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Player count */}
          <div>
            <label className="block text-slate-700 font-semibold mb-3 text-base">
              จำนวนผู้เล่น
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onUpdate({ playerCount: n })}
                  className={`py-3 rounded-xl font-bold text-lg border-2 transition-all ${
                    playerCount === n
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={18} />
            ย้อนกลับ
          </button>
          <button
            onClick={onNext}
            disabled={!isValid}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-base transition-all ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            เริ่มภารกิจ
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
