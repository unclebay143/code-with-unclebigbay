'use client';

import React, { useState } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { ArrowLeft, Loader, RotateCw } from 'lucide-react';
import { Courses } from '@/components/molecules/dashboard/courses';
import { Controller, useForm } from 'react-hook-form';
import { useAssignmentById } from '@/components/hooks/useAssignment';
import { Questions } from '@/utils/types';
import Link from 'next/link';
import { useWarnBeforePageReload } from '@/components/hooks/useWarnBeforePageReload';

const AssignmentSubmitted = () => {
  return (
    <WhiteArea border>
      <section className="flex flex-col items-center justify-center gap-3 p-4">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col text-center gap-2">
            <h3 className="text-xl font-medium">
              Congratulations on Completing Your Assignment! 🎉
            </h3>
            <span className="text-slate-500 text-sm">
              Material: Introduction to HTML
            </span>
            <p className="text-slate-600">
              Checkout the recommended learning material below?
            </p>
          </div>
          {/* Pass recommended courses here */}
          <Courses hideSearchOptions />
        </div>
      </section>
    </WhiteArea>
  );
};
const SubmissionIndicator = () => (
  <div
    className="flex justify-center items-center gap-1 bg-white p-1"
    id="submittingIndicator"
  >
    <span className="animate-spin">
      <RotateCw size={20} />
    </span>
    <p className="font-bold">
      Submitting assignment. Don&apos;t navigate from this page...
    </p>
  </div>
);

const Page = () => {
  const currentPathname = usePathname();
  const assignmentId = currentPathname.split('/').pop();
  const { assignment, isFetching } = useAssignmentById(assignmentId!);
  const materialId = assignment?.materialId;
  const [submitted, setSubmitted] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({ defaultValues: assignment?.questions });

  const questions = assignment?.questions as Questions;
  const canShowQuestions = !isFetching && !submitted;
  const disableBtn = !isDirty || !isValid || isSubmitting;

  const onSubmit = (data: Questions) => {
    const isEmptyOptionRegex = /^0\.[a-zA-Z0-9]+$/; // 0.option

    try {
      const assignmentResponse = questions?.map((question, index) => {
        const answerToQuestion = data[index].question;
        const isEmptyOption = isEmptyOptionRegex.test(answerToQuestion);

        if (isEmptyOption) {
          throw Error('Some questions are not answered');
        }

        return {
          questionId: question._id,
          question: question.question,
          answer: answerToQuestion,
        };
      });

      const payload = {
        materialId: materialId,
        assignmentId,
        responses: assignmentResponse,
      };

      console.log(payload);
      toast.success('Assignment submitted');

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }, 3000);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  useWarnBeforePageReload();

  return (
    <div className="relative rounded-lg overflow-hidden">
      {!canShowQuestions && (
        <WhiteArea twClass="!p-0 bg-slate-50 animate-pulse" border>
          <div className="flex items-center justify-center min-h-[80vh] gap-2 text-slate-600">
            <span>Loading assignment...</span>
            <span className="animate-spin">
              <Loader />
            </span>
          </div>
        </WhiteArea>
      )}
      {canShowQuestions && (
        <WhiteArea border>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 justify-between">
              <div className="flex items-center justify-between">
                <DashboardSubheading title="Assignment: Introduction to HTML" />
                <Button size="xs" appearance="secondary-slate">
                  <a
                    href={`/dashboard/courses/${materialId}`}
                    className="flex gap-1 items-center"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to material</span>
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
                        {options.map(({ option, isCorrect }, index) => {
                          return (
                            <li className="text-sm text-slate-800" key={option}>
                              <span className="inline-flex items-center gap-1">
                                <label className="flex items-center gap-1">
                                  <Controller
                                    name={`${questionIndex}.question`}
                                    control={control}
                                    defaultValue={`${questionIndex}.option`}
                                    render={({ field }) => (
                                      <input
                                        {...field}
                                        value={option}
                                        type="radio"
                                        className="mt-0.5"
                                      />
                                    )}
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
                <Button size="xs" disabled={disableBtn} type="submit">
                  {isSubmitting ? 'Submitting' : 'Submit'}
                </Button>
              </form>
            </WhiteArea>
          </div>
        </WhiteArea>
      )}
      {submitted && <AssignmentSubmitted />}
      {isSubmitting && (
        <WhiteArea border>
          <div className="bg-slate-800/20 w-full absolute inset-0 z-5">
            <div
              className={`relative flex flex-col ${questions?.length > 8 ? 'justify-between' : 'justify-center'} items-center h-full`}
            >
              {questions?.length > 8 && (
                <div className="rounded-b overflow-hidden">
                  <SubmissionIndicator />
                </div>
              )}
              <div className="rounded overflow-hidden">
                <SubmissionIndicator />
              </div>
              {questions?.length > 8 && (
                <div className="rounded-t overflow-hidden">
                  <SubmissionIndicator />
                </div>
              )}
            </div>
          </div>
        </WhiteArea>
      )}
    </div>
  );
};

export default Page;
