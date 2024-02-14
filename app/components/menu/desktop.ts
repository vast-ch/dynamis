import Component from '@glimmer/component';
import logo from '/assets/images/logo.png?lqip=inline&widths=400&responsive';
import { service } from '@ember/service';
import type ScrollService from 'energaudi/services/scroll';
import type MobileMenuService from 'energaudi/services/mobile-menu';

export default class MenuDesktopComponent extends Component {
  @service declare scroll: ScrollService;
  @service declare mobileMenu: MobileMenuService;

  logo = logo;
}
