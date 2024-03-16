import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';
import React from 'react';
import { baseURL } from '../../../../frontend.config';
async function getAuditLogs() {
  try {
    const url = `${baseURL}/api/audit`;
    const result = await fetch(url, {
      cache: 'no-cache',
    });

    if (!result.ok) {
      console.log(result);
    }

    return result.json();
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

const Page = async () => {
  const data = await getAuditLogs();
  console.log(data);
  return <ActivityLogs defaultCount={15} />;
};
export default Page;
