'use client';

import { Button } from '@/components/atoms/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
} from '@/components/atoms/Select';
import useCourse from '@/components/hooks/useCourse';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import useTag from '@/components/hooks/useTag';
import { Courses } from '@/components/molecules/dashboard/courses';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { EmptyState } from '@/components/molecules/dashboard/empty-state';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { showCount } from '@/utils';
import { Courses as CoursesType } from '@/utils/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// import { Sparkles } from 'lucide-react';

const Page = () => {
  const { data: currentUser, isFetching: isFetchingCurrentUser } =
    useCurrentStudent();
  const isAdmin = currentUser?.isAdmin;

  const { tags } = useTag();

  const { courses, isFetching } = useCourse();
  const [_courses, set_courses] = useState<CoursesType | undefined>(courses);
  const count = _courses?.length || 0;
  const noCourses = courses?.length === 0;
  const isLoggedIn = currentUser;

  const copy = isLoggedIn
    ? 'These courses are personalized based on your stack.'
    : 'Login to see only personalized courses based on your stack.';

  const userStackMatch = tags?.filter((tag) => tag.name !== currentUser?.stack);
  const handleFilterCourseByTagName = (tagName: string) => {
    if (!tagName || tagName === 'all') return set_courses(courses);
    const filteredCourses = courses?.filter((course) => {
      return course.tags.some((tag) => tag.name === tagName);
    });
    set_courses(filteredCourses);
  };

  useEffect(() => {
    set_courses(courses);
  }, [courses]);

  return (
    <div className="flex flex-col gap-3">
      {/* <div className="sticky top-[75px] lg:top-[82px] z-10 bg-white rounded-b-lg">
        <WhiteArea border>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600">
              <h3 className="text-xl font-medium ">Browse learning courses</h3>
              <Sparkles size={16} />
            </div>
            <Button size="xs" appearance="secondary-slate">
              Back to top
            </Button>
          </div>
        </WhiteArea>
      </div> */}
      <WhiteArea border>
        <div className="flex flex-col gap-5">
          {isAdmin && (
            <div className="flex justify-start">
              <Button size="xs" asChild>
                <Link href="/dashboard/admin/courses/new">New course</Link>
              </Button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="w-full flex items-end justify-center">
              <div className="w-full flex flex-col gap-1">
                <DashboardSubheading
                  title={`Available Courses ${showCount(count)}`}
                />
                <div className="text-sm text-slate-600">
                  {isFetchingCurrentUser ? (
                    <span className="invisible">|</span>
                  ) : (
                    copy
                  )}
                </div>
              </div>
              {/* <div className="w-[150px]">
                <Select
                  onValueChange={(tagName) =>
                    handleFilterCourseByTagName(tagName)
                  }
                >
                  <SelectTrigger
                    size="md"
                    placeholder={'Filter course'}
                    shape="md-rectangle"
                  />
                  <SelectContent>
                    <SelectViewPort>
                      <SelectItem value={'all'} label={'all'} />
                      {userStackMatch?.map(({ name, _id }) => (
                        <SelectItem key={_id} value={name} label={name} />
                      ))}
                    </SelectViewPort>
                  </SelectContent>
                </Select>
              </div> */}
            </div>
          </div>

          <Courses
            courses={_courses}
            isFetching={isFetching}
            hideSearchOptions
            loaderCounter={6}
          />
        </div>
      </WhiteArea>
      {noCourses && <EmptyState label="No course to display here ☹️" />}
    </div>
  );
};

export default Page;
