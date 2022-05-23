import { FC, useEffect, useState } from 'react';

const Cursor: FC = () => {
  const [cursorOn, setCursorOn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCursorOn(!cursorOn);
    }, 500);

    return () => clearInterval(timer);
  }, [cursorOn]);

  return <span>{cursorOn ? '_' : ' '}</span>;
};

export default Cursor;
