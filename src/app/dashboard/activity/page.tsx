import React from 'react';
import { baseURL } from '../../../../frontend.config';
import { headers } from 'next/headers';
import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';

export async function getAllActivityAudits() {
  try {
    const url = `${baseURL}/api/audits`;
    const result = await fetch(url, {
      headers: headers(),
    });
    const audits = await result.json();
    return audits;
  } catch (e: any) {
    console.log({ message: e.message });
  }
}

const Page = async () => {
  const { audits } = await getAllActivityAudits();

  console.log(audits);
  return <ActivityLogs audits={audits} loaderCount={5} hideShowMore />;
};
export default Page;
