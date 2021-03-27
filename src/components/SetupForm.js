import { useState } from 'react';
import { DEFAULT_TIMER_SETUP } from '../constants';

const ID_PREFIX = 'hangtimer';

const NumberInput = ({ id, label, value, onChange }) => {
  const fullId = `${ID_PREFIX}_${id}`

  const onChangeHandler = event => onChange(event.target.value);

  return (
    <div className="col-lg-12">
      <label className="form-label" htmlFor={fullId}>{label}</label>
      <input className="form-control" type="text" id={fullId} value={value} onChange={onChangeHandler} />
    </div>
  );
};

const SetupForm = ({ onStart }) => {
  const [hangTime, setHangTime] = useState(DEFAULT_TIMER_SETUP.hangTime.initialValue);
  const [pauseTime, setPauseTime] = useState(DEFAULT_TIMER_SETUP.pauseTime.initialValue);
  const [reps, setReps] = useState(DEFAULT_TIMER_SETUP.reps.initialValue);
  const [restTime, setRestTime] = useState(DEFAULT_TIMER_SETUP.restTime.initialValue);
  const [sets, setSets] = useState(DEFAULT_TIMER_SETUP.sets.initialValue);

  const submitHandler = event => {
    event.preventDefault();

    onStart({
      hangTime,
      pauseTime,
      reps,
      restTime,
      sets
    });
  };

  const resetHandler = () => {
    setHangTime(DEFAULT_TIMER_SETUP.hangTime.initialValue);
    setPauseTime(DEFAULT_TIMER_SETUP.pauseTime.initialValue);
    setReps(DEFAULT_TIMER_SETUP.reps.initialValue);
    setRestTime(DEFAULT_TIMER_SETUP.restTime.initialValue);
    setSets(DEFAULT_TIMER_SETUP.sets.initialValue);
  };
  
  return (
    <form id="timerform" className="row g-3" onSubmit={submitHandler} onReset={resetHandler}>

      <NumberInput
        id="hang_time"
        label={DEFAULT_TIMER_SETUP.hangTime.label}
        value={hangTime}
        onChange={v => setHangTime(v)} />

      <NumberInput
        id="pause_time"
        label={DEFAULT_TIMER_SETUP.pauseTime.label}
        value={pauseTime}
        onChange={v => setPauseTime(v)} />
      
      <NumberInput
        id="reps"
        label={DEFAULT_TIMER_SETUP.reps.label}
        value={reps}
        onChange={v => setReps(v)} />

      <NumberInput
        id="restTime"
        label={DEFAULT_TIMER_SETUP.restTime.label}
        value={restTime}
        onChange={v => setRestTime(v)} />

      <NumberInput
        id="reps"
        label={DEFAULT_TIMER_SETUP.sets.label}
        value={sets}
        onChange={v => setSets(v)} />

      <div className="col-md-12">
        <button type="submit" className="btn btn-primary">Start</button>
        <button type="reset" className="btn btn-outline-secondary ms-3">Reset</button>
      </div>
    </form>
  );
}

export default SetupForm;
