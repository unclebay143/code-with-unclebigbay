'use client';

import { Button } from '@/components/atoms/Button';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import useCourse from '@/components/hooks/useCourse';
import useTag from '@/components/hooks/useTag';
import { AddAssignmentModal } from '@/components/molecules/dashboard/add-assignment-modal';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { convertWhiteSpaceToDash } from '@/utils';
import { Course, Questions, Tag, Tags } from '@/utils/types';
import { X } from 'lucide-react';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Page = () => {
  const { tags, mutation: createTag } = useTag();
  const [showSuggestedTags, setShowSelectedTags] = useState(false);
  const [selectTags, setSelectedTags] = useState<Tags>([]);
  const [currentTag, setCurrentTag] = useState<string>('');
  const [slug, setSlug] = useState('');

  const { mutation } = useCourse();
  const [selectedQuestions, setSelectedQuestions] = useState<Questions>([]);
  const [openAssignmentModal, setOpenAssignmentModal] =
    useState<boolean>(false);
  const { data: user } = useCurrentStudent();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: '',
      brief: '',
      slug: '',
      description: '',
      ytVideoId: '',
      coverImageUrl: '',
      viewTime: 0,
      author: user?._id,
    },
  });

  const handleSlugChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSlug = event.target.value;
    // replace whitespace and any special characters from slug
    const formattedSlug = newSlug
      .replace(/[^a-zA-Z0-9-]/g, ' ')
      .replace(/\s+/g, '-');

    setValue('slug', formattedSlug.toLowerCase());
    setSlug(formattedSlug.toLowerCase());
  };

  const createNewCourse = (data: any) => {
    const newCourse: Course = {
      ...data,
      type: 'video',
      questions: selectedQuestions.map((question) => question._id),
      tags: selectTags.map((tag) => tag._id),
    };
    mutation.mutate(newCourse);
  };

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

  const showSelectedQuestions = selectedQuestions.length > 0;

  return (
    <>
      <WhiteArea border>
        <form onSubmit={handleSubmit(createNewCourse)}>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <DashboardSubheading title="New course" />
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-sm">
                    <DashboardSubheading title="Title" />
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    placeholder="i.e introduction to software engineering"
                    className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="brief" className="text-sm">
                    <DashboardSubheading title="Brief" />
                  </label>
                  <input
                    {...register('brief')}
                    type="text"
                    placeholder="This course will teach you about introduction to software engineering"
                    className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="slug" className="text-sm">
                    <DashboardSubheading title="Slug" />
                  </label>
                  <input
                    onChange={handleSlugChange}
                    type="text"
                    value={slug}
                    placeholder="introduction-to-software-engineering"
                    className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="question" className="text-sm">
                    <DashboardSubheading title="Cover Image URL" />
                  </label>
                  <input
                    {...register('coverImageUrl')}
                    type="text"
                    placeholder="https://cdn.sample.com"
                    className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="question" className="text-sm">
                    <DashboardSubheading title="Description" />
                  </label>
                  {/* <input
                    {...register('description')}
                    type="text"
                    className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                  /> */}

                  <textarea
                    {...register('description')}
                    placeholder="Write a brief about the course"
                    className={`text-sm min-h-44 max-h-44 text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="question" className="text-sm">
                    <DashboardSubheading title="YT Video ID" />
                  </label>
                  <input
                    {...register('ytVideoId')}
                    type="text"
                    placeholder="JH77WsDH8yY"
                    className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="question" className="text-sm flex gap-2">
                    <DashboardSubheading title="Video view time (in seconds)" />
                    <Link
                      target="_blank"
                      rel="noopener"
                      href="https://www.timecalculator.net/minutes-to-time"
                      className="underline text-blue-500"
                    >
                      Converter
                    </Link>
                  </label>
                  <input
                    {...register('viewTime')}
                    type="number"
                    placeholder="3600"
                    className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                  />
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
                          let cleanedInputValue = inputValue.replace(
                            /\s/g,
                            '-',
                          ); // remove space
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
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    size="xs"
                    appearance="secondary-slate"
                    onClick={() => setOpenAssignmentModal(true)}
                  >
                    Add assignment
                  </Button>
                  {!showSelectedQuestions && (
                    <Button size="xs" type="submit">
                      Publish
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {showSelectedQuestions && (
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

            {showSelectedQuestions && (
              <div>
                <Button size="xs" type="submit">
                  Publish
                </Button>
              </div>
            )}
          </div>
        </form>
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
