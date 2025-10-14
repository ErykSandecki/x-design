/* istanbul ignore file */
export const getOriginElementBounding = (element: HTMLElement, z: T3DCoordinates['z']): THTMLElementBounding => {
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);
  const transform = style.transform;
  const matrix = new DOMMatrix(transform);
  const [originX, originY] = style.transformOrigin.split(' ').map((v) => parseFloat(v));
  const w = element.offsetWidth;
  const h = element.offsetHeight;
  const cx = rect.left / z + rect.width / z / 2;
  const cy = rect.top / z + rect.height / z / 2;
  const { a, b, c, d } = matrix;
  const angle = Math.atan2(b, a);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const scaleX = Math.hypot(a, b);
  const scaleY = Math.hypot(c, d);
  const ox = (originX || 0) - w / 2;
  const oy = (originY || 0) - h / 2;
  const dx = (ox * cos - oy * sin - ox) * scaleX;
  const dy = (ox * sin + oy * cos - oy) * scaleY;
  const left = cx - (w * scaleX) / 2 - dx;
  const top = cy - (h * scaleY) / 2 - dy;
  const width = w * scaleX;
  const height = h * scaleY;

  return { height, left, top, width };
};
