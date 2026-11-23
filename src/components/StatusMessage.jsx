export default function StatusMessage({ icon, title, description, action }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
      <span
        aria-hidden="true"
        className="grid size-12 place-items-center rounded-full bg-slate-100 text-2xl"
      >
        {icon}
      </span>
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      {description && <p className="text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
