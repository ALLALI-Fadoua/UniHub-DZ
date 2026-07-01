export const AdminTableWrapper = ({ children }) => (
  <div className="overflow-x-auto rounded-lg border border-border bg-card">
    {children}
  </div>
);

export const AdminTable = ({ children }) => (
  <table className="w-full min-w-[640px] border-collapse">{children}</table>
);

export const AdminTableHeadCell = ({ children }) => (
  <th className="border-b border-border px-4.5 py-3.5 text-left text-[0.76rem] uppercase tracking-wide text-text-muted">
    {children}
  </th>
);

export const AdminTableCell = ({ children, className = '' }) => (
  <td className={`border-b border-border px-4.5 py-3.5 align-middle text-[0.88rem] text-text ${className}`}>
    {children}
  </td>
);

export const AdminTableTitleCell = ({ thumb, children }) => (
  <td className="border-b border-border px-4.5 py-3.5 align-middle">
    <div className="flex items-center gap-2.5 font-semibold text-title">
      {thumb}
      {children}
    </div>
  </td>
);

export const AdminTableThumb = ({ src, alt, rounded = 'rounded-sm' }) => (
  <img src={src} alt={alt} className={`h-9.5 w-9.5 border border-border object-cover ${rounded}`} />
);

export const AdminTableActions = ({ children }) => (
  <td className="border-b border-border px-4.5 py-3.5 align-middle">
    <div className="flex justify-end gap-2">{children}</div>
  </td>
);

export const AdminTableIconButton = ({ children, danger = false, ...rest }) => (
  <button
    className={`inline-flex h-8 w-8 items-center justify-center rounded-sm text-[0.9rem] transition-colors duration-150 ${
      danger ? 'hover:bg-danger/10' : 'hover:bg-background'
    }`}
    {...rest}
  >
    {children}
  </button>
);

export const adminTableIconLinkClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-sm text-[0.9rem] transition-colors duration-150 hover:bg-background';

export const AdminTableEmpty = ({ children }) => (
  <p className="px-5 py-12.5 text-center text-text-muted">{children}</p>
);
