import HackathonProjectPreview from '@/components/molecules/dashboard/hackathon/hackathonProjectPreview';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import { getHackathonProjectById } from '@/utils/server.service';

type Props = { params: { _id: string; slug: string } };

const PreviewedHackathonProject = async ({ params }: Props) => {
  const { _id, slug } = params;
  const gethackathonRes = await getHackathonProjectById(_id, slug);
  return (
    <WhiteArea border>
      <HackathonProjectPreview gethackathonRes={gethackathonRes} />
    </WhiteArea>
  );
};

export default PreviewedHackathonProject;
