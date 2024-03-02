import React from 'react';
import { WhiteArea } from './white-area';
import { EyeOff, MoreVertical, Sparkles, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../atoms/DropdownMenu';
import { MenuButton } from './menu-button';

type Props = { close: Function };

export const QuoteOfTheDay = ({ close }: Props) => {
  return (
    <WhiteArea shadow>
      <section className="flex justify-between">
        <section>
          <section className="flex items-center gap-1 text-pink-500">
            <span>
              <Sparkles size={16} />
            </span>
            <h2>Quote of the day!</h2>
          </section>
          <section className="ml-5">
            <span className="text-sm text-slate-500">
              Make it work, make it right, make it fast. – Kent Beck
            </span>
          </section>
        </section>
        <section>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="text-slate-500 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                <MoreVertical size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent alignOffset={-20}>
              <MenuButton
                label="Hide until tomorrow"
                Icon={EyeOff}
                onClick={close}
              />
              <MenuButton
                label="Don't show again"
                Icon={XCircle}
                type="danger"
                onClick={close}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </section>
    </WhiteArea>
  );
};
