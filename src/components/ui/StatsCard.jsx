export default function StatsCard({ icon: Icon, label, value, hint, accent }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/90 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
          <div className="mt-4 text-4xl font-semibold text-slate-950">{value}</div>
        </div>
        {Icon && (
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl ${accent || 'bg-indigo-500/10 text-indigo-600'}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      {hint && <div className="mt-4 text-sm text-slate-500">{hint}</div>}
    </div>
  );
}
