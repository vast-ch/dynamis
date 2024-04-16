import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';
import GeoHandler from '../handlers/geo-handler';

export default class Requests extends RequestManager {
  constructor(args?: Record<string | symbol, unknown>) {
    super(args);
    this.use([GeoHandler, Fetch]);
  }
}
