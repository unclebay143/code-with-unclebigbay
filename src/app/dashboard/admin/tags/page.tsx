'use client';

import { Button } from '@/components/atoms/Button';
import useTag from '@/components/hooks/useTag';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { Tag } from '@/utils/types';
import React from 'react';
import { useForm } from 'react-hook-form';

const Page = () => {
  const { tags, mutation } = useTag();

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { name: '', logo: '', wiki: '', slug: '' } });

  const handleCreateNewTag = (data: Tag) => {
    mutation.mutate(data);
    reset();
  };
  return (
    <div>
      <WhiteArea>
        <section className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DashboardSubheading title="Create new tag" />
            </div>
            <WhiteArea border>
              <form onSubmit={handleSubmit(handleCreateNewTag)}>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="question" className="text-sm">
                      <DashboardSubheading title="Name" />
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      className={`lowercase text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="question" className="text-sm">
                      <DashboardSubheading title="Logo" />
                    </label>
                    <input
                      {...register('logo')}
                      type="text"
                      className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="question" className="text-sm">
                      <DashboardSubheading title="Wiki" />
                    </label>
                    <input
                      {...register('wiki')}
                      type="text"
                      className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="question" className="text-sm">
                      <DashboardSubheading title="Slug" />
                    </label>
                    <input
                      {...register('slug')}
                      type="text"
                      className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                    />
                  </div>
                  <div>
                    <Button size="xs" type="submit" disabled={isSubmitting}>
                      Create
                    </Button>
                  </div>
                </div>
              </form>
            </WhiteArea>
          </div>
          <section className="flex flex-col gap-3 w-full">
            <DashboardSubheading title="Tags" />
            <div className="border rounded-lg overflow-hidden">
              <table className="table-auto w-full">
                <tbody>
                  {tags?.map(({ _id, name }, index) => (
                    <tr key={_id}>
                      <td className="border-b p-4 capitalize text-slate-600 text-sm">
                        {index + 1}. {}
                        {name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </WhiteArea>
    </div>
  );
};

export default Page;
