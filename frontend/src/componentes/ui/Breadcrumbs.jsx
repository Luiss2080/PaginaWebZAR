import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Migas de pan" className="py-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-gris-medio">
        {items.map((item, indice) => (
          <li key={`${item.label}-${indice}`} className="flex items-center gap-2">
            {item.to ? (
              <Link to={item.to} className="transition-colors hover:text-tinta">
                {item.label}
              </Link>
            ) : (
              <span className="text-tinta">{item.label}</span>
            )}
            {indice < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
