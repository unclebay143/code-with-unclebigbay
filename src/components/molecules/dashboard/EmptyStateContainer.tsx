import React from 'react';

export const EmptyStateContainer = ({
  children,
  className,
  ...otherProps
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`border rounded-xl p-4 flex h-[500px] justify-center items-center dark:border-slate-800/80 ${className}`}
    {...otherProps}
  >
    {children}
  </div>
);
