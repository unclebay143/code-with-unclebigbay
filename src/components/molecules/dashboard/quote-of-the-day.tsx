'use client';

import React, { useState } from 'react';
import { WhiteArea } from './white-area';
import { EyeOff, MoreVertical, Sparkles, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../atoms/DropdownMenu';
import { MenuButton } from './menu-button';
import { setCookie } from 'cookies-next';
import { Quote } from '@/utils/types';

export const QuoteOfTheDay = ({
  quote,
  isVisible,
}: {
  quote: Quote;
  isVisible: boolean;
}) => {
  const [showQuoteWidget, setShowQuoteWidget] = useState<boolean>(isVisible);

  const hideQuoteWidget = (key: string) => {
    let closedTime = new Date().getMilliseconds();
    let futureTime = 0;
    if (key === 'day') {
      futureTime = new Date().getMilliseconds() + 24 * 1000;
      setCookie('quoteWidgetPref', { closedTime, futureTime });
      setShowQuoteWidget(false);
    } else {
      futureTime = new Date().getMilliseconds() + 365 * 1000;
      setCookie('quoteWidgetPref', { closedTime, futureTime });
      setShowQuoteWidget(false);
    }
  };

  if (!showQuoteWidget) return null;

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
            <span className="text-sm text-slate-500">{quote.quote}</span>
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
                onClick={() => hideQuoteWidget('day')}
              />
              <MenuButton
                label="Don't show again"
                Icon={XCircle}
                type="danger"
                onClick={() => hideQuoteWidget('year')}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </section>
    </WhiteArea>
  );
};
