import { kebabCase, mapValues } from 'lodash';

// types
import { GridColumnType } from './enums';

export const className = 'SectionColumn';

export const classNames = {
  [className]: {
    name: className,
    modificators: {
      withMargin: `${className}--with-margin`,
    },
  },
  labels: `${className}__labels`,
  label: `${className}__label`,
  wrapper: `${className}__wrapper`,
  content: {
    name: `${className}__content`,
    modificators: {
      ...mapValues(GridColumnType, (gridColumnType) => `${className}__content--${kebabCase(gridColumnType)}`),
    },
  },
  buttons: `${className}__buttons`,
};
