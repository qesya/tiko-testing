import AppButton from '@components/AppButton/AppButton';
import AppFlex from '@components/AppFlex/AppFlex';
import AppText from '@components/AppText/AppText';
import AppTextInput from '@components/AppTextInput/AppTextInput';
import Layout from '@components/Layout/Layout';
import normalize from '@utils/normalize';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

interface ILoginView {
  onPressLogin: () => void;
  onPressRegister: () => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  value: {
    email: string,
    password: string;
  };
  loading?: boolean;
}

const LoginView = ({
  onPressLogin,
  onChangeEmail,
  onChangePassword,
  value,
  loading,
  onPressRegister
}: ILoginView) => {
  return (
    <Layout isScrollable={false} isCenter>
      <AppFlex style={styles.wrapperHeader}>
        <AppText bold style={styles.txtHeader}>Tiki ToDo</AppText>
        <AppText style={styles.txtDesc}>La Lista Perfetta</AppText>
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
      <AppFlex style={styles.wrapperButton}>
        <AppButton
          title="Login"
          onPress={onPressLogin}
          variant="primary"
          loading={loading}
        />
        <AppButton
          title="Register"
          onPress={onPressRegister}
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

export default memo(LoginView);
