export const seperateValue = (
  separator: string,
  step: number,
  value: number | string,
): string => {
  const [value1, value2] = value.toString().split('.');

  return `${value1.replace(
    new RegExp(`\\B(?=(\\d{${step}})+(?!\\d))`, 'g'),
    separator,
  )}${value2 ? `.${value2}` : ''}`;
};
