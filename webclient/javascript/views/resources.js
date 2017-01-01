import View from './view';
import {ADD_RESOURCE} from '../models/resources';
import Resource from './resource';

const nameToColor = {
  'oil': 'yellow',
  'natural_gas': 'orange',
  'phosphorus': 'green',
  'coal': 'black'
};

class Resources extends View {
  constructor() {
    super();
  }

  handler() {
    return {
      [ADD_RESOURCE]: resourceModel => {
        const color = nameToColor[resourceModel.name];
        const resource = new Resource();
        resource.subscribe(resourceModel);
        resource.render(resourceModel, color);
      }
    };
  }
}

export default Resources;
