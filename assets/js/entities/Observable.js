export default class Observable {
  observers

  constructor() {
    this.observers = []
  }

  register(observer) {
    this.observers.push(observer)
  }

  notify(event) {
    for (const observer of this.observers) {
      if (observer.event === event) {
        observer.callback()
      }
    }
  }
}

export const observer = new Observable()
