import { FC } from 'react';

// components
import { UITools } from 'shared';

// types
import { AlignmentLayout } from 'types';
import { TUseChangeAlignmentLayoutEvent } from './hooks/useChangeAlignmentEvent';

export type TColumnAlignmentLayoutAreaInputsProps = {
  alignment: AlignmentLayout;
  columns: string;
  isGrid: boolean;
  onChangeAlignment: TUseChangeAlignmentLayoutEvent;
  rows: string;
};

const ColumnAlignmentLayoutAreaInputs: FC<TColumnAlignmentLayoutAreaInputsProps> = ({
  alignment,
  columns,
  isGrid,
  onChangeAlignment,
  rows,
}) => {
  const targetColumns = parseInt(columns) || 0;
  const targetRows = parseInt(rows) || 0;

  return (
    <>
      {!isGrid && <UITools.AlignmentArea e2eValue="alignment-flow" onClick={onChangeAlignment} value={alignment} />}
      {isGrid && <UITools.GridArea columns={targetColumns} e2eValue="grid-flow" rows={targetRows} />}
    </>
  );
};

export default ColumnAlignmentLayoutAreaInputs;
