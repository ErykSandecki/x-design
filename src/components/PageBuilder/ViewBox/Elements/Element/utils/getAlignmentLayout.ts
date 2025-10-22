import { CSSProperties } from 'react';

// types
import { AlignmentLayout } from 'types';

export const getAlignmentLayout = (alignment: AlignmentLayout): CSSProperties => {
  switch (alignment) {
    case AlignmentLayout.bottomCenter:
      return {
        alignItems: 'flex-end',
        justifyContent: 'center',
      };
    case AlignmentLayout.bottomLeft:
      return {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
      };
    case AlignmentLayout.bottomRight:
      return {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      };
    case AlignmentLayout.center:
      return {
        alignItems: 'center',
        justifyContent: 'center',
      };
    case AlignmentLayout.left:
      return {
        alignItems: 'center',
        justifyContent: 'flex-start',
      };
    case AlignmentLayout.right:
      return {
        alignItems: 'center',
        justifyContent: 'flex-end',
      };
    case AlignmentLayout.topCenter:
      return {
        alignItems: 'flex-start',
        justifyContent: 'center',
      };
    case AlignmentLayout.topLeft:
      return {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      };
    default:
      return {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
      };
  }
};
