import {
  type Handler,
  type NextFn,
  type RequestContext,
} from '@ember-data/request';
import { htmlSafe } from '@ember/template';

export interface Response {
  content: Location;
}

interface Location {
  results: Result[];
}

interface Result {
  attrs: Attrs;
  id: number;
  weight: number;
}

interface Attrs {
  detail: string;
  featureId: string;
  geom_quadindex: string;
  geom_st_box2d: string;
  label: string;
  lat: number;
  lon: number;
  num: number;
  objectclass: string;
  origin: string;
  rank: number;
  x: number;
  y: number;
  zoomlevel: number;
}

export interface GeoModel extends Attrs {
  id: number;
  labelPlainText: string;
}

export interface GeoResponse {
  content: GeoModel[];
}

const parser = new DOMParser();

const GeoHandler: Handler = {
  async request<T>(context: RequestContext, next: NextFn<T>) {
    if (context.request.op !== 'geo') return next(context.request);

    try {
      const { content } = (await next(context.request)) as Response;

      return content.results.map((item) => {
        return {
          // type: 'geo',
          id: item.id,
          labelPlainText: htmlSafe(
            parser.parseFromString(item.attrs.label, 'text/html').body
              .textContent || '',
          ),
          ...item.attrs,
        };
      }) as T;
    } catch (e) {
      console.log('GeoHandler.request().catch()', { e });
      throw e;
    }
  },
};

export default GeoHandler;
