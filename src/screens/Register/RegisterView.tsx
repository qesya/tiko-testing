import AppButton from '@components/AppButton/AppButton';
import AppFlex from '@components/AppFlex/AppFlex';
import AppText from '@components/AppText/AppText';
import AppTextInput from '@components/AppTextInput/AppTextInput';
import Layout from '@components/Layout/Layout';
import normalize from '@utils/normalize';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { IRegisterForm } from './RegisterScreen';

interface IRegisterView {
  onPressRegister: () => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onChangeConfirmPassword: (value: string) => void;
  onChangeFirstName: (value: string) => void;
  onChangeLastName: (value: string) => void;
  value: IRegisterForm;
  loading?: boolean;
  onPressBack: () => void;
}

const RegisterView = ({
  onChangeEmail,
  onChangePassword,
  onChangeConfirmPassword,
  onChangeFirstName,
  onChangeLastName,
  value,
  loading,
  onPressRegister,
  onPressBack
}: IRegisterView) => {
  return (
    <Layout isScrollable={false} isCenter>
      <AppFlex style={styles.wrapperHeader}>
        <AppText bold style={styles.txtHeader}>Register</AppText>
        <AppText style={styles.txtDesc}>Be Part of Something</AppText>
      </AppFlex>
      <AppTextInput
        onChange={onChangeEmail}
        value={value.email}
        placeholder="Email"
        style={styles.clear}
      />
      <AppTextInput
        onChange={onChangePassword}
        value={value.password}
        placeholder="Password"
        secureTextEntry
        style={styles.clear}
      />
      <AppTextInput
        onChange={onChangeConfirmPassword}
        value={value.password2}
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.clear}
      />
      <AppTextInput
        onChange={onChangeFirstName}
        value={value.first_name}
        placeholder="First Name"
        style={styles.clear}
      />
      <AppTextInput
        onChange={onChangeLastName}
        value={value.last_name}
        placeholder="Last Name"
        style={styles.clear}
      />
      <AppFlex style={styles.wrapperButton}>
        <AppButton
          title="Register"
          onPress={onPressRegister}
          variant="primary"
          loading={loading}
        />
        <AppButton
          title="Back"
          onPress={onPressBack}
          variant="transparent"
          textColor="primary"
        />
      </AppFlex>
    </Layout>
  );
};

const styles = StyleSheet.create({
  clear: {
    marginTop: normalize(16, 'height'),
  },
  wrapperHeader: {
    gap: 6,
    marginBottom: normalize(18, 'height')
  },
  wrapperButton: {
    marginTop: normalize(38, 'height')
  },
  txtHeader: {
    fontSize: normalize(30)
  },
  txtDesc: {
    fontSize: normalize(20)
  }
});

export default memo(RegisterView);
