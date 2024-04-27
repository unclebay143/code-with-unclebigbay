import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { baseURL } from '../../../../frontend.config';
import { headers } from 'next/headers';
import { Hackathon } from '@/utils/types';
import { HackathonTabView } from './HackathonTabView';

/* 
Badges name ideas
- First online hackathon
- Hackathon Winner
- Hackathon Participant

*/

async function getAllHackathons() {
  try {
    const url = `${baseURL}/api/hackathons`; // isRegistered is derived from server
    const result = await fetch(url, {
      headers: headers(),
    });
    const hackathons = await result.json();

    return hackathons;
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

const Page = async () => {
  const { hackathons } = (await getAllHackathons()) as {
    hackathons: (Hackathon & { isRegistered: boolean })[];
  };

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
