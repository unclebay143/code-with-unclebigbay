'use client';
import { Button } from '@hashnode/matrix-ui';
import React, { useEffect } from 'react';
import { WhiteArea } from '../white-area';
import { DashboardSubheading } from '../dashboard-subheading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
} from '../../../atoms/Select';
import * as z from 'zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { professionalDetailSchema } from '@/validation/userSocialValidation';
import { toast } from 'sonner';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';

professionalDetailSchema;

type professionalDetailSchemaType = z.infer<typeof professionalDetailSchema>;

const UserProfessionalSettings = () => {
  const { data: currentStudent, update } = useCurrentStudent();
  const { data: user } = useCurrentStudent();

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<professionalDetailSchemaType>({
    resolver: zodResolver(professionalDetailSchema),
    defaultValues: {
      stack: user?.stack,
      portfolio: user?.socials?.portfolio,
      blog: user?.socials?.blog,
    },
  });

  const onSubmit: SubmitHandler<professionalDetailSchemaType> = (data) => {
    try {
      update.mutate({
        username: currentStudent?.username,
        _id: currentStudent?._id,
        stack: data.stack,
        socials: {
          ...user?.socials,
          portfolio: data.portfolio,
          blog: data.blog,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        stack: user?.stack,
        portfolio: user?.socials?.portfolio,
        blog: user?.socials?.blog,
      });
    }
  }, [user, reset]);

  function capitalizeFirstLetter(word: string) {
    if (!word) return;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

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
                <Select onValueChange={field.onChange}>
                  <SelectTrigger
                    size="md"
                    placeholder={capitalizeFirstLetter(field.value)}
                    shape="md-rectangle"
                  />
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

          <div className="flex">
            <Button size="sm" appearance="primary-slate">
              Update
            </Button>
          </div>
        </div>
      </form>
    </WhiteArea>
  );
};

export default UserProfessionalSettings;
