import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { ModalWrapper } from '@/components/molecules/dashboard/modal-wrapper';
import { X } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

type Props = { isOpen: boolean; close: () => void };

export const SubmitEntryModal = ({ isOpen, close }: Props) => {
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
      projectURL: '',
      socialPostURL: '',
      blogPostURL: '',
      repositoryURL: '',
      feedback: '',
    },
  });

  const projectURLErrorMessage = errors.projectURL?.message;

  const submitted = true;
  return (
    <ModalWrapper open={isOpen} onOpenChange={close} maxWidth={500}>
      {!submitted ? (
        <section className="flex flex-col gap-5">
          <h3 className="text-slate-700 font-semibold">
            Entry Submission for Codathon
          </h3>
          <section className="flex flex-col gap-2 border bg-slate-50 p-4 rounded-xl">
            <h3 className="text-sm font-semibold text-slate-700">
              Please read me
            </h3>
            <p className="text-sm text-slate-600">
              Make sure you have included the appropriate hashtags in your
              article, project repository, and social media posts.
            </p>
            {/* <ul className="ml-2 text-sm text-slate-600">
            <li className="mb-3">
              Hash tag:{' '}
              <span className="border rounded-full text-xs p-0.5 px-1 text-slate-600 bg-slate-100">
                #codakathon
              </span>
            </li>
            <li className="mb-3 flex items-start gap-2 sm:items-center sm:gap-1.5">
              <input type="checkbox" className="mt-1 sm:mt-0" id="todo-1" />
              <label htmlFor="todo-1">
                I&apos;ve added the correct Hash tag to my social posts
              </label>
            </li>
            <li className="flex items-start gap-2 sm:items-center sm:gap-1.5">
              <input type="checkbox" className="mt-1 sm:mt-0" id="todo-2" />
              <label htmlFor="todo-2">
                I&apos;ve added the correct Hash tag to my project repository
              </label>
            </li>
          </ul>
             */}
          </section>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="projectURL" className="text-sm">
                <DashboardSubheading title="Project URL" />
              </label>
              <input
                id="projectURL"
                type="text"
                placeholder="https://codewithunclebigbay.vercel.app"
                className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${projectURLErrorMessage && 'ring-2 ring-red-500'}`}
                {...register('projectURL', { required: true })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="blogPostURL" className="text-sm">
                <DashboardSubheading title="Article URL" />
              </label>
              <input
                id="blogPostURL"
                type="text"
                placeholder="https://unclebigbay.com/introducing-myproject"
                className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${projectURLErrorMessage && 'ring-2 ring-red-500'}`}
                {...register('blogPostURL', { required: true })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="repositoryURL" className="text-sm">
                <DashboardSubheading title="Repository URL" />
              </label>
              <input
                id="repositoryURL"
                type="text"
                placeholder="i.e Github or Gitlab"
                className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${projectURLErrorMessage && 'ring-2 ring-red-500'}`}
                {...register('repositoryURL', { required: true })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="socialPostURL"
                className="text-sm flex justify-between items-end"
              >
                <DashboardSubheading title="Social media post" />
                <span className="text-xs text-slate-400">Optional</span>
              </label>
              <input
                type="text"
                id="socialPostURL"
                placeholder="Linkedin.com or Twitter.com"
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
                <span className="text-xs text-slate-400">Optional</span>
              </label>
              <textarea
                id="feedback"
                placeholder="Share your feedback on this hackathon with us..."
                className={`min-h-40 max-h-48 text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md ${projectURLErrorMessage && 'ring-2 ring-red-500'}`}
                {...register('feedback', { required: true })}
              />
            </div>
            <div className="flex justify-between items-start">
              <Button
                size="xs"
                type="submit"
                disabled={isSubmitting}
                appearance="secondary-slate"
                onClick={close}
              >
                Close
              </Button>
              <Button size="xs" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </div>
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
          <Button size="xs" appearance="secondary-slate" onClick={close}>
            Okay
          </Button>
        </section>
      )}
    </ModalWrapper>
  );
};
