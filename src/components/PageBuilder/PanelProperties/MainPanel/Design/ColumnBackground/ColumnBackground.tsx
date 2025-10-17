import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import ColumnBackgroundButtonIcons from './ColumnBackgroundButtonIcons';
import { UITools } from 'shared';

// store
import { changeBackground, updateEventsStatus } from 'store/pageBuilder/actions';
import { eventSelectorCreator, pageBackgroundSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { TColor } from 'types';

const ColumnBackground: FC = () => {
  const background = useSelector(pageBackgroundSelectorCreator('-1'));
  const colorSampler = useSelector(eventSelectorCreator('colorSampler'));
  const dispatch = useDispatch();
  const { properties } = background;
  const { alpha, color, format } = properties as TColor;

  return (
    <UITools.SectionColumn buttonsIcon={ColumnBackgroundButtonIcons()}>
      <UITools.ColorPicker
        activeSampler={colorSampler as boolean}
        alpha={alpha}
        color={color}
        e2eValue="background"
        format={format}
        onChangeAlpha={(alpha) => dispatch(changeBackground({ properties: { alpha, color, format } }, '-1'))}
        onChangeColor={(alpha, color) => dispatch(changeBackground({ properties: { alpha, color, format } }, '-1'))}
        onFormatChange={(format) => dispatch(changeBackground({ properties: { alpha, color, format } }, '-1'))}
        onClickColorSampler={(color) => {
          dispatch(changeBackground({ properties: { alpha, color, format } }, '-1'));
        }}
        onClickSampler={() => dispatch(updateEventsStatus({ colorSampler: true }))}
        placement="leftBottom"
      />
    </UITools.SectionColumn>
  );
};

export default ColumnBackground;
