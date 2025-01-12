import {useCallback, useState} from 'react';

export const useForm = <T extends object>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState);

  const inputChangeHandler = useCallback(
    (name: keyof T) => (value: string | boolean | number | Array<any>) =>
      setForm(old => ({...old, [name]: value})),
    [],
  );

  const resetForm = useCallback(() => {
    setForm(initialState);
  }, [initialState]);

  return {
    form,
    inputChangeHandler,
    resetForm,
  };
};
