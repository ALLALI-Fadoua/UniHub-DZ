const AdminPageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="mb-1 text-[1.5rem]">{title}</h1>
        {subtitle && <p className="text-[0.86rem] text-text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
};

export default AdminPageHeader;
