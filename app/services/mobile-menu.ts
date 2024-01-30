import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MobileMenuService extends Service {
  @tracked isVisible = false;

  @action toggle() {
    this.isVisible = !this.isVisible;
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:mobile-menu')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('mobile-menu') declare altName: MobileMenuService;`.
declare module '@ember/service' {
  interface Registry {
    'mobile-menu': MobileMenuService;
  }
}
