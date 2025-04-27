import { FC, useRef } from 'react';
import { first } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { ScrubbableInput, Small, UITools } from 'shared';

// others
import { MAX, MIN, translationNameSpace } from './constants';

// hooks
import { usePositionEvents } from './hooks/usePositionEvents';

// store
import {
  elementAllDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { ColorsTheme, KeyboardKeys } from 'types';

// utils
import { handleSubmitInput } from 'utils';

const ColumnPosition: FC = () => {
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementAllDataSelectorCreator(firstElement.id));
  const refInputX = useRef(null);
  const refInputY = useRef(null);
  const { t } = useTranslation();
  const { onBlurX, onBlurY, onChangeX, onChangeY, x, y } =
    usePositionEvents(element);

  return (
    <UITools.SectionColumn labels={[t(`${translationNameSpace}.label`)]}>
      <UITools.TextField
        onBlur={onBlurX}
        onChange={(event) => onChangeX(event.target.value)}
        onKeyDown={(event) =>
          handleSubmitInput(KeyboardKeys.enter, refInputX.current)(event)
        }
        ref={refInputX}
        startAdornment={
          <ScrubbableInput
            max={MAX}
            min={MIN}
            onChange={(value) => onChangeX(value.toString(), true)}
            value={parseFloat(x)}
          >
            <Small color={ColorsTheme.neutral2}>X</Small>
          </ScrubbableInput>
        }
        type="number"
        value={x}
      />
      <UITools.TextField
        onBlur={onBlurY}
        onChange={(event) => onChangeY(event.target.value)}
        onKeyDown={(event) =>
          handleSubmitInput(KeyboardKeys.enter, refInputY.current)(event)
        }
        ref={refInputY}
        startAdornment={
          <ScrubbableInput
            max={MAX}
            min={MIN}
            onChange={(value) => onChangeY(value.toString(), true)}
            value={parseFloat(y)}
          >
            <Small color={ColorsTheme.neutral2}>Y</Small>
          </ScrubbableInput>
        }
        type="number"
        value={y}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnPosition;
