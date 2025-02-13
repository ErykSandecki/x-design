import { FC } from 'react';

// components
import Typography from '../../Typography';

// types
import { TOmittedTypographyProps } from '../../types';
import { TypographyFontType } from '../../enums';

const P: FC<TOmittedTypographyProps> = ({ children, ...restProps }) => (
  <Typography fontType={TypographyFontType.p} {...restProps}>
    {children}
  </Typography>
);

export default P;
