export class EventEmitter {
  constructor() {
    this.handlers = {};
  }

  on(eventName, callback) {
    if (eventName in this.handlers) {
      this.handlers[eventName].push(callback);
    } else {
      this.handlers[eventName] = [callback];
    }
    return this;
  }

  off(eventName, callback) {
    if (eventName in this.handlers) {
      const pos = this.handlers[eventName].indexOf(callback);
      if (pos >= 0) {
        this.handlers[eventName].splice(pos, 1);
      }
    }
    return this;
  }

  emit(eventName, ...args) {
    if (eventName in this.handlers) {
      this.handlers[eventName].forEach(cb => {
        cb(...args);
      });
    }
    return this;
  }

  clear(eventName) {
    if (eventName) {
      delete this.handlers[eventName];
    } else {
      this.handlers = {};
    }
    return this;
  }
}
