'use client';

import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React, { useState } from 'react';
import { ArrowLeft, RotateCw } from 'lucide-react';
import { Question } from '@/utils/types';
import { Courses } from '@/components/molecules/dashboard/courses';
import { Controller, useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { assignments } from '@/utils/dummy-data';

type Questions = Question[];

export const AssignmentSubmitted = () => {
  return (
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
  );
};
export const SubmissionIndicator = () => (
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

  const {
    handleSubmit,
    control,
    formState: { isSubmitted, errors },
  } = useForm({ defaultValues: assignments });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [questions, setQuestions] = useState<Questions>(assignments);
  const noQuestions = questions.length === 0;
  const canShowQuestions = !noQuestions && !submitted;

  const onSubmit = (data: Questions) => {
    const assignmentResponse = questions.map((question, index) => ({
      questionId: question.id,
      question: question.question,
      answer: data[index]?.question || '', // Use the selected answer, or empty string if not selected
    }));

    const payload = {
      materialId: '0',
      assignmentId,
      responses: assignmentResponse,
    };

    console.log(payload);

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 100);
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      <WhiteArea border>
        {canShowQuestions && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 justify-between">
              <div className="flex items-center justify-between">
                <DashboardSubheading title="Assignment: Introduction to HTML" />
                <Button size="xs" appearance="secondary-slate">
                  <div className="flex gap-1 items-center">
                    <ArrowLeft size={14} />
                    <span>Back to material</span>
                  </div>
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
                  <span>{questions.length}</span>
                </div>
              </div>
            </div>
            <WhiteArea border>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ul className="list-decimal list-inside">
                  {questions.map(({ options, question }, questionIndex) => (
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
                                        // name={question}
                                        // {...register(`response-${question}`)}
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
                <Button size="xs" disabled={isSubmitting} type="submit">
                  {isSubmitting ? 'Submitting' : 'Submit'}
                </Button>
              </form>
            </WhiteArea>
          </div>
        )}
        {submitted && <AssignmentSubmitted />}
        {isSubmitting && (
          <div className="bg-slate-800/20 w-full absolute inset-0 z-5">
            <div className="relative flex flex-col justify-between items-center h-full">
              <div className="rounded-b overflow-hidden">
                <SubmissionIndicator />
              </div>
              <div className="rounded overflow-hidden">
                <SubmissionIndicator />
              </div>
              <div className="rounded-t overflow-hidden">
                <SubmissionIndicator />
              </div>
            </div>
          </div>
        )}
      </WhiteArea>
    </div>
  );
};

export default Page;
