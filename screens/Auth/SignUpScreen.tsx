import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
    const navigation = useNavigation()
    const goToTabOne = () => {
        navigation.navigate('Main', { screen: 'TabOne' })
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
        </View>
    );
};

export default SignUpScreen;
