'use client';

import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React, { useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import { IconButton } from '@/components/atoms/IconButton';
import { EmptyState } from '@/components/molecules/dashboard/empty-state';
import { Questions } from '@/utils/types';
import { AddQuestionModal } from '@/components/molecules/dashboard/add-question-modal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Page = () => {
  const { data: questions, isFetching } = useQuery({
    queryKey: ['questions'],
    queryFn: () =>
      axios
        .get('/api/questions')
        .then((res) => res.data.questions as Questions),
  });

  const [openNewQuestionModal, setOpenNewQuestionModal] = useState(false);
  const noQuestions = questions?.length === 0;
  const canShowQuestions = !isFetching;

  return (
    <>
      <WhiteArea border>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <DashboardSubheading title="Question management" />
            <Button size="xs" onClick={() => setOpenNewQuestionModal(true)}>
              New Question
            </Button>
          </div>
          {noQuestions && (
            <EmptyState label="Questions and options will appear here..." />
          )}
          <WhiteArea border>
            <div className={`${canShowQuestions ? 'h-auto' : 'min-h-[50vh]'}`}>
              {canShowQuestions && (
                <ul className="list-decimal list-inside">
                  {questions?.map(({ options, question }) => (
                    <li
                      key={question}
                      className="relative border-b last:border-none py-4"
                    >
                      <span className="inline-block mb-2 font-semibold">
                        {question}
                      </span>
                      <ol className="pl-2 flex flex-col gap-2 list-inside list-[lower-alpha]">
                        {options.map(({ option, isCorrect }) => {
                          return (
                            <li className="text-sm text-slate-800" key={option}>
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
                        <IconButton Icon={Trash} size="sm" />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </WhiteArea>
        </div>
      </WhiteArea>
      <AddQuestionModal
        isOpen={openNewQuestionModal}
        close={() => setOpenNewQuestionModal(false)}
      />
    </>
  );
};

export default Page;
