import { APP_CONFIG } from "@config/app-config";
import { publicAxios } from "@config/axios-config";
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN, setKey } from "@store/MMKV";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rootNavigationRef } from "@utils/navigationUtils";
import { extractErrorMessage } from "@utils/string-utils";
import { Alert } from "react-native";

interface LoginResponse {
  access: string;
  refresh: string;
}

interface IOnLogin {
  email: string;
  password: string;
}

const onLogin = async ({ email, password }: IOnLogin): Promise<LoginResponse> => {
  try {
    const response = await publicAxios.post<LoginResponse>(`/login/`, {
      email,
      password,
    });

    console.log('LOGIN RESPONSE', response.data);

    return response.data;
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

export const useLoginMutationAPI = () => {
  const queryClient = useQueryClient();

  const onLoginMutation = useMutation<LoginResponse, Error, IOnLogin>({
    mutationFn: onLogin,
    onSuccess: (res) => {
      setKey(USER_ACCESS_TOKEN, res.access);
      setKey(USER_REFRESH_TOKEN, res.refresh);
      rootNavigationRef.navigate('ToDo');
    },
    onError: (error) => {
      Alert.alert('Oppss!', error.message);
    }
  });

  return {
    onLoginMutation
  }
}
