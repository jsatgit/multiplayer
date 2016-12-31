import Model from './model';

class Resource extends Model {
  constructor(id, name, position, amount) {
    super();
    this.id = id;
    this.name = name;
    this.position = position;
    this.amount = amount;
  }

  static get UPDATE_AMOUNT() { return 'update_amount'; }
  static get REMOVE() { return 'remove_resource'; }

  static unpack(resource) {
    return new Resource(
      resource.id,
      resource.name,
      resource.position,
      resource.amount
    );
  }

  updateAmount(amount) {
    this.amount = amount;
    this.notify(Resource.UPDATE_AMOUNT, amount);
  }

  remove() {
    this.notify(Resource.REMOVE);
  }
}

export default Resource;
