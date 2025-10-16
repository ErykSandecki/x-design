// utils
import { getDataTestAttribute } from 'shared/E2EDataAttributes/utils';

export const getE2EAttribute = (e2eAttribute: string, e2eValue?: number | string): string =>
  e2eValue ? `[${getDataTestAttribute(e2eAttribute)}="${e2eValue}"]` : `[${getDataTestAttribute(e2eAttribute)}]`;
