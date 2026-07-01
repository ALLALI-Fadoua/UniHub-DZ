const VARIANT_CLASSES = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-secondary text-white hover:bg-primary',
  accent: 'bg-accent text-white hover:bg-accent-hover',
  outline:
    'bg-transparent text-primary border-[1.5px] border-primary hover:bg-primary hover:text-white',
  ghost: 'bg-transparent text-text hover:bg-border',
  danger: 'bg-danger text-white hover:bg-danger-hover',
};

const SIZE_CLASSES = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-[0.95rem]',
  lg: 'px-7 py-3.5 text-[1.05rem]',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  ...rest
}) => {
  const classes = [
    'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
