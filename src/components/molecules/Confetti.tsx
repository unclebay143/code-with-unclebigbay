import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

export const ShowConfetti = () => {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} run={true} />;
};
