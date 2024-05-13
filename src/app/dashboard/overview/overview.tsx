'use client';

import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { QuoteOfTheDay } from '@/components/molecules/dashboard/quote-of-the-day';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { OverviewCard } from '@/components/molecules/dashboard/overview-card';
import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';
import { BookDocument, Button, EmptyState } from '@hashnode/matrix-ui';
import { Overviews } from '@/utils/types';
import { ActivityIcon, CheckCheckIcon, LibraryBig } from 'lucide-react';
import { EmptyStateContainer } from '@/components/molecules/dashboard/EmptyStateContainer';
import Link from 'next/link';
import { showCount } from '@/utils';
import { Courses } from '@/components/molecules/dashboard/courses';

type Props = {
  audits: any;
  enrolledCourses: any;
  quoteRes: any;
  cookieRes: any;
};

const Overview = ({ audits, enrolledCourses, quoteRes, cookieRes }: Props) => {
  const showEmptyState = enrolledCourses.length === 0;
  const showEnrolledCourses = enrolledCourses.length > 0;

  const iterableEnrolledCourses = enrolledCourses.map(
    (enrolledCourse: any) => enrolledCourse.course,
  );
  const enrolledCoursesCount = enrolledCourses?.length;

  const pendingCoursesCount = enrolledCourses.filter(
    (enrolledCourse: any) => !enrolledCourse.isCompleted,
  ).length;
  const completedCoursesCount = enrolledCoursesCount - pendingCoursesCount;

  const overviews: Overviews = [
    {
      id: 'total',
      label: 'Total enrolled',
      Icon: LibraryBig,
      count: enrolledCoursesCount,
    },
    {
      id: 'pending',
      label: 'Pending',
      Icon: ActivityIcon,
      count: pendingCoursesCount,
    },
    {
      id: 'completed',
      label: 'Completed',
      Icon: CheckCheckIcon,
      count: completedCoursesCount,
    },
  ];

  return (
    <section className="flex flex-col gap-3">
      <QuoteOfTheDay
        quote={quoteRes.quote.quote as string}
        isVisible={cookieRes}
      />
      <WhiteArea twClass="bg-blue-50 border-blue-200" border>
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
              />
            ))}
          </section>
        </section>
      </WhiteArea>
      {/* <section className="flex gap-1">
        <button className="rounded-full py-1 px-3 text-slate-600 bg-slate-100 text-sm font-medium">
          Recent
        </button>
        <button className="rounded-full py-1 px-3 text-slate-600 bg-slate-100 text-sm font-medium">
          Personalized
        </button>
      </section> */}
      {showEmptyState && (
        <EmptyStateContainer className="max-h-[400px]">
          <EmptyState
            icon={BookDocument}
            title="No enrolled courses"
            copy="Your recent learning materials will appear here."
            ctaElement={
              <Button appearance="primary-slate" size="sm" asChild>
                <Link href="/dashboard/courses">Explore courses</Link>
              </Button>
            }
          />
        </EmptyStateContainer>
      )}
      {showEnrolledCourses && (
        <WhiteArea border>
          <section className="flex flex-col gap-3">
            <DashboardSubheading
              title={`Recent learning materials ${showCount(enrolledCoursesCount)}`}
            />
            <Courses
              size={10}
              hideSearchOptions
              courses={iterableEnrolledCourses}
              hideReachedEnd
            />
          </section>
        </WhiteArea>
      )}

      <ActivityLogs audits={audits} show={5} />
    </section>
  );
};

export default Overview;
