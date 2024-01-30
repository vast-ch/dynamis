import Component from '@glimmer/component';
import logo from '/assets/images/logo.png?lqip=inline&widths=64,32&responsive';
import { service } from '@ember/service';
import type ScrollService from 'energaudi/services/scroll';

export default class MenuDesktopComponent extends Component {
  @service declare scroll: ScrollService;

  logo = logo;
}
