import React from 'react';

type Props = {
  title: React.ReactNode;
  color?: string;
  copy?: string;
  as?: 'h1';
};

export const DashboardSubheading = ({
  title,
  color = 'text-slate-700',
  copy,
  as,
}: Props) => {
  const TextComp = as || 'h2';
  return (
    <div className="flex flex-col gap-1">
      <TextComp className={`font-medium ${color}`}>{title}</TextComp>
      {copy && <span className="text-sm text-slate-600">{copy}</span>}
    </div>
  );
};
