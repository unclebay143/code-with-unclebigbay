import React from 'react';

type Props = {
  children: React.ReactNode;
  twColor?: string;
  border?: boolean;
  shadow?: boolean;
};

export const WhiteArea = ({
  border,
  shadow,
  twColor,
  ...otherProps
}: Props) => {
  return (
    <section
      className={`${twColor ? twColor : 'bg-white'} rounded-lg  p-4 px-5 ${border && 'border'} ${shadow && 'shadow'}`}
      {...otherProps}
    />
  );
};
