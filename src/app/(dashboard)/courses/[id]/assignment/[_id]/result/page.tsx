'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  Badge,
  Banner,
  Button,
  Spinner,
  AlertTriangle,
} from '@hashnode/matrix-ui';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';

import { useAssignmentResponseById } from '@/components/hooks/useAssignmentResponse';
import { capitalizeFirstLetter } from '@/utils';

const Page = () => {
  const currentPathname = usePathname();
  const assignmentId = currentPathname.split('/')[4];
  const { data, isFetching } = useAssignmentResponseById(assignmentId!);
  const assignmentResponse = data?.assignmentResponse;
  const score = assignmentResponse?.score;
  const status = assignmentResponse?.status;
  const grade = assignmentResponse?.grade;
  const response = assignmentResponse?.response;
  const totalQuestion = response?.length;
  const courseSlug = assignmentResponse?.course?.slug;

  const canShowQuestions = !isFetching;
  const courseTitle = assignmentResponse?.course?.title;

  const mapStatusToColor: { [key: string]: 'green' | 'red' } = {
    passed: 'green',
    failed: 'red',
  };

  console.log(assignmentId, courseSlug);

  const loader = (
    <WhiteArea twClass="!p-0 bg-slate-50 animate-pulse" border>
      <div className="flex items-center justify-center min-h-[80vh] gap-2 text-slate-600">
        <Spinner className="text-slate-600" />
        <span>Loading assignment response</span>
      </div>
    </WhiteArea>
  );

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
                  <Badge theme={`${mapStatusToColor[status]}`}>
                    {capitalizeFirstLetter(status)}
                  </Badge>
                  <span>&middot;</span>
                  <span className="font-medium">Total: </span>
                  <span>{totalQuestion}</span>
                  <span>&middot;</span>
                  <span className="font-medium">Score: </span>
                  <span>{score}</span>
                  <span>&middot;</span>
                  <span className="font-medium">Grade: </span>
                  <span>{grade}</span>
                </div>
              </div>
            </div>
            <Banner
              isFullWidth
              color="neutral"
              icon={AlertTriangle}
              title="Screenshot Guidelines"
              description="Please ensure your screenshot does not publicly display any answers below."
              // description="Sharing assignment solutions online can compromise academic integrity for everyone.  When taking screenshots, please ensure solutions are not visible."
            />
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
                        <span className="mb-2 font-semibold">
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
                                      disabled={isCorrect ? false : true}
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
