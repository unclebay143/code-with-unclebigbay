'use client';

import React from 'react';
import Image from 'next/image';
import { WhiteArea } from '../white-area';
import { DashboardSubheading } from '../dashboard-subheading';
import { SelectCountry } from '../country-dropdown';
import { Button, FormHelperField } from '@hashnode/matrix-ui';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import * as z from 'zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalDetailSchema } from '@/validation/userSocialValidation';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Countries, Student } from '@/utils/types';

type personalDetailSchemaType = z.infer<typeof personalDetailSchema>;

const UserPersonalSettings = ({
  countries,
  currentStudent,
}: {
  countries: Countries;
  currentStudent: Student;
}) => {
  const { update } = useCurrentStudent();
  const fullName = currentStudent?.fullName;
  const email = currentStudent?.email;
  const username = currentStudent?.username;
  const photo = currentStudent?.photo;
  const bio = currentStudent?.bio;
  const location = currentStudent?.location;

  const isUpdating = update.isPending;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<personalDetailSchemaType>({
    resolver: zodResolver(personalDetailSchema),
    values: {
      bio,
      location: location,
      fullName,
    },
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<personalDetailSchemaType> = (data) => {
    try {
      update.mutate({
        username: currentStudent?.username,
        _id: currentStudent?._id,
        ...data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fullNameErrorMessage = errors.fullName?.message;

  return (
    <div className="flex flex-col gap-4">
      <WhiteArea border>
        <section className="flex flex-col gap-4 justify-stretch">
          <section className="border-b pb-3 flex items-center justify-between">
            <label htmlFor="photo" className="">
              <DashboardSubheading title="Profile Picture" />
              <p className="text-slate-500 text-sm">
                Sourced from your auth provider.
              </p>
            </label>
            <Button size="xs" appearance="secondary-slate" asChild>
              <Link
                href={`/@${currentStudent?.username}`}
                target="_blank"
                className="gap-1"
              >
                <span className="max-[374px]:hidden">View profile</span>
                <ExternalLink size={14} />
              </Link>
            </Button>
          </section>
          <div className="flex flex-col items-start">
            <label
              htmlFor="photo"
              className="flex flex-col items-center justify-center w-full h-64 rounded-lg bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100"
            >
              {photo ? (
                <Image
                  src={photo}
                  alt={fullName || ''}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              ) : null}
              <input disabled id="photo" type="file" className="hidden" />
            </label>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="username">
              <DashboardSubheading title="Username" />
              <p className="text-slate-500 text-sm">
                We retrieved this information from the profile associated with
                your login.
              </p>
            </label>
            <input
              type="text"
              className="disabled:cursor-not-allowed text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
              value={username}
              disabled
            />
          </div>
        </section>
      </WhiteArea>

      <WhiteArea border>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="border-b pb-3">
              <DashboardSubheading title="Personal Details" />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="name">
                <DashboardSubheading title="Name" />
                <p className="text-slate-500 text-sm">
                  This will be your display name on this site.
                </p>
              </label>
              <input
                type="text"
                id="name"
                className="text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                {...register('fullName')}
              />
              {fullNameErrorMessage && (
                <FormHelperField type="error" text={fullNameErrorMessage} />
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email">
                <DashboardSubheading title="Email" />
                <p className="text-slate-500 text-sm">
                  This is sourced from your auth provider profile and will be
                  used for sending you notifications.
                </p>
              </label>
              <input
                type="text"
                className="disabled:cursor-not-allowed text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                value={email}
                disabled
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="bio">
                <DashboardSubheading title="Bio" />
              </label>
              <textarea
                className="min-h-[200px] text-sm text-slate-600 placeholder:text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md"
                placeholder="Introduce yourself to the world."
                {...register('bio')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location">
                <DashboardSubheading title="Location" />
                <p className="text-slate-500 text-sm">
                  This will be use to recommend you to other students from your
                  location.
                </p>
              </label>
              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <SelectCountry
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    countries={countries}
                  />
                )}
              />
            </div>
            <div>
              <Button
                size="sm"
                appearance="primary-slate"
                disabled={isUpdating}
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </WhiteArea>
    </div>
  );
};

export default UserPersonalSettings;
