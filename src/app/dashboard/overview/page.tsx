import React from 'react';
import { EmptyState } from '@/components/molecules/dashboard/empty-state';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { QuoteOfTheDay } from '@/components/molecules/dashboard/quote-of-the-day';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { OverviewCard } from '@/components/molecules/dashboard/overview-card';
import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';
import { Courses } from '@/components/molecules/dashboard/courses';
import { overviews, showCount } from '@/utils';
import { baseURL } from '../../../../frontend.config';
import { headers } from 'next/headers';

async function getEnrolledCourses() {
  try {
    const url = `${baseURL}/api/courses/enroll`;
    const result = await fetch(url, {
      cache: 'force-cache',
      headers: headers(),
    });

    if (!result.ok) {
      console.log(result.statusText);
    }

    return result.json();
  } catch (error) {
    console.log({ error });
  }
}

const Page = async () => {
  const { enrolledCourses } = await getEnrolledCourses();
  const iterableEnrolledCourses = enrolledCourses.map(
    (enrolledCourse: any) => enrolledCourse.course,
  );
  const enrolledCoursesCount = enrolledCourses?.length;
  const noEnrolledCourses = enrolledCoursesCount === 0;

  return (
    <section className="flex flex-col gap-3">
      <QuoteOfTheDay />
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
      {noEnrolledCourses && (
        <div className="h-[520px]">
          <EmptyState label="Your recent learning materials will appear here 🙌🏾" />
        </div>
      )}
      {!noEnrolledCourses && (
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
      )}

      <ActivityLogs defaultCount={6} loaderCount={6} />
    </section>
  );
};

export default Page;
