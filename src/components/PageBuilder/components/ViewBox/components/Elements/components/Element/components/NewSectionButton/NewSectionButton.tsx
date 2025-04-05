import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { Button } from 'shared';

// hooks
import { useClickEvent } from './hooks/useClickEvent';
import { useTheme } from 'hooks';

// others
import { classNames } from './classNames';
import { translationNameSpace } from './constants';

// styles
import styles from './new-section-button.scss';

// types
import { InputSize } from 'shared/UI/enums';
import { TRectCoordinates } from 'types';

export type TNewElementButtonProps = {
  position: 'top' | 'bottom';
  rectCoordinates: TRectCoordinates;
};

const NewElementButton: FC<TNewElementButtonProps> = ({
  position,
  rectCoordinates,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();
  const { x1, x2, y1, y2 } = rectCoordinates || {};
  const height = y2 - y1;
  const onClick = useClickEvent();
  const top = position === 'top' ? y1 : y1 + height;
  const width = x2 - x1;

  return (
    <>
      <svg
        className={cx(classNamesWithTheme.circle)}
        style={{
          height: `${height}px`,
          left: `${x1}px`,
          top: `${top}px`,
          width: `${width}px`,
        }}
      >
        <circle cx={width / 2} cy={0} r={3} />
      </svg>
      <Button
        classes={{
          className: cx(
            classNamesWithTheme.button.name,
            classNamesWithTheme.button.modificators[position],
          ),
        }}
        onClick={onClick}
        onMouseDown={(event) => event.stopPropagation()}
        size={InputSize.small}
        startIcon={{ name: 'PlusOutlined' }}
      >
        {t(`${translationNameSpace}.label`)}
      </Button>
    </>
  );
};

export default NewElementButton;
