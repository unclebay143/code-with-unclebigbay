'use client';

import { Button } from '@/components/atoms/Button';
import { AddAssignmentModal } from '@/components/molecules/dashboard/add-assignment-modal';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { Questions } from '@/utils/types';
import React, { useState } from 'react';

const Page = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<Questions>([]);
  const [openAssignmentModal, setOpenAssignmentModal] =
    useState<boolean>(false);

  console.log(selectedQuestions);

  return (
    <>
      <WhiteArea border>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DashboardSubheading title="New material" />
              <Button
                size="xs"
                appearance="secondary-slate"
                onClick={() => setOpenAssignmentModal(true)}
              >
                Add assignment
              </Button>
            </div>
            <form>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="question" className="text-sm">
                    <DashboardSubheading title="Title" />
                  </label>
                  <input
                    type="text"
                    className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="question" className="text-sm">
                    <DashboardSubheading title="Cover Image URL" />
                  </label>
                  <input
                    type="text"
                    className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="question" className="text-sm">
                    <DashboardSubheading title="Description" />
                  </label>
                  <input
                    type="text"
                    className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                  />
                </div>
              </div>
            </form>
            <div>
              <Button size="xs">Publish</Button>
            </div>
          </div>

          {selectedQuestions.length > 0 && (
            <div className="flex flex-col gap-2">
              <DashboardSubheading title="Assignment" />
              <ul className="list-decimal list-inside">
                {selectedQuestions.map(({ _id, question, options }) => {
                  const correctOption = options.find(
                    (option) => option.isCorrect,
                  );
                  return (
                    <li key={_id} className="mt-2">
                      Q: {question} - Ans: {correctOption?.option}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </WhiteArea>
      <AddAssignmentModal
        open={openAssignmentModal}
        onOpenChange={() => setOpenAssignmentModal(false)}
        selectedQuestions={selectedQuestions}
        setSelectedQuestions={setSelectedQuestions}
      />
    </>
  );
};
export default Page;
