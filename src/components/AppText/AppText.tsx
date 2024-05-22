import React, {memo} from 'react';
import {Text, StyleSheet, StyleProp, TextStyle, TextProps} from 'react-native';
import {COLOURS} from '@theme/colours';
import normalize from '@utils/normalize';

const styles = StyleSheet.create({
  text: {
    fontSize: normalize(14),
    color: COLOURS.black,
    fontFamily: 'CeraPro-Regular',
  },
  semiBold: {
    fontFamily: 'CeraPro-Bold',
  },
  bold: {
    fontWeight: 'bold',
    fontFamily: 'CeraPro-Bold',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  underline: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    borderBottomWidth: 1,
    textDecorationColor: COLOURS.white,
  },
  italic: {
    fontStyle: 'italic',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  small: {
    fontSize: normalize(12),
  },
  large: {
    fontSize: normalize(16),
  },
  header: {
    fontSize: normalize(18),
    color: COLOURS.black,
  },
  label: {
    color: COLOURS.black,
  },
  highlight: {
    color: COLOURS.black,
  },
});

interface Props extends TextProps {
  bold?: boolean;
  style?: StyleProp<TextStyle>;
  strikethrough?: boolean;
  underline?: boolean;
  uppercase?: boolean;
  small?: boolean;
  large?: boolean;
  semiBold?: boolean;
  highlight?: boolean;
  italic?: boolean;
  customHighlightColor?: string;
  type?: 'header' | 'label';
  colour?: keyof typeof COLOURS;
  children?: React.ReactNode;
  isRTL?: boolean;
}

const AppText: React.FC<Props> = memo(props => {
  const {
    children,
    bold,
    strikethrough,
    italic,
    underline,
    uppercase,
    style,
    small,
    large,
    semiBold,
    type,
    highlight,
    colour,
    customHighlightColor,
    ...others
  } = props;

  const selector = `${colour}` as keyof typeof COLOURS;
  return (
    <Text
      style={StyleSheet.flatten([
        {...styles.text, color: colour ? COLOURS[selector] : styles.text.color},
        strikethrough ? styles.strikethrough : null,
        underline ? styles.underline : null,
        uppercase ? styles.uppercase : null,
        semiBold ? styles.semiBold : null,
        italic ? styles.italic : null,
        bold ? styles.bold : null,
        small ? styles.small : null,
        large ? styles.large : null,
        type === 'header' ? styles.header : null,
        type === 'label' ? styles.label : null,
        highlight
          ? customHighlightColor
            ? {color: customHighlightColor}
            : styles.highlight
          : null,
        style,
      ])}
      {...others}>
      {children}
    </Text>
  );
});

export default AppText;
