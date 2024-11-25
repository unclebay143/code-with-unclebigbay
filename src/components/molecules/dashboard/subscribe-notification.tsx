import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { EVENTS } from '@/utils/app-events';
import { logAppEvent } from '@/utils/services/client/app-audit.client';
import Image from 'next/image';
import { toast } from 'sonner';

// Based on students feedback; implement dismiss functionality
export const SubscribeCTA = () => {
  const { data: currentStudent } = useCurrentStudent();
  const handleSubscribe = () => {
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
    }, 1500);
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleSubscribe}
        className="border border-slate-200 bg-slate-50 transition-all hover:bg-slate-100 p-2 rounded-lg space-y-2 cursor-pointer text-left"
      >
        <div className="space-y-1">
          <h3 className="font-semibold text-sm text-slate-950">
            Support Me on YouTube! 🎥
          </h3>
          <p className="text-sm text-slate-600">
            Your support helps me create more content for learners worldwide.
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
    </div>
  );
};
