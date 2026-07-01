export default function StatsCard({ icon: Icon, label, value, hint, accent }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</div>
          <div className="mt-4 text-4xl font-semibold text-white">{value}</div>
        </div>
        {Icon && (
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl ${accent || 'bg-indigo-500/15 text-indigo-300'}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      {hint && <div className="mt-4 text-sm text-slate-400">{hint}</div>}
    </div>
  );
}