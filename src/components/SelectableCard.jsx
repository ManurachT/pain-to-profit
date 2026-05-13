export default function SelectableCard({ children, selected, onClick, disabled, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        relative rounded-xl border-2 p-3 text-left transition-all cursor-pointer
        ${selected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : disabled
          ? 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
          : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'}
        ${className}
      `}
    >
      {selected && (
        <span className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
      )}
      {children}
    </button>
  );
}
