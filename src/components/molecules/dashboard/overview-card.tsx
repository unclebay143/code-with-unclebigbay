import { Circle, LucideIcon } from 'lucide-react';

type OverviewCardProp = {
  id: string;
  label: string;
  Icon: LucideIcon;
  count: number;
  active?: boolean;
  setCurrentCourse?: Function;
};

export const OverviewCard = ({ id, label, count, Icon }: OverviewCardProp) => {
  const mapIdToColor: { [key: string]: string } = {
    total: 'text-green-600',
    pending: 'text-yellow-600',
    completed: 'text-blue-600',
  };
  const mapIdToBgColor: { [key: string]: string } = {
    total: 'bg-green-50 border-green-200',
    pending: 'bg-yellow-50 border-yellow-200',
    completed: 'bg-blue-50 border-blue-200',
  };
  return (
    <div
      className={`${mapIdToBgColor[id]} flex flex-col justify-between border p-5 rounded-lg`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center gap-2">
            <span className={mapIdToColor[id]}>
              <Icon size="24" />
            </span>
            <h2 className={`${mapIdToColor[id]} capitalize`}>{label}</h2>
          </div>

          <h3 className="ml-8 text-sm text-slate-600">
            {count ? `${count} course${count > 1 ? 's' : ''}` : '0 course'}
          </h3>
        </div>
        <span className="text-slate-400">
          {/* {active ? <CheckCircle2 size={20} /> : <Circle size={20} />} */}
          <Circle size={20} />
        </span>
      </div>
    </div>
  );
};
