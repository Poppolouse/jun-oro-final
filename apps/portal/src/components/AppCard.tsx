import React from 'react';

type Props = {
  title: string;
  href: string;
  description: string;
  dataErs?: string;
};

/**
 * Tek uygulamayı temsil eden kart komponenti.
 * @param {Props} props - Kart başlığı, link ve açıklaması
 * @returns {JSX.Element} Kart
 */
export function AppCard({ title, href, description, dataErs }: Props): JSX.Element {
  return (
    <a data-ers={dataErs} className="app-card" href={href} rel="noopener noreferrer">
      <div className="card-inner">
        <h2 className="card-title">{title}</h2>
        <p className="card-desc">{description}</p>
      </div>
    </a>
  );
}