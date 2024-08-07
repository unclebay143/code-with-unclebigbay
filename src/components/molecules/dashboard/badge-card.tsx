import React from 'react';
import Link from 'next/link';
import { BadgeIcon } from '@/components/icons/Badge';
import { Badge } from '@hashnode/matrix-ui';

interface Props {
  href: string;
  fill: string;
  title: string;
  date: string;
  badgeTheme: string;
  badgeText: string;
}

export const BadgeCard = (props: Props) => {
  const { href, fill, title, date, badgeTheme, badgeText } = props;
  return (
    <Link href={href}>
      <div className="flex flex-col sm:flex-row items-center sm:gap-2 p-2 rounded-md hover:bg-slate-100 cursor-pointer">
        <div className="p-2">
          <BadgeIcon fill={fill} />
        </div>
        <div className="flex flex-col sm:gap-2 items-center sm:items-start text-center">
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="flex flex-col sm:flex-row sm:gap-6 items-center">
            <p className="text-sm text-slate-400">{date}</p>
            <Badge theme={badgeTheme}>{badgeText}</Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};
