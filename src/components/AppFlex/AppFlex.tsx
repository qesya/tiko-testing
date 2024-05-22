import React, {ReactNode, ReactElement, Ref} from 'react';
import {
  ViewStyle,
  FlexAlignType,
  StyleSheet,
  View,
  ViewProps,
  StyleProp,
  DimensionValue,
} from 'react-native';

interface FlexProps extends ViewProps {
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  alignItems?: FlexAlignType;
  alignSelf?: 'auto' | FlexAlignType;
  flex?: number;
  flexBasis?: DimensionValue;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

export interface FlexComponentProps extends FlexProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const AppFlex = React.forwardRef<View, FlexComponentProps>(
  (props: FlexComponentProps, ref?: Ref<View>): ReactElement => {
    const {children, style: overrideStyle, ...others} = props;
    const {style: baseStyle} = getStyle(props);
    const style = {...baseStyle};
    return (
      <View ref={ref} style={[style, overrideStyle]} {...others}>
        {children}
      </View>
    );
  },
);

const getStyle = (props: FlexComponentProps) =>
  StyleSheet.create({
    style: {
      alignContent: props.alignContent,
      alignItems: props.alignItems,
      alignSelf: props.alignSelf,
      flex: props.flex,
      flexBasis: props.flexBasis,
      flexDirection: props.flexDirection,
      flexGrow: props.flexGrow,
      flexShrink: props.flexShrink,
      flexWrap: props.flexWrap,
      justifyContent: props.justifyContent,
    },
  });

export default AppFlex;
