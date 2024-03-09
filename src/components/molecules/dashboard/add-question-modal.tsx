import React, { useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { MinusCircle, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import * as Dialog from '@radix-ui/react-dialog';
import { IconButton } from '@/components/atoms/IconButton';
import { Option, Options, Question, Tag, Tags } from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const emptyOption: Option = {
  option: '',
  isCorrect: false,
};

export const AddQuestionModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [tags, setTags] = useState<Tags>([]);
  const [currentTag, setCurrentTag] = useState<string>('');
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newQuestion: Question) => {
      return axios.post('/api/questions', newQuestion);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      toast.success('New question added.');
    },
  });

  const {
    getValues,
    register,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting, errors },
    resetField,
  } = useForm({
    defaultValues: {
      question: '',
      options: [emptyOption, emptyOption],
      answerExplanation: '',
      tags: [],
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
  const showAnswerExplanationField = getValues().options.some(
    (option) => option.isCorrect,
  );

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
  const onSubmit = async (question: Question) => {
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
    const newQuestion = { ...question, tags };
    mutation.mutate(newQuestion);

    const wantToCreateMore = createMoreRef.current!.checked;
    // not using reset() to prevent resetting 'Create more'
    resetField('options');
    resetField('question');
    resetField('answerExplanation');
    setTags([]);
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
                      placeholder="Option"
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
                  type="button"
                >
                  <Plus size={16} />
                  <span className="text-sm">Add option</span>
                </Button>
              </div>

              <div className="relative">
                <div className="flex flex-col gap-2">
                  <div className="text-slate-600">
                    <label htmlFor="tags" className="text-slate-600 text-sm">
                      <DashboardSubheading title="Select tags" />
                    </label>
                  </div>
                  <div className="text-slate-600">
                    <input
                      autoComplete="off"
                      type="text"
                      id="tags"
                      placeholder="Type tag"
                      className="w-full text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                      value={currentTag}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        let cleanedInputValue = inputValue.replace(/\s/g, '-'); // remove space
                        setCurrentTag(cleanedInputValue);
                      }}
                    />
                  </div>
                </div>
                {currentTag && (
                  <div className="absolute right-0 w-full h-auto bg-white rounded-md shadow-lg top-100 dark:bg-slate-800">
                    <button
                      type="button"
                      className=" w-full text-left px-4 py-3 hover:bg-slate-50"
                      onClick={() => {
                        const alreadyExist = tags.some(
                          ({ name }) => name === currentTag.toLowerCase(),
                        );

                        if (alreadyExist) {
                          toast.success('Tag already selected');
                          setCurrentTag('');
                          return;
                        }

                        const newTag: Tag = {
                          name: currentTag.toLowerCase(),
                          slug: currentTag,
                          logo: '',
                        };

                        setTags((prevTags) => [...prevTags, newTag]);
                        setCurrentTag('');
                      }}
                    >
                      {currentTag}
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap gap-1 pt-1">
                  {tags.map(({ name }) => {
                    return (
                      <div className="flex items-center" key={name}>
                        <span className="bg-slate-50 text-xs rounded font-medium px-1">
                          {name}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const removedTag = tags.filter(
                              (prevTag) => prevTag.name !== name,
                            );
                            setTags(removedTag);
                          }}
                          className="text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {showAnswerExplanationField && (
                <div className="flex flex-col gap-2">
                  <div className="text-slate-600">
                    <label
                      htmlFor="answerExplanation"
                      className="text-slate-600 text-sm"
                    >
                      <DashboardSubheading
                        title="Answer Explanation"
                        color="text-green-600"
                      />
                    </label>
                  </div>
                  <div className="text-slate-600">
                    <input
                      type="text"
                      placeholder="i.e. The correct answer is option x because..."
                      className={`w-full text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md  ${errors.options?.length && errors.options.length > 1 && 'ring-2 ring-red-500'}`}
                      {...register('answerExplanation')}
                    />
                  </div>
                </div>
              )}
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
