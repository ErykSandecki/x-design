import cx from 'classnames';
import { FC, ReactElement, useRef } from 'react';
import { noop } from 'lodash';

// components
import DraggableSectionAnchors from './DraggableSectionAnchors/DraggableSectionAnchors';
import DraggableSectionContent, {
  TDraggableSectionContentProps,
} from './DraggableSectionContent/DraggableSectionContent';
import DraggableSectionMenu from './DraggableSectionMenu/DraggableSectionMenu';
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

// hooks
import { useDraggableSectionEvents } from './hooks/useDraggableSectionEvents';

// styles
import styles from './draggable-section.module.scss';

// types
import { E2EAttribute } from 'types';

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

  const { draggableItem, isDraggable, isPressing, onMouseDown, selected, setIsDraggable } = useDraggableSectionEvents(
    containerId,
    onDragEnd,
    ref,
  );

  return (
    <E2EDataAttribute type={E2EAttribute.draggableSection} value={e2eValue}>
      <div
        className={cx(styles.DraggableSection, {
          [styles['DraggableSection--draggable']]: isDraggable,
        })}
        ref={ref}
      >
        {components.map(({ element, visible }, index) => {
          const isSelected = draggableItem === index && selected;
          const showMenu = components.length > 1;
          const forceDisplay = draggableItem === index && isDraggable;

          return (
            <E2EDataAttribute key={index} type={E2EAttribute.draggableSectionItem} value={index}>
              <div
                className={cx(styles.DraggableSection__item, {
                  [styles['DraggableSection__item--selected']]: isSelected,
                })}
                onMouseDown={() => onMouseDown(index)}
                onMouseMove={() => isPressing && setIsDraggable(true)}
              >
                <DraggableSectionMenu forceDisplay={forceDisplay} show={showMenu} />
                <DraggableSectionAnchors index={index} isDraggable={isDraggable} length={components.length} />
                <DraggableSectionContent element={element} index={index} visible={visible} {...restProps} />
              </div>
            </E2EDataAttribute>
          );
        })}
      </div>
    </E2EDataAttribute>
  );
};

export default DraggableSection;
