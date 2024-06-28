import { useParams } from 'next/navigation';

const HackathonProjectPreview = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Hello{id}</div>;
};

export default HackathonPreview;
