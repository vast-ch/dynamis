import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class MenuIndexComponent extends Component {
  @tracked isMobileMenuOpen = false;

  menuItems = [
    {
      scrollTo: 'hero',
      label: 'menu.hero',
    },
    {
      scrollTo: 'features',
      label: 'menu.features',
    },
    {
      scrollTo: 'pricing',
      label: 'menu.pricing',
    },
  ];
}
