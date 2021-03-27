import { useEffect, useState } from 'react';
import { formatSeconds } from '../utils/formatters';
import { ComplexTimer } from '../services/timers/complexTimer';

import './TimerView.css';

const TimerView = ({ setup, onBack }) => {
  const [action, setAction] = useState('-');
  const [runningTime, setRunningTime] = useState(setup.hangTime);
  const [currentRep, setCurrentRep] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const t = new ComplexTimer(setup);

    t.events.on(ComplexTimer.Events.STATE_UPDATE, value => {
      setAction(value.action);
      setRunningTime(value.time);
      setCurrentRep(value.nRep);
      setCurrentSet(value.nSet);
    });

    setTimer(t);

    return () => {
      t.reset();
    };
  }, [setup]);

  const startTimer = () => {
    timer && timer.start();
  };

  return (
    <div className="row text-center timer_view">
      <div className={`col-12 display-1 action_text action_${action.toLowerCase()}`}>{action}</div>
      <div className="col-12 display-1 my-3 action_time">
        {formatSeconds(runningTime)}
      </div>
      <div className="col-6">
        <div>REPS</div>
        <div>{currentRep} / {setup.reps}</div>
      </div>
      <div className="col-6">
        <div>SETS</div>
        <div>{currentSet} / {setup.sets}</div>
      </div>

      {timer && !timer.isRunning() &&
      <div className="col-6 offset-3 mt-4">
        <button type="button" className="btn btn-primary" onClick={startTimer}>START</button>
      </div>}
      <div className={`col-6 offset-3 ${timer && !timer.isRunning() ? 'mt-3' : 'mt-4'}`}>
        <button type="button" className="btn btn-danger" onClick={onBack}>BACK</button>
      </div>
    </div>
  );
};

export default TimerView;
