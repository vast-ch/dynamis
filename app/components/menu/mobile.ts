import Component from '@glimmer/component';
import { service } from '@ember/service';
import type ScrollService from 'energaudi/services/scroll';
import logo from '/assets/images/logo-long.png?lqip=inline&widths=400&responsive';
import type MobileMenuService from 'energaudi/services/mobile-menu';
import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';

export default class MenuMobileComponent extends Component {
  @service declare scroll: ScrollService;
  @service declare mobileMenu: MobileMenuService;
  @service declare router: RouterService;

  logo = logo;

  @action menuItemClicked(item: { scrollTo: string; label: string }) {
    this.mobileMenu.toggle();
    this.router.transitionTo('index', {
      queryParams: { scrollTo: item.scrollTo },
    });
  }
}
