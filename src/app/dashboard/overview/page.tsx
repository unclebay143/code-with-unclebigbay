import {
  getAllActivityAudits,
  getEnrolledCourses,
  getRandomQuote,
} from '@/utils/server.service';
import Overview from './overview';

const Page = async () => {
  const auditsRes = await getAllActivityAudits();
  const audits = auditsRes!.audits;
  const quoteRes = await getRandomQuote();

  const enrolledCoursesRes = await getEnrolledCourses();
  const enrolledCourses = enrolledCoursesRes?.enrolledCourses;

  return (

    <section className="flex flex-col gap-3">
      <QuoteOfTheDay quote={quoteRes?.slip?.advice as string} isVisible />
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

      <ActivityLogs audits={audits} show={5} />
    </section>

    <Overview
      // overviews={overviews}
      audits={audits}
      enrolledCourses={enrolledCourses}
    />

  );
};

export default Page;
