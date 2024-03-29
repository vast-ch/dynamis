import Component from '@glimmer/component';
// @ts-expect-error ember-responsive-image is in beta
import laptop from '/assets/images/laptop.png?lqip=inline&widths=2432&responsive';
import { service } from '@ember/service';
import type ScrollService from 'dynamis/services/scroll';

export default class MainHeroFeatureSectionComponent extends Component {
  @service declare scroll: ScrollService;

  laptop = laptop;
}
