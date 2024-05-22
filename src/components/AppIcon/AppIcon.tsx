import React from 'react';
import CheckIcon from '@assets/icons/check-icon';
import PlusIcon from '@assets/icons/plus-icon';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import DeleteIcon from '@assets/icons/delete-icon';

export type IIconProps = {
  width?: number;
  height?: number;
  fill?: string;
  darkModeResponsive?: boolean;
};

export type StreamEatsIconProps = IIconProps & {
  bgCircleIcon?: string;
  isActive?: boolean;
  icon:
  | 'plus-icon'
  | 'check-icon'
  | 'delete-icon';
  style?: StyleProp<ViewStyle | ImageStyle>;
};

const AppIcon: React.FC<StreamEatsIconProps> = ({
  height = 24,
  width = 24,
  fill,
  icon,
  isActive,
  style,
}) => {
  switch (icon) {
    case 'check-icon':
      return <CheckIcon width={width} height={height} fill={fill} style={style} />;
    case 'plus-icon':
      return <PlusIcon width={width} height={height} fill={fill} style={style} />;
    case 'delete-icon':
      return <DeleteIcon width={width} height={height} fill={fill} style={style} />
    default:
      return null;
  }
};

export default AppIcon;
