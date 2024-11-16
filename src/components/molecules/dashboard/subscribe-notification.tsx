import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { EVENTS } from '@/utils/app-events';
import { logAppEvent } from '@/utils/services/client/app-audit.client';
import Image from 'next/image';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

export const SubscribeCTA = () => {
  // const [showWidget, setShowWidget] = useState(false); // use this when adding ability for users to cancel it
  const { data: currentStudent } = useCurrentStudent();
  const handleSubscribe = () => {
    // setShowWidget(true);
    toast(`Thank you! ${currentStudent?.fullName}`, {
      position: 'bottom-left',
    });
    setTimeout(() => {
      toast('Opening YouTube...', { position: 'bottom-left' });
    }, 1000);

    logAppEvent({
      event_name: EVENTS.YT_SUBSCRIBE_CAMPAIGN,
      student: currentStudent?._id,
      event_properties: {
        host: window.location.hostname,
        url: window.location.href,
        page: window.location.pathname,
        position: 'sidebar',
      },
    });

    setTimeout(() => {
      window.open(
        'https://www.youtube.com/@unclebigbay?sub_confirmation=1',
        '_blank',
      );
      // setShowWidget(false);
    }, 1500);
  };

  return (
    <div className="mt-2">
      {/* {!showWidget && ( */}
      <button
        onClick={handleSubscribe}
        className="border border-slate-200 p-2 rounded-lg space-y-2 cursor-pointer text-left hover:bg-slate-50"
      >
        <div className="space-y-1">
          <h3 className="font-semibold text-sm text-slate-950">
            Support Us on YouTube! 🎥
          </h3>
          <p className="text-sm text-slate-600">
            Your support helps us create more content for learners worldwide.
          </p>
        </div>
        <div className="relative w-[234px] h-[110px] overflow-hidden rounded-lg">
          <Image
            alt=""
            fill
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1731745300576/2f2b9357-ee27-4c84-9547-e8c1ebb65506.png"
            className="object-cover"
          />
        </div>
      </button>
      {/* )} */}
      <Toaster />
    </div>
  );
};
