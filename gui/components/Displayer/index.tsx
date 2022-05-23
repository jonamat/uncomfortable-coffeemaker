import { FC, useEffect, useState } from 'react';

interface Props {
  start: boolean;
  delayAfterEnd?: number;
  onEnd?: () => void;
}

const Displayer: FC<Props> = ({ start, delayAfterEnd = 300, onEnd, children }) => {
  const [printed, setPrinted] = useState(false);

  useEffect(() => {
    if (!start) return;

    setPrinted(true);

    if (onEnd) {
      setTimeout(() => {
        onEnd();
      }, delayAfterEnd);
    }
  }, [start]);

  if (!start && !printed) return null;


  return <>{children}</>;
};

export default Displayer;
