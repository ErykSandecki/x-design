import { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { ScrubbableInput, UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { KeyboardKeys } from 'types';
import { TUseBlurEvent } from './hooks/useBlurEvent';
import { TUseChangeEvent } from './hooks/useChangeEvent';
import { TUseMouseDownEvent } from './hooks/useMouseDownEvent';

// utils
import { handleSubmitInput } from 'utils';

export type TColumnRotationInputProps = {
  angle: string;
  isMixedAngle: boolean;
  onBlur: TUseBlurEvent;
  onChange: TUseChangeEvent;
  onMouseDown: TUseMouseDownEvent;
};

const ColumnRotationInput: FC<TColumnRotationInputProps> = ({ angle, isMixedAngle, onBlur, onChange, onMouseDown }) => {
  const dispatch = useDispatch();
  const refInputAngle = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  return (
    <UITools.TextField
      e2eValue="angle"
      fullWidth
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
      onClick={() => refInputAngle.current.select()}
      onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, refInputAngle.current)(event)}
      ref={refInputAngle}
      startAdornment={
        <ScrubbableInput
          e2eValue="angle"
          icon="Protractor"
          iconHeight={8}
          iconWidth={8}
          loop
          max={180}
          min={-180}
          onChange={(value) => onChange(value.toString(), true)}
          onMouseDown={onMouseDown}
          onMouseUp={() => dispatch(updateEventsStatus({ isRotating: false }))}
          value={isMixedAngle ? 0 : parseFloat(angle)}
        />
      }
      tooltip={{ content: t(`${TOOLTIP_TRANSLATION_KEY}.rotation`) }}
      type="text"
      value={angle}
    />
  );
};

export default ColumnRotationInput;
