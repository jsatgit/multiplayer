import People from '../../models/people'

class HouseInfoWindow {
  constructor(house) {
    this.house = house
  }

  render() {
    const ownerName = People.directory[this.house.owner].name;
    return `
      <div>
        ${ownerName}'s house
      </div>
    `;
  }
}

export default HouseInfoWindow;
