import { cloneElement, FC, MouseEvent, ReactElement, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { isArray } from 'lodash';
import { useTranslation } from 'react-i18next';

// components
import Box from '../../../UI/Box/Box';
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import SelectItem from '../SelectItem/SelectItem';

// hooks
import { useRenderContainer, useTheme } from 'hooks';
import { useSelectOptionsEvents } from './hooks/useSelectOptionsEvents';

// others
import { className, classNames } from './classNames';
import { translationNameSpace } from '../constants';

// styles
import styles from './select-options.scss';

// types
import { E2EAttribute, HTMLContainerId } from 'types';

export type TSelectOptionsProps = {
  children: ReactElement | Array<ReactElement> | null;
  e2eValue?: TE2EDataAttributeProps['value'];
  idContainer?: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnterOptions?: TFunc<[string]>;
  onMouseLeaveOptions?: TFunc<[string]>;
  ref: RefObject<HTMLDivElement>;
  selected: boolean;
  value: string;
  wrapperRef: RefObject<HTMLDivElement>;
};

export const SelectOptions: FC<TSelectOptionsProps> = ({
  children,
  e2eValue,
  idContainer,
  onClick,
  onMouseEnterOptions,
  onMouseLeaveOptions,
  ref,
  selected,
  value,
  wrapperRef,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();
  const container = useRenderContainer(idContainer, HTMLContainerId.dropdown);

  const { onMouseEnter, onMouseLeave, style } = useSelectOptionsEvents(
    onMouseEnterOptions,
    onMouseLeaveOptions,
    ref,
    selected,
    value,
    wrapperRef,
  );

  if (!container) {
    return null;
  }

  return createPortal(
    <E2EDataAttribute type={E2EAttribute.selectOptions} value={e2eValue}>
      <Box
        classes={{
          className: cx(classNamesWithTheme[className].name, [
            classNamesWithTheme[className].modificators.selected,
            selected,
          ]),
        }}
        component="ul"
        onClick={onClick}
        ref={ref}
        style={style}
      >
        {!children ? (
          <SelectItem disabled value="">
            {t(`${translationNameSpace}.noOptions`)}
          </SelectItem>
        ) : (
          <>
            {isArray(children)
              ? children.map((children, index) => {
                  const targetIndex = index;

                  return cloneElement(children as ReactElement<any>, {
                    ...(children as ReactElement<any>).props,
                    key: targetIndex,
                    onMouseEnter,
                    onMouseLeave,
                    selectedValue: value,
                  });
                })
              : cloneElement(children as ReactElement<any>, {
                  ...(children.props as ReactElement<any>),
                  onMouseEnter,
                  onMouseLeave,
                  selectedValue: value,
                })}
          </>
        )}
      </Box>
    </E2EDataAttribute>,
    container,
  );
};

export default SelectOptions;
