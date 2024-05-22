import * as React from 'react';
import { COLOURS } from '@theme/colours';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface IPlusIcon extends SvgProps {
  width: number;
  height: number;
  fill?: string;
}

const PlusIcon = ({ fill = COLOURS.black, height = 24, width = 24, ...props }: IPlusIcon) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M4 12H20M12 4V20" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default PlusIcon;