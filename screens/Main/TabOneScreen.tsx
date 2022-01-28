import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootState } from '../../store';
import { loadTestData } from '../../store/actions/testAction';

export default function TabOneScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.test.data);
  console.log(data, "get data from redux");

  const loadData = () => {
    dispatch(loadTestData(() => {
      console.log("got data");
    }));
  };
  useEffect(() => {
    loadData()
  })
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
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
