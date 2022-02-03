import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyD4l3PgAkbTTFGCc1I7Ea5KN-FqdL8OMtY",
    authDomain: "uni-project-6f3be.firebaseapp.com",
    databaseURL: "https://uni-project-6f3be-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "uni-project-6f3be",
    storageBucket: "uni-project-6f3be.appspot.com",
    messagingSenderId: "1035818317432",
    appId: "1:1035818317432:web:c4688a51a12afe66885f8d"
};

// Initialize Firebase
initializeApp(firebaseConfig);

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const navigation = useNavigation()

    const goToScreen = () => {
        navigation.navigate('Main', { screen: 'TabTwo' })
    }
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: '1035818317432-tedj0hgegk4ao7f1tvv819ip1enql43f.apps.googleusercontent.com',
        },
    );
    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const auth = getAuth();
            const credential = GoogleAuthProvider.credential(id_token);
            console.log(auth, 'authshit');

            signInWithCredential(auth, credential);
        }
    }, [response]);

    const getAllKeys = async () => {
        let keys: string[] = []
        try {
            keys = await AsyncStorage.getAllKeys()
        } catch (e) {
            // read key error
        }

        console.log(keys)
        // example console.log result:
        // ['@MyApp_user', '@MyApp_key']
    }

    return (
        <View>
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                }}
            />
            <Button
                disabled={!request}
                title="go to"
                color={'red'}
                onPress={goToScreen}
            />
            <Button
                disabled={!request}
                title="get all"
                color={'green'}
                onPress={getAllKeys}
            />
        </View>

    );
}

