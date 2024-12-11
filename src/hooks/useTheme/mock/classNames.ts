export const classNames = {
  className: 'className',
  child: {
    modificators: { nestedClassName: 'nestedClassName--modificator' },
    name: 'nestedClassName',
  },
};

export const classNamesWithThemeLight = {
  className: { light: 'className--light', name: 'className' },
  child: {
    modificators: {
      nestedClassName: {
        light: 'nestedClassName--modificator--light',
        name: 'nestedClassName--modificator',
      },
    },
    name: { light: 'nestedClassName--light', name: 'nestedClassName' },
  },
};

export const classNamesWithThemeDark = {
  child: {
    modificators: {
      nestedClassName: {
        dark: 'nestedClassName--modificator--dark',
        name: 'nestedClassName--modificator',
      },
    },
    name: { dark: 'nestedClassName--dark', name: 'nestedClassName' },
  },
  className: { dark: 'className--dark', name: 'className' },
};
