export const className = 'Element';

export const classes = {
  className,
};

export const classNames = {
  [className]: {
    name: className,
    modificators: {
      moving: `${className}--moving`,
    },
  },
  wrapper: {
    name: `${className}__wrapper`,
    modificators: {
      hover: `${className}__wrapper--hover`,
    },
  },
};
