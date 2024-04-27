import React from 'react';
import { EmptyState } from '@/components/molecules/dashboard/empty-state';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { QuoteOfTheDay } from '@/components/molecules/dashboard/quote-of-the-day';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { OverviewCard } from '@/components/molecules/dashboard/overview-card';
import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';
import { Courses } from '@/components/molecules/dashboard/courses';
import { Overview } from '@/utils/types';
import { ActivityIcon, CheckCheckIcon, LibraryBig } from 'lucide-react';
import { showCount } from '@/utils';
import {
  getAllActivityAudits,
  getEnrolledCourses,
} from '@/utils/server.service';

const Page = async () => {
  const auditsRes = await getAllActivityAudits();
  const audits = auditsRes?.audits!;

  // const enrolledCoursesRes = await getEnrolledCourses();
  // const enrolledCourses = enrolledCoursesRes?.enrolledCourses;

  // const iterableEnrolledCourses = enrolledCourses.map(
  //   (enrolledCourse: any) => enrolledCourse.course,
  // );
  // const enrolledCoursesCount = enrolledCourses?.length;
  // const noEnrolledCourses = enrolledCoursesCount === 0;
  // const pendingCoursesCount = enrolledCourses.filter(
  //   (enrolledCourse: any) => !enrolledCourse.isCompleted,
  // ).length;
  // const completedCoursesCount = enrolledCoursesCount - pendingCoursesCount;

  const overviews: Overview[] = [
    {
      id: 'total',
      label: 'Total enrolled',
      Icon: LibraryBig,
      // count: enrolledCoursesCount,
      count: 1,
    },
    {
      id: 'pending',
      label: 'Pending',
      Icon: ActivityIcon,
      // count: pendingCoursesCount,
      count: 2,
    },
    {
      id: 'completed',
      label: 'Completed',
      Icon: CheckCheckIcon,
      // count: completedCoursesCount,
      count: 3,
    },
  ];

  // Todo: indicate courses that are completed

  return (
    <section className="flex flex-col gap-3">
      <QuoteOfTheDay />
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
      {/* {noEnrolledCourses && (
        <div className="h-[520px]">
          <EmptyState label="Your recent learning materials will appear here 🙌🏾" />
        </div>
      )} */}
      {/* {!noEnrolledCourses && (
        <WhiteArea border>
          <section className="flex flex-col gap-3">
            <DashboardSubheading
              title={`Recent learning materials ${showCount(enrolledCoursesCount)}`}
            />
            <Courses
              size={10}
              hideSearchOptions
              courses={iterableEnrolledCourses}
            />
          </section>
        </WhiteArea>
      )} */}

      <ActivityLogs audits={audits} show={5} />
    </section>
  );
};

export default Page;
