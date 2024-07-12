import { Button, IconButton, X } from '@hashnode/matrix-ui';
import { ShowConfetti } from '@/components/molecules/Confetti';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { ModalWrapper } from '@/components/molecules/dashboard/modal-wrapper';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { HackathonSubmission } from '@/utils/types';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

type SubmitEntryModalProps = {
  isOpen: boolean;
  close: () => void;
  hackathonId: string;
  hackathonName: string;
  studentId: string;
  isSubmitEntryPending: boolean;
  submitEntry: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    Error,
    HackathonSubmission,
    unknown
  >;
  onSubmitEntry: () => void;
};

const hackathonProjectSubmissionSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  demoUrl: z.string(),
  socialUrl: z.string(),
  articleUrl: z.string(),
  repositoryUrl: z.string(),
  feedback: z.string(),
});

type HackathonProjectSubmissionSchema = z.infer<
  typeof hackathonProjectSubmissionSchema
>;

export const SubmitEntryModal = ({
  isOpen,
  close,
  hackathonId,
  hackathonName,
  studentId,
  submitEntry,
  isSubmitEntryPending,
  onSubmitEntry,
}: SubmitEntryModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HackathonProjectSubmissionSchema>({
    defaultValues: {
      name: '',
      description: '',
      url: '',
      demoUrl: '',
      socialUrl: '',
      articleUrl: '',
      repositoryUrl: '',
      feedback: '',
    },
  });

  const disableSubmitBtn = isSubmitEntryPending;

  const urlErrorMessage = errors.url?.message;

  const onSubmit = (formData: HackathonProjectSubmissionSchema) => {
    const {
      name,
      description,
      url,
      demoUrl,
      repositoryUrl,
      socialUrl,
      articleUrl,
      feedback,
    } = formData;

    const payload: HackathonSubmission = {
      hackathon: hackathonId,
      student: studentId,
      project: {
        name,
        description,
        url,
        demoUrl,
        articleUrl,
        repositoryUrl,
        socialUrl,
      },
      feedback,
    };
    submitEntry(payload, {
      onSuccess() {
        setSubmitted(true);
        onSubmitEntry();
      },
    });
  };

  return (
    <div>
      {submitted && (
        <section className="w-full h-full absolute inset-0">
          <ShowConfetti />
        </section>
      )}
      <ModalWrapper open={isOpen} onOpenChange={close} maxWidth={500}>
        {!submitted ? (
          <section className="flex flex-col gap-3">
            <section className="flex justify-between items-center">
              <h3 className="text-slate-700 font-semibold">
                Entry Submission for {hackathonName}
              </h3>
              <IconButton
                Icon={X}
                disabled={isSubmitEntryPending}
                onClick={close}
              />
            </section>
            <section className="flex flex-col gap-0.5 border border-blue-200 bg-blue-50 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-slate-700">
                Please read me
              </h3>
              <section className="flex flex-col gap-1">
                <p className="text-sm text-slate-600">
                  Make sure you have included the appropriate hashtags in your
                  article, project repository, and social media posts.
                </p>
                <p className="text-sm text-slate-600">
                  <ul className="list-disc list-inside ml-2 text-sm">
                    <li>
                      <a
                        href="https://www.youtube.com/watch?v=mRdp03De78k"
                        target="_blank"
                        rel="noopener"
                        className="hover:underline text-blue-600"
                      >
                        Click here for project demo sample
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://unclebigbay.com/how-to-embed-youtube-videos-into-your-web-projects#heading-1-the-youtube-video-id"
                        target="_blank"
                        rel="noopener"
                        className="hover:underline text-blue-600"
                      >
                        Checkout how to get your YouTube Embed Id
                      </a>
                    </li>
                  </ul>
                </p>
              </section>
            </section>

            <section className="flex flex-col gap-3">
              <form
                className="flex flex-col gap-3 pt-1"
                onSubmit={handleSubmit(onSubmit)}
              >
                <ScrollArea.Root className="overflow-hidden">
                  <ScrollArea.Viewport>
                    <section className="flex flex-col gap-3 px-1 max-h-[50vh]">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm">
                          <DashboardSubheading title="Project Name" />
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="LearnEase - an AI Learning Platform for Everyone"
                          className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${urlErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('name', { required: true })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="description"
                          className="text-sm flex justify-between items-end"
                        >
                          <DashboardSubheading title="Description" />
                        </label>
                        <textarea
                          id="description"
                          placeholder="Tell us a little bit about your project..."
                          className={`min-h-[100px] text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${urlErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('description', { required: true })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="demoUrl" className="text-sm">
                          <DashboardSubheading title="Project Demo (YouTube Embed ID)" />
                        </label>
                        <input
                          id="demoUrl"
                          type="text"
                          placeholder="JH77WsDH8yY"
                          className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${urlErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('demoUrl', {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="url" className="text-sm">
                          <DashboardSubheading title="Hosted Project URL" />
                        </label>
                        <input
                          id="url"
                          type="text"
                          placeholder="https://learnease.vercel.app"
                          className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${urlErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('url', { required: true })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="articleUrl" className="text-sm">
                          <DashboardSubheading title="Published Article URL" />
                        </label>
                        <input
                          id="articleUrl"
                          type="text"
                          placeholder="https://unclebigbay.com/introducing-learnease"
                          className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${urlErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('articleUrl', { required: true })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="repositoryUrl" className="text-sm">
                          <DashboardSubheading title="Repository URL (GitHub or GitLab)" />
                        </label>
                        <input
                          id="repositoryUrl"
                          type="text"
                          placeholder="https://github.com/unclebay143/learnease"
                          className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${urlErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('repositoryUrl', { required: true })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="socialUrl"
                          className="text-sm flex justify-between items-end"
                        >
                          <DashboardSubheading title="Social Media Post (LinkedIn or Twitter)" />
                          <span className="text-xs text-slate-400">
                            Optional
                          </span>
                        </label>
                        <input
                          type="text"
                          id="socialUrl"
                          placeholder="https://twitter.com/unclebigbay143/status/1650807730267889664"
                          className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${urlErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('socialUrl', { required: true })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="feedback"
                          className="text-sm flex justify-between items-end"
                        >
                          <DashboardSubheading title="Feedback" />
                          <span className="text-xs text-slate-400">
                            Optional
                          </span>
                        </label>
                        <textarea
                          id="feedback"
                          placeholder="Share your feedback on this hackathon with us..."
                          className={`min-h-[100px] text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${urlErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('feedback', { required: true })}
                        />
                      </div>
                      <div className="invisible text-xs text-slate-500 text-center">
                        Thank you!
                      </div>
                    </section>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar
                    orientation="vertical"
                    className="ScrollAreaScrollbar"
                  >
                    <ScrollArea.Thumb className="ScrollAreaThumb" />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Corner className="ScrollAreaCorner" />
                </ScrollArea.Root>
                <div className="flex flex-col gap-2 justify-between items-start">
                  <Button
                    size="xs"
                    appearance="primary-slate"
                    type="submit"
                    disabled={disableSubmitBtn}
                  >
                    {isSubmitEntryPending ? 'Submitting...' : 'Submit'}
                  </Button>
                  <p className="text-[12px] text-slate-700">
                    By submitting your entry to this hackathon, you affirm that
                    the work is your original creation and grant us permission
                    to use your submission on this platform as a reference.
                  </p>
                </div>
              </form>
            </section>
          </section>
        ) : (
          <section className="flex flex-col gap-2 justify-center items-center text-center">
            <h3 className="font-semibold text-slate-600">
              Hackathon Entry Submitted 🎉
            </h3>
            <p className="text-sm text-slate-500">
              Thank you for participating in the{' '}
              <span className="font-semibold">{hackathonName}</span>!
              <br /> Your submission will be evaluated and winners announced
              soon.
            </p>
            <Button
              size="xs"
              appearance="primary-slate"
              onClick={() => {
                close();
                setSubmitted(false);
              }}
            >
              Okay
            </Button>
          </section>
        )}
      </ModalWrapper>
    </div>
  );
};
