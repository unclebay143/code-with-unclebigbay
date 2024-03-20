'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { ArrowLeft, Loader } from 'lucide-react';

import { useAssignmentResponseById } from '@/components/hooks/useAssignmentResponse';

const Page = () => {
  const currentPathname = usePathname();
  const assignmentId = currentPathname.split('/')[5];
  const { data, isFetching } = useAssignmentResponseById(assignmentId!);
  const assignmentResponse = data?.assignmentResponse;
  const score = assignmentResponse?.score;
  const status = assignmentResponse?.status;
  const grade = assignmentResponse?.grade;
  const response = assignmentResponse?.response;
  const totalQuestion = response?.length;
  const courseId = assignmentResponse?.course?._id;
  const canShowQuestions = !isFetching;
  const courseTitle = assignmentResponse?.course?.title;

  const mapStatusToColor: { [key: string]: string } = {
    passed: 'text-green-500',
    failed: 'text-red-500',
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      {isFetching && (
        <WhiteArea twClass="!p-0 bg-slate-50 animate-pulse" border>
          <div className="flex items-center justify-center min-h-[80vh] gap-2 text-slate-600">
            <span>Loading response...</span>
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
                <DashboardSubheading title={`Assignment: ${courseTitle}`} />
                <Button size="xs" appearance="secondary-slate">
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
                  <span
                    className={`${mapStatusToColor[status]} font-medium capitalize`}
                  >
                    {status}
                  </span>
                  <span className="mx-1 invisible">&middot;</span>
                  <span className="font-medium">Total: </span>
                  <span>{totalQuestion}</span>
                  <span className="mx-1 invisible">&middot;</span>
                  <span className="font-medium">Score: </span>
                  <span>{score}</span>
                  <span className="mx-1 invisible">&middot;</span>
                  <span className="font-medium">Grade: </span>
                  <span>{grade}</span>
                </div>
              </div>
            </div>
            <WhiteArea border>
              <div className="list-decimal list-inside">
                {response?.map((question: any, index: number) => {
                  const answerExplanation = question.question.answerExplanation;

                  return (
                    <div
                      key={question.question._id}
                      className="relative border-b last:border-none py-4 flex items-start gap-1"
                    >
                      <span>{index + 1}.</span>
                      <section className="inline-flex flex-col w-full gap-2">
                        <span className="inline-block mb-2 font-semibold">
                          {question.question.question}
                        </span>
                        <ol className="pl-2 flex flex-col gap-2 list-inside list-[lower-alpha]">
                          {question.question.options?.map((_option: any) => {
                            const { option, isCorrect } = _option;
                            const answerChoice = question.answer;
                            const isSame = answerChoice === option;

                            return (
                              <li
                                className="text-sm text-slate-800"
                                key={'option'}
                              >
                                <span
                                  className={`inline-flex items-center gap-1 font-medium ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
                                >
                                  <label className="flex items-center gap-1">
                                    <input
                                      type="radio"
                                      className="mt-0.5"
                                      checked={isSame}
                                    />
                                    {option}
                                  </label>
                                </span>
                              </li>
                            );
                          })}
                        </ol>
                        {answerExplanation && (
                          <WhiteArea
                            twClass={`${question.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
                            border
                          >
                            <span className="text-sm">
                              {question.question.answerExplanation}
                            </span>
                          </WhiteArea>
                        )}
                      </section>
                    </div>
                  );
                })}
              </div>
            </WhiteArea>
          </div>
        </WhiteArea>
      )}
    </div>
  );
};

export default Page;
