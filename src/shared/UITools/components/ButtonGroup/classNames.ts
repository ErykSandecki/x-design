export const className = 'ButtonGroup';

export const classNames = {
  [className]: className,
  button: {
    name: `${className}__button`,
    modificators: {
      disabled: `${className}__button--disabled`,
    },
  },
  icon: {
    name: `${className}__icon`,
    modificators: {
      disabled: `${className}__icon--disabled`,
    },
  },
};
