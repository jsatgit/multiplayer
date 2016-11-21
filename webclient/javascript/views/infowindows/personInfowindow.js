class PersonInfoWindow {
  constructor(person) {
    this.person = person;
    this.inventoryId = generateId(person)
  }

  renderInventoryItem(name, value) {
    return `<div>${name}: ${value}</div>`;
  }

  renderInventory() {
    let renderedInventory = '';
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

  render() {
    return `
      <div>
        <div>${this.person.name}</div>
        <div id=\'${this.inventoryId}\'>${this.renderInventory()}</div>
      </div>
    `;
  }
}

function generateId(person) {
  return `inventory-${person.id}`
}


export default PersonInfoWindow;
