import { Activity, FC, JSX } from 'react';

export type TConditionalRenderProps = {
  component: () => JSX.Element;
  visible: boolean;
};

export const ConditionalRender: FC<TConditionalRenderProps> = ({ component: Component, visible }) => (
  <Activity mode={visible ? 'visible' : 'hidden'}>
    <Component />
  </Activity>
);

export default ConditionalRender;
