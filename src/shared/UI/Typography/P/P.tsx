import { FC } from 'react';

// components
import Typography from '../Typography';

// types
import { TOmittedTypographyProps } from '../types';
import { TypographyVariant } from '../enums';

const P: FC<TOmittedTypographyProps> = ({ children, ...restProps }) => (
  <Typography variant={TypographyVariant.p} {...restProps}>
    {children}
  </Typography>
);

export default P;
