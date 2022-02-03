/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types/navigationTypes';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Auth: {
        screens: {
          SignUpScreen: 'SignUpScreen',
          LoginScreen: 'LoginScreen',
          LogOutScreen: 'LogOutScreen'
        },
      },
      Main: {
        screens: {
          TabOne: 'TabOne',
          TabTwo: 'TabTwo'
        }
      }

    },
  },
};

export default linking;
