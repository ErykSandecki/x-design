import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import ColumnAlignmentLayoutButtonIcons from './ColumnAlignmentLayoutButtonIcons';
import ColumnAlignmentLayoutGapInput from './ColumnAlignmentLayoutGapInput';
import { UITools } from 'shared';

// hooks
import { useColumnAlignmentLayoutEvents } from './hooks/useColumnAlignmentLayoutEvents';

// others
import { translationNameSpace } from './constants';
import ColumnAlignmentLayoutAreaInputs from './ColumnAlignmentLayoutAreaInputs';

export type TColumnAlignmentLayoutProps = {
  width: number;
};

const ColumnAlignmentLayout: FC<TColumnAlignmentLayoutProps> = ({ width }) => {
  const { t } = useTranslation();

  const {
    alignment,
    columnGap,
    columns,
    isFreeForm,
    isGrid,
    isMixedBoxSizing,
    isMixedColumnGap,
    isMixedColumnRow,
    isMixedLayout,
    layout,
    onBlurColumnGap,
    onBlurColumns,
    onBlurRowGap,
    onBlurRows,
    onChangeAlignment,
    onChangeColumnGap,
    onChangeColumns,
    onChangeRowGap,
    onChangeRows,
    rowGap,
    rows,
    showColumnGap,
    showRowGap,
  } = useColumnAlignmentLayoutEvents();

  if (isMixedLayout || isFreeForm) {
    return null;
  }

  return (
    <UITools.SectionColumn
      buttonsIcon={ColumnAlignmentLayoutButtonIcons(isMixedBoxSizing, layout, t, width)}
      gridColumnType={UITools.GridColumnType.oneByTwo}
      labels={[
        t(`${translationNameSpace}.label.${isGrid ? 'grid' : 'alignment'}`),
        t(`${translationNameSpace}.label.gap`),
      ]}
      withMargin
    >
      <ColumnAlignmentLayoutAreaInputs
        alignment={alignment}
        columns={columns}
        isGrid={isGrid}
        onBlurColumns={onBlurColumns}
        onBlurRows={onBlurRows}
        onChangeAlignment={onChangeAlignment}
        onChangeColumns={onChangeColumns}
        onChangeRows={onChangeRows}
        rows={rows}
      />
      <ColumnAlignmentLayoutGapInput
        gap="column"
        gapProperties={layout.gap.column}
        isMixed={isMixedColumnGap}
        onBlur={onBlurColumnGap}
        onChange={onChangeColumnGap}
        showGap={showColumnGap}
        value={columnGap}
      />
      <ColumnAlignmentLayoutGapInput
        gap="row"
        gapProperties={layout.gap.row}
        isMixed={isMixedColumnRow}
        onBlur={onBlurRowGap}
        onChange={onChangeRowGap}
        showGap={showRowGap}
        value={rowGap}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnAlignmentLayout;
