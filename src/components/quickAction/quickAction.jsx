function QuickAction({ icon: Icon, text, color }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-4 hover:border-indigo-500/30 transition">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-300">{text}</p>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
    </div>
  );
}

export default QuickAction;