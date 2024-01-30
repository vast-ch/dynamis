import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ScrollService extends Service {
  @tracked inView: string | undefined = undefined;

  get heroInView() {
    return this.inView === 'hero';
  }

  get featuresInView() {
    return this.inView === 'features';
  }

  get pricingInView() {
    return this.inView === 'pricing';
  }

  @action to(newValue: string) {
    this.inView = newValue;
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:scroll')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('scroll') declare altName: ScrollService;`.
declare module '@ember/service' {
  interface Registry {
    scroll: ScrollService;
  }
}
