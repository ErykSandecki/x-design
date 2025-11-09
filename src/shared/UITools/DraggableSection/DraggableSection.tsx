import { FC, ReactElement, useRef } from 'react';
import { noop } from 'lodash';

// components
import Box from '../../UI/Box/Box';
import DraggableSectionAnchors from './DraggableSectionAnchors/DraggableSectionAnchors';
import DraggableSectionContent, {
  TDraggableSectionContentProps,
} from './DraggableSectionContent/DraggableSectionContent';
import DraggableSectionMenu from './DraggableSectionMenu/DraggableSectionMenu';

// hooks
import { useDraggableSectionEvents } from './hooks/useDraggableSectionEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './draggable-section.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

export type TDraggableSectionProps = Pick<TDraggableSectionContentProps, 'onClickRemove' | 'onClickVisible'> & {
  components?: Array<{ element: ReactElement; visible: boolean }>;
  containerId?: string;
  e2eValue?: TE2EDataAttributeProps['value'];
  onDragEnd?: TFunc<[number, number]>;
};

export const DraggableSection: FC<TDraggableSectionProps> = ({
  components = [],
  containerId = '',
  e2eValue = '',
  onDragEnd = noop,
  ...restProps
}) => {
  const ref = useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  const { draggableItem, isDraggable, isPressing, onMouseDown, selected, setIsDraggable } = useDraggableSectionEvents(
    containerId,
    onDragEnd,
    ref,
  );

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.draggable,
          isDraggable,
        ]),
      }}
      e2eAttribute={E2EAttribute.draggableSection}
      e2eValue={e2eValue}
      ref={ref}
    >
      {components.map(({ element, visible }, index) => {
        const isSelected = draggableItem === index && selected;
        const showMenu = components.length > 1;
        const forceDisplay = draggableItem === index && isDraggable;

        return (
          <Box
            classes={{
              className: cx(classNamesWithTheme.item.name, [
                classNamesWithTheme.item.modificators.selected,
                isSelected,
              ]),
            }}
            e2eAttribute={E2EAttribute.draggableSectionItem}
            e2eValue={index}
            key={index}
            onMouseDown={() => onMouseDown(index)}
            onMouseMove={() => isPressing && setIsDraggable(true)}
          >
            <DraggableSectionMenu forceDisplay={forceDisplay} show={showMenu} />
            <DraggableSectionAnchors index={index} isDraggable={isDraggable} length={components.length} />
            <DraggableSectionContent element={element} index={index} visible={visible} {...restProps} />
          </Box>
        );
      })}
    </Box>
  );
};

export default DraggableSection;
