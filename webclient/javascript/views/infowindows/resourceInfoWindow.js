class ResourceInfoWindow {
  constructor(resource) {
    this.resource = resource;
    this.buttonId = `${generateId(resource)}-button`;
    this.amountId = `${generateId(resource)}-amount`;
  }

  render() {
    return `
      <div>
        <div>
          ${this.resource.name}
        </div>
        <div id=\'${this.amountId}\'>
          ${this.resource.amount}
        </div>
        <div>
          <button id=\'${this.buttonId}\'>
            Take
          </button>
        </div>
      </div>
    `;
  }

  onButtonClick() {
    const amountView = document.getElementById(this.amountId);
    amountView.innerHTML = this.resource.amount--;
  }
}

function generateId(resource) {
  return `resource-${resource.name}-${resource.id}`
}

export default ResourceInfoWindow;
