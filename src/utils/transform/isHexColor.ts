export const isHexColor = (hex: string): boolean => hex.length === 6 && /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
