export function Textarea({
  className = '',
  label,
  rows = 4,
  ...props
}: {
  className?: string;
  label?: string;
  rows?: number;
  [key: string]: any;
}) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <textarea
        className={`min-h-[calc(4*1.25rem)] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-liwuai-500 focus:ring-1 focus:ring-liwuai-500 transition-colors resize-none ${className}`}
        rows={rows}
        {...props}
      />
    </div>
  );
}
