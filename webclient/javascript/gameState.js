class GameState {
  constructor(myself) {
    this.myself = myself;
  }

  get myId() {
    return this.myself.id
  }

  set myPosition(position) {
    this.myself.position = position;
  }

  get myPosition() {
    return this.myself.position;
  }
}

export default GameState;
