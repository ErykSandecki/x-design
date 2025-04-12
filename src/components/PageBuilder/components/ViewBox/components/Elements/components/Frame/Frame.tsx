import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Element from '../Element/Element';
import Elements from '../../Elements';
import { Small } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className as classNameFrame, classNames } from './classNames';
import { translationNameSpace } from './contants';

// styles
import styles from './frame.scss';

// types
import { TElementProps } from '../../types';

export type TFrameProps = TElementProps;

const Frame: FC<TFrameProps> = ({
  className,
  id,
  mouseMode,
  parentId,
  type,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();

  return (
    <Element
      classes={{
        className: cx(className, classNamesWithTheme[classNameFrame]),
      }}
      id={id}
      parentId={parentId}
      mouseMode={mouseMode}
      type={type}
    >
      {(selected) => (
        <>
          {parentId === '-1' && (
            <Small
              classes={{
                className: cx(classNamesWithTheme.label.name, [
                  classNamesWithTheme.label.modificators.selected,
                  selected,
                ]),
              }}
            >
              {t(`${translationNameSpace}.label.createFrame`)}
            </Small>
          )}
          <Elements
            eventsDisabled={false}
            isSelected={selected}
            mouseMode={mouseMode}
            parentId={id}
          />
        </>
      )}
    </Element>
  );
};

export default memo(Frame);
