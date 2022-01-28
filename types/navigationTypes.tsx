/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthTabParamList> | undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
};

export type AuthTabParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  LogOutScreen: undefined;

};

export type MainTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};





// helper types 

// export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
//   BottomTabScreenProps<RootTabParamList, Screen>,
//   NativeStackScreenProps<RootStackParamList>
// >;

// export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
//   RootStackParamList,
//   Screen
// >;