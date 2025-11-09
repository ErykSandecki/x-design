import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import { UITools } from 'shared';

// others
import { PANEL_PROPERTIES_ID } from '../../../../constants';
import { translationNameSpace } from './constants';

// store
import { changeBackground, changeBackgroundOrder, removeVariant, updateEventsStatus } from 'store/pageBuilder/actions';
import {
  elementAttributeSelectorCreator,
  eventSelectorCreator,
  firstSelectedElementIdSelector,
} from 'store/pageBuilder/selectors';

// types
import { TColor } from 'types';

const ColumnFill: FC = () => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const backgrounds = useSelector(elementAttributeSelectorCreator('background', firstElementId));
  const colorSampler = useSelector(eventSelectorCreator('colorSampler'));
  const dispatch = useDispatch();

  return (
    <UITools.DraggableSection
      components={backgrounds.map((background, index) => {
        const { alpha, color, format, mode } = background.properties as TColor;

        return {
          element: (
            <UITools.ColorPicker
              activeSampler={colorSampler as boolean}
              alpha={alpha}
              color={color}
              e2eValue="background"
              format={format}
              key={index}
              onChangeAlpha={(alpha) =>
                dispatch(changeBackground({ properties: { alpha, color, format, mode } }, firstElementId, index))
              }
              onChangeColor={(alpha, color) =>
                dispatch(changeBackground({ properties: { alpha, color, format, mode } }, firstElementId, index))
              }
              onFormatChange={(format) =>
                dispatch(changeBackground({ properties: { alpha, color, format, mode } }, firstElementId, index))
              }
              onClickColorSampler={(color) => {
                dispatch(changeBackground({ properties: { alpha, color, format, mode } }, firstElementId, index));
              }}
              onClickSampler={() => dispatch(updateEventsStatus({ colorSampler: true }))}
              placement="leftBottom"
            />
          ),
          visible: background.visible,
        };
      })}
      containerId={PANEL_PROPERTIES_ID}
      onClickRemove={(index) => dispatch(removeVariant(index, 'background'))}
      onClickVisible={(index) =>
        dispatch(changeBackground({ visible: !backgrounds[index].visible }, firstElementId, index))
      }
      onDragEnd={(draggableItem, position) => dispatch(changeBackgroundOrder(draggableItem, position))}
    />
  );
};

export default ColumnFill;
