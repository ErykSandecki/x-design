import { ReactNode, Ref, RefAttributes, forwardRef } from 'react';

export function fixedForwardRef<T, P>(
  render: (props: P, ref: Ref<T>) => ReactNode,
): (props: P & RefAttributes<T>) => ReactNode {
  return forwardRef(render) as any;
}

export default fixedForwardRef;
