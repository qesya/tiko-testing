import React, { memo, useCallback, useEffect } from 'react';
import { ScreenProps } from '@navigation/screen';
import ToDoView from './ToDoView';
import { useForm } from '@hooks/useForm';
import { useCreateToDoMutationAPI } from '@hooks/mutations/useCreateToDoMutationAPI';
import { TodoItem, useGetToDoAPI } from '@hooks/selectors/useGetToDoAPI';
import { useUpdateToDoMutationAPI } from '@hooks/mutations/useUpdateToDoMutationAPI';
import { useDeleteToDoMutationAPI } from '@hooks/mutations/useDeleteToDoMutationAPI';
import { deleteAllKeys } from '@store/MMKV';

interface IToDoForm {
  description: string;
  selectedID: number;
  selectedDesc: string;
  selectedIsDone: boolean;
}


const ToDoScreen: ScreenProps<'ToDo'> = ({ navigation }) => {
  const { onCreateToDoMutationAPI } = useCreateToDoMutationAPI();
  const { onUpdateToDoMutationAPI } = useUpdateToDoMutationAPI();
  const { todoStatus, todoData } = useGetToDoAPI();
  const { onDeleteToDoMutationAPI } = useDeleteToDoMutationAPI();

  const { form, inputChangeHandler, resetForm } = useForm<IToDoForm>({
    description: '',
    selectedID: 0,
    selectedDesc: '',
    selectedIsDone: false,
  });

  const onChangeField = useCallback(
    (field: keyof IToDoForm, value: string | number | boolean) => {
      inputChangeHandler(field)(value);
    },
    [inputChangeHandler],
  );

  const onCreateTodo = useCallback(() => {
    onCreateToDoMutationAPI.mutate({
      description: form.description
    })
    resetForm()
  }, [form]);

  const onUpdateCheckToDo = useCallback((item: TodoItem) => {
    onUpdateToDoMutationAPI.mutate({
      description: item.description,
      done: item.done,
      id: item.id,
    })
  }, []);

  const onPressItem = useCallback((item: TodoItem) => {
    onChangeField('selectedID', item.id)
    onChangeField('selectedIsDone', item.done)
    onChangeField('selectedDesc', item.description)
  }, []);

  const onUpdateToDo = useCallback(() => {
    onUpdateToDoMutationAPI.mutate({
      description: form.selectedDesc,
      done: form.selectedIsDone,
      id: form.selectedID,
    })
    resetForm()
  }, [form]);

  const onDeleteToDo = useCallback((id: number) => {
    onDeleteToDoMutationAPI.mutate({
      todo_id: id,
    })
  }, []);

  const onLogout = useCallback(() => {
    deleteAllKeys();
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <ToDoView
      onChange={(desc) => onChangeField('description', desc)}
      value={form.description}
      onCreateTodo={onCreateTodo}
      todoList={todoData}
      isLoading={todoStatus === 'pending'}
      isLoadingTodo={onCreateToDoMutationAPI.isPending}
      onUpdateCheckItem={onUpdateCheckToDo}
      onPressItem={onPressItem}
      selectedValue={form.selectedDesc}
      onUpdateToDo={onUpdateToDo}
      onChangeUpdate={(val) => onChangeField('selectedDesc', val)}
      isLoadingUpdateTodo={onUpdateToDoMutationAPI.isPending}
      onPressDelete={onDeleteToDo}
      isDeleteLoading={onDeleteToDoMutationAPI.isPending}
      onPressLogout={onLogout}
    />
  );
};

export default memo(ToDoScreen);
