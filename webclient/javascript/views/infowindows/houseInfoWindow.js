import {getPeople} from '../../models/people';

class HouseInfoWindow {
  constructor(house) {
    this.house = house;
  }

  render() {
    const ownerName = getPeople().directory[this.house.owner].name;
    return `
      <div>
        ${ownerName}'s house
      </div>
    `;
  }
}

export default HouseInfoWindow;
