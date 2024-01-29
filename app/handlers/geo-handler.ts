import {
  type Handler,
  type NextFn,
  type RequestContext,
} from '@ember-data/request';

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
    const { content } = (await next(context.request)) as Response;

    return content.results.map((item) => {
      return {
        // type: 'geo',
        id: item.id,
        labelPlainText: parser.parseFromString(item.attrs.label, 'text/html')
          .body.textContent,
        ...item.attrs,
      };
    }) as T;

    return {
      links: {},
      data: content.results.map((item) => {
        return {
          type: 'geo',
          id: item.id,
          attributes: item.attrs,
        };
      }),
    } as T;
  },
};

export default GeoHandler;
