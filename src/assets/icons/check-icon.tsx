import * as React from 'react';
import { COLOURS } from '@theme/colours';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface ICheckIcon extends SvgProps {
  width: number;
  height: number;
  fill?: string;
}

const CheckIcon = ({ fill = COLOURS.black, height = 24, width = 24, ...props }: ICheckIcon) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M4 12.6111L8.92308 17.5L20 6.5" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default CheckIcon;
