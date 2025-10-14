import cx from 'classnames';
import React from 'react';

// hooks
import { useStyles } from './useStyles';

// others
import { className, classNames } from './classNames';
import { THEME } from '../../../src/constant/localStorageKeys';

// types
import { Theme } from '../../../src/types';

export const ToggleMode = () => {
  const styles = useStyles();

  const onClickHandler = (): void => {
    const theme = localStorage.getItem(THEME);
    const targetTheme = theme === Theme.dark ? Theme.light : Theme.dark;

    localStorage.setItem(THEME, targetTheme);
    location.reload();
  };

  return (
    <div className={cx(classNames[className])} onClick={onClickHandler}>
      {/* INCLUDE STYLES */}
      {styles}

      {/* ICON */}
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 15 15" fill="none">
        <path
          d="M12.0949 11.3931C12.8596 11.3931 13.4844 10.784 13.4844 10.0385C13.4844 9.13814 12.0949 7.66902 12.0949 7.66902C12.0949 7.66902 10.7054 9.13814 10.7054 10.0385C10.7054 10.784 11.3301 11.3931 12.0949 11.3931ZM5.49561 10.651C5.61986 10.7705 5.82111 10.7705 5.94361 10.651L10.4254 6.34294C10.5496 6.22346 10.5496 6.02993 10.4254 5.91213L5.94536 1.60406C5.93486 1.59396 5.92261 1.58387 5.91036 1.57545L4.54186 0.259471C4.51202 0.231147 4.47178 0.215266 4.42986 0.215266C4.38793 0.215266 4.34769 0.231147 4.31786 0.259471L3.47786 1.06723C3.4484 1.09593 3.43189 1.13462 3.43189 1.17494C3.43189 1.21525 3.4484 1.25395 3.47786 1.28264L4.65386 2.41351L1.01736 5.91213C0.893107 6.03161 0.893107 6.22514 1.01736 6.34294L5.49561 10.651ZM5.72136 3.10179L8.85211 6.11239H2.59236L5.72136 3.10179ZM14.5029 12.5997H0.782857C0.705857 12.5997 0.642857 12.6603 0.642857 12.7344V14.0806C0.642857 14.1547 0.705857 14.2153 0.782857 14.2153H14.5029C14.5799 14.2153 14.6429 14.1547 14.6429 14.0806V12.7344C14.6429 12.6603 14.5799 12.5997 14.5029 12.5997Z"
          fill="#83888E"
        />
      </svg>
    </div>
  );
};

export default ToggleMode;
