/*
 * Computes a new position based on
 * an old position
 */

const STEP_SIZE = 0.00001;

class Stepper {
  static up(position) {
    return {
      lat: position.lat + STEP_SIZE,
      lng: position.lng 
    }
  }

  static down(position) {
    return {
      lat: position.lat - STEP_SIZE,
      lng: position.lng 
    }
  }

  static right(position) {
    return {
      lat: position.lat,
      lng: position.lng + STEP_SIZE
    }
  }

  static left(position) {
    return {
      lat: position.lat,
      lng: position.lng - STEP_SIZE 
    }
  }
}

export default Stepper;
