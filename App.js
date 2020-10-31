/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import StackNav from './Navigation/StackNav';



export default function App() {

  // const [fontLoaded, setFontLoaded] = useState(false);
  // if (!fontLoaded) {
  //   return <AppLoading 
  //   startAsync= {fetchFonts} 
  //   onFinish= {() => setFontLoaded(true)} />
  // }
  return (
    <>
  
      {/* <DrawerNav /> */}
      < StackNav />
     
   
   
    </>
  );

}
