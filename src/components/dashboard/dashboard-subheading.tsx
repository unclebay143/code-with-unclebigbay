import React from 'react';

type Props = { title: string };

export const DashboardSubheading = ({ title }: Props) => {
  return <h2 className="text-slate-700 font-medium">{title}</h2>;
};
