import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { Hackathon } from '@/utils/types';
import { HackathonTabView } from './HackathonTabView';
import { getAllHackathons } from '@/utils/server.service';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hackathons - Dashboard',
};

/* 
Badges name ideas
- First online hackathon
- Hackathon Winner
- Hackathon Participant

*/

const Page = async () => {
  const { hackathons } = (await getAllHackathons()) as {
    hackathons: (Hackathon & { isRegistered: boolean })[];
  };

  console.log(hackathons);

  return (
    <WhiteArea border>
      <section className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-1">
          <DashboardSubheading title="Hackathons" />
          <div className="text-sm text-slate-600">
            Find and participate in hackathons to improve your skills and win
            prizes.
          </div>
        </div>
        <HackathonTabView hackathons={hackathons} />
      </section>
    </WhiteArea>
  );
};

export default Page;
