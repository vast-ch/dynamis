import Component from '@glimmer/component';
import { service } from '@ember/service';
import type ScrollService from 'energaudi/services/scroll';
import logo from '/assets/images/logo.png?lqip=inline&widths=64,32&responsive';

export default class MenuMobileComponent extends Component {
  @service declare scroll: ScrollService;

  logo = logo;
}
