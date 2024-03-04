import React from 'react';
import { CourseCard } from './course-card';
import { materials as defaultMaterials } from '@/utils/dummy-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
} from '../../atoms/Select';
import { Materials } from '@/utils/types';
import { Button } from '../../atoms/Button';

type Props = {
  materials?: Materials;
  showLoadMoreButton?: boolean;
  showCounter?: boolean;
  hideSearchOptions?: boolean;
  size?: number;
};

export const Courses = ({
  materials = defaultMaterials,
  showLoadMoreButton,
  hideSearchOptions,
  showCounter,
  size,
}: Props) => {
  return (
    <section className="flex flex-col gap-3">
      {hideSearchOptions || (
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="w-full">
            <input
              className="border rounded-xl text-slate-600 w-full py-3 pl-4 pr-2"
              placeholder="Find learning material"
            />
          </div>
          <div className="sm:w-[200px]">
            <Select onValueChange={(e) => console.log(e)}>
              <SelectTrigger size="md" placeholder="Select a course..." />
              <SelectContent>
                <SelectViewPort>
                  <SelectItem value={'value-1'} label="HTML" />
                </SelectViewPort>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      {showCounter && (
        <p className="text-slate-600">Total: {materials.length}</p>
      )}
      <section className="max-w-full grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {materials?.slice(0, size).map((material) => {
          return <CourseCard key={material.title} material={material} />;
        })}
      </section>
      {showLoadMoreButton && (
        <section className="flex justify-center">
          <Button appearance="secondary-slate" size="sm">
            Load more
          </Button>
        </section>
      )}
      {showLoadMoreButton || (
        <div className="text-center py-5 text-slate-600">
          <p>You&apos;ve reached the end 👋🏽</p>
        </div>
      )}
    </section>
  );
};
