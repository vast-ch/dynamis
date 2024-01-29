import Service from '@ember/service';
import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';

export default class ScrollService extends Service {
  @service declare router: RouterService;

  get inView() {
    return this.router.currentRoute.queryParams['scrollTo'];
  }

  get heroInView() {
    return this.inView === 'hero';
  }

  get featuresInView() {
    return this.inView === 'features';
  }

  get pricingInView() {
    return this.inView === 'pricing';
  }

  get topInView() {
    return this.inView === 'top';
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
