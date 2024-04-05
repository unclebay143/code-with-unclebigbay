'use client';

import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import * as Tabs from '@radix-ui/react-tabs';
import { Calendar, Hourglass, Users } from 'lucide-react';
import Image from 'next/image';

const Page = () => {
  const hackathons = [
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
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1712355851743/9b73ccc7-d52e-4001-9416-beb97b73e79c.png',
      title: 'January 2024 Hackathon',
      description:
        ' Participant in the 2024 January hackathon and stand a chance to win upto #500, 000.00',
      duration: 'May 1 - 20',
      registered: true,
    },
    {
      coverImage:
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1712351487326/a6ce0665-0238-4e75-a060-e30d8961d0a7.png',
      title: 'January 2024 Hackathon',
      description:
        ' Participant in the 2024 January hackathon and stand a chance to win upto #500, 000.00',
      duration: 'May 1 - 20',
    },
    {
      coverImage:
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1712351487326/a6ce0665-0238-4e75-a060-e30d8961d0a7.png',
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
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1712351487326/a6ce0665-0238-4e75-a060-e30d8961d0a7.png',
      title: 'January 2024 Hackathon',
      description:
        ' Participant in the 2024 January hackathon and stand a chance to win upto #500, 000.00',
      duration: 'May 1 - 20',
    },
  ];
  return (
    <WhiteArea border>
      <section className="flex flex-col gap-3">
        <DashboardSubheading title="Hackathons" />
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
          <Tabs.List
            className="flex gap-3 border-b"
            aria-label="Manage your account"
          >
            <Tabs.Trigger className="border-b border-slate-400" value="tab1">
              <button className="text-slate-700 p-2 hover:text-slate-900 rounded-xl text-sm font-medium">
                Account
              </button>
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2">
              <button className="text-slate-700 p-2 hover:text-slate-900 rounded-xl text-sm font-medium">
                Past
              </button>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="TabsContent" value="tab1">
            <section className="flex flex-col gap-3 mt-8">
              {hackathons.map(
                ({ coverImage, description, duration, title, registered }) => {
                  return (
                    <section
                      className="flex flex-col sm:flex-row pb-5 sm:pb-0 border rounded-lg overflow-hidden"
                      key={`hackathon-card-${title}`}
                    >
                      <section className="p-4 grow flex flex-col sm:flex-row gap-5">
                        <section
                          // className="relative h-[200px] w-[200px] rounded-md overflow-hidden"
                          // className={`relative min-h-[88px] max-h-[164px] w-full min-w-32 sm:h-[164px] sm:min-h-[164px] sm:max-h-[164px] sm:w-[164px] sm:min-w-[164px] sm:max-w-[164px] rounded overflow-hidden`}
                          className={`relative min-h-[88px] max-h-[120px] w-full min-w-32 sm:h-[120px] sm:min-h-[120px] sm:max-h-[120px] sm:w-[200px] sm:min-w-[120px] sm:max-w-[160px] rounded overflow-hidden`}
                        >
                          <Image src={coverImage} alt="" fill />
                        </section>
                        <section className="flex flex-col justify-between gap-4">
                          <section className="flex flex-col gap-1.5">
                            <div className="flex flex-col lg:flex-row flex-wrap gap-1">
                              <span className="font-semibold text-slate-700">
                                {title}
                              </span>
                              <div className="flex flex-col lg:flex-row gap-1 lg:items-center">
                                <span className="mx-1 hidden lg:inline">
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
                                  <Calendar size={14} /> May 1st - 31st
                                </span>
                              </div>
                            </div>

                            <p className="text-sm font-medium text-slate-500 max-w-[450px]">
                              {description}
                            </p>
                          </section>
                          <div className="flex flex-col sm:flex-row gap-2 sm:items-center max-w-[250px]">
                            <Button
                              size="xs"
                              disabled={registered}
                              width="full"
                            >
                              {registered ? 'Registered!' : 'Register'}
                            </Button>
                            <Button
                              size="xs"
                              appearance="secondary-slate"
                              width="full"
                            >
                              View details
                            </Button>
                          </div>
                        </section>
                      </section>
                      <section className="px-3 flex flex-col justify-center items-center text-center border-l">
                        <h3 className="font-bold text-2xl text-slate-600">5</h3>
                        <h3 className="font-medium text-slate-500 text-sm">
                          Days to go
                        </h3>
                      </section>
                    </section>
                  );
                },
              )}
            </section>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab2">
            <section className="flex flex-col gap-3 mt-8">
              {hackathons.map(
                ({ coverImage, description, duration, title, registered }) => {
                  return (
                    <section
                      className="flex flex-col sm:flex-row pb-5 sm:pb-0 border rounded-lg overflow-hidden"
                      key={`hackathon-card-${title}`}
                    >
                      <section className="p-4 grow flex flex-col sm:flex-row gap-5">
                        <section
                          // className="relative h-[200px] w-[200px] rounded-md overflow-hidden"
                          // className={`relative min-h-[88px] max-h-[164px] w-full min-w-32 sm:h-[164px] sm:min-h-[164px] sm:max-h-[164px] sm:w-[164px] sm:min-w-[164px] sm:max-w-[164px] rounded overflow-hidden`}
                          className={`relative min-h-[88px] max-h-[120px] w-full min-w-32 sm:h-[120px] sm:min-h-[120px] sm:max-h-[120px] sm:w-[200px] sm:min-w-[120px] sm:max-w-[160px] rounded overflow-hidden`}
                        >
                          <Image src={coverImage} alt="" fill />
                        </section>
                        <section className="flex flex-col justify-between gap-4">
                          <section className="flex flex-col gap-1.5 max-w-[450px]">
                            <div className="flex flex-col md:flex-row gap-1">
                              <span className="font-semibold text-slate-700">
                                {title}
                              </span>
                              <div className="flex flex-col sm:flex-row gap-1">
                                <span className="mx-1 hidden md:inline">
                                  &middot;
                                </span>
                                <span className="text-sm text-slate-600">
                                  Participants: 30
                                </span>
                                <span className="mx-1 hidden sm:inline">
                                  &middot;
                                </span>
                                <span className="text-blue-500 text-sm font-medium">
                                  May 1st - 31st
                                </span>
                              </div>
                            </div>

                            <p className="text-sm font-medium text-slate-500">
                              {description}
                            </p>
                          </section>
                          <div className="flex flex-col sm:flex-row gap-2 sm:items-center max-w-[250px]">
                            <Button size="xs" disabled width="full">
                              {registered ? 'Registered!' : 'Register'}
                            </Button>
                            <Button
                              size="xs"
                              appearance="secondary-slate"
                              width="full"
                            >
                              View details
                            </Button>
                          </div>
                        </section>
                      </section>
                      <section className="px-3 flex flex-col justify-center items-center text-center border-l">
                        <h3 className="font-bold text-2xl text-slate-700">5</h3>
                        <h3 className="font-medium text-slate-500 text-sm">
                          Days to go
                        </h3>
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
