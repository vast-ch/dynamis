import Component from '@glimmer/component';
// @ts-expect-error ember-responsive-image is in beta
import phone from '/assets/images/phone.png?lqip=inline&widths=316&responsive';

export default class MainHeroPhoneComponent extends Component {
  phone = phone;
}
