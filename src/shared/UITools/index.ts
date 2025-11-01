// components
import AlignmentArea from './AlignmentArea/AlignmentArea';
import ButtonGroup from './ButtonGroup/ButtonGroup';
import ButtonIcon from './ButtonIcon/ButtonIcon';
import Checkbox from './Checkbox/Checkbox';
import Chip from './Chip/Chip';
import Color from './Color/Color';
import ColorPicker from './ColorPicker/ColorPicker';
import FieldGroup from './FieldGroup/FieldGroup';
import GridArea from './GridArea/GridArea';
import Popover, { PopoverCompound } from './Popover/Popover';
import SectionColumn from './SectionColumn/SectionColumn';
import Section from './Section/Section';
import Select from './Select/Select';
import SelectItem from './Select/SelectItem/SelectItem';
import Tabs, { TTabsProps } from './Tabs/Tabs';
import TextField from './TextField/TextField';
import ToggleButtonGroup from './ToggleButtonGroup/ToggleButtonGroup';
import { AlignPopoverHorizontally, AlignPopoverVertically } from './Popover/enums';
import { GridColumnType } from './SectionColumn/enums';
import { TActiveCell } from './GridArea/GridAreaPopover/CellsInput/types';

export const UITools = {
  AlignPopoverHorizontally,
  AlignPopoverVertically,
  AlignmentArea,
  ButtonGroup,
  ButtonIcon,
  Checkbox,
  Chip,
  Color,
  ColorPicker,
  FieldGroup,
  GridArea,
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
  TActiveCell: TActiveCell;
  TTabsProps: TTabsProps;
};
