import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen} from '../../screens/ProfileScreen/ProfileScreen';
import {LoginScreen} from '../../screens/LoginScreen/LoginScreen';
import {Panel} from '../Panel/Panel';
import {RegisterScreen} from '../../screens/RegisterScreen/RegisterScreen';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../firebase/firebase';
import {BuyScreen} from '../../screens/BuyScreen/BuyScreen';
import {FinanciesScreen} from '../../screens/FinanciesScreen/FinanciesScreen';

const Stack = createNativeStackNavigator();

export const Navigation: React.FC = (): JSX.Element => {
  const [user] = useAuthState(auth);

  const ShowScreens = user ? (
    <>
      <Stack.Screen name="Buy" component={BuyScreen} />
      <Stack.Screen name="Financies" component={FinanciesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </>
  ) : (
    <>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerBackVisible: false,
        }}>
        {ShowScreens}
      </Stack.Navigator>
      {user && <Panel />}
    </NavigationContainer>
  );
};
