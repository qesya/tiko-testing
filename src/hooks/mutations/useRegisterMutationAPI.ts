import { APP_CONFIG } from "@config/app-config";
import { publicAxios } from "@config/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rootNavigationRef } from "@utils/navigationUtils";
import { extractErrorMessage } from "@utils/string-utils";
import { Alert } from "react-native";

interface RegisterResponse {
  email: string;
  first_name: string;
  last_name: string;
}

interface IOnRegister {
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}

const onRegister = async ({ email, first_name, last_name, password, password2 }: IOnRegister) => {
  try {
    const response = await publicAxios.post<RegisterResponse>(`/register/`, {
      email,
      password,
      password2,
      first_name,
      last_name,
    });

    console.log('REGISTER RESPONSE', response.data);

    return response.data;
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

export const useRegisterMutationAPI = () => {
  const queryClient = useQueryClient();

  const onRegisterMutationAPI = useMutation<RegisterResponse, Error, IOnRegister>({
    mutationFn: onRegister,
    onSuccess: (res, variables) => {
      rootNavigationRef.navigate('Login');
      Alert.alert('Success', 'Registration successful!');
    },
    onError: (error) => {
      Alert.alert('Oops!', error.message);
    }
  })

  return {
    onRegisterMutationAPI
  }
}
