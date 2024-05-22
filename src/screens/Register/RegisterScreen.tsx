import React, { memo, useCallback } from 'react';
import { ScreenProps } from '@navigation/screen';
import RegisterView from './RegisterView';
import { useForm } from '@hooks/useForm';
import { useRegisterMutationAPI } from '@hooks/mutations/useRegisterMutationAPI';

export interface IRegisterForm {
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}

const RegisterScreen: ScreenProps<'Register'> = ({ navigation }) => {
  const { onRegisterMutationAPI } = useRegisterMutationAPI();

  const { form, inputChangeHandler, resetForm } = useForm<IRegisterForm>({
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
  });

  const onChangeField = useCallback(
    (field: keyof IRegisterForm, value: string) => {
      inputChangeHandler(field)(value);
    },
    [inputChangeHandler],
  );

  const onRegisterAction = useCallback(() => {
    onRegisterMutationAPI.mutate({
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      password: form.password,
      password2: form.password2,
    })
  }, [form]);

  const onPressback = useCallback(() => {
    navigation.navigate('Login')
  }, [navigation]);

  return (
    <RegisterView
      value={form}
      onChangeEmail={(email) => onChangeField('email', email)}
      onPressRegister={onRegisterAction}
      onChangePassword={(pw) => onChangeField('password', pw)}
      onChangeConfirmPassword={(pw2) => onChangeField('password2', pw2)}
      onChangeFirstName={(firstName) => onChangeField('first_name', firstName)}
      onChangeLastName={(lastName) => onChangeField('last_name', lastName)}
      loading={onRegisterMutationAPI.isPending}
      onPressBack={onPressback}
    />
  );
};

export default memo(RegisterScreen);
