export const getZoomSpeed = (lastTouchpadTime: number): number => {
  const isTouchPad = Date.now() - lastTouchpadTime < 50;
  return isTouchPad ? 0.02 : 0.1;
};

export const limitZoom = (z: number): number => Math.min(Math.max(0.1, z), 3);
