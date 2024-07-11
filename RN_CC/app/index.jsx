import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {Link} from 'expo-router';


export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-red">
      <Text className="text-3xl font-pblack" >Nidhi & Nivas's  Home!</Text>
      <Link href='/home' style={{color:'blue'}}>Go to Home page</Link>
      <StatusBar style="auto" />
    </View>
  );
};


