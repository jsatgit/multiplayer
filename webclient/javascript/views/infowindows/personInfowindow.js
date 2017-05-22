import {getServer} from '../../server';

class PersonInfoWindow {
  constructor(person) {
    this.person = person;
    this.inventoryId = generateId('inventory', person);
    this.buttonId = 'trade-button';
    this.tradeAreaId = generateId('trade-area', person);
  }

  renderInventoryItem(name, value) {
    return `<div>${name}: ${value}</div>`;
  }

  renderInventory() {
    let renderedInventory = '<div>Inventory</div>';
    const inventory = this.person.inventory;
    for (const itemName in inventory) {
      renderedInventory += this.renderInventoryItem(
        itemName, inventory[itemName]
      );
    }
    return renderedInventory;
  }

  updateInventory() {
    const inventory = document.getElementById(this.inventoryId);
    if (inventory) {
      inventory.innerHTML = this.renderInventory();
    }
  }

  onButtonClick() {
    const tradeArea = document.getElementById(this.tradeAreaId);
    console.log('making trade: ', tradeArea.value);
    const tradeDetails = JSON.parse(tradeArea.value);
    getServer().trade(tradeDetails.to, tradeDetails.items);
  }

  initTradeArea() {
    const tradeArea = document.getElementById(this.tradeAreaId);
    tradeArea.addEventListener('keypress', evt => {
      evt.stopPropagation();
    });
  }

  render() {
    return `
      <div>
        <div>${this.person.name}</div>
        <textarea id=\'${this.tradeAreaId}\' class="trade-area" rows="8" cols="30"></textarea>
        <div>
          <button id=\'${this.buttonId}\'>
            Trade
          </button>
        </div>
        <div id=\'${this.inventoryId}\'>${this.renderInventory()}</div>
      </div>
    `;
  }
}

function generateId(type, person) {
  return `${type}-${person.id}`;
}


export default PersonInfoWindow;
