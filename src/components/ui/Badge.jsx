const VARIANT_CLASSES = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent-hover',
  neutral: 'bg-border text-text',
  danger: 'bg-danger/10 text-danger',
  warning: 'bg-warning/10 text-warning-strong',
};

const Badge = ({ children, variant = 'primary' }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-none ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
