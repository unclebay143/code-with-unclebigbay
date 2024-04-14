'use client';

import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import * as Tabs from '@radix-ui/react-tabs';
import { Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/* 
Badges name ideas
- First online hackathon
- Hackathon Winner
- Hackathon Participant

*/

const Page = () => {
  const hackathons = [
    {
      coverImage:
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1712354603785/86531201-b9b4-466f-a7ca-ec9520a004a3.png',
      title: 'January 2024 Hackathon',
      description:
        ' Participant in the 2024 January hackathon and stand a chance to win upto #500, 000.00',
      duration: 'May 1 - 20',
      tags: ['beginner friendly'],
    },
    {
      coverImage:
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1712354603785/86531201-b9b4-466f-a7ca-ec9520a004a3.png',

      title: 'January 2024 Hackathon',
      description:
        ' Participant in the 2024 January hackathon and stand a chance to win upto #500, 000.00',
      duration: 'May 1 - 20',
      registered: true,
      isClosed: true,
      tags: ['Low/No Code'],
    },
    {
      coverImage:
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1712354603785/86531201-b9b4-466f-a7ca-ec9520a004a3.png',

      title: 'January 2024 Hackathon',
      description:
        ' Participant in the 2024 January hackathon and stand a chance to win upto #500, 000.00',
      duration: 'May 1 - 20',
    },
    {
      coverImage:
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1712354603785/86531201-b9b4-466f-a7ca-ec9520a004a3.png',

      title: 'January 2024 Hackathon',
      description:
        ' Participant in the 2024 January hackathon and stand a chance to win upto #500, 000.00',
      duration: 'May 1 - 20',
    },
    {
      coverImage:
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1712354603785/86531201-b9b4-466f-a7ca-ec9520a004a3.png',

      title: 'January 2024 Hackathon',
      description:
        ' Participant in the 2024 January hackathon and stand a chance to win upto #500, 000.00',
      duration: 'May 1 - 20',
      registered: true,
    },
    {
      coverImage:
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1712354603785/86531201-b9b4-466f-a7ca-ec9520a004a3.png',
      title: 'January 2024 Hackathon',
      description:
        ' Participant in the 2024 January hackathon and stand a chance to win upto #500, 000.00',
      duration: 'May 1 - 20',
    },
  ];

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
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
          <Tabs.List
            className="flex gap-3 border-b"
            aria-label="Manage your account"
          >
            <Tabs.Trigger value="tab2">
              <button className="text-slate-700 p-2 hover:text-slate-900 rounded-xl text-sm font-medium">
                Active
              </button>
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3">
              <button className="text-slate-700 p-2 hover:text-slate-900 rounded-xl text-sm font-medium">
                Ended
              </button>
            </Tabs.Trigger>
            <Tabs.Trigger className="border-b border-slate-400" value="tab1">
              <button className="text-slate-700 p-2 hover:text-slate-900 rounded-xl text-sm font-medium">
                All
              </button>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="TabsContent" value="tab1">
            <section className="flex flex-col gap-3 mt-8">
              {hackathons.map(
                ({
                  coverImage,
                  description,
                  duration,
                  title,
                  registered,
                  isClosed,
                  tags,
                }) => {
                  return (
                    <section
                      className="hover:bg-slate-50 flex flex-col sm:flex-row pb-5 sm:pb-0 border rounded-lg overflow-hidden"
                      key={`hackathon-card-${title}`}
                    >
                      <section className="grow flex flex-col sm:flex-row gap-1">
                        <Link
                          href="hackathons/slug"
                          // className="relative h-[200px] w-[200px] rounded-md overflow-hidden"
                          // className={`relative min-h-[88px] max-h-[164px] w-full min-w-32 sm:h-[164px] sm:min-h-[164px] sm:max-h-[164px] sm:w-[164px] sm:min-w-[164px] sm:max-w-[164px] rounded overflow-hidden`}
                          //   className={`relative min-h-[88px] max-h-[full] w-full min-w-32 sm:h-[full] sm:min-h-[full] sm:max-h-[full] sm:w-[200px] sm:min-w-[120px] sm:max-w-[160px] rounded overflow-hidden`}
                          className="relative min-h-[150px]  sm:min-h-[100px] sm:w-[300px] md:w-[270px] xl:w-[190px] h-full border-r"
                        >
                          <Image src={coverImage} alt="" fill />
                        </Link>
                        <section className="p-5 flex flex-col justify-between gap-4">
                          <section className="flex flex-col gap-1.5">
                            <div className="flex flex-col lg:flex-row flex-wrap gap-1">
                              <Link
                                href="hackathons/slug"
                                className="font-semibold text-slate-700 hover:text-slate-600"
                              >
                                {title}
                              </Link>
                              <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                                <span className="mx-1 hidden xl:inline">
                                  &middot;
                                </span>
                                <span className="text-sm text-slate-600 flex items-center gap-1">
                                  <Users size={14} />
                                  Participants: 30
                                </span>
                                <span className="mx-1 hidden lg:inline">
                                  &middot;
                                </span>
                                <span className="text-blue-500 text-sm font-medium flex items-center gap-1">
                                  <Calendar size={14} /> {duration}
                                </span>
                              </div>
                            </div>

                            <p className="text-sm font-medium text-slate-500 max-w-[450px]">
                              {description}
                            </p>
                          </section>
                          <div className="flex flex-col min-[340px]:flex-row gap-2 sm:items-center max-w-[250px]">
                            <Button
                              size="xs"
                              disabled={registered}
                              width="full"
                            >
                              {registered ? 'Joined!' : 'Join hackathon'}
                            </Button>
                            <Button
                              size="xs"
                              appearance="secondary-slate"
                              width="full"
                              asChild
                            >
                              <Link href="hackathons/slug">View details</Link>
                            </Button>
                          </div>
                          {tags?.map((tag, index) => (
                            <section key={index}>
                              <span className="px-2 py-0.5 capitalize rounded-full bg-indigo-100/20 text-slate-600 text-xs border">
                                {tag}
                              </span>
                            </section>
                          ))}
                        </section>
                      </section>
                      <section className="px-5 hidden md:flex flex-col justify-center items-center text-center border-l whitespace-nowrap min-w-[112px]">
                        {isClosed ? (
                          <h3 className="text-red-600">Ended</h3>
                        ) : (
                          <>
                            <h3 className="font-bold text-2xl text-slate-600">
                              5
                            </h3>
                            <h3 className="font-medium text-slate-500 text-sm">
                              Days to go
                            </h3>
                          </>
                        )}
                      </section>
                    </section>
                  );
                },
              )}
            </section>
          </Tabs.Content>
        </Tabs.Root>
      </section>
    </WhiteArea>
  );
};

export default Page;
