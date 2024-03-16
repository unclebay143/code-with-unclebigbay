import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';
import React from 'react';

const Page = async () => {
  return <ActivityLogs defaultCount={15} hideShowMore />;
};
export default Page;
