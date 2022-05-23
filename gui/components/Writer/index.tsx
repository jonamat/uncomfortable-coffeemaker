import { useState, FC, useEffect, useMemo } from 'react';
import Cursor from '../Cursor';

interface Props {
  children: string;
  start: boolean;
  delayAfterEnd?: number;
  onEnd?: () => void;
  span?: boolean;
}

const humanTypeDelay = () =>
  new Promise((res) => {
    setTimeout(res, Math.random() * 130 + 10);
  });

const Writer: FC<Props> = ({ children, start, onEnd, delayAfterEnd = 500, span = false }) => {
  const [currentText, setCurrentText] = useState('');
  const [count, setCount] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    if (!start) return;

    const write = async () => {
      for (let i = 0; i <= children.length; i++) {
        await humanTypeDelay();
        setCount(i);
      }

      if (onEnd) {
        setTimeout(() => {
          setCursor(false);
          onEnd();
        }, delayAfterEnd);
      }
    };

    write();
  }, [start]);

  useEffect(() => {
    setCurrentText(children.substring(0, count));
  }, [count]);

  if (!start && count == 0) return null;

  if (span) {
    return (
      <span>
        {currentText}
        {cursor && <Cursor />}
      </span>
    );
  }

  return (
    <div>
      {currentText}
      {cursor && <Cursor />}
    </div>
  );
};

export default Writer;
