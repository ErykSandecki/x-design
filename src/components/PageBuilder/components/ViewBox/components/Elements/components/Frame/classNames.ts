import { mapValues } from 'lodash';

// types
import { ElementStickWallPosition } from 'components/PageBuilder/components/ViewBox/types/enums';

export const className = 'Frame';

export const classNames = {
  [className]: className,
  wrapper: `${className}__wrapper`,
  label: {
    name: `${className}__label`,
    modificators: {
      hover: `${className}__label--hover`,
      selected: `${className}__label--selected`,
      ...mapValues(ElementStickWallPosition, (stickWall) => `${className}__label--${stickWall}`),
    },
  },
};
