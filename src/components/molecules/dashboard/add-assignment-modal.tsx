import React from 'react';
import { ModalWrapper } from './modal-wrapper';
import useQuestion from '@/components/hooks/useQuestion';
import { DashboardSubheading } from './dashboard-subheading';
import { Button } from '@/components/atoms/Button';
import { Questions } from '@/utils/types';

type Props = {
  open: boolean;
  selectedQuestions: Questions;
  onOpenChange: () => void;
  setSelectedQuestions: Function;
};

export const AddAssignmentModal = ({
  open,
  onOpenChange,
  selectedQuestions,
  setSelectedQuestions,
}: Props) => {
  const { questions } = useQuestion();
  return (
    <ModalWrapper open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col gap-4">
        <div className="border-b pb-3">
          <DashboardSubheading title="Select questions..." />
        </div>
        {questions?.map((questions, index) => {
          const { _id, question } = questions;
          const isChecked = !!selectedQuestions.find(
            (selectedQuestion) => selectedQuestion._id === _id,
          );
          return (
            <div
              className="flex gap-2 items-center"
              key={`add-assignment-modal-${_id}`}
            >
              <input
                id={_id}
                type="checkbox"
                defaultChecked={isChecked}
                onChange={(e) => {
                  const status = e.target.checked;
                  if (status === false) {
                    const removeQuestion = selectedQuestions.filter(
                      (selectedQuestion) => selectedQuestion._id !== _id,
                    );
                    setSelectedQuestions(removeQuestion);
                    return;
                  }
                  setSelectedQuestions((prevAssignments: any) => [
                    ...prevAssignments,
                    questions,
                  ]);
                }}
              />
              <label
                htmlFor={_id}
                className="text-sm text-slate-600 font-medium cursor-pointer"
              >
                {question}
              </label>
            </div>
          );
        })}
        <div>
          <Button size="xs" onClick={onOpenChange}>
            Done
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};
