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
  const assignmentId = currentPathname.split('/')[5];
  const { data } = useAssignmentResponseById(assignmentId);
  const { courses, isFetching } = useCourse();

  const assignmentResponse = data?.assignmentResponse;
  const courseId = assignmentResponse?.course?._id;
  const courseTitle = assignmentResponse?.course?.title;
  const disableBtn = !courseId || !assignmentId;
  const assignmentResponseUrl = `/dashboard/courses/${courseId}/assignment/${assignmentId}/result`;
  const recommendedCourses = courses
    ?.filter((course) => !course.isCompleted && course._id !== courseId)
    .splice(0, 3); // consider adding enroll field in the course object from BE

  return (
    <WhiteArea border>
      <section className="relative flex flex-col items-center justify-center gap-3 p-4">
        <section className="absolute inset-0 w-full h-[100px] overflow-hidden">
          <ShowConfetti />
        </section>
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
            <span className="my-2 text-slate-600 text-sm">OR</span>
            <p className="text-slate-600">
              Checkout the recommended learning course below.
            </p>
          </div>
          {/* Pass recommended courses here */}
          <div className="w-full">
            <Courses
              courses={recommendedCourses}
              isFetching={isFetching}
              hideSearchOptions
              hideReachedEnd
            />
          </div>
        </div>
      </section>
    </WhiteArea>
  );
};

export default Page;
