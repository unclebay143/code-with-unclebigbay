import { useParams } from 'next/navigation';

const HackathonPreview = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Hello{id}</div>;
};

export default HackathonPreview;
