const Loader = ({ label, fullPage = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3.5 p-7.5 ${
        fullPage ? 'min-h-[calc(100vh-var(--nav-height))]' : ''
      }`}
    >
      <span
        className="h-9 w-9 animate-spin rounded-full border-[3px] border-border border-t-primary"
        aria-hidden="true"
      />
      {label && <p className="text-[0.85rem] text-text-muted">{label}</p>}
    </div>
  );
};

export default Loader;
