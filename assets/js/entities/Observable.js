export default class Observable {
  observers

  constructor() {
    this.observers = []
  }

  register(observer) {
    console.log(observer.event);

    this.observers.push(observer)
  }

  notify(event) {
    console.log('oi', this.observers);

    for (const observer of this.observers) {
      if (observer.event === event) {
        observer.callback()
      }
    }
  }
}

export const observer = new Observable()
