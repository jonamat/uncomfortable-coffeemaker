import { FC, useState } from 'react';
import ReactDOM from 'react-dom';

import Writer from 'components/Writer';
import Displayer from 'components/Displayer';
import Button from 'components/Button';

// Ready for React 18.x
// const container = document.getElementById('root');
// if (!container) throw new Error('Root div not found');
// const root = ReactDOMClient.createRoot(container);

const root = document.getElementById('root');
if (!root) throw new Error('Root div not found');

const Wrapper: FC = () => {
  const [currentAnimate, setCurrentAnimate] = useState(0);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Writer start={currentAnimate === 0} onEnd={() => setCurrentAnimate(currentAnimate + 1)}>
          MTD COFFEE MAKER
        </Writer>
      </div>

      <Writer start={currentAnimate === 1} onEnd={() => setCurrentAnimate(currentAnimate + 1)}>
        status: OFF
      </Writer>

      <Writer start={currentAnimate === 2} onEnd={() => setCurrentAnimate(currentAnimate + 1)}>
        current temp: 22°C
      </Writer>

      <Writer start={currentAnimate === 3} onEnd={() => setCurrentAnimate(currentAnimate + 1)}>
        boiler power: OFF
      </Writer>

      <Writer start={currentAnimate === 4} onEnd={() => setCurrentAnimate(currentAnimate + 1)}>
        ready for coffee: NO
      </Writer>

      <div style={{ display: 'flex', margin: '10px 0' }}>
        <Displayer start={currentAnimate === 5} onEnd={() => setCurrentAnimate(currentAnimate + 1)}>
          <Button>ON</Button>
        </Displayer>

        <div style={{ marginLeft: '10px' }} />

        <Displayer start={currentAnimate === 6} onEnd={() => setCurrentAnimate(currentAnimate + 1)}>
          <Button>OFF</Button>
        </Displayer>
      </div>

      <Writer start={currentAnimate === 7} onEnd={() => setCurrentAnimate(currentAnimate + 1)}>
        ► STATISTICS
      </Writer>

      <Writer start={currentAnimate === 8} onEnd={() => setCurrentAnimate(currentAnimate + 1)}>
        ► LOGS
      </Writer>

      <Writer start={currentAnimate === 9} onEnd={() => setCurrentAnimate(currentAnimate + 1)}>
        ► RELOAD
      </Writer>

      <Writer start={currentAnimate === 10}>► ACTIVATE SELF-DESTRUCTION</Writer>
    </div>
  );
};

ReactDOM.render(<Wrapper />, root);

// Ready for React 18.x
// root.render(<Wrapper />);
