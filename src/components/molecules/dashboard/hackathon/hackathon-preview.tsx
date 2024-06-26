import { useParams } from 'next/navigation';

const HackathonPreview = () => {
  const { id } = useParams();
  return <div>Hello{id}</div>;
};

export default HackathonPreview;
