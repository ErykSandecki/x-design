export const className = 'MouseModes';

export const classes = {
  className,
};

export const classNames = {
  [className]: className,
  button: {
    name: `${className}__button`,
    modificators: {
      active: `${className}__button--active`,
    },
  },
};
