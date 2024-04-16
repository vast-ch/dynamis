import { buildBaseURL, buildQueryParams } from '@ember-data/request-utils';

export function geoQuery(address: string = '') {
  const cacheOptions = {};
  const urlOptions = {
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
    op: 'geo',
  };
}
