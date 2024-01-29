import Model, { attr } from '@ember-data/model';

export default class GeoModel extends Model {
  @attr detail;
  @attr featureId;
  @attr label;
  @attr lat;
  @attr lon;
}
