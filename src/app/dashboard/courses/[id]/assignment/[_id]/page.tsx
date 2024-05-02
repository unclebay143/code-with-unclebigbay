'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { Button, Spinner } from '@hashnode/matrix-ui';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import useAssignment, {
  useAssignmentById,
} from '@/components/hooks/useAssignment';
import { Questions } from '@/utils/types';
// import { useWarnBeforePageReload } from '@/components/hooks/useWarnBeforePageReload';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';

const Page = () => {
  const { data: student } = useCurrentStudent();
  const currentPathname = usePathname();
  const assignmentId = currentPathname.split('/').pop();
  const { assignment, isFetching } = useAssignmentById(assignmentId!);
  const { mutation: addNewResponse } = useAssignment();
  const course = assignment?.course;
  const courseId = course?._id;
  const courseTitle = course?.title;
  const alreadyResponded = assignment?.alreadyResponded;

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
    const isEmptyOptionRegex = /^0\.[a-zA-Z0-9]+$/; // 0.option

    try {
      const assignmentResponse = questions?.map((question, index) => {
        const answerToQuestion = data[index].question;
        const isEmptyOption = isEmptyOptionRegex.test(answerToQuestion);

        if (isEmptyOption) {
          setIsSubmitting(false);
          throw Error('Some questions are not answered');
        }

        return {
          question: question._id,
          answer: answerToQuestion,
        };
      });

      const payload = {
        student: student?._id,
        course: courseId,
        assignment: assignmentId,
        response: assignmentResponse,
      };

      // @ts-ignore
      addNewResponse.mutate(payload);
      // window.onbeforeunload = null;
      window.location.href = `/dashboard/courses/${courseId}/assignment/${assignmentId}/submitted`;
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
    window.location.href = `/dashboard/courses/${courseId}/assignment/${assignmentId}/result`;
    return loader;
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      {isFetching && loader}
      {canShowQuestions && (
        <WhiteArea border>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 justify-between">
              <div className="flex items-center justify-between">
                <DashboardSubheading title={`Assignment: ${courseTitle}`} />
                <Button size="xs" appearance="secondary-slate" asChild>
                  <a
                    href={`/dashboard/courses/${courseId}`}
                    className="flex gap-1 items-center"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to course</span>
                  </a>
                </Button>
              </div>
              <div className="flex text-slate-600">
                <div className="text-sm">
                  <span className="font-medium"> Status: </span>
                  <span className="text-yellow-500 font-medium">
                    Not attempted
                  </span>
                  <span className="mx-1">&middot;</span>
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
                      <span className="inline-block mb-2 font-semibold">
                        {question}
                      </span>
                      <ol className="pl-2 flex flex-col gap-2 list-inside list-[lower-alpha]">
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
