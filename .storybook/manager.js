import { addons, types } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

// components
import ToggleMode from './addons/ToggleMode/ToggleMode';

// others
import { THEME } from '../src/constant/localStorageKeys';
import { THEME_STYLES } from './constants';

// types
import { Theme } from '../src/types';

const getTheme = () => {
  const theme = localStorage.getItem(THEME) || Theme.light;
  localStorage.setItem(THEME, theme);

  return { ...themes[theme], ...THEME_STYLES[theme] };
};

addons.register('TOGGLE_MODE', () => {
  addons.add('TOOL', {
    type: types.TOOL,
    title: 'Toggle mode',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ToggleMode,
  });
});

addons.setConfig({
  theme: getTheme(),
});
