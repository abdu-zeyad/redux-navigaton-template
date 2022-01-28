/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import LoginScreen from '../screens/Auth/LoginScreen';
import LogOutScreen from '../screens/Auth/LogOutScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import TabOneScreen from '../screens/Main/TabOneScreen';
import TabTwoScreen from '../screens/Main/TabTwoScreen';
import { AuthTabParamList, MainTabParamList, RootStackParamList } from '../types/navigationTypes';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}



const RootStack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: true }} />
      <RootStack.Screen name="Main" component={MainNavigator} options={{ headerShown: true }} />
    </RootStack.Navigator>
  );
}




const AuthStack = createNativeStackNavigator<AuthTabParamList>();
function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: true }} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: true }} />
      <AuthStack.Screen name="LogOutScreen" component={LogOutScreen} options={{ headerShown: true }} />
    </AuthStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<MainTabParamList>();

function MainNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
      />
    </BottomTab.Navigator>
  );
}

