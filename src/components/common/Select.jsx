const Select = ({ label, name, options = [], placeholder, className = '', ...rest }) => {
  return (
    <div className="mb-4 flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-title" htmlFor={name}>
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        className={`w-full cursor-pointer appearance-none rounded-md border-[1.5px] border-border bg-card bg-[length:12px_8px] bg-[right_14px_center] bg-no-repeat px-3.5 py-2.5 text-[0.9rem] text-title transition-[border-color,box-shadow] duration-150 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary/15 ${className}`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23475569' stroke-width='1.5' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        }}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
