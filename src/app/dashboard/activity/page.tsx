import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';
import { getAllActivityAudits } from '@/utils/server.service';

const Page = async () => {
  const activityRes = await getAllActivityAudits();
  const audits = activityRes && activityRes.audits;
  return <ActivityLogs audits={audits} loaderCount={5} hideShowMore />;
};
export default Page;
