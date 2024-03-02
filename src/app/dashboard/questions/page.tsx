'use client';

import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Minus, MinusCircle, Plus, X } from 'lucide-react';
import { IconButton } from '@/components/atoms/IconButton';
import { questions } from '@/utils/dummy-data';
import { toast } from 'sonner';

type Props = {};

const NewQuestionModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const emptyOption = {
    label: '',
    isCorrect: false,
    id: crypto.randomUUID(),
  };
  const [options, setOptions] = useState<
    {
      id: string;
      label: string;
      isCorrect: boolean;
    }[]
  >([emptyOption, emptyOption]);

  const disableAddOptionBtn = options.length === 5;

  const handleAddOption = () => {
    if (disableAddOptionBtn) return;
    setOptions((prevOptions) => [...prevOptions, emptyOption]);
  };

  const removeItemField = (id: string) => {
    let optionFields = [...options];
    if (optionFields.length === 2) {
      toast.error('Please provide at least 2 options for the question.');
      return;
    }
    const newFields = optionFields.filter((option) => option.id !== id);
    setOptions(newFields);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed z-[9999] inset-0 animate-fade-in bg-gray-100 bg-opacity-50 backdrop-blur-md" />
        <Dialog.Content className="flex flex-col gap-5 z-[9999] fixed bg-white dark:bg-slate-950 top-[50%] left-[50%] w-full p-5 rounded-md max-w-[450px] -translate-y-2/4 -translate-x-2/4">
          <div className="flex items-center justify-between border-b pb-3">
            <Dialog.Title className="text-slate-700 font-semibold">
              New Question
            </Dialog.Title>
            <Dialog.Close asChild>
              <IconButton Icon={X} aria-label="Close" />
            </Dialog.Close>
          </div>
          <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="question" className="text-sm">
                <DashboardSubheading title="Question title" />
              </label>
              <input
                type="text"
                name="question"
                placeholder="What is...?"
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
              />
            </div>
            {options.map(({ label, isCorrect, id }, index) => (
              <div className="flex flex-col gap-2" key={label}>
                <div className="text-slate-600 flex items-center">
                  <IconButton
                    Icon={MinusCircle}
                    size="md"
                    onClick={() => removeItemField(id)}
                  />

                  <label
                    htmlFor={`option-${index}`}
                    className="text-slate-600 text-sm"
                  >
                    <DashboardSubheading title={`Option ${index + 1}`} />
                  </label>
                </div>

                <div className="text-slate-600 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Label"
                    className="w-full text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                  />
                  <input
                    id={`option-${index}`}
                    type="radio"
                    name={`question-option`}
                  />
                </div>
              </div>
            ))}
            <div className="flex items-center justify-end">
              {disableAddOptionBtn && (
                <span className="text-sm text-red-500">
                  Max options reached
                </span>
              )}
              <Button
                appearance="link-secondary"
                size="xs"
                onClick={handleAddOption}
                disabled={disableAddOptionBtn}
              >
                <Plus size={16} />
                <span className="text-sm">Add option</span>
              </Button>
            </div>
          </section>

          <div className="flex items-center justify-between pt-5 border-t">
            <div>
              <label className="flex items-center gap-1">
                <input id="" type="checkbox" className="mt-0.5" />
                <span className="text-slate-600 text-sm">Create more</span>
              </label>
            </div>
            <Dialog.Close asChild>
              <Button size="sm">Add question</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Page = (props: Props) => {
  const [openNewQuestionModal, setOpenNewQuestionModal] = useState(false);
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
          <WhiteArea border>
            <ul className="list-decimal list-inside">
              {questions.map(({ options, question, answer }) => (
                <li key={question} className="border-b last:border-none py-4">
                  <span className="inline-block mb-2">{question}</span>
                  <ol className="pl-2 flex flex-col gap-2 list-inside list-[lower-alpha]">
                    {options.map((option) => {
                      const isCorrect = option === answer;
                      return (
                        <li className="text-sm" key={option}>
                          HTML is HyperText Markup Language{' '}
                          {isCorrect && (
                            <span className="px-2 py-1 rounded bg-green-100 text-green-600">
                              answer
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </li>
              ))}
            </ul>
          </WhiteArea>
        </div>
      </WhiteArea>
      <NewQuestionModal
        isOpen={openNewQuestionModal}
        close={() => setOpenNewQuestionModal(false)}
      />
    </>
  );
};

export default Page;
