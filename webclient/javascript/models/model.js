class Model {
  constructor() {
    this.subscribers = [];
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }

  notify(eventName, data) {
    this.subscribers.forEach(subscriber => {
      subscriber.notify(eventName, data);
    })
  }
}

export default Model;
