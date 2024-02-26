import React from 'react';
import { CourseCard } from './course-card';
import { materials } from '@/utils/dummy-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
} from '../ui/Select';
import { Materials } from '../../../types';

type Props = { materials?: Materials };

export const Courses = (props: Props) => {
  const data = props.materials ? props.materials : materials;
  return (
    <section className="flex flex-col gap-3">
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
      <section className="max-w-full grid sm:grid-cols-2 xl:grid-cols-3 gap-3 pb-10">
        {data.map((material) => {
          return <CourseCard key={material.title} material={material} />;
        })}
      </section>
    </section>
  );
};
