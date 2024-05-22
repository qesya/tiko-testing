import { APP_CONFIG } from "@config/app-config";
import { authAxios } from "@config/axios-config";
import { GET_TODOS } from "@config/react-query-keys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { extractErrorMessage } from "@utils/string-utils";

export interface TodoItem {
  id: number;
  description: string;
  done: boolean;
}

export type GetTodoResponse = TodoItem[];

const onGetTodo = async (): Promise<GetTodoResponse> => {
  try {
    const response = await authAxios.get<GetTodoResponse>(`${APP_CONFIG.BASE_URL}/todos/`);
    const sortedData = response.data.sort((a, b) => a.id - b.id);
    return sortedData;
  } catch (error: any) {
    console.error('ERROR', error);
    if (error.response) {
      console.error('ERROR RESPONSE STATUS:', error.response.status);
      console.error('ERROR RESPONSE HEADERS:', error.response.headers);
      console.error('ERROR RESPONSE DATA:', error.response.data);
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

export const useGetToDoAPI = () => {
  const queryClient = useQueryClient();

  const {
    data: todoData,
    status: todoStatus,
    refetch: toDoRefetch,
    isRefetching: isTodoRefetch
  } = useQuery<GetTodoResponse>({
    queryKey: [GET_TODOS],
    queryFn: onGetTodo,
    refetchOnWindowFocus: true,
  });

  return {
    todoData,
    todoStatus,
    toDoRefetch,
    isTodoRefetch,
  }
}
