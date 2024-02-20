type Props = { children: React.ReactNode };
export const ResponsiveWrapper = ({ children }: Props) => {
  return <div className="w-full mx-auto max-w-6xl px-5 py-4">{children}</div>;
};
