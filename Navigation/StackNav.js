import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Logo from '../assets/logo.svg';
import { View } from 'react-native';
import Home from '../Screens/Home/Home';
import Survey from '../Screens/Survey/Survey';
import CustomerDetails from '../Screens/Survey/Details';
import SettingsPage from '../Screens/Others/Settings'
import SetUpPage from '../Screens/Others/SetUp';
import WelcomeScreen from '../Screens/Others/Welcome';

// import Playquiz from '../Screens/Practise/MainQuestion';

const Stack = createStackNavigator()

const StackNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            {/* <Stack.Screen headerShown= {false} name="Welcome" options= {{title: 'Drive Test', headerTransparent: true, headerTitleStyle: {color: 'white'}}} component={WelcomeScreen} /> */}
            <Stack.Screen options= {
                
                {headerRight: () => (
                  <View style= {{marginRight: 10}}>
                        <Logo width={120} height= {150} />
                  </View>
             ),
             title: 'Welcome'
             
             }} name="Welcome" component={WelcomeScreen } />
        <Stack.Screen options= {
                
                {headerRight: () => (
        <View style= {{marginRight: 10}}>
              <Logo width={120} height= {150} />
        </View>
             ),
             title: 'Configure Device'
             
             }} name="Setup" component={SetUpPage} />
            <Stack.Screen options= {
                
                {headerRight: () => (
        <View style= {{marginRight: 10}}>
              <Logo width={120} height= {150} />
        </View>
             ),
             title: 'Settings'
             
             }} name="Settings" component={SettingsPage} />
        {/* <Stack.Screen options= {
                
                {headerRight: () => (
        <View style= {{marginRight: 10}}>
              <Logo width={120} height= {150} />
        </View>
             ),
             title: 'Configure Device'
             
             }} name="Setup" component={SetUpPage} /> */}
            <Stack.Screen options= {
                
                {headerRight: () => (
        <View style= {{marginRight: 10}}>
              <Logo width={120} height= {150} />
        </View>
             ),
             headerLeft: null,
             title: 'Home'
             
             }} name="Home" component={Home} />

                <Stack.Screen 
                      options={
                        ({ route }) => ({ title: route.params.name, 
                            headerRight: () => (
                                <View style= {{marginRight: 10}}>
                                      <Logo width={120} height= {150} />
                                </View>
                                     ),
                                    
                        })
                
                    }
         name="Survey" component={Survey} />
    <Stack.Screen options= {
                
                {headerRight: () => (
        <View style= {{marginRight: 10}}>
              <Logo width={120} height= {150} />
        </View>
             ),
             title: 'Customer Details'
             
             }} name="Details" component={CustomerDetails} />
        </Stack.Navigator>
        </NavigationContainer>

    )
}

export default StackNav;