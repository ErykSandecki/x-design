import { FC } from 'react';
import { kebabCase } from 'lodash';
import { useTranslation } from 'react-i18next';

// components
import Icon, { TIconProps } from '../../../../UI/Icon/Icon';
import TextField from '../../../TextField/TextField';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

export type TGridInputsProps = {
  name: TIconProps['name'];
  value: string;
};

export const GridInputCells: FC<TGridInputsProps> = ({ name, value }) => {
  const { t } = useTranslation();
  const targetName = kebabCase(name);

  return (
    <TextField
      e2eValue={targetName}
      tooltip={{ content: t(`${TOOLTIP_TRANSLATION_KEY}.grid.${targetName}`) }}
      startAdornment={<Icon name={name} />}
      value={value}
    />
  );
};

export default GridInputCells;
