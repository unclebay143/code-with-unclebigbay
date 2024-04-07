import React from 'react';

type Props = { title: React.ReactNode; color?: string; copy?: string };

export const DashboardSubheading = ({
  title,
  color = 'text-slate-700',
  copy,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className={`font-medium ${color}`}>{title}</h2>
      {copy && <span className="text-sm text-slate-600">{copy}</span>}
    </div>
  );
};
