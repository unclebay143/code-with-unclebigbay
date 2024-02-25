import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  url?: string;
  Icon: LucideIcon;
  label: string;
  type?: 'default' | 'danger';
  onClick?: Function;
};

export const MenuButton = ({
  url,
  Icon,
  label,
  type = 'default',
  onClick,
}: Props) => {
  const Component = url ? Link : 'button';
  const componentProps = url ? { href: url } : { onClick };
  const mapColorToType = {
    default: 'text-slate-500 hover:text-slate-800 hover:bg-slate-100',
    danger: 'text-red-500 hover:text-red-800 hover:bg-red-100',
  };
  return (
    <Component
      className={`w-full flex items-center gap-1 ${mapColorToType[type]} p-2 rounded-lg`}
      {...componentProps}
    >
      <span>
        <Icon size="16" />
      </span>
      <span className="text-sm">{label}</span>
    </Component>
  );
};
