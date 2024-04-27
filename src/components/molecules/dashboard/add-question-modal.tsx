import React, { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import * as Dialog from '@radix-ui/react-dialog';
import {
  NewQuestion,
  Option,
  Options,
  Question,
  Tag,
  Tags,
} from '@/utils/types';
import { ModalWrapper } from './modal-wrapper';
import useTag from '@/components/hooks/useTag';
import { convertWhiteSpaceToDash } from '@/utils';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { IconButton, MinusCircle, Plus, X } from '@hashnode/matrix-ui';

const emptyOption: Option = {
  option: '',
  isCorrect: false,
};

export const AddQuestionModal = ({
  isOpen,
  close,
  mutation,
}: {
  isOpen: boolean;
  close: () => void;
  mutation: UseMutationResult<
    AxiosResponse<any, any>,
    any,
    NewQuestion,
    unknown
  >;
}) => {
  const [showSuggestedTags, setShowSelectedTags] = useState(false);
  const [selectTags, setSelectedTags] = useState<Tags>([]);
  const { tags, mutation: createTag } = useTag();
  const [currentTag, setCurrentTag] = useState<string>('');

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
  const onSubmit = async (question: any) => {
    const correctOptions: Options = (question as Question).options.filter(
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

    const newQuestion = { ...question, tags: selectTags.map((tag) => tag._id) };
    mutation.mutate(newQuestion);
    const wantToCreateMore = createMoreRef.current!.checked;

    if (!wantToCreateMore) {
      return close();
    }
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      // not using reset() to prevent resetting 'Create more'
      resetField('options');
      resetField('question');
      resetField('answerExplanation');
      setSelectedTags([]);
    }
  }, [mutation.isSuccess, resetField]);

  const SuggestedTags = () => {
    if (!currentTag && !showSuggestedTags) return;

    const excludeSelectedTags = tags?.filter(
      (tag) => !selectTags.some((selectTag) => selectTag._id === tag._id),
    );

    const filteredTags = excludeSelectedTags
      ?.map((tag) => {
        if (tag.name.toLowerCase().includes(currentTag.toLowerCase()))
          return tag as Tag;
      }) // array contains undefined for which doesn't exist
      .filter((tag) => tag !== undefined); // filter out undefineds

    return (
      <div className="absolute right-0 w-full h-auto bg-white rounded-md shadow-lg top-100 dark:bg-slate-800">
        {currentTag && filteredTags && filteredTags?.length < 1 && (
          <button
            type="button"
            className="capitalize text-sm text-slate-600 font-medium w-full text-left px-4 py-3 hover:bg-slate-50"
            onClick={() => {
              createTag.mutate({
                name: currentTag,
                slug: convertWhiteSpaceToDash(currentTag),
              });
            }}
          >
            Note found. Create{' '}
            <span className="font-semibold text-green-800 lowercase">
              &quot;{currentTag}&quot;
            </span>{' '}
            as a tag
          </button>
        )}

        {filteredTags?.map((tag) => {
          if (!tag) return;
          return (
            <button
              key={tag?._id}
              type="button"
              className="lowercase text-sm text-slate-600 font-medium w-full text-left px-4 py-3 hover:bg-slate-50"
              onClick={() => {
                const alreadyExist = selectTags.some(
                  ({ name }) => name === currentTag.toLowerCase(),
                );

                if (alreadyExist) {
                  toast.success('Tag already selected');
                  setCurrentTag('');
                  return;
                }

                setSelectedTags((prevTags) => [...prevTags, tag as Tag]);
                setCurrentTag('');
                setShowSelectedTags(false);
              }}
            >
              {tag?.name}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <ModalWrapper open={isOpen} onOpenChange={close}>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
                {controlledOptionFields.length > 2 && (
                  <IconButton
                    Icon={MinusCircle}
                    size="md"
                    onClick={() => handleRemoveItemField(index)}
                  />
                )}
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
                  placeholder=""
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
              <span className="text-sm text-red-500">Max options reached</span>
            )}

            <Button
              appearance="link-secondary"
              size="xs"
              onClick={handleAddOption}
              disabled={disableAddOptionBtn}
              type="button"
            >
              <Plus size="sm" />
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
                  placeholder="Search or create tag"
                  className="w-full text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                  value={currentTag}
                  onFocus={() => setShowSelectedTags(true)}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    let cleanedInputValue = inputValue.replace(/\s/g, '-'); // remove space
                    setCurrentTag(cleanedInputValue);
                  }}
                />
              </div>
            </div>
            <SuggestedTags />
            <div className="flex flex-wrap gap-1 pt-1">
              {selectTags.map(({ name }) => {
                return (
                  <div className="flex items-center" key={name}>
                    <span className="bg-slate-50 text-xs rounded font-medium px-1 lowercase">
                      {name}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const removedTag = selectTags.filter(
                          (prevTag) => prevTag.name !== name,
                        );
                        setSelectedTags(removedTag);
                      }}
                      className="text-red-500"
                    >
                      <X size="sm" />
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
              <input type="checkbox" className="mt-0.5" ref={createMoreRef} />
              <span className="text-slate-600 text-sm">Create more</span>
            </label>
          </div>
          <Button size="sm" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add question'}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};
