import Model from './model'
import Server from '../server'
import Resource from './resource'

let _resources = {};

class Resources extends Model {
  constructor() {
    super();
    this.addServerMapping();
  }

  static get ADD_RESOURCE() { return 'add_resource'; }

  setResources(resources) {
    // TODO mutation again!
    for (const resource_name in resources) {
      for (const id in resources[resource_name]) {
        const resource = resources[resource_name][id];
        const resourceModel = Resource.unpack(resource);
        resources[resource_name][id] = resourceModel;
        this.notify(Resources.ADD_RESOURCE, resourceModel);
      }
    }
    _resources = resources;
  }

  addServerMapping() {
    Server.addMapping({
      [Server.RESOURCE]: response => {
        const { action, resource_name, resource_id, amount } = response;
        const resource = _resources[resource_name][resource_id];
        switch(action) {
          case 'take':
            resource.updateAmount(amount);
        }
      }
    });
  }
}

export default Resources
