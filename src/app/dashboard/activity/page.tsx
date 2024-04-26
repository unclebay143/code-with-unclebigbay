import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';
import React from 'react';

const Page = async () => {
  return <ActivityLogs loaderCount={5} hideShowMore />;
};
export default Page;
