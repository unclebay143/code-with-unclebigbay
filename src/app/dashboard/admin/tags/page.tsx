'use client';

import { Button } from '@/components/atoms/Button';
import useTag from '@/components/hooks/useTag';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { EmptyState } from '@/components/molecules/dashboard/empty-state';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { convertWhiteSpaceToDash, showCount } from '@/utils';
import { Tag } from '@/utils/types';
import { Tag as TagIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

const Page = () => {
  const { tags, mutation } = useTag();

  const {
    getValues,
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { name: '', logo: '', wiki: '', slug: '' } });

  // delete later

  const handleCreateNewTag = (data: Tag) => {
    mutation.mutate({
      ...data,
      slug: convertWhiteSpaceToDash(getValues().name),
    });
    reset();
  };

  const noTags = tags && tags?.length < 1;
  const tagCount = tags?.length || 0;
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
                      placeholder="i.e software engineering"
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
                      placeholder="https://cdn.sample.com"
                      type="text"
                      className={`text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="question" className="text-sm">
                      <DashboardSubheading title="Wiki" />
                    </label>
                    <textarea
                      {...register('wiki')}
                      placeholder="Write a brief about the tag"
                      className={`text-sm min-h-44 max-h-44 text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                    />
                  </div>
                  {/* <div className="flex flex-col gap-2">
                    <label htmlFor="question" className="text-sm">
                      <DashboardSubheading title="Slug" />
                    </label>
                    <input
                      {...register('slug')}
                      type="text"
                      className={`lowercase text-sm text-slate-600 p-2 outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-300 border rounded-md`}
                    />
                  </div> */}
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
            <div className="flex items-center gap-2">
              <DashboardSubheading title={`Tags ${showCount(tagCount)}`} />
            </div>
            {noTags && (
              <EmptyState label="Tags will appear here when you create them" />
            )}
            {!noTags && (
              <div className="border rounded-lg overflow-hidden">
                <table className="table-auto w-full">
                  <tbody>
                    {tags?.map(({ _id, name }, index) => (
                      <tr key={_id}>
                        <td className="border-b p-4 text-slate-600 text-sm">
                          <div>
                            <span className="flex items-center gap-1">
                              <TagIcon size={12} />
                              {name}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </section>
      </WhiteArea>
    </div>
  );
};

export default Page;
