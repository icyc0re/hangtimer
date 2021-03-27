import { EventEmitter } from "../eventEmitter";
import { CountdownTimer } from "./countdownTimer";

const START_TIMER = 2;

const LABEL_EMPTY = '-';
const LABEL_START = 'READY';
const LABEL_HANG = 'HANG';
const LABEL_PAUSE = 'PAUSE';
const LABEL_REST = 'REST';
const LABEL_DONE = 'DONE';

const TIMER_EVENT_ACTION = 'action';
const TIMER_EVENT_TIME = 'time';
const TIMER_EVENT_STATE_UPDATE = 'state';

export class ComplexTimer {
  constructor(setup) {
    this.events = new EventEmitter();

    this.tStart = new CountdownTimer(START_TIMER);
    this.tHang = new CountdownTimer(setup.hangTime);
    this.tPause = new CountdownTimer(setup.pauseTime);
    this.tRest = new CountdownTimer(setup.restTime);
    this.maxReps = setup.reps;
    this.maxSets = setup.sets;

    this.state = {
      action: LABEL_EMPTY,
      time: setup.hangTime,
      nRep: 1,
      nSet: 1,
    };

    this._didStart = false;
    this._didFinish = false;

    this.events
      .on(TIMER_EVENT_ACTION, (value) => {
        this._action = value;
      })
      .on(TIMER_EVENT_TIME, value => {
        this._time = value;
      });

    this.tStart.eventEmitter
      .on(CountdownTimer.Events.START, () => {
        this.setState(state => {
          state.action = LABEL_START;
        });
      })
      .on(CountdownTimer.Events.END, () => {
        this.tHang.restart();
      })
      .on(CountdownTimer.Events.TICK, () => {
        this.setState(state => {
          state.time = this.tStart.remaining;
        });
      });
    
    this.tHang.eventEmitter
      .on(CountdownTimer.Events.START, () => {
        this.setState(state => {
          state.action = LABEL_HANG;
        });
      })
      .on(CountdownTimer.Events.END, () => {
        if (this.state.nRep < this.maxReps) {
          this.tPause.restart();
        } else if (this.state.nSet < this.maxSets) {
          this.tRest.restart();
        } else {
          this._didFinish = true;
          this.setState(state => {
            state.action = LABEL_DONE;
          });
        }
      })
      .on(CountdownTimer.Events.TICK, () => {
        this.setState(state => {
          state.time = this.tHang.remaining;
        });
      });

    this.tPause.eventEmitter
      .on(CountdownTimer.Events.START, () => {
        this.setState(state => {
          state.action = LABEL_PAUSE;
        });
      })
      .on(CountdownTimer.Events.END, () => {
        if (this.state.nRep < this.maxReps) {
          this.setState(state => {
            state.nRep++;
          });
          this.tHang.restart();
        }
      })
      .on(CountdownTimer.Events.TICK, () => {
        this.setState(state => {
          state.time = this.tPause.remaining;
        });
      });

    this.tRest.eventEmitter
      .on(CountdownTimer.Events.START, () => {
        this.setState(state => {
          state.action = LABEL_REST;
        });
      })
      .on(CountdownTimer.Events.END, () => {
        if (this.state.nSet < this.maxSets) {
          this.setState(state => {
            state.nSet++;
            state.nRep = 1;
          });
          this.tHang.restart();
        }
      })
      .on(CountdownTimer.Events.TICK, () => {
        this.setState(state => {
          state.time = this.tRest.remaining;
        });
      });
  }

  _emitState() {
    this.events.emit(TIMER_EVENT_STATE_UPDATE, this.state);
  }

  setState(callback) {
    callback(this.state);
    this._emitState(this.state);
  }

  isRunning() {
    return this._didStart && !this._didFinish;
  }

  didFinish() {
    return this._didFinish;
  }

  getState() {
    return this.state;
  }

  start() {
    this.action = LABEL_START;
    this._didStart = true;
    this.tStart.start();
  }

  stop() {
    this.tStart.stop();
    this.tHang.stop();
    this.tPause.stop();
    this.tRest.stop();
  }

  reset() {
    this.stop();
  }
}

ComplexTimer.Events = {
  STATE_UPDATE: TIMER_EVENT_STATE_UPDATE,
};
