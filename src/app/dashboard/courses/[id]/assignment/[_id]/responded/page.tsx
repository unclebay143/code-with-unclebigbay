'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { DashboardSubheading } from '@/components/molecules/dashboard/dashboard-subheading';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { ArrowLeft, Loader, RotateCw } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { Questions } from '@/utils/types';
import useCurrentStudent from '@/components/hooks/useCurrentStudent';
import { useAssignmentResponseById } from '@/components/hooks/useAssignmentResponse';

const SubmissionIndicator = () => (
  <div
    className="flex justify-center items-center gap-1 bg-white p-1"
    id="submittingIndicator"
  >
    <span className="animate-spin">
      <RotateCw size={20} />
    </span>
    <p className="font-bold">
      Submitting assignment. Don&apos;t navigate from this page...
    </p>
  </div>
);

const Page = () => {
  const { data: student } = useCurrentStudent();
  const currentPathname = usePathname();
  const assignmentId = currentPathname.split('/')[5];
  const { response, isFetching } = useAssignmentResponseById(assignmentId!);
  const materialId = response?.material?._id;

  console.log(response);

  const canShowQuestions = !isFetching;
  // console.log(getValues());
  // Disable button when all questions are not answered - all fields required

  return <>p</>;
};

export default Page;
