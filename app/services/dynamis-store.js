import { service } from '@ember/service';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import Store from '@ember-data/store';

export default class DynamisStoreService extends Store {
  @service requestManager;
}
