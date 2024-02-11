import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import type ScrollService from 'energaudi/services/scroll';

export default class ApplicationController extends Controller {
  queryParams = ['scrollTo'];

  @service declare scroll: ScrollService;
  @tracked scrollTo = null;
}
