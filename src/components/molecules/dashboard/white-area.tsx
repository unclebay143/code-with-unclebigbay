import React from 'react';

type Props = {
  children: React.ReactNode;
  twClass?: string;
  border?: boolean;
  shadow?: boolean;
};
//

export const WhiteArea = ({
  border,
  shadow,
  twClass,
  ...otherProps
}: Props) => {
  return (
    <section
      className={`${twClass ? twClass : 'bg-white'} rounded-xl p-4 px-5 ${border ? 'border' : ''} ${shadow ? 'shadow' : ''}`}
      {...otherProps}
    />
  );
};
