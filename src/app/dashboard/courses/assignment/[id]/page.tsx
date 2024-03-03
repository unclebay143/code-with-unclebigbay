'use client';

import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { EmptyState } from '@/components/molecules/dashboard/empty-state';
import { Question } from '../../../../../../types';

type Questions = Question[];

const Page = () => {
  const defaultQuestions = {
    question: 'What is programming?',
    options: [
      { option: 'Coding', isCorrect: false },
      { option: 'Computer language', isCorrect: true },
      { option: 'Human language', isCorrect: false },
    ],
  };

  const [questions, setQuestions] = useState<Questions>([defaultQuestions]);
  const noQuestions = questions.length === 0;
  const canShowQuestions = !noQuestions;

  return (
    <>
      <WhiteArea border>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <DashboardSubheading title="Assignment: Introduction to HTML" />
            <Button size="xs" appearance="secondary-slate">
              <div className="flex gap-1 items-center">
                <ArrowLeft size={14} />
                <span>Back to material</span>
              </div>
            </Button>
          </div>
          {noQuestions && (
            <EmptyState label="Questions and options will appear here..." />
          )}
          {canShowQuestions && (
            <WhiteArea border>
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
                                <input
                                  type="radio"
                                  className="mt-0.5"
                                  name={questionIndex.toString()}
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
              <Button size="xs">Submit</Button>
            </WhiteArea>
          )}
        </div>
      </WhiteArea>
    </>
  );
};

export default Page;
