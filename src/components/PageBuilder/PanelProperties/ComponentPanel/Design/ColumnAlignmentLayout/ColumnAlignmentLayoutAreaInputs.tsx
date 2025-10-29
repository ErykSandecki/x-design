import { FC } from 'react';

// components
import { UITools } from 'shared';

// others
import { PANEL_PROPERTIES_ID } from 'components/PageBuilder/constants';

// types
import { AlignmentLayout } from 'types';
import { TUseBlurGridEvents } from './hooks/useBlurGridEvents';
import { TUseChangeAlignmentLayoutEvent } from './hooks/useChangeAlignmentEvent';
import { TUseChangeGridEvents } from './hooks/useChangeGridEvents';
import { TUseClickCellEvent } from './hooks/useClickCellEvent';

export type TColumnAlignmentLayoutAreaInputsProps = TUseBlurGridEvents &
  TUseChangeGridEvents & {
    alignment: AlignmentLayout;
    columns: string;
    isGrid: boolean;
    onChangeAlignment: TUseChangeAlignmentLayoutEvent;
    onClickCell: TUseClickCellEvent;
    rows: string;
  };

const ColumnAlignmentLayoutAreaInputs: FC<TColumnAlignmentLayoutAreaInputsProps> = ({
  alignment,
  isGrid,
  onChangeAlignment,
  onClickCell,
  ...restProps
}) => (
  <>
    {!isGrid && <UITools.AlignmentArea e2eValue="alignment-flow" onClick={onChangeAlignment} value={alignment} />}
    {isGrid && (
      <UITools.GridArea
        e2eValue="grid-flow"
        idContainer={PANEL_PROPERTIES_ID}
        onClickCell={onClickCell}
        {...restProps}
      />
    )}
  </>
);

export default ColumnAlignmentLayoutAreaInputs;
