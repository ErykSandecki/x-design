import { FC } from 'react';

// components
import Typography from '../../Typography';

// types
import { TOmittedTypographyProps } from '../../types';
import { TypographyFontType } from '../../enums';

const H5: FC<TOmittedTypographyProps> = ({ children, ...restProps }) => (
  <Typography fontType={TypographyFontType.h5} {...restProps}>
    {children}
  </Typography>
);

export default H5;
