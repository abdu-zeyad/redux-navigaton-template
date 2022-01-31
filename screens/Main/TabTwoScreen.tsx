import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
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
    getDownloadURL(storageRef(storage, 'campnow.jpeg'))
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
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
