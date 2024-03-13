'use client';

import React, { useState } from 'react';
import { EmptyState } from '@/components/molecules/dashboard/empty-state';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { QuoteOfTheDay } from '@/components/molecules/dashboard/quote-of-the-day';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { overviews } from '@/utils/dummy-data';
import { OverviewCard } from '@/components/molecules/dashboard/overview-card';
import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';
import { Courses } from '@/components/molecules/dashboard/courses';
import useMaterial from '@/components/hooks/useMaterial';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { YTVideo } from '@/components/atoms/YTVideo';
import { IconButton } from '@/components/atoms/IconButton';
import { ChevronDown, ChevronUp, Loader } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
} from '@/components/atoms/Select';

const Page = () => {
  const { data: currentStudent, isFetching } = useCurrentStudent();
  const onboardingCompleted = currentStudent?.stack;
  const { materials } = useMaterial();
  const [showQuoteWidget, setShowQuoteWidget] = useState<boolean>(true);
  const noRecentMaterials = materials && materials.length === 0;
  const [courseFilter, setCourseFilter] = useState<
    'total' | 'pending' | 'completed'
  >('total');
  const [showMore, setShowMore] = useState(false);

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
  } = useForm({
    defaultValues: {
      stack: '',
    },
  });

  const handleShowMoreVisibility = () => {
    setShowMore((prevVisibility) => !prevVisibility);
  };

  if (isFetching) return null;
  return (
    <section className="flex flex-col gap-3">
      {onboardingCompleted && (
        <>
          {showQuoteWidget && (
            <QuoteOfTheDay close={() => setShowQuoteWidget(false)} />
          )}
          <WhiteArea twClass="bg-indigo-50/60 border-indigo-50" border>
            <section className="flex flex-col gap-3">
              <DashboardSubheading title="Your course overview" />
              <section className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {overviews.map(({ id, Icon, count, label }) => (
                  <OverviewCard
                    key={id}
                    id={id}
                    Icon={Icon}
                    count={count}
                    label={label}
                    active={courseFilter === id}
                    setCurrentCourse={setCourseFilter}
                  />
                ))}
              </section>
            </section>
          </WhiteArea>
          <WhiteArea border>
            {noRecentMaterials ? (
              <EmptyState label="Your recent learning material will appear here" />
            ) : (
              <section className="flex flex-col gap-3">
                <DashboardSubheading title="Recent learning materials" />
                <Courses size={10} showLoadMoreButton />
              </section>
            )}
          </WhiteArea>
        </>
      )}
      {!onboardingCompleted && (
        <WhiteArea twClass="bg-indigo-50/60" border>
          <div className="py-4 px-2 flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl text-slate-600 text-center font-medium">
                Welcome to your Dashboard
              </h3>
              <div className="text-center text-slate-600 flex flex-col gap-3 max-w-3xl mx-auto">
                <p className="text-center text-slate-600">
                  We&apos;re excited to have you on board! To get started, check
                  out the video below. It&apos;ll walk you through everything
                  you need to know about using our platform efficiently.
                </p>
                <span>Let&apos;s dive in! 🚀</span>
              </div>
            </div>

            <YTVideo ytVideoId="JH77WsDH8yY" />

            <WhiteArea twClass="!p-0 bg-white" border>
              <div
                role="button"
                onClick={handleShowMoreVisibility}
                className={`group ${showMore ? 'pt-4 pb-0' : 'py-4'} px-5 flex w-full items-center justify-between`}
              >
                <span className="text-slate-600 font-medium group-hover:text-slate-800">
                  Exercise
                </span>
                <span className="group-hover:animate-pulse">
                  <IconButton
                    Icon={showMore ? ChevronUp : ChevronDown}
                    size="xs"
                  />
                </span>
              </div>
              {showMore && (
                <section className="px-5 flex flex-col items-start gap-5 py-4">
                  <div className="flex gap-5 w-full flex-wrap">
                    <div className="flex flex-wrap gap-5 w-full justify-between items-center">
                      <h3 className="font-medium text-lg text-slate-700">
                        Choose your specialization. This determines the course
                        content tailored specifically for you on our platform.
                        Feel free to adjust this anytime from your professional
                        settings.
                      </h3>
                      <div className="w-full">
                        <div className="flex flex-col gap-2">
                          <Controller
                            control={control}
                            name="stack"
                            render={({ field }) => (
                              <Select onValueChange={field.onChange}>
                                <SelectTrigger
                                  size="md"
                                  shape="md-rectangle"
                                  placeholder="Select stack"
                                />
                                <SelectContent>
                                  <SelectViewPort>
                                    <SelectItem
                                      value={'frontend'}
                                      label={'Frontend'}
                                    />
                                    <SelectItem
                                      value={'backend'}
                                      label={'Backend'}
                                    />
                                    <SelectItem
                                      value={'full-stack'}
                                      label={'Full-stack'}
                                    />
                                  </SelectViewPort>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      </div>
                      <div>
                        <Button size="sm">Complete exercise 🎉</Button>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </WhiteArea>
          </div>
        </WhiteArea>
      )}
      {onboardingCompleted && <ActivityLogs />}
    </section>
  );
};

export default Page;
