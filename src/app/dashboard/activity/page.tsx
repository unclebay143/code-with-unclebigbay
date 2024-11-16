import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';
import { getAllActivityAudits } from '@/utils/services/server/student.server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activity - Dashboard',
};

const Page = async () => {
  const res = await getAllActivityAudits();
  const audits = res?.audits;

  if (audits)
    return <ActivityLogs audits={audits} loaderCount={5} hideShowMore />;
};
export default Page;
