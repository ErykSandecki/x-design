export const className = 'Element';

export const classes = {
  className,
};

export const classNames = {
  [className]: {
    name: className,
    modificators: {
      hover: `${className}--hover`,
      moving: `${className}--moving`,
      selected: `${className}--selected`,
    },
  },
};
