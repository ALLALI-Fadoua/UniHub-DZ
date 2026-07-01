const Input = ({
  label,
  as = 'input',
  type = 'text',
  name,
  error,
  helperText,
  className = '',
  ...rest
}) => {
  const Tag = as;

  const fieldClasses = [
    'w-full rounded-md border-[1.5px] border-border bg-card px-3.5 py-2.5 text-[0.92rem] text-title placeholder:text-text-muted transition-[border-color,box-shadow] duration-150 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15',
    as === 'textarea' ? 'min-h-[100px] resize-y' : '',
    error ? 'border-danger' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="mb-4 flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-title">
          {label}
        </label>
      )}

      <Tag
        id={name}
        name={name}
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? 4 : undefined}
        className={fieldClasses}
        {...rest}
      />

      {error ? (
        <span className="text-xs text-danger">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-text-muted">{helperText}</span>
      ) : null}
    </div>
  );
};

export default Input;
