import {getServer} from '../../server';
import GameModel from '../../models/gameModel';

class PersonInfoWindow {
  constructor(person) {
    this.person = person;
    this.inventoryId = generateId('inventory', person);
    this.tradeContainerId = generateId('trade-container', person);
    this.tradeAreaId = 'trade-area';
    this.tradeButtonId = 'trade-button';
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

  onRendered() {
    this.initTradeButton();
    this.initTradeArea();
  }

  initTradeButton() {
    console.log(this.tradeButtonId);
    const button = document.getElementById(this.tradeButtonId);
    button.addEventListener('click', evt => {
      const tradeArea = document.getElementById(this.tradeAreaId);
      const tradeDetails = JSON.parse(tradeArea.value);
      getServer().trade(tradeDetails.to, tradeDetails.items);
    });
  }

  initTradeArea() {
    const tradeArea = document.getElementById(this.tradeAreaId);
    tradeArea.addEventListener('keypress', evt => {
      evt.stopPropagation();
    });
  }

  renderTradeContainer() {
    if (this.person.id != GameModel.my.id) {
      return '';
    }

    return `
      <div id=\'${this.tradeContainerId}\'>
        <textarea id=\'${this.tradeAreaId}\' class="trade-area" rows="8" cols="30"></textarea>
        <div>
          <button id=\'${this.tradeButtonId}\'>
            Trade
          </button>
        </div>
      </div>
    `;
  }

  render() {
    return `
      <div>
        <div>${this.person.name}</div>
        ${this.renderTradeContainer()}
        <div id=\'${this.inventoryId}\'>${this.renderInventory()}</div>
      </div>
    `;
  }
}

function generateId(type, person) {
  return `${type}-${person.id}`;
}


export default PersonInfoWindow;
