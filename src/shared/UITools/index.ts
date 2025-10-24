// components
import AlignmentArea from './AlignmentArea/AlignmentArea';
import ButtonGroup from './ButtonGroup/ButtonGroup';
import ButtonIcon from './ButtonIcon/ButtonIcon';
import Chip from './Chip/Chip';
import Color from './Color/Color';
import ColorPicker from './ColorPicker/ColorPicker';
import FieldGroup from './FieldGroup/FieldGroup';
import Popover, { PopoverCompound } from './Popover/Popover';
import SectionColumn from './SectionColumn/SectionColumn';
import { GridColumnType } from './SectionColumn/enums';
import Section from './Section/Section';
import Select from './Select/Select';
import SelectItem from './Select/SelectItem/SelectItem';
import Tabs, { TTabsProps } from './Tabs/Tabs';
import TextField from './TextField/TextField';
import ToggleButtonGroup from './ToggleButtonGroup/ToggleButtonGroup';

export const UITools = {
  AlignmentArea,
  ButtonGroup,
  ButtonIcon,
  Chip,
  Color,
  ColorPicker,
  FieldGroup,
  GridColumnType,
  Popover,
  PopoverCompound,
  Section,
  SectionColumn,
  Select,
  SelectItem,
  Tabs,
  TextField,
  ToggleButtonGroup,
};

export type TUITypes = {
  TTabsProps: TTabsProps;
};
