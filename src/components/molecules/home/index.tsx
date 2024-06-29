export const HomeSectionHeading = ({
  heading,
  copy,
}: {
  heading: React.ReactNode;
  copy?: string;
}) => {
  return (
    <section className="max-w-xl mx-auto flex gap-6 flex-col text-center text-slate-800">
      <h2 className="text-4xl font-medium leading-10">{heading}</h2>
      {copy && <p className="sm:text-lg">{copy}</p>}
    </section>
  );
};

export const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative w-full mx-auto max-w-6xl px-5 xl:px-0">
      {children}
    </section>
  );
};
