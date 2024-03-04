import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import React, { useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { MinusCircle, Plus, X } from 'lucide-react';
import { IconButton } from '@/components/atoms/IconButton';
import { toast } from 'sonner';
import { Option, Options, Question, Questions } from '@/utils/types';

const emptyOption: Option = {
  option: '',
  isCorrect: false,
};

export const AddQuestionModal = ({
  isOpen,
  close,
  setQuestions,
}: {
  isOpen: boolean;
  close: () => void;
  setQuestions: Function;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting, errors },
    resetField,
  } = useForm({
    defaultValues: {
      id: '',
      question: '',
      options: [emptyOption, emptyOption],
    },
  });
  const createMoreRef = useRef<HTMLInputElement>(null);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const watchOptionFieldArray = watch('options');
  const controlledOptionFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchOptionFieldArray[index],
    };
  });

  const disableAddOptionBtn = controlledOptionFields.length === 5;

  const handleAddOption = () => {
    if (disableAddOptionBtn) return;
    append(emptyOption);
  };

  const handleRemoveItemField = (index: number) => {
    if (controlledOptionFields.length === 2) {
      toast.error('At least two options are required.');
      return;
    }
    remove(index);
  };
  const onSubmit = (question: Question) => {
    const correctOptions: Options = question.options.filter(
      (option) => option.isCorrect,
    );
    const correctOptionMoreThanOne = correctOptions.length > 1;
    const noCorrectOption = correctOptions.length === 0;
    const isInvalid = correctOptionMoreThanOne || noCorrectOption;

    if (isInvalid && correctOptionMoreThanOne) {
      return toast.error('Correct option should not be more than one');
    }

    if (isInvalid && noCorrectOption) {
      return toast.error('Select a correct option');
    }

    toast.success('New question added.');
    console.log(question);
    const wantToCreateMore = createMoreRef.current!.checked;
    // not using reset() to prevent resetting 'Create more'
    resetField('options');
    resetField('question');
    setQuestions((prevQuestions: Questions) => [...prevQuestions, question]);
    if (!wantToCreateMore) {
      return close();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed z-[9999] inset-0 animate-fade-in bg-gray-100 bg-opacity-50 backdrop-blur-md" />
        <Dialog.Content className="z-[9999] fixed bg-white dark:bg-slate-950 top-[50%] left-[50%] w-full p-5 rounded-md max-w-[450px] -translate-y-2/4 -translate-x-2/4">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <Dialog.Title className="text-slate-700 font-semibold">
                New Question
              </Dialog.Title>
              <Dialog.Close asChild>
                <IconButton Icon={X} aria-label="Close" />
              </Dialog.Close>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="question" className="text-sm">
                  <DashboardSubheading title="Question title" />
                </label>
                <input
                  type="text"
                  placeholder="What is...?"
                  className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${errors.question && 'ring-2 ring-red-500'}`}
                  {...register('question', { required: true })}
                />
              </div>
              {/* Options */}
              {controlledOptionFields.map((field, index) => (
                <div className="flex flex-col gap-2" key={field.id}>
                  <div className="text-slate-600 flex items-center">
                    <IconButton
                      Icon={MinusCircle}
                      size="md"
                      onClick={() => handleRemoveItemField(index)}
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
                      key={field.id}
                      type="text"
                      placeholder="Label"
                      className={`w-full text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md  ${errors.options?.length && errors.options.length > 1 && 'ring-2 ring-red-500'}`}
                      {...register(`options.${index}.option`, {
                        required: true,
                      })}
                    />
                    <input
                      id={`option-${index}`}
                      type="checkbox"
                      {...register(`options.${index}.isCorrect`)}
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
            </div>

            <div className="flex items-center justify-between gap-2 pt-5 border-t">
              <div>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    ref={createMoreRef}
                  />
                  <span className="text-slate-600 text-sm">Create more</span>
                </label>
              </div>
              <Button size="sm" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add question'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
