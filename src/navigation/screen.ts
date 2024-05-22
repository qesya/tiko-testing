import {ParamListBase, RouteProp} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

export enum CommonStackKeys {
  TestScreen = "Test",
  RegisterScreen = "Register",
  LoginScreen = "Login",
  ToDoScreen = "Todo"
}

export type CommonStackList = {
  Test: undefined;
  Register: undefined;
  Login: undefined;
  ToDo: undefined;
};

export type StackParamList = CommonStackList;

export type KeyStackParamList = keyof CommonStackList;

// SCREEN MAP
type ScreenComponentType<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> =
  | React.ComponentType<{
      route: RouteProp<ParamList, RouteName>;
      navigation: keyof StackParamList;
    }>
  | React.ComponentType<{}>;

export type ScreenMap = {
  name: KeyStackParamList;
  Component: ScreenComponentType<StackParamList, KeyStackParamList>;
};

// SCREEN PROPS
export type ScreenProps<T extends keyof StackParamList> = React.FC<
  StackScreenProps<StackParamList, T>
>;
