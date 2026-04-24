interface StatusBadgeProps {
  status: 'active' | 'pending' | 'completed' | 'cancelled' | 'paid' | 'overdue';
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = {
    active: { color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
    pending: { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
    completed: { color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
    cancelled: { color: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
    paid: { color: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' },
    overdue: { color: 'bg-rose-100 text-rose-800', dot: 'bg-rose-500' },
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full font-medium ${config[status].color} ${sizeClasses[size]}`}>
      <span className={`h-2 w-2 rounded-full ${config[status].dot}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}