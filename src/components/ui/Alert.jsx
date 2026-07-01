import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

const ICONS = {
  error: AlertTriangle,
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
};

const VARIANT_CLASSES = {
  error: 'bg-danger/8 text-danger',
  success: 'bg-accent/10 text-accent-hover',
  info: 'bg-primary/8 text-primary',
  warning: 'bg-warning/10 text-warning-strong',
};

const Alert = ({ variant = 'info', children }) => {
  const Icon = ICONS[variant];

  return (
    <div className={`mb-4.5 flex items-start gap-2.5 rounded-md px-3.5 py-3 text-[0.85rem] ${VARIANT_CLASSES[variant]}`}>
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2} />
      <p>{children}</p>
    </div>
  );
};

export default Alert;