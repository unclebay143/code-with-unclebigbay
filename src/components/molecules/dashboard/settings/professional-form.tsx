'use client';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
} from '@hashnode/matrix-ui';
import React from 'react';
import { WhiteArea } from '../white-area';
import { DashboardSubheading } from '../dashboard-subheading';
import * as z from 'zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { professionalDetailSchema } from '@/validation/userSocialValidation';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { Student } from '@/utils/types';

type professionalDetailSchemaType = z.infer<typeof professionalDetailSchema>;

const UserProfessionalSettings = ({
  currentStudent,
}: {
  currentStudent: Student;
}) => {
  const { update } = useCurrentStudent();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<professionalDetailSchemaType>({
    resolver: zodResolver(professionalDetailSchema),
    defaultValues: {
      stack: currentStudent?.stack,
      portfolio: currentStudent?.socials?.portfolio,
      blog: currentStudent?.socials?.blog,
    },
  });

  const isUpdating = update.isPending;

  const onSubmit: SubmitHandler<professionalDetailSchemaType> = (data) => {
    try {
      update.mutate({
        username: currentStudent?.username,
        _id: currentStudent?._id,
        stack: data.stack,
        socials: {
          ...currentStudent?.socials,
          portfolio: data.portfolio,
          blog: data.blog,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WhiteArea border>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="border-b pb-3">
            <DashboardSubheading title="Professional Details" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="stack">
              <DashboardSubheading title="Stack" />
              <p className="text-slate-500 text-sm">
                This determines the course content tailored specifically for you
                on our platform.
              </p>
            </label>
            <Controller
              control={control}
              name="stack"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger size="md" shape="rectangle" />
                  <SelectContent>
                    <SelectViewPort>
                      <SelectItem value={'frontend'} label={'Frontend'} />
                      <SelectItem value={'backend'} label={'Backend'} />
                      <SelectItem value={'full-stack'} label={'Full-stack'} />
                    </SelectViewPort>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="portfolio">
              <DashboardSubheading title="Portfolio" />
            </label>
            <input
              type="text"
              placeholder="https://myportfolio.com"
              className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
              {...register('portfolio')}
            />
            {errors.portfolio && (
              <span className="text-sm text-red-600">
                {errors.portfolio.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="blog">
              <DashboardSubheading title="Blog" />
            </label>
            <input
              type="text"
              placeholder="https://myblog.com"
              className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
              {...register('blog')}
            />
            {errors.blog && (
              <span className="text-sm text-red-600">
                {errors.blog.message}
              </span>
            )}
          </div>

          <div>
            <Button size="sm" appearance="primary-slate" disabled={isUpdating}>
              Update
            </Button>
          </div>
        </div>
      </form>
    </WhiteArea>
  );
};

export default UserProfessionalSettings;
