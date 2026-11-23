export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  ...props
}: {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  [key: string]: any;
}) {
  const variants = {
    primary: 'bg-liwuai-600 hover:bg-liwuai-500 text-white',
    secondary: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    outline: 'border border-slate-300 hover:bg-slate-100 text-slate-700',
    ghost: 'hover:bg-slate-200 text-slate-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
