class Position {
  static distance(position1, position2) {
    const latDiff = position2.lat - position1.lat;
    const lngDiff = position2.lng - position1.lng;
    return Math.hypot(latDiff, lngDiff);
  }
}

export default Position;
