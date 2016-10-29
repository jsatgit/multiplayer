class View {
  constructor() {
    this.eventHandler = {};
  }

  subscribe(model) {
    model.addSubscriber(this);
    this.eventHandler = this.handler();
  }

  notify(eventName, data) {
    this.eventHandler[eventName](data);
  }
}

export default View;
