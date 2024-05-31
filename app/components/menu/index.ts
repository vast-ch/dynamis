import Component from '@glimmer/component';

export default class MenuIndexComponent extends Component {
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
