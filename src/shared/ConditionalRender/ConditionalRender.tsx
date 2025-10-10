import { Activity, FC, ReactElement } from 'react';

export type TConditionalRenderProps = {
  component: ReactElement;
  visible: boolean;
};

export const ConditionalRender: FC<TConditionalRenderProps> = ({ component, visible }) => (
  <Activity mode={visible ? 'visible' : 'hidden'}>{component}</Activity>
);

export default ConditionalRender;
