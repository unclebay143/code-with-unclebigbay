'use client';

import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ScrollArea,
  Button,
} from '@hashnode/matrix-ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { HackathonCard } from '@/components/molecules/dashboard/hackathon/HackathonCard';
import { Hackathon, Hackathons } from '@/utils/types';
import Link from 'next/link';

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
    (hackathon) => hackathon.isActive,
  );

  const closedHackathons = hackathons?.filter(
    (hackathon) => !hackathon.isActive,
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
            {/* <TabsTrigger value={VIEW.ALL}>All</TabsTrigger> */}
            <TabsTrigger value={VIEW.ACTIVE}>Active</TabsTrigger>
            <TabsTrigger value={VIEW.CLOSED}>Closed</TabsTrigger>
          </TabsList>
        </section>
      </ScrollArea>
      <section className="mt-5">
        <TabsContent value={VIEW.ACTIVE}>
          <section className="flex flex-col gap-3">
            {activeHackathons?.map((hackathon) => {
              return (
                <HackathonCard
                  key={hackathon._id}
                  hackathon={hackathon}
                  isRegistered={hackathon.isRegistered}
                />
              );
            })}
          </section>
        </TabsContent>
        <TabsContent value={VIEW.CLOSED}>
          <section className="flex flex-col gap-3">
            {closedHackathons?.map((hackathon) => {
              return (
                <HackathonCard
                  key={hackathon._id}
                  hackathon={hackathon}
                  isRegistered={hackathon.isRegistered}
                />
              );
            })}
            <WhiteArea
              border
              twClass="border-dashed h-[200px] flex flex-col gap-2 justify-center items-center"
            >
              <h3 className="text-slate-600">
                We&apos;re currently running our first hackathon 🎉
              </h3>
              <Button size="xs" appearance="primary-slate" asChild>
                <Link href="/dashboard/hackathons/ai-for-good-hackathon-2024">
                  View hackathon
                </Link>
              </Button>
            </WhiteArea>
          </section>
        </TabsContent>
        {/* <TabsContent value={VIEW.ALL}>
              {showHackathons && (
                <section className="flex flex-col gap-3">
                {hackathons.map((hackathon) => {
                  return (
                    <HackathonCard
                    key={hackathon._id}
                    hackathon={hackathon}
                    />
                  );
                })}
                </section>
              )}
            </TabsContent> */}
      </section>
    </Tabs>
  );
};
