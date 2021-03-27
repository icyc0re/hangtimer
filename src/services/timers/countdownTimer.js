import { EventEmitter } from "../eventEmitter";

const TIMER_EVENT_START = 'start';
const TIMER_EVENT_END = 'end';
const TIMER_EVENT_TICK = 'tick';

export class CountdownTimer {
  constructor(time) {
    this.startTime = time;
    this.remaining = time;
    this._running = false;

    this.eventEmitter = new EventEmitter();
  }

  start() {
    this.tid = setInterval(() => {
      this.remaining = Math.max(0, this.remaining - 0.1);

      // tick event
      this.eventEmitter.emit(TIMER_EVENT_TICK);

      if (this.remaining === 0) {
        // event end
        this.eventEmitter.emit(TIMER_EVENT_END);
        this.stop();
      }
    }, 100);

    this.eventEmitter.emit(TIMER_EVENT_START);
    this._running = true;
  }

  stop() {
    clearInterval(this.tid);
    this._running = false;
  }

  reset() {
    this.remaining = this.startTime;
  }

  restart() {
    this.reset();
    this.start();
  }

  isRunning() {
    return this._running;
  }
}

CountdownTimer.Events = {
  START: TIMER_EVENT_START,
  END: TIMER_EVENT_END,
  TICK: TIMER_EVENT_TICK,
};
