import React, { memo } from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  TouchableHighlight,
  ActivityIndicator,
  StyleProp,
} from 'react-native';
import { COLOURS } from '@theme/colours';
import normalize from '@utils/normalize';
import AppText from '@components/AppText/AppText';

interface IAppButton {
  title: string | JSX.Element;
  onPress: () => void;
  textStyle?: TextStyle;
  textColor?: keyof typeof COLOURS;
  style?: StyleProp<ViewStyle>;
  variant?: 'transparent' | 'outline' | 'primary' | 'secondary' | 'underline';
  isRounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  borderRadius?: number;
}

export const getColorButton = (variant: string): StyleProp<ViewStyle> => {
  switch (variant) {
    case 'transparent':
      return { backgroundColor: COLOURS.transparent };
    case 'outline':
      return { backgroundColor: COLOURS.gray100 };
    default:
      return { backgroundColor: COLOURS.primary };
  }
};

export const getVariant = (variant: string): StyleProp<ViewStyle> => {
  switch (variant) {
    case 'transparent':
      return {
        padding: 100,
      };
    case 'outline':
      return {
        paddingVertical: normalize(14, 'height'),
        borderWidth: 1,
        borderColor: COLOURS.gray100,
        paddingHorizontal: normalize(16),
      };
    case 'primary':
      return {
        backgroundColor: COLOURS.primary,
        borderWidth: 1,
        borderColor: COLOURS.primary,
        borderRadius: normalize(8),
        alignItems: 'center',
      };
    case 'secondary':
      return {
        backgroundColor: COLOURS.red,
        borderWidth: 1,
        borderColor: COLOURS.red,
        borderRadius: normalize(8),
        alignItems: 'center',
      };
    default:
      return { backgroundColor: COLOURS.gray100 };
  }
};

const AppButton: React.FC<IAppButton> = memo(
  ({
    style,
    onPress,
    title,
    textStyle,
    variant = 'primary',
    disabled,
    textColor = 'white',
    loading = false,
  }) => {
    const selector = `${textColor}` as keyof typeof COLOURS;
    return variant !== 'underline' ? (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        disabled={disabled || loading}>
        <View
          style={[
            styles.itemWrapper,
            getColorButton(variant),
            getVariant(variant),
            style,
          ]}>
          {loading ? (
            <ActivityIndicator size="small" color={variant !== "transparent" ? COLOURS.white : COLOURS.primary} />
          ) : typeof title === 'string' ? (
            <AppText bold style={[styles.itemLabel, textStyle]} colour={textColor}>
              {title}
            </AppText>
          ) : (
            title
          )}
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableHighlight onPress={onPress} style={[style]} disabled={disabled}>
        <AppText
          colour={textColor}
          underline
          style={{ textDecorationColor: COLOURS[selector] }}>
          {title}
        </AppText>
      </TouchableHighlight>
    );
  },
);

const styles = StyleSheet.create({
  itemWrapper: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: normalize(18, 'height'),
  },
  itemLabel: {
    fontSize: normalize(16),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AppButton;
