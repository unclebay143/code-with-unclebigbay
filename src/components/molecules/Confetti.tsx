import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

export const ShowConfetti = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  const { width: defaultWidth, height: defaultHeight } = useWindowSize();
  return (
    <Confetti
      width={width || defaultWidth}
      height={height || defaultHeight}
      run={true}
    />
  );
};
