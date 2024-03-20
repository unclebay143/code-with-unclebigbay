import React from 'react';

type Props = { label: string; copy?: string };

export const EmptyState = ({ label, copy }: Props) => {
  return (
    <section className="border border-dashed rounded-lg min-h-[200px] flex flex-col gap-1 justify-center items-center p-4 text-center">
      <h2 className="text-slate-600">{label}</h2>
      {copy && <p className="text-slate-500 text-sm">{copy}</p>}
    </section>
  );
};
