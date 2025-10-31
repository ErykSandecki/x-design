import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import ColumnMinMaxSizeInput from './ColumnMinMaxSizeInput';
import HeightPopoverHeight from './HeightPopoverHeight/HeightPopoverHeight';
import HeightPopoverWidth from './HeightPopoverWidth/HeightPopoverWidth';
import { UITools } from 'shared';

// hooks
import { useMinMaxSizeEvents } from './hooks/useMinMaxSizeEvents';

// others
import { translationNameSpace } from './constants';

// types
import { TScore } from 'types';

export type TColumnMinMaxSizeProps = { scoreKey: keyof TScore };

const ColumnMinMaxSize: FC<TColumnMinMaxSizeProps> = ({ scoreKey }) => {
  const { t } = useTranslation();

  const {
    attachedValueHeight,
    attachedValueWidth,
    height,
    heightScore,
    onBlurHeight,
    onBlurWidth,
    onChangeHeight,
    onChangeWidth,
    valueScrubbaleInputHeight,
    valueScrubbaleInputWidth,
    visibleHeight,
    visibleWidth,
    width,
    widthScore,
  } = useMinMaxSizeEvents(scoreKey);

  if (!visibleHeight && !visibleWidth) {
    return null;
  }

  return (
    <UITools.SectionColumn
      gridColumnType={UITools.GridColumnType.twoInputs}
      labels={
        [
          visibleWidth && t(`${translationNameSpace}.${scoreKey}.label.width`),
          visibleHeight && t(`${translationNameSpace}.${scoreKey}.label.height`),
        ].filter(Boolean) as [string] | [string, string]
      }
      withMargin
    >
      {visibleWidth && (
        <ColumnMinMaxSizeInput
          attachedValue={attachedValueWidth}
          e2eValue={`${scoreKey}Width`}
          onBlur={onBlurWidth}
          onChange={onChangeWidth}
          popoverChildren={<HeightPopoverWidth score={widthScore} scoreKey={scoreKey} />}
          scoreKey={scoreKey}
          sizeType="width"
          value={width}
          valueScrubbaleInput={valueScrubbaleInputWidth}
        />
      )}
      {visibleHeight && (
        <ColumnMinMaxSizeInput
          attachedValue={attachedValueHeight}
          e2eValue={`${scoreKey}Height`}
          onBlur={onBlurHeight}
          onChange={onChangeHeight}
          popoverChildren={<HeightPopoverHeight score={heightScore} scoreKey={scoreKey} />}
          scoreKey={scoreKey}
          sizeType="height"
          value={height}
          valueScrubbaleInput={valueScrubbaleInputHeight}
        />
      )}
    </UITools.SectionColumn>
  );
};

export default ColumnMinMaxSize;
