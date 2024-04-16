import { buildBaseURL } from '@ember-data/request-utils';

export function assessmentQuery(egid: number | undefined = 0) {
  const cacheOptions = {};
  const urlOptions = {
    // host: 'https://enerscope-api.kube.isc.heia-fr.ch',
    host: '/',
    namespace: 'get-estimation',
    resourcePath: egid.toString(),
  };

  const url = buildBaseURL(urlOptions);
  const headers = new Headers();
  headers.append('Accept', 'application/json;charset=utf-8');

  return {
    url: url,
    method: 'GET',
    headers,
    cacheOptions,
    op: 'assessment',
  };
}
