'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Badge, Button, Spinner } from '@hashnode/matrix-ui';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { useForm } from 'react-hook-form';
import useAssignment, {
  useAssignmentById,
} from '@/components/hooks/useAssignment';
import { Questions } from '@/utils/types';
// import { useWarnBeforePageReload } from '@/components/hooks/useWarnBeforePageReload';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import Link from 'next/link';

const Page = () => {
  const { data: student } = useCurrentStudent();
  const currentPathname = usePathname();
  const assignmentId = currentPathname.split('/').pop();
  const { assignment, isFetching } = useAssignmentById(assignmentId!);
  const { mutation: addNewResponse } = useAssignment();
  const course = assignment?.course;
  const courseId = course?._id;
  const courseSlug = course?.slug;
  const courseTitle = course?.title;
  const alreadyResponded = assignment?.alreadyResponded;
  const isInvalidAssignment = !assignment;

  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm({ defaultValues: assignment?.questions });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = assignment?.questions as Questions;
  const canShowQuestions = !isFetching && !isSubmitting;

  // Disable button when all questions are not answered - all fields required
  const disableBtn = !isDirty || !isValid || isSubmitting;

  const onSubmit = (data: Questions) => {
    setIsSubmitting(true);

    try {
      const assignmentResponse = questions?.map((question, index) => {
        const answerToQuestion = data[index].question;

        return {
          question: question._id,
          answer: answerToQuestion,
        };
      });

      const hasUnansweredQuestions = assignmentResponse.some(
        (response) => !response.answer,
      );

      if (hasUnansweredQuestions) {
        setIsSubmitting(false);
        throw Error('Some questions are not answered');
      }

      const payload = {
        student: student?._id,
        course: courseId,
        assignment: assignmentId,
        response: assignmentResponse,
      };
      // @ts-ignore
      addNewResponse.mutate(payload, {
        onSuccess() {
          window.location.href = `/courses/${courseSlug}/assignment/${assignmentId}/submitted`;
        },
      });
      // window.onbeforeunload = null;
    } catch (e: any) {
      toast.error(e.message);
      setIsSubmitting(false);
    }
  };

  // useWarnBeforePageReload();

  const loader = (
    <WhiteArea twClass="!p-0 bg-slate-50 animate-pulse" border>
      <div className="flex items-center justify-center min-h-[80vh] gap-2 text-slate-600">
        <Spinner className="text-slate-600" />
        <span>Loading assignment</span>
      </div>
    </WhiteArea>
  );

  if (!isFetching && alreadyResponded) {
    window.location.href = `/courses/${courseSlug}/assignment/${assignmentId}/result`;
    return loader;
  }

  if (!isFetching && isInvalidAssignment) {
    window.location.href = `/courses`;
    return loader;
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      {isFetching && loader}
      {canShowQuestions && (
        <WhiteArea border>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 justify-between">
              <div className="flex flex-col items-start gap-2 md:flex-row-reverse md:items-center justify-between">
                <Button
                  size="xs"
                  appearance="secondary-slate"
                  startIcon={ArrowLeft}
                  asChild
                >
                  <Link
                    href={`/courses/${courseSlug}`}
                    className="whitespace-nowrap"
                  >
                    Back to course
                  </Link>
                </Button>
                <DashboardSubheading title={`Assignment: ${courseTitle}`} />
              </div>
              <div className="flex text-slate-600">
                <div className="text-sm flex gap-1 items-center">
                  <span className="font-medium"> Status: </span>
                  <Badge>Not attempted</Badge>
                  <span className="">&middot;</span>
                  <span className="font-medium">Total: </span>
                  <span>{questions?.length}</span>
                </div>
              </div>
            </div>
            <WhiteArea border>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ul className="list-decimal list-inside">
                  {questions?.map(({ options, question }, questionIndex) => (
                    <li
                      key={question}
                      className="relative border-b last:border-none py-4"
                    >
                      <span className="font-semibold">{question}</span>
                      <ol className="mt-1 pl-2 flex flex-col gap-2 list-inside list-[lower-alpha]">
                        {options.map(({ _id, option }) => {
                          return (
                            <li className="text-sm text-slate-800" key={_id}>
                              <span className="inline-flex items-center gap-1">
                                <label className="flex items-center gap-1">
                                  <input
                                    {...register(`${questionIndex}.question`)}
                                    value={option}
                                    type="radio"
                                    className="mt-0.5"
                                  />
                                  {option}
                                </label>
                              </span>
                            </li>
                          );
                        })}
                      </ol>
                    </li>
                  ))}
                </ul>
                <Button
                  size="xs"
                  disabled={disableBtn}
                  type="submit"
                  appearance="primary-slate"
                >
                  {isSubmitting ? 'Submitting' : 'Submit'}
                </Button>
              </form>
            </WhiteArea>
          </div>
        </WhiteArea>
      )}
      {isSubmitting && (
        <WhiteArea twClass="!p-0 bg-slate-50/20 animate-pulse" border>
          <div className="flex items-center justify-center min-h-[80vh] gap-2 text-slate-600">
            <Spinner />
            <span>Submitting assignment...</span>
            <span>Don&apos;t close this tab</span>
          </div>
        </WhiteArea>
      )}
    </div>
  );
};

export default Page;
