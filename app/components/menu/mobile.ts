import Component from '@glimmer/component';
import { service } from '@ember/service';
import type ScrollService from 'energaudi/services/scroll';
import logo from '/assets/images/logo.png?lqip=inline&widths=64,32&responsive';
import type MobileMenuService from 'energaudi/services/mobile-menu';
import { action } from '@ember/object';

export default class MenuMobileComponent extends Component {
  @service declare scroll: ScrollService;
  @service declare mobileMenu: MobileMenuService;

  logo = logo;

  @action menuItemClicked(item: { scrollTo: string; label: string }) {
    this.mobileMenu.toggle();
    this.scroll.to(item.scrollTo);
  }
}
