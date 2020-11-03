import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base'
import InnerBtn from '../../Components/Innerbtn';
import axios from '../../axios';
import OverLayContent from '../../Components/OverLayContent';


const SetUpPage = (props) => {
    // const {responses, survey_id} = props.route.params;
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [userName, setName] = useState('');
    const [password, setPassword] = useState('')

    const toggleOverlay = () => {
        setVisible(true);
      };
      const moveToHome = () => {
        setVisible(false)
        props.navigation.navigate('Welcome')
    }
    const submitResponse = () => {
        setLoading(true)
        const data = {
            username: userName,
            password: password
        }
        axios.post(`web-login`, data)
        .then(
            res => {
                setLoading(false)
                toggleOverlay()
                console.log(res);
                const token = res.data.data.token;
                AsyncStorage.setItem('token', token);
                setTimeout(function(){ moveToHome(); },3000)

            }
        )
        .catch(err => {
            // setLoading(false)
            setLoading(false)
            console.log(err.response)
            const message = err.response.data.message
            const code = err.response.status;
            if (code === 401) {
                Alert.alert(
                    'Error!',
                    'Expired Token',
                    [
                      {text: 'OK', onPress: () => signOut()},
                    ],
                    { cancelable: false }
                  )
              
            } else {
                // showLoaded(true)
                Alert.alert(
                    message,
                    'Please Try Again',
                    [
                      {text: 'OK'},
                    ],
                    { cancelable: false }
                  )
            }

              
            

        })
    }

    if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#FDB813" />
          </View>
        );
      }
    return (
        <ScrollView style= {styles.container}>
        <View style= {styles.biggerContainer}>
        <View>
            <View style= {{width: '100%'}}>
                <Form>
                <Item placeholder= "Username" placeholderLabel= {styles.labelField} floatingLabel>
                <Label>Username</Label>
                <Input
                autoCapitalize= {"none"} 
                keyboardType= "default"
                placeholder= "Username"
                onChangeText = {setName}
                value= {userName} 
                style= {styles.pickerField} />
                </Item>
                </Form>
            </View>
            <View style= {{width: '100%'}}>
                <Form>
                <Item placeholderLabel= {styles.labelField} floatingLabel>
                <Label>Password</Label>
                <Input
                keyboardType= "default"
                secureTextEntry 
                autoCapitalize= {"none"} 
                onChangeText = {setPassword}
                value= {password} 
                style= {styles.pickerField} />
                </Item>
                </Form>
            </View>
            <View style= {{width: '100%',}}>
            <InnerBtn onPress= {submitResponse} color= "white" bg= "#FDB813" text= "Submit" />
            </View>

        </View>
        </View>
        <View>
            <Overlay  supportedOrientations={['portrait', 'landscape']} isVisible={visible} onBackdropPress={moveToHome}>
                <OverLayContent text= "Device Configured Successfully" />
            </Overlay>
          </View>

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    biggerContainer: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        marginHorizontal: 50,
        height: Dimensions.get('window').height/1.3
    },
    labelField: {
        // backgroundColor: 'red'
        
    }
});

export default SetUpPage;
