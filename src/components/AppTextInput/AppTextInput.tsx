import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { COLOURS } from '@theme/colours';
import normalize from '@utils/normalize';
import React, { memo, useCallback } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface IAppTextInput extends TextInputProps {
  value?: string;
  onChange: (value: any) => void;
  type?: 'text' | 'number';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  componentStyle?: ViewStyle;
  inputStyle?: string;
  multiLineHeight?: number;
  inputInlineStyle?: StyleProp<TextStyle>;
  isCenter?: boolean;
  isTransparentTextBox?: boolean;
  isOnBottomSheet?: boolean;
}

const AppTextInput: React.FC<IAppTextInput> = memo(
  ({
    type = 'text',
    value,
    onChange,
    disabled,
    style,
    componentStyle,
    multiLineHeight,
    isCenter = false,
    isTransparentTextBox,
    isOnBottomSheet = false,
    ...props
  }) => {
    const changeHandler = useCallback(
      (val: string) => {
        if (type === 'number') {
          return onChange(parseInt(val, 10));
        }
        return onChange(val);
      },
      [onChange, type],
    );

    return (
      <View style={[styles.containerClass, style]}>
        <View
          style={[
            styles.componentStyle,
            {
              backgroundColor: isTransparentTextBox
                ? COLOURS.transparent
                : COLOURS.white,
            },
            {
              borderColor: isTransparentTextBox
                ? COLOURS.gray200
                : COLOURS.gray200,
            },
            { height: props.multiline ? multiLineHeight ?? normalize(350, 'height') : normalize(48, 'height') },
            componentStyle,
          ]}>
          {
            isOnBottomSheet ?
              <BottomSheetTextInput
                style={[
                  styles.textInput,
                  props.multiline && styles.multiLine,
                  { color: isTransparentTextBox ? COLOURS.white : COLOURS.black },
                  { textAlign: isCenter ? 'center' : 'left' },
                ]}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                placeholderTextColor={
                  isTransparentTextBox ? COLOURS.white : COLOURS.gray100
                }
                editable={!disabled}
                value={type === 'number' ? value?.toString() : value}
                onChangeText={changeHandler}
                {...props}
              />
              :
              <TextInput
                style={[
                  styles.textInput,
                  props.multiline && styles.multiLine,
                  { color: isTransparentTextBox ? COLOURS.white : COLOURS.black },
                  { textAlign: isCenter ? 'center' : 'left' },
                ]}
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                placeholderTextColor={
                  isTransparentTextBox ? COLOURS.white : COLOURS.gray100
                }
                editable={!disabled}
                value={type === 'number' ? value?.toString() : value}
                onChangeText={changeHandler}
                {...props}
              />
          }
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  containerClass: {
    width: '100%',
  },
  componentStyle: {
    borderRadius: 8,
    borderWidth: 1,
  },
  textInput: {
    height: '100%',
    fontSize: normalize(16),
    paddingHorizontal: normalize(16),
    fontFamily: 'CeraPro-Regular',
    flex: 1,
    verticalAlign: 'top',
  },
  multiLine: {
    paddingTop: 20,
    textAlignVertical: 'top',
  },
});

export default AppTextInput;
