const PADDING_CLASSES = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
};

const Card = ({
  children,
  padding = 'md',
  hoverable = false,
  className = '',
  ...rest
}) => {
  const classes = [
    'rounded-lg border border-border bg-card shadow-sm transition-[box-shadow,transform] duration-200',
    PADDING_CLASSES[padding],
    hoverable ? 'hover:-translate-y-1 hover:shadow-md' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default Card;
