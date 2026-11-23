export function Card({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardHeader({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`p-6 border-b border-slate-100 ${className}`}>{children}</div>;
}
