import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { ShowConfetti } from '@/components/molecules/Confetti';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { ModalWrapper } from '@/components/molecules/dashboard/modal-wrapper';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = { isOpen: boolean; close: () => void };

export const SubmitEntryModal = ({ isOpen, close }: Props) => {
  const [submitted, setSubmitted] = useState(false);
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
      projectName: '',
      projectURL: '',
      projectDemoYTEmbedId: '',
      socialPostURL: '',
      articleURL: '',
      repositoryURL: '',
      feedback: '',
    },
  });

  const projectURLErrorMessage = errors.projectURL?.message;

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
                Entry Submission for Codathon
              </h3>
              <IconButton Icon={X} disabled={isSubmitting} onClick={close} />
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
                        Click here for project 60s demo sample
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
                onSubmit={() => setSubmitted(true)}
              >
                <ScrollArea.Root className="overflow-hidden">
                  <ScrollArea.Viewport>
                    <section className="flex flex-col gap-3 px-1 max-h-[50vh]">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="projectName" className="text-sm">
                          <DashboardSubheading title="Project Name" />
                        </label>
                        <input
                          id="projectName"
                          type="text"
                          placeholder="LearnEase - an AI Learning Platform for Everyone"
                          className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${projectURLErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('projectName', { required: true })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="projectDemoYTEmbedId"
                          className="text-sm"
                        >
                          <DashboardSubheading title="Project 60s Demo Embed ID" />
                        </label>
                        <input
                          id="projectDemoYTEmbedId"
                          type="text"
                          placeholder="JH77WsDH8yY"
                          className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${projectURLErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('projectDemoYTEmbedId', {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="projectURL" className="text-sm">
                          <DashboardSubheading title="Hosted Project URL" />
                        </label>
                        <input
                          id="projectURL"
                          type="text"
                          placeholder="https://learnease.vercel.app"
                          className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${projectURLErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('projectURL', { required: true })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="articleURL" className="text-sm">
                          <DashboardSubheading title="Published Article URL" />
                        </label>
                        <input
                          id="articleURL"
                          type="text"
                          placeholder="https://unclebigbay.com/introducing-learnease"
                          className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${projectURLErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('articleURL', { required: true })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="repositoryURL" className="text-sm">
                          <DashboardSubheading title="Repository URL (GitHub or GitLab)" />
                        </label>
                        <input
                          id="repositoryURL"
                          type="text"
                          placeholder="https://github.com/unclebay143/learnease"
                          className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${projectURLErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('repositoryURL', { required: true })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="socialPostURL"
                          className="text-sm flex justify-between items-end"
                        >
                          <DashboardSubheading title="Social Media Post (LinkedIn or Twitter)" />
                          <span className="text-xs text-slate-400">
                            Optional
                          </span>
                        </label>
                        <input
                          type="text"
                          id="socialPostURL"
                          placeholder="https://twitter.com/unclebigbay143/status/1650807730267889664"
                          className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${projectURLErrorMessage && 'ring-2 ring-red-500'}`}
                          {...register('socialPostURL', { required: true })}
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
                          className={`min-h-[100px] text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${projectURLErrorMessage && 'ring-2 ring-red-500'}`}
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
                  <Button size="xs" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
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
              Thank you for participating in the Codakthon hackathon!
              <br /> The winners will be evaluated and announced soon.
            </p>
            <Button
              size="xs"
              appearance="secondary-slate"
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
