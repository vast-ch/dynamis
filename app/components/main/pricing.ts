import Component from '@glimmer/component';
import { service } from '@ember/service';
import type ScrollService from 'energaudi/services/scroll';

export default class MainPricingComponent extends Component {
  @service declare scroll: ScrollService;
}
