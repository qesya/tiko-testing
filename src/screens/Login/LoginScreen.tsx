import React, { memo, useCallback } from 'react';
import { ScreenProps } from '@navigation/screen';
import LoginView from './LoginView';
import { useLoginMutationAPI } from '@hooks/mutations/useLoginMutationAPI';
import { useForm } from '@hooks/useForm';

interface ILoginForm {
  email: string;
  password: string;
}

const LoginScreen: ScreenProps<'Login'> = ({ navigation }) => {
  const { onLoginMutation } = useLoginMutationAPI();

  const { form, inputChangeHandler, resetForm } = useForm<ILoginForm>({
    email: '',
    password: '',
  });

  const onChangeField = useCallback(
    (field: keyof ILoginForm, value: string) => {
      inputChangeHandler(field)(value);
    },
    [inputChangeHandler],
  );

  const onLoginAction = useCallback(() => {
    onLoginMutation.mutate({
      email: form.email, //user1234@example.com
      password: form.password, //qwerpoi123___
    })
  }, [form]);

  const onRegisterAction = useCallback(() => {
    navigation.navigate('Register')
  }, [navigation]);


  return (
    <LoginView
      onPressLogin={onLoginAction}
      onChangeEmail={(email) => onChangeField('email', email)}
      onChangePassword={(password) => onChangeField('password', password)}
      value={form}
      loading={onLoginMutation.isPending}
      onPressRegister={onRegisterAction}
    />
  );
};

export default memo(LoginScreen);
