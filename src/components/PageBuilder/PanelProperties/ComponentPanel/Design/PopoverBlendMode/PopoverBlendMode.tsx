import { camelCase } from 'lodash';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// tohers
import { BLEND_MODES_STRUCTURE } from 'constant/blendModeStructure';
import { COMMON_TRANSLATION_KEY } from 'constant/constants';

// store
import { changeProperties } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

const { PopoverCompound } = UITools;

export type TPopoverBlendModeProps = {
  isMixed: boolean;
  mixdBlendMode: TElement['mixBlendMode'];
};

const PopoverBlendMode: FC<TPopoverBlendModeProps> = ({ isMixed, mixdBlendMode }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      {BLEND_MODES_STRUCTURE.map(({ blendMode, component }) =>
        component === 'item' ? (
          <PopoverCompound.PopoverItem
            index={blendMode}
            key={blendMode}
            onClick={() => dispatch(changeProperties({ mixBlendMode: blendMode }))}
            selected={!isMixed && mixdBlendMode === blendMode}
            text={t(`${COMMON_TRANSLATION_KEY}.${camelCase(blendMode)}`)}
          />
        ) : (
          <PopoverCompound.PopoverSeparator key={blendMode} />
        ),
      )}
    </>
  );
};

export default PopoverBlendMode;
