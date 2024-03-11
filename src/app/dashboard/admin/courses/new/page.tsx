'use client';

import { Button } from '@/components/atoms/Button';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import useMaterial from '@/components/hooks/useMaterial';
import { AddAssignmentModal } from '@/components/molecules/dashboard/add-assignment-modal';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { Material, Questions } from '@/utils/types';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Page = () => {
  const { mutation } = useMaterial();
  const [selectedQuestions, setSelectedQuestions] = useState<Questions>([]);
  const [openAssignmentModal, setOpenAssignmentModal] =
    useState<boolean>(false);
  const { data: user } = useCurrentStudent();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      ytVideoId: '',
      coverImageUrl: '',
      viewTime: 0,
      author: user?._id,
    },
  });
  const createNewCourse = (data: Material) => {
    const newCourse = {
      ...data,
      type: 'video',
      assignment: selectedQuestions.map((question) => question._id),
    };
    mutation.mutate(newCourse);
  };

  return (
    <>
      <WhiteArea border>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DashboardSubheading title="New course" />
              <Button
                size="xs"
                appearance="secondary-slate"
                onClick={() => setOpenAssignmentModal(true)}
              >
                Add assignment
              </Button>
            </div>
            <form onSubmit={handleSubmit(createNewCourse)}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="question" className="text-sm">
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
                      href="https://www.omnicalculator.com/conversion/minutes-to-seconds-converter"
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
                <div>
                  <Button size="xs" type="submit">
                    Publish
                  </Button>
                </div>
              </div>
            </form>
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
