import React from 'react';

type Props = { title: string; color?: string };

export const DashboardSubheading = ({
  title,
  color = 'text-slate-700',
}: Props) => {
  return <h2 className={`font-medium ${color}`}>{title}</h2>;
};
