'use client';

import { WhiteArea } from './white-area';
import { EyeOff, MoreVertical, Sparkles, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../atoms/DropdownMenu';
import { MenuButton } from './menu-button';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { baseURL } from '../../../../frontend.config';

export const QuoteOfTheDay = ({
  quote,
  isVisible,
}: {
  quote: string;
  isVisible: boolean;
}) => {
  const [showQuoteWidget, setShowQuoteWidget] = useState<boolean>(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const hideUntil = Cookies.get('hideUntil');
    if (hideUntil) {
      const hideUntilTime = parseInt(hideUntil, 10);
      const currentTime = new Date().getTime();
      if (currentTime < hideUntilTime) {
        setShowQuoteWidget(false);
      }
    }
  }, []);

  if (!showQuoteWidget) return null;

  const handleHideQuoteForADay = () => {
    const hideUntil = new Date().getTime() + 24 * 60 * 60 * 1000;
    Cookies.set('hideUntil', hideUntil.toString(), { expires: 1 });
    setShowQuoteWidget(false);
  };

  const handleHideForAYear = () => {
    const hideUntil = new Date().getTime() + 365 * 24 * 60 * 60 * 1000;
    Cookies.set('hideUntil', hideUntil.toString(), { expires: 365 });
    setShowQuoteWidget(false);
  };

  return (
    <main>
      {showQuoteWidget && (
        <WhiteArea shadow>
          <section className="flex justify-between">
            <section>
              <section className="flex items-center gap-1 text-pink-500">
                <span>
                  <Sparkles size={16} />
                </span>
                <h2>Quote of the day!..</h2>
              </section>
              <section className="ml-5">
                <span className="text-sm text-slate-500">{quote}</span>
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
                    onClick={handleHideQuoteForADay}
                  />
                  <MenuButton
                    label="Don't show again"
                    Icon={XCircle}
                    type="danger"
                    onClick={handleHideForAYear}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </section>
          </section>
        </WhiteArea>
      )}
    </main>
  );
};
