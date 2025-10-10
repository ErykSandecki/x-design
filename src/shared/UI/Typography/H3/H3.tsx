import { FC } from 'react';

// components
import Typography from '../Typography';

// types
import { TOmittedTypographyProps } from '../types';
import { TypographyVariant } from '../enums';

const H3: FC<TOmittedTypographyProps> = ({ children, ...restProps }) => (
  <Typography variant={TypographyVariant.h3} {...restProps}>
    {children}
  </Typography>
);

export default H3;
