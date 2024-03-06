'use client';
import { Button } from '@/components/atoms/Button';
import React from 'react';
import { WhiteArea } from './white-area';
import { DashboardSubheading } from './dashboard-subheading';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileUpdateSchema } from '@/validation/userSocialValidation';
import { toast } from 'sonner';

ProfileUpdateSchema;

type profileUpdateSchemaType = z.infer<typeof ProfileUpdateSchema>;

const UserSocialSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<profileUpdateSchemaType>({
    resolver: zodResolver(ProfileUpdateSchema),
  });

  const onSubmit: SubmitHandler<profileUpdateSchemaType> = (data) => {
    try {
      console.log(data);
      toast.success('Profile updated successfully.');
    } catch (err) {
      console.log(err);
    }
  };
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
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
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
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                {...register('linkedIn')}
              />
              {errors.linkedIn && (
                <span className="text-sm text-red-600">
                  {errors.linkedIn.message}
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
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                {...register('twitter')}
              />
              {errors.twitter && (
                <span className="text-sm text-red-600">
                  {errors.twitter.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="facebook">
                <DashboardSubheading title="Facebook" />
              </label>
              <input
                type="text"
                placeholder="https://facebook.com/username"
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
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
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
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
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
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
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
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
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                {...register('mastodon')}
              />
              {errors.mastodon && (
                <span className="text-sm text-red-600">
                  {errors.mastodon.message}
                </span>
              )}
            </div>
            <div className="flex">
              <Button size="sm" type="submit">
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
