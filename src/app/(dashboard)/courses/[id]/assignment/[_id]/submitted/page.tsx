'use client';

import { Button } from '@hashnode/matrix-ui';
import { useAssignmentResponseById } from '@/components/hooks/useAssignmentResponse';
import useCourse from '@/components/hooks/useCourse';
import { ShowConfetti } from '@/components/molecules/Confetti';
import { Courses } from '@/components/molecules/dashboard/courses';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Page = () => {
  const currentPathname = usePathname();
  const assignmentId = currentPathname.split('/')[4];
  const { data } = useAssignmentResponseById(assignmentId);
  const { courses, isFetching } = useCourse();

  const assignmentResponse = data?.assignmentResponse;
  const courseId = assignmentResponse?.course?._id;
  const courseSlug = assignmentResponse?.course?.slug;
  const courseTitle = assignmentResponse?.course?.title;
  const disableBtn = !courseId || !assignmentId;

  console.table({ courseId, assignmentId });

  const assignmentResponseUrl = `/courses/${courseSlug}/assignment/${assignmentId}/result`;
  const recommendedCourses = courses
    ?.filter((course) => !course.isEnrolled && course._id !== courseId)
    .splice(0, 3); // consider adding enroll field in the course object from BE

  const showRecommendedCourses =
    recommendedCourses && recommendedCourses.length > 0;

  return (
    <WhiteArea border>
      <section
        className={`${!showRecommendedCourses && 'h-[430px]'} relative flex flex-col items-center justify-center gap-3 p-4 overflow-hidden`}
      >
        <ShowConfetti width={952} height={100} />
        <div className="w-full flex flex-col items-center gap-5">
          <div className="flex flex-col text-center gap-2">
            {courseTitle ? (
              <span className="text-slate-500 text-sm">{courseTitle}</span>
            ) : (
              <span className="text-sm invisible">Loading</span>
            )}
            <h3 className="text-xl font-medium">
              Well-done for Completing Your Assignment! 🎉
            </h3>
            <div className="flex justify-center">
              {disableBtn ? (
                <Button size="xs" appearance="secondary-slate" disabled>
                  View score
                </Button>
              ) : (
                <Button size="xs" appearance="secondary-slate" asChild>
                  <Link href={assignmentResponseUrl}>View score</Link>
                </Button>
              )}
            </div>
            {showRecommendedCourses ? (
              <>
                <span className="my-2 text-slate-600 text-sm">OR</span>
                <p className="text-slate-600">
                  Checkout the recommended learning course below.
                </p>
              </>
            ) : null}
          </div>
          {/* Pass recommended courses here */}
          <div className="w-full">
            <Courses
              courses={recommendedCourses}
              isFetching={isFetching}
              hideSearchOptions
              hideReachedEnd
              hideEmptyState
            />
          </div>
        </div>
      </section>
    </WhiteArea>
  );
};

export default Page;
