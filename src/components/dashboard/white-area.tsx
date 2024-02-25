import React from 'react';

type Props = { children: React.ReactNode; border?: boolean };

export const WhiteArea = ({ border, ...otherProps }: Props) => {
  return (
    <section
      className={`bg-white rounded-lg shadow p-4 px-5 ${border && 'border'}`}
      {...otherProps}
    />
  );
};
