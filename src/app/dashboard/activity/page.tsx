import { ActivityLogs } from '@/components/molecules/dashboard/activity-logs';
import { getAllActivityAudits } from '@/utils/server.service';

const Page = async () => {
  const res = await getAllActivityAudits();
  const audits = res?.audits;

  console.log(res?.audits);

  if (audits)
    return <ActivityLogs audits={audits} loaderCount={5} hideShowMore />;
};
export default Page;
