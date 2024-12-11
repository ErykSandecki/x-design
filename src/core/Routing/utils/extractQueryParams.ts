import qs, { ParsedUrlQuery } from 'querystring';
import { Location } from 'history';

export const extractQueryParams = (location: Location): ParsedUrlQuery =>
  qs.parse(location.search.slice(1));
