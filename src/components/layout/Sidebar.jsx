import { NavLink } from 'react-router-dom';

const linkClasses = ({ isActive }) =>
  `flex items-center gap-2.5 whitespace-nowrap rounded-md px-3.5 py-2.5 text-[0.88rem] font-semibold transition-colors duration-150 ${
    isActive
      ? 'bg-primary/8 text-primary'
      : 'text-text hover:bg-background hover:text-primary'
  }`;

const Sidebar = ({ items, header, footer }) => {
  return (
    <aside className="sticky top-[var(--nav-height)] flex h-[calc(100vh-var(--nav-height))] w-[250px] flex-shrink-0 flex-col overflow-y-auto border-r border-border bg-card max-lg:static max-lg:h-auto max-lg:w-full max-lg:border-b max-lg:border-r-0">
      {header && <div className="border-b border-border p-5">{header}</div>}

      <nav className="flex flex-1 flex-col gap-1 p-3 max-lg:flex-row max-lg:overflow-x-auto">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClasses}>
            <item.icon className="h-[18px] w-[18px]" strokeWidth={2} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {footer && <div className="border-t border-border p-4">{footer}</div>}
    </aside>
  );
};

export default Sidebar;