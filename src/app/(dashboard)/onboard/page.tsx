'use client';

import { YTVideo } from '@/components/atoms/YTVideo';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';

import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import useAudit from '@/components/hooks/useAudit';
import {
  IconButton,
  ChevronDown,
  ChevronUp,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
  Button,
} from '@hashnode/matrix-ui';
import { ONBOARDING_YT_VIDEO_ID } from '@/utils';

const Page = () => {
  const { data: currentStudent, update } = useCurrentStudent();
  const { mutation: newAudit } = useAudit();
  const [showMore, setShowMore] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues: {
      stack: '',
    },
  });

  const handleShowMoreVisibility = () => {
    setShowMore((prevVisibility) => !prevVisibility);
  };

  const handleStackUpdate = (data: { stack: string }) => {
    if (currentStudent) {
      update.mutate({
        username: currentStudent.username,
        _id: currentStudent._id,
        stack: data.stack,
      });
      newAudit.mutate({
        type: 'onboarding',
        studentId: currentStudent._id,
        title: 'Onboarding completed 🎉',
        description: `Update stack to "${data.stack}"`,
      });
    }
  };

  const disableBtn = !isDirty || !isValid || update.isPending;

  useEffect(() => {
    if (update.isSuccess) {
      window.location.href = '/overview';
    }
  }, [update.isSuccess]);

  return (
    <WhiteArea twClass="bg-indigo-50/60" border>
      <div className="py-4 px-2 flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl text-slate-600 text-center font-medium">
            Welcome to your Dashboard
          </h3>
          <div className="text-center text-slate-600 flex flex-col gap-3 max-w-3xl mx-auto">
            <p className="text-center text-slate-600">
              I&apos;m excited to have you on board! To get started, check out
              the video below. It&apos;ll walk you through everything you need
              to know about using this platform efficiently.
            </p>
            <span>Let&apos;s dive in! 🚀</span>
          </div>
        </div>

        <YTVideo ytVideoId={ONBOARDING_YT_VIDEO_ID} />

        <WhiteArea twClass="!p-0 bg-white" border>
          <div
            role="button"
            onClick={handleShowMoreVisibility}
            className={`group ${showMore ? 'pt-4 pb-0' : 'py-4'} px-5 flex w-full items-center justify-between`}
          >
            <span className="text-slate-600 font-medium group-hover:text-slate-800">
              Exercise
            </span>
            <div className="group-hover:animate-pulse">
              <IconButton Icon={showMore ? ChevronUp : ChevronDown} size="sm" />
            </div>
          </div>
          {showMore && (
            <section className="px-5 flex flex-col items-start gap-5 py-4">
              <div className="flex gap-5 w-full flex-wrap">
                <form
                  onSubmit={handleSubmit(handleStackUpdate)}
                  className="flex flex-wrap gap-5 w-full justify-between items-center"
                >
                  <h3 className="font-medium text-lg text-slate-700">
                    Choose your specialization. This determines the course
                    content tailored specifically for you on this platform. Feel
                    free to adjust this anytime from your professional settings.
                  </h3>
                  <div className="w-full">
                    <div className="flex flex-col gap-2">
                      <Controller
                        control={control}
                        name="stack"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger size="md" shape="rectangle" />
                            <SelectContent>
                              <SelectViewPort>
                                <SelectItem
                                  value={'frontend'}
                                  label={'Frontend'}
                                />
                                <SelectItem
                                  value={'backend'}
                                  label={'Backend'}
                                />
                                <SelectItem
                                  value={'full-stack'}
                                  label={'Full-stack'}
                                />
                              </SelectViewPort>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <Button
                      appearance="primary-slate"
                      type="submit"
                      size="sm"
                      disabled={disableBtn}
                    >
                      {update.isPending
                        ? 'One moment...'
                        : 'Complete exercise 🎉'}
                    </Button>
                  </div>
                </form>
              </div>
            </section>
          )}
        </WhiteArea>
      </div>
    </WhiteArea>
  );
};

export default Page;
