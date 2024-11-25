'use client';

import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React, { useState } from 'react';
import { EmptyState } from '@/components/molecules/dashboard/empty-state';
import { AddQuestionModal } from '@/components/molecules/dashboard/add-question-modal';
import useQuestion from '@/components/hooks/useQuestion';
import { showCount } from '@/utils';
import { Delete, Edit, IconButton } from '@hashnode/matrix-ui';

const Page = () => {
  const { questions, mutation, isFetching } = useQuestion();
  const [openNewQuestionModal, setOpenNewQuestionModal] = useState(false);
  const questionCount = questions?.length || 0;
  const noQuestions = questionCount === 0;
  const showQuestions = !noQuestions;

  return (
    <>
      <WhiteArea border>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DashboardSubheading
                title={`Question management ${showCount(questionCount)}`}
              />
            </div>
            <Button size="xs" onClick={() => setOpenNewQuestionModal(true)}>
              New Question
            </Button>
          </div>
          {noQuestions && (
            <EmptyState label="Questions and options will appear here..." />
          )}
          {showQuestions && (
            <WhiteArea border>
              <div className={`${isFetching && 'min-h-screen'}`}>
                <ul className="list-decimal list-inside">
                  {questions?.map(({ options, question, tags }) => {
                    const hasTags = tags && tags.length > 0;
                    return (
                      <li
                        key={question}
                        className="relative border-b last:border-none py-4"
                      >
                        <span className="inline-block font-semibold">
                          {question}
                        </span>
                        <ol className="pl-2 flex flex-col gap-2 list-inside list-[lower-alpha]">
                          {options.map(({ option, isCorrect }) => {
                            return (
                              <li
                                className="text-sm text-slate-800"
                                key={option}
                              >
                                <span className="inline-flex items-center gap-1">
                                  {option}
                                  {isCorrect && (
                                    <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-600">
                                      answer
                                    </span>
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ol>
                        <div className="absolute top-0 right-0 flex flex-col gap-1">
                          <IconButton Icon={Edit} size="sm" />
                          <IconButton Icon={Delete} size="sm" />
                        </div>
                        {hasTags && (
                          <div className="flex items-center gap-1 pt-4 first:pt-0">
                            {tags.map(({ _id, name }) => (
                              <span
                                key={_id}
                                className="bg-blue-50 text-blue-800 text-xs rounded px-1.5"
                              >
                                {name}
                              </span>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </WhiteArea>
          )}
        </div>
      </WhiteArea>
      <AddQuestionModal
        isOpen={openNewQuestionModal}
        close={() => setOpenNewQuestionModal(false)}
        mutation={mutation}
      />
    </>
  );
};

export default Page;
