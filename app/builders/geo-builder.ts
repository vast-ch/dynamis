import { buildBaseURL, buildQueryParams } from '@ember-data/request-utils';
import type { QueryRequestOptions } from '@warp-drive/core-types/request';

export function geoQuery(address: string = ''): QueryRequestOptions {
  const cacheOptions = {};
  const urlOptions = {
    identifier: {
      type: 'geo',
    },
    op: 'query',
    host: 'https://api3.geo.admin.ch',
    namespace: 'rest/services/ech',
    resourcePath: 'SearchServer',
  };

  const url = buildBaseURL(urlOptions);
  const headers = new Headers();
  headers.append('Accept', 'application/json;charset=utf-8');
  const queryString = buildQueryParams({
    type: 'locations',
    searchText: address,
  });

  return {
    url: `${url}?${queryString}`,
    method: 'GET',
    headers,
    cacheOptions,
    op: 'query',
  };
}
