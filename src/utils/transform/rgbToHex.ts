export const colorToHex = (color: number): string => {
  const hex = color.toString(16);

  return hex.length === 1 ? '0' + hex : hex;
};

export const rgbToHex = (r: number, g: number, b: number): string =>
  '#' + colorToHex(r) + colorToHex(g) + colorToHex(b);
