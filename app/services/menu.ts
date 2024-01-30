import Service from '@ember/service';

export default class MenuService extends Service {}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:menu')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('menu') declare altName: MenuService;`.
declare module '@ember/service' {
  interface Registry {
    menu: MenuService;
  }
}
