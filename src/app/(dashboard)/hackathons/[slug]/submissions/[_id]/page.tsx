import HackathonProjectPreview from '@/components/molecules/dashboard/hackathon/hackathonProjectPreview';
import { WhiteArea } from '@/components/molecules/dashboard/white-area';
import {
  getHackathonProjectById,
  getCurrentStudent,
} from '@/utils/services/server/student.server';

type Props = { params: { _id: string; slug: string } };

const PreviewedHackathonProject = async ({ params }: Props) => {
  const { _id, slug } = params;
  const gethackathonRes = await getHackathonProjectById(_id, slug);
  const getCurrentStudentRes = await getCurrentStudent();

  return (
    <WhiteArea border>
      <HackathonProjectPreview
        gethackathonRes={gethackathonRes}
        getCurrentStudentRes={getCurrentStudentRes}
      />
    </WhiteArea>
  );
};

export default PreviewedHackathonProject;
