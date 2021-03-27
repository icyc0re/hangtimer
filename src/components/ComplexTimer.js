import { useState } from 'react';
import SetupForm from './SetupForm';
import TimerView from './TimerView';

const ComplexTimer = () => {
  const [timerSetup, setTimerSetup] = useState(null);

  const onStart = (setup) => setTimerSetup(setup);

  const onReset = () => setTimerSetup(null);

  return (
    !timerSetup ? (
      <SetupForm onStart={onStart} />
    ) : (
      <TimerView setup={timerSetup} onBack={onReset} />
    )
  );
};

export default ComplexTimer;
