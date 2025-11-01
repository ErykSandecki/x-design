import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ColumnResizingButtonIcons from './ColumnResizingButtonIcons';
import ColumnResizingInput from './ColumnResizingInput';
import PopoverHeight from './PopoverHeight/PopoverHeight';
import PopoverWidth from './PopoverWidth/PopoverWidth';
import { UITools } from 'shared';

// hooks
import { useResizingEvents } from './hooks/useResizingEvents';

// others
import { translationNameSpace } from './constants';

const ColumnResizing: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    aspectRatio,
    attachedValueHeight,
    attachedValueWidth,
    elementHeight,
    elementWidth,
    height,
    isMixedHeight,
    isMixedWidth,
    onBlurHeight,
    onBlurWidth,
    onChangeHeight,
    onChangeWidth,
    valueScrubbaleInputHeight,
    valueScrubbaleInputWidth,
    visibleAspectRatioButton,
    width,
  } = useResizingEvents();

  return (
    <UITools.SectionColumn
      buttonsIcon={ColumnResizingButtonIcons(aspectRatio, dispatch, t, visibleAspectRatioButton)}
      gridColumnType={UITools.GridColumnType.twoInputs}
      labels={[t(`${translationNameSpace}.label`)]}
      withInputConnector={aspectRatio}
      withBottomMargin
    >
      <ColumnResizingInput
        attachedValue={attachedValueWidth}
        e2eValue="width"
        onBlur={onBlurWidth}
        onChange={onChangeWidth}
        popoverChildren={<PopoverWidth isMixed={isMixedWidth} width={elementWidth} />}
        sizeType="width"
        value={width}
        valueScrubbaleInput={valueScrubbaleInputWidth}
      />
      <ColumnResizingInput
        attachedValue={attachedValueHeight}
        e2eValue="height"
        onBlur={onBlurHeight}
        onChange={onChangeHeight}
        popoverChildren={<PopoverHeight height={elementHeight} isMixed={isMixedHeight} />}
        sizeType="height"
        value={height}
        valueScrubbaleInput={valueScrubbaleInputHeight}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnResizing;
