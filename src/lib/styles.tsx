import { ReactNode } from 'react';

type Props = { children: ReactNode };
export const ResponsiveWrapper = (props: Props) => {
  return <div className="w-full mx-auto max-w-6xl px-5 py-4" {...props} />;
};
