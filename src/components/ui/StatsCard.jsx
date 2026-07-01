export default function StatsCard({ icon: Icon, label, value, hint, accent }) {
  return (
    <div className="er-card anim-fade-up p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</div>
          <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
        </div>
        {Icon && (
          <div className={`inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-3xl ${accent || 'bg-indigo-500/15 text-indigo-300'}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      {hint && <div className="mt-4 text-sm text-slate-400">{hint}</div>}
    </div>
  );
}