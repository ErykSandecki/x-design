// types
import { BlockType, PortType, T2DCoordinates, TBlock, TConnector } from 'types';

export type TDraggableConnectorSource = {
  blockId: string;
  blockType: BlockType;
  portType: PortType;
};

export type TDraggableConnectorTarget = {
  blockId: string;
  blockType: BlockType;
  portType: PortType;
};

export type TDraggableConnector = {
  showIndicator: boolean;
  source?: TDraggableConnectorSource;
  sourceCoordinates: T2DCoordinates;
  target?: TDraggableConnectorTarget;
  targetCoordinates: T2DCoordinates;
};

export type TPossiblePort = T2DCoordinates & {
  blockId: string;
  blockType: BlockType;
  height: number;
  portType: PortType;
  width: number;
};

export type TShadowConnector = Pick<
  TConnector,
  'joinOperator' | 'relatedWithBlockId' | 'towardsTo'
> & {
  sourceBlock: Partial<TBlock> & { portType: PortType };
  targetBlock: Partial<TBlock> & { portType: PortType };
};
