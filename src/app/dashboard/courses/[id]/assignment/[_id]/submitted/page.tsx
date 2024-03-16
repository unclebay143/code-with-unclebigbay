'use client';

import { Button } from '@/components/atoms/Button';
import { useAssignmentById } from '@/components/hooks/useAssignment';
import { Courses } from '@/components/molecules/dashboard/courses';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Page = () => {
  const currentPathname = usePathname();
  const assignmentId = currentPathname.split('/')[5];
  const { assignment } = useAssignmentById(assignmentId);
  const materialId = assignment?.material?._id;
  const materialTitle = assignment?.material?.title;
  const disableBtn = !materialId || !assignmentId;
  const assignmentUrl = `/dashboard/courses/${materialId}/assignment/${assignmentId}`;

  return (
    <WhiteArea border>
      <section className="flex flex-col items-center justify-center gap-3 p-4">
        <div className="w-full flex flex-col items-center gap-5">
          <div className="flex flex-col text-center gap-2">
            {materialTitle ? (
              <span className="text-slate-500 text-sm">{materialTitle}</span>
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
                  <Link href={assignmentUrl}>View score</Link>
                </Button>
              )}
            </div>
            <span className="my-2 text-slate-600 text-sm">OR</span>
            <p className="text-slate-600">
              Checkout the recommended learning material below.
            </p>
          </div>
          {/* Pass recommended courses here */}
          <div className="w-full">
            <Courses hideSearchOptions hideReachedEnd />
          </div>
        </div>
      </section>
    </WhiteArea>
  );
};

export default Page;