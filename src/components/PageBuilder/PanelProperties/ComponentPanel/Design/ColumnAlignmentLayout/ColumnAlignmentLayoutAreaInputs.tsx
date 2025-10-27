import { FC } from 'react';

// components
import { UITools } from 'shared';

// others
import { PANEL_PROPERTIES_ID } from 'components/PageBuilder/constants';

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
}) => (
  <>
    {!isGrid && <UITools.AlignmentArea e2eValue="alignment-flow" onClick={onChangeAlignment} value={alignment} />}
    {isGrid && (
      <UITools.GridArea columns={columns} e2eValue="grid-flow" idContainer={PANEL_PROPERTIES_ID} rows={rows} />
    )}
  </>
);

export default ColumnAlignmentLayoutAreaInputs;
