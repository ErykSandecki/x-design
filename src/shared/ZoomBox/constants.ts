export const BASE_2D: T2DCoordinates = { x: 0, y: 0 };
export const BASE_3D: T3DCoordinates = { x: 0, y: 0, z: 1 };
export const BASE_RECT: TRectCoordinates = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
};
export const ZOOM_CONTENT_ID = 'zoomContentId';

export const ZOOM_BOX_MODIFICATORS: Record<string, string> = {
  colorSampler: 'ZoomBox--color-sampler',
  comment: 'ZoomBox--comment',
  default: 'ZoomBox--default',
  idle: 'ZoomBox--idle',
  lmb: 'ZoomBox--lmb',
  mmb: 'ZoomBox--mmb',
  move: 'ZoomBox--move',
  pressing: 'ZoomBox--pressing',
  rmb: 'ZoomBox--rmb',
  toolBeltA: 'ZoomBox--toolBeltA',
  unknown: 'ZoomBox--unknown',
};
