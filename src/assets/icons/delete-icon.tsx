import * as React from 'react';
import { COLOURS } from '@theme/colours';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface IDeleteIcon extends SvgProps {
  width: number;
  height: number;
  fill?: string;
}

const DeleteIcon = ({ fill = COLOURS.black, height = 24, width = 24, ...props }: IDeleteIcon) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M4 7H20" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default DeleteIcon;
