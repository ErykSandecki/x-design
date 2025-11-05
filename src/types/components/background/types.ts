import { ColorFormatType } from 'antd/es/color-picker/interface';

// types
import { TValueMode } from '../generic';

export type TColor = { alpha: string; color: string; format: ColorFormatType; mode: TValueMode['mode'] };

export type TColorGradient = Array<TColor & { direction: 'linear' }>;
