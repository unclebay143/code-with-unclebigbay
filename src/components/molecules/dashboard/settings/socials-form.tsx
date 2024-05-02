'use client';

import { Button } from '@hashnode/matrix-ui';
import React, { useEffect } from 'react';
import { WhiteArea } from '../white-area';
import { DashboardSubheading } from '../dashboard-subheading';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileUpdateSchema } from '@/validation/userSocialValidation';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { Student } from '@/utils/types';

type profileUpdateSchemaType = z.infer<typeof ProfileUpdateSchema>;

const UserSocialSettings = ({
  currentStudent,
}: {
  currentStudent: Student;
}) => {
  const { update } = useCurrentStudent();
  const isUpdating = update.isPending;

  const defaultValues = {
    github: currentStudent?.socials?.github,
    x: currentStudent?.socials?.x,
    stackoverflow: currentStudent?.socials?.stackoverflow,
    facebook: currentStudent?.socials?.facebook,
    instagram: currentStudent?.socials?.instagram,
    linkedin: currentStudent?.socials?.linkedin,
    mastodon: currentStudent?.socials?.mastodon,
    youtube: currentStudent?.socials?.youtube,
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<profileUpdateSchemaType>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<profileUpdateSchemaType> = (data) => {
    try {
      update.mutate({
        username: currentStudent?.username,
        _id: currentStudent?._id,
        socials: { ...currentStudent?.socials, ...data },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentStudent) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStudent]);

  return (
    <WhiteArea border>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="border-b pb-3">
              <DashboardSubheading title="Social Media" />
              <p className="text-slate-500 text-sm">
                These will serve as your social media display links for others
                to connect with you.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="github">
                <DashboardSubheading title="GitHub" />
              </label>
              <input
                type="text"
                placeholder="https://github.com/username"
                className="text-sm text-slate-600 p-2 outline-none lowercase focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                {...register('github')}
              />
              {errors.github && (
                <span className="text-sm text-red-600">
                  {errors.github.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="linkedIn">
                <DashboardSubheading title="LinkedIn" />
              </label>
              <input
                type="text"
                placeholder="https://linkedin.com/in/username"
                className="text-sm text-slate-600 p-2 outline-none lowercase focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                {...register('linkedin')}
              />
              {errors.linkedin && (
                <span className="text-sm text-red-600">
                  {errors.linkedin.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="twitter">
                <DashboardSubheading title="X/Twitter" />
              </label>
              <input
                type="text"
                placeholder="https://x.com/@username"
                className="text-sm text-slate-600 p-2 outline-none lowercase focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                {...register('x')}
              />
              {errors.x && (
                <span className="text-sm text-red-600">{errors.x.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="facebook">
                <DashboardSubheading title="Facebook" />
              </label>
              <input
                type="text"
                placeholder="https://facebook.com/username"
                className="text-sm text-slate-600 p-2 outline-none lowercase focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                {...register('facebook')}
              />
              {errors.facebook && (
                <span className="text-sm text-red-600">
                  {errors.facebook.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="instagram">
                <DashboardSubheading title="Instagram" />
              </label>
              <input
                type="text"
                placeholder="https://instagram.com/username"
                className="text-sm text-slate-600 p-2 outline-none lowercase focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                {...register('instagram')}
              />
              {errors.instagram && (
                <span className="text-sm text-red-600">
                  {errors.instagram.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="stackoverflow">
                <DashboardSubheading title="Stackoverflow" />
              </label>
              <input
                type="text"
                placeholder="https://stackoverflow.com/users/7953084/username"
                className="text-sm text-slate-600 p-2 outline-none lowercase focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                {...register('stackoverflow')}
              />
              {errors.stackoverflow && (
                <span className="text-sm text-red-600">
                  {errors.stackoverflow.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="youtube">
                <DashboardSubheading title="Youtube" />
              </label>
              <input
                type="text"
                placeholder="https://youtube.com/@username"
                className="text-sm text-slate-600 p-2 outline-none lowercase focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                {...register('youtube')}
              />
              {errors.youtube && (
                <span className="text-sm text-red-600">
                  {errors.youtube.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="mastodon">
                <DashboardSubheading title="Mastodon" />
              </label>
              <input
                type="text"
                placeholder="https://mastodon.com/@username"
                className="text-sm text-slate-600 p-2 outline-none lowercase focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                {...register('mastodon')}
              />
              {errors.mastodon && (
                <span className="text-sm text-red-600">
                  {errors.mastodon.message}
                </span>
              )}
            </div>
            <div>
              <Button
                size="sm"
                type="submit"
                appearance="primary-slate"
                disabled={isUpdating}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
    </WhiteArea>
  );
};

export default UserSocialSettings;
