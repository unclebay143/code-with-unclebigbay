import Image from 'next/image';

export const CodeWithUnclebigbayLogo = () => (
  <section className="flex items-end gap-1.5">
    <div className="h-9 w-9 overflow-hidden rounded-full">
      <Image
        src="https://cdn.hashnode.com/res/hashnode/image/upload/v1677222800340/7FWlpF0aT.jpeg?w=500&h=500&fit=crop&crop=faces&auto=compress,format&format=webp"
        alt="Unclebigbay"
        width={100}
        height={100}
      />
    </div>
    <div className="flex flex-col">
      <h2 className="text-sm font-semibold">Code with Unclebigbay</h2>
      <span className="text-xs font-medium text-slate-600">
        Practice ﹒Practice ﹒ Practice
      </span>
    </div>
  </section>
);
