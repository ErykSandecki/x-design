declare module '*.scss';

declare module '*.svg' {
  import { TSvgComponent } from 'types';

  export const ReactComponent: TSvgComponent;

  const src: string;
  export default src;
}
