import { ColorFormatType } from 'antd/es/color-picker/interface';

export type TColor = { alpha: string; color: string; format: ColorFormatType };

export type TColorGradient = Array<TColor & { direction: 'linear' }>;
