import qs from 'query-string';

export const getQuery = () =>
  qs.parse(window.location.search, { arrayFormat: 'comma' });
