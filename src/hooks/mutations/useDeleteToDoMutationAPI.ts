import { APP_CONFIG } from "@config/app-config";
import { authAxios } from "@config/axios-config";
import { GET_TODOS } from "@config/react-query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { extractErrorMessage } from "@utils/string-utils";
import { Alert } from "react-native";

interface IOnDeleteToDo {
  todo_id: number;
}

const onDeleteToDo = async ({ todo_id }: IOnDeleteToDo) => {
  try{
    const deleteTodo = await authAxios.delete(`${APP_CONFIG.BASE_URL}/todos/${todo_id}`);
  
    return deleteTodo.data;
  } catch (error: any) {
    console.error('ERROR', error);
    if (error.response) {
      console.error('ERROR RESPONSE STATUS:', error.response.status);
      console.error('ERROR RESPONSE DATA:', error.response.data);
      console.error('ERROR RESPONSE HEADERS:', error.response.headers);
      const message = extractErrorMessage(error.response.data);
      throw new Error(message);
    } else if (error.request) {
      console.error('ERROR REQUEST:', error.request);
      throw new Error('No response received from the server');
    } else {
      console.error('ERROR MESSAGE:', error.message);
      throw new Error(error.message);
    }
  }
}

export const useDeleteToDoMutationAPI = () => {
  const queryClient = useQueryClient();

  const onDeleteToDoMutationAPI = useMutation({
    mutationFn: onDeleteToDo,
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: [GET_TODOS] })
    },
    onError: (error) => {
      Alert.alert('Oppss!', error.message);
    }
  })

  return {
    onDeleteToDoMutationAPI
  }
}