import Model from './model';
import {getServer, RESOURCE} from '../server';
import Resource from './resource';

let resources = null; 

/**
 * Triggered when a resource is added
 */
export const ADD_RESOURCE = 'add_resource';

/**
 * Representation of all the resources on the map
 */
class Resources extends Model {
  constructor() {
    super();
    this.addServerMapping();
    this._resources = {};
  }

  addServerMapping() {
    getServer().addMapping({
      [RESOURCE]: response => {
        const { action, resource_name, resource_id, amount } = response;
        const resource = this._resources[resource_name][resource_id];
        switch(action) {
          case 'take':
            if (amount === 0) {
              resource.remove();
              delete this._resources[resource_name][resource_id];
            } else {
              resource.updateAmount(amount);
            }
            break;
        }
      }
    });
  }

  /**
   * bulk add resources
   * @param {Resource[]}
   */
  setResources(resources) {
    // TODO mutation again!
    for (const resource_name in resources) {
      for (const id in resources[resource_name]) {
        const resource = resources[resource_name][id];
        const resourceModel = Resource.unpack(resource);
        resources[resource_name][id] = resourceModel;
        this.notify(ADD_RESOURCE, resourceModel);
      }
    }
    this._resources = resources;
  }
}

/**
 * Get global resources object
 */
export function getResources() {
  if (!resources) {
    resources = new Resources();
  }
  return resources;
}
