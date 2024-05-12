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

export const QuoteOfTheDay = ({
  quote,
  isVisible,
}: {
  quote: string;
  isVisible: boolean;
}) => {
  // const [showQuoteWidget, setShowQuoteWidget] = useState<boolean>(true);
  // const close = () => setShowQuoteWidget(false);
  // if (!showQuoteWidget) return null;

  const setQuoteWidget = (key: string) => {
    let currentTime = new Date().getMilliseconds();
    let futureTime = 0;
    if (key === 'day') {
      futureTime = new Date().getMilliseconds() + 24 * 1000;
      setCookie('userChoice', { currentTime, futureTime });
    } else {
      futureTime = new Date().getMilliseconds() + 365 * 1000;
      setCookie('userChoice', { currentTime, futureTime });
    }
  };

  return (
    <div>
      {isVisible && (
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
                    onClick={() => setQuoteWidget('day')}
                  />
                  <MenuButton
                    label="Don't show again"
                    Icon={XCircle}
                    type="danger"
                    onClick={() => setQuoteWidget('year')}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </section>
          </section>
        </WhiteArea>
      )}
    </div>
  );
};
