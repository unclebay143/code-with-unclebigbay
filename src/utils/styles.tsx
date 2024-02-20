type Props = { children: React.ReactElement };
export const ResponsiveWrapper = (props: Props) => {
  return (
    <div className="mx-auto max-w-6xl px-5 py-4 sm:(px-7 py-4)" {...props} />
  );
};
