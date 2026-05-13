export default function PageLayout({ children, title, subtitle, stageInfo }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {stageInfo && (
        <div className="bg-white border-b border-slate-200 px-4 py-3 no-print">
          <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {stageInfo.stages.map((s, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      s.active
                        ? 'bg-blue-600 text-white'
                        : s.done
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {s.label}
                  </div>
                  {i < stageInfo.stages.length - 1 && (
                    <span className="text-slate-300 text-sm">→</span>
                  )}
                </div>
              ))}
            </div>
            {stageInfo.score !== undefined && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-1 text-sm font-semibold text-orange-700">
                คะแนนรวม: {stageInfo.score}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{title}</h1>}
            {subtitle && <p className="text-slate-500 text-base md:text-lg">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
