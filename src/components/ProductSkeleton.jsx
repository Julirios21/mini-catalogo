export default function ProductSkeleton({ count = 8 }) {
  return (
    <ul
      aria-hidden="true"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <li
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="aspect-square animate-pulse bg-slate-200" />
          <div className="flex flex-col gap-3 p-4">
            <div className="h-3.5 w-4/5 animate-pulse rounded-full bg-slate-200" />
            <div className="h-3.5 w-1/2 animate-pulse rounded-full bg-slate-200" />
            <div className="h-5 w-1/3 animate-pulse rounded-md bg-slate-200" />
          </div>
        </li>
      ))}
    </ul>
  )
}
