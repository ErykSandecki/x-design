import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import ColumnPositionButtonIcons from './ColumnPositionButtonIcons';
import ColumnPositionInput from './ColumnPositionInput';
import { UITools } from 'shared';

// hooks
import { usePositionEvents } from './hooks/usePositionEvents';

// others
import { translationNameSpace } from './constants';

// types
import { GridColumnType } from 'shared/UITools/components/Section/components/SectionColumn/enums';

// utils

const ColumnPosition: FC = () => {
  const { t } = useTranslation();

  const {
    disabledAll,
    disabledX,
    disabledY,
    firstElement,
    hasAlignmentHorizontal,
    hasAlignmentVertical,
    isMultiple,
    onBlurX,
    onBlurY,
    onChangeX,
    onChangeY,
    onMouseDown,
    showConstrains,
    typeInputX,
    typeInputY,
    x,
    y,
  } = usePositionEvents();

  return (
    <UITools.SectionColumn
      buttonsIcon={ColumnPositionButtonIcons(firstElement, showConstrains)}
      gridColumnType={GridColumnType.twoInputs}
      labels={[t(`${translationNameSpace}.label`)]}
      withMargin
    >
      <ColumnPositionInput
        disabled={disabledX}
        disabledAll={disabledAll}
        e2eValue="x"
        hasAlignment={hasAlignmentHorizontal}
        isMultiple={isMultiple}
        label="X"
        onBlur={onBlurX}
        onChange={onChangeX}
        onMouseDown={onMouseDown}
        typeInput={typeInputX}
        value={x}
      />
      <ColumnPositionInput
        disabled={disabledY}
        disabledAll={disabledAll}
        e2eValue="y"
        hasAlignment={hasAlignmentVertical}
        isMultiple={isMultiple}
        label="Y"
        onBlur={onBlurY}
        onChange={onChangeY}
        onMouseDown={onMouseDown}
        typeInput={typeInputY}
        value={y}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnPosition;
