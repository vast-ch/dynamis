import Component from '@glimmer/component';
// @ts-expect-error ember-responsive-image is in beta
import logo from '/assets/images/logo-long.png?lqip=inline&widths=400&responsive';

export default class FooterComponent extends Component {
  logo = logo;
}
