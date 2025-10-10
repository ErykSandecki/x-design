import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import ColumnMinMaxSizeInput from './ColumnMinMaxSizeInput';
import HeightPopoverHeight from './components/HeightPopoverHeight/HeightPopoverHeight';
import HeightPopoverWidth from './components/HeightPopoverWidth/HeightPopoverWidth';
import { UITools } from 'shared';

// hooks
import { useMinMaxSizeEvents } from './hooks/useMinMaxSizeEvents';

// others
import { translationNameSpace } from './constants';

// types
import { GridColumnType } from 'shared/UITools/Section/components/SectionColumn/enums';
import { TScore } from 'types';

export type TColumnMinMaxSizeProps = { score: keyof TScore };

const ColumnMinMaxSize: FC<TColumnMinMaxSizeProps> = ({ score }) => {
  const { t } = useTranslation();

  const {
    height,
    onBlurHeight,
    onBlurWidth,
    onChangeHeight,
    onChangeWidth,
    valueScrubbaleInputHeight,
    valueScrubbaleInputWidth,
    visibleHeight,
    visibleWidth,
    width,
  } = useMinMaxSizeEvents(score);

  if (!visibleHeight && !visibleWidth) {
    return null;
  }

  return (
    <UITools.SectionColumn
      gridColumnType={GridColumnType.twoInputs}
      labels={
        [
          visibleWidth && t(`${translationNameSpace}.${score}.label.width`),
          visibleHeight && t(`${translationNameSpace}.${score}.label.height`),
        ].filter(Boolean) as [string] | [string, string]
      }
      withMargin
    >
      {visibleWidth && (
        <ColumnMinMaxSizeInput
          e2eValue={`${score}Width`}
          onBlur={onBlurWidth}
          onChange={onChangeWidth}
          popoverChildren={<HeightPopoverWidth score={score} />}
          score={score}
          sizeType="width"
          value={width}
          valueScrubbaleInput={valueScrubbaleInputWidth}
        />
      )}
      {visibleHeight && (
        <ColumnMinMaxSizeInput
          e2eValue={`${score}Height`}
          onBlur={onBlurHeight}
          onChange={onChangeHeight}
          popoverChildren={<HeightPopoverHeight score={score} />}
          score={score}
          sizeType="height"
          value={height}
          valueScrubbaleInput={valueScrubbaleInputHeight}
        />
      )}
    </UITools.SectionColumn>
  );
};

export default ColumnMinMaxSize;
