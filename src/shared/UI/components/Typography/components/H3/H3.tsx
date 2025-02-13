import { FC } from 'react';

// components
import Typography from '../../Typography';

// types
import { TOmittedTypographyProps } from '../../types';
import { TypographyFontType } from '../../enums';

const H3: FC<TOmittedTypographyProps> = ({ children, ...restProps }) => (
  <Typography fontType={TypographyFontType.h3} {...restProps}>
    {children}
  </Typography>
);

export default H3;
