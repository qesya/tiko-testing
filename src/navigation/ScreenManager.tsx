import React, { memo, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as screens from '@screens';

import {
  ScreenMap,
  StackParamList,
  KeyStackParamList,
  CommonStackKeys,
} from '@navigation/screen';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { rootNavigationRef } from '@utils/navigationUtils';
import { USER_ACCESS_TOKEN, getKey, hasKey } from '@store/MMKV';

const screen = { ...screens };
const Stack = createStackNavigator<StackParamList>();

export const ScreenManager: React.FC = memo(() => {
  const [initialScreen, setInitialScreen] = useState<{
    name: keyof StackParamList;
    params?: ParamListBase[KeyStackParamList];
  }>({ name: CommonStackKeys.LoginScreen, params: undefined });

  const mainScreens = Object.entries(screen).map(
    ([name, Component]) => ({
      name: name.replace('Screen', ''),
      Component,
    }),
  ) as unknown as ScreenMap[];

  useEffect(() => {
    if (hasKey(USER_ACCESS_TOKEN)) {
      setInitialScreen({
        name: 'ToDo'
      })
      rootNavigationRef.navigate('ToDo')
    } else {
      setInitialScreen({
        name: 'Login'
      })
      rootNavigationRef.navigate('Login')
    }
  }, []);

  return (
    <NavigationContainer ref={rootNavigationRef}>
      <Stack.Navigator initialRouteName={initialScreen.name}>
        {mainScreens.map(({ name, Component }, i) => (
          <Stack.Screen
            key={`${i.toString()}`}
            name={name}
            component={Component}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
});
