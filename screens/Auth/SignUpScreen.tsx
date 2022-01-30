import { View, Text, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-google-app-auth';

const SignUpScreen = () => {
    const navigation = useNavigation()
    const [token, setToken] = useState<string | null>();
    const goToTabOne = () => {
        navigation.navigate('Main', { screen: 'TabOne' })
    }
    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: "590049508497-cleb0uumqau94ngsfejcpihiab1um5r9.apps.googleusercontent.com",
                iosClientId: "590049508497-j0gqvuh9903t1tgf2l90sc2jbkho0frl.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                setToken(result.accessToken)
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }
    return (
        <View>
            <Text>SignUpScreen</Text>
            <TouchableOpacity
                onPress={goToTabOne}
                style={{ height: 100, backgroundColor: 'red' }}
            >
                <Text>go to tab one screen</Text>
            </TouchableOpacity>
            <Button onPress={signInWithGoogleAsync} title='sign in' />
            <Text>{token}</Text>
        </View>
    );
};

export default SignUpScreen;


