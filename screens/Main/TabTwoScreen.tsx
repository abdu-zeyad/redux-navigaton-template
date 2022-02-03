import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { ref as storageRef } from "firebase/storage"
import * as ImagePicker from 'expo-image-picker';
import uuid from "uuid";

export default function TabTwoScreen() {
  const [uploadImage, setUploadImage] = useState<string>();

  const [image, setImage] = useState('')
  const [data, setData] = useState<string>()
  const db = getDatabase();
  const users = ref(db, '/users');
  console.log(users, "get data from users");

  const addToRTDB = (data: string | undefined) => {
    const reference = ref(db, '/users');
    set(reference, {
      "data": data,
    })
  }


  onValue(users, (x) => {
    const allData = x.val();
    console.log("data base data: " + JSON.stringify(allData));
  })

  // firestore section 
  const fireStoreDatabase = getFirestore();
  useEffect(() => {

    getFireStoreDate()
  }, [])
  const getFireStoreDate = async () => {
    const users = await getDocs(collection(fireStoreDatabase, "/users"));
    users.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  }

  const addDataToFireStore = async () => {
    await addDoc(collection(fireStoreDatabase, "/users"), {
      first: "test",
      last: "test",
      born: 555
    });
  }

  // firebase storage 


  // Create a reference with an initial file path and name
  const storage = getStorage();
  const downloadFile = async () => {
    getDownloadURL(storageRef(storage, '071248d5-d301-45ea-886a-81181cf228f5.jpeg'))
      .then((url) => {
        console.log(url, "download url link");
        setImage(url)
      })
      .catch((error) => {
        console.log(error);
      });

  }



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.4,
    });

    console.log(result);

    if (!result.cancelled) {
      setUploadImage(result.uri);
    }
  };



  async function uploadImageAsync() {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const uri = uploadImage
    const blob: ArrayBuffer = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      if (uri) {
        xhr.open("GET", uri, true);

      }
      xhr.send(null);
    });

    const fileRef = storageRef(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it

    return await getDownloadURL(fileRef);
  }



  return (
    <ScrollView

      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <View style={{ marginVertical: 20 }}></View>

      <TouchableOpacity
        onPress={() => addToRTDB(data)}
      >
        <Text>add to real time database </Text>
      </TouchableOpacity>
      <View style={{ marginVertical: 20 }}></View>

      <TouchableOpacity
        onPress={() => addDataToFireStore()}
      >
        <Text>add to fire store</Text>
      </TouchableOpacity>

      <View style={{ marginVertical: 20 }}></View>

      <TextInput
        onChangeText={setData}
        value={data}
        placeholder="useless placeholder"
        keyboardType="default"
      />
      <View style={{ marginVertical: 20 }}></View>
      <TouchableOpacity
        onPress={downloadFile}
      >
        <Text>download file  </Text>
      </TouchableOpacity>
      <View style={{ marginVertical: 20 }}></View>

      {!!image && <Image
        source={{
          uri: image,
        }}

        style={{ width: 100, height: 100 }}
      />}
      <View style={{ marginVertical: 20 }}></View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {uploadImage && <Image source={{ uri: uploadImage }} style={{ width: 200, height: 200 }} />}
      </View>
      <View style={{ marginVertical: 20 }}></View>
      <TouchableOpacity
        onPress={uploadImageAsync}
      >
        <Text>upload file  </Text>
      </TouchableOpacity>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
