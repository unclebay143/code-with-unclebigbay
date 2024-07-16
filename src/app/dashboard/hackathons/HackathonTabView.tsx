'use client';

import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ScrollArea,
  Button,
  EmptyState,
  AwardTrophy,
} from '@hashnode/matrix-ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { HackathonCard } from '@/components/molecules/dashboard/hackathon/HackathonCard';
import { Hackathon } from '@/utils/types';
import Link from 'next/link';
import { hasHackathonEnded } from '@/utils';

const VIEW = {
  ALL: 'all',
  ACTIVE: 'active',
  CLOSED: 'closed',
};

type ViewType = (typeof VIEW)[keyof typeof VIEW];

const viewMap: Record<string, ViewType> = {
  all: VIEW.ALL,
  active: VIEW.ACTIVE,
  closed: VIEW.CLOSED,
};

type HackathonTabViewProps = {
  hackathons: (Hackathon & { isRegistered: boolean })[];
};
export const HackathonTabView = ({ hackathons }: HackathonTabViewProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryView = searchParams.get('view');
  const currentView = viewMap[queryView || ''] || VIEW.ACTIVE;

  const changeRoute = (value: string) => {
    router.push(`hackathons?view=${value}`, { scroll: true });
  };

  const activeHackathons = hackathons?.filter(
    (hackathon) => !hasHackathonEnded(hackathon.endDate),
  );

  const closedHackathons = hackathons?.filter((hackathon) =>
    hasHackathonEnded(hackathon.endDate),
  );

  return (
    <Tabs
      defaultValue={currentView}
      onValueChange={changeRoute}
      variant="underlined"
    >
      <ScrollArea orientation="horizontal">
        <section className="pt-3 border-b border-slate-200">
          <TabsList aria-label="Manage your account">
            {/* <TabsTrigger key={VIEW.ALL} value={VIEW.ALL} id="TabsTrigger">
              All
            </TabsTrigger> */}
            <TabsTrigger key={VIEW.ACTIVE} value={VIEW.ACTIVE} id="TabsTrigger">
              Active
            </TabsTrigger>
            <TabsTrigger key={VIEW.CLOSED} value={VIEW.CLOSED} id="TabsTrigger">
              Closed
            </TabsTrigger>
          </TabsList>
        </section>
      </ScrollArea>
      <section className="mt-5">
        <TabsContent
          value={VIEW.ACTIVE}
          hidden={currentView !== VIEW.ACTIVE}
          forceMount
        >
          <section className="flex flex-col gap-3">
            {activeHackathons.length > 0 ? (
              <>
                {activeHackathons?.map((hackathon) => {
                  return (
                    <HackathonCard
                      key={hackathon._id}
                      hackathon={hackathon}
                      isRegistered={hackathon.isRegistered}
                    />
                  );
                })}
              </>
            ) : (
              <WhiteArea
                border
                twClass="border-dashed h-[200px] flex flex-col gap-2 justify-center items-center"
              >
                <EmptyState
                  title="There are no active hackathons at the moment."
                  copy={
                    <div className="max-w-[317px] mx-auto">
                      Stay tuned for announcements on{' '}
                      <a
                        href="https://x.com/unclebigbay143"
                        target="_blank"
                        rel="noopener"
                        className="underline"
                      >
                        Twitter
                      </a>
                      .{' '}
                    </div>
                  }
                  icon={AwardTrophy}
                />
              </WhiteArea>
            )}
          </section>
        </TabsContent>
        <TabsContent
          value={VIEW.CLOSED}
          hidden={currentView !== VIEW.CLOSED}
          forceMount
        >
          <section className="flex flex-col gap-3">
            {closedHackathons.length > 0 ? (
              <>
                {closedHackathons?.map((hackathon) => {
                  return (
                    <HackathonCard
                      key={hackathon._id}
                      hackathon={hackathon}
                      isRegistered={hackathon.isRegistered}
                    />
                  );
                })}
              </>
            ) : (
              <WhiteArea
                border
                twClass="border-dashed h-[200px] flex flex-col gap-2 justify-center items-center"
              >
                <EmptyState
                  title="No closed hackathon"
                  copy="We're currently running our first hackathon 🎉"
                  icon={AwardTrophy}
                  ctaElement={
                    <Button size="xs" appearance="primary-slate" asChild>
                      <Link href="/hackathons/build-for-business-hackathon?source=closed-hackathon-cta">
                        Take me there
                      </Link>
                    </Button>
                  }
                />
              </WhiteArea>
            )}
          </section>
        </TabsContent>
        {/* <TabsContent value={VIEW.ALL}>
          <section className="flex flex-col gap-3">
            {hackathons.map((hackathon) => {
              return (
                <HackathonCard
                  key={hackathon._id}
                  hackathon={hackathon}
                  isRegistered={hackathon.isRegistered}
                />
              );
            })}
          </section>
        </TabsContent> */}
      </section>
    </Tabs>
  );
};
