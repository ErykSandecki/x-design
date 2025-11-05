import { FC } from 'react';
import { kebabCase } from 'lodash';
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
import { TValueScore } from 'types';

export type TColumnMinMaxSizeProps = { scoreKey: keyof TValueScore };

const ColumnMinMaxSize: FC<TColumnMinMaxSizeProps> = ({ scoreKey }) => {
  const { t } = useTranslation();

  const {
    height,
    heightMode,
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
    widthMode,
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
      withBottomMargin
    >
      {visibleWidth && (
        <ColumnMinMaxSizeInput
          e2eValue={kebabCase(`${scoreKey}Width`)}
          mode={widthMode}
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
          e2eValue={kebabCase(`${scoreKey}Height`)}
          mode={heightMode}
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
