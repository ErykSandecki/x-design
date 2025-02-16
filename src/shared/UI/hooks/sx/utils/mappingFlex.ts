// types
import { Flex } from '../enums/flex';
import { TSXFlex } from '../types/flex';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingFlex = (flex: TSXFlex): string => {
  const keys = enumToArray<string>(Flex);
  const cssStyles = getCssStyles(flex, keys);
  const hasFlexStyle = cssStyles.length;

  return hasFlexStyle ? `display: flex;\n${cssStyles}` : cssStyles;
};
