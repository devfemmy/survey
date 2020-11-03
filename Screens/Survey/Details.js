import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base'
import InnerBtn from '../../Components/Innerbtn';
import axios from '../../axios';
import OverLayContent from '../../Components/OverLayContent';


const CustomerDetails = (props) => {
    const {responses, survey_id, token} = props.route.params;
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    console.log('RESPONSES', responses);

    const moveToHome = () => {
        setVisible(false)
        props.navigation.navigate('Home')
    }
    const toggleOverlay = () => {
        setVisible(true);
      };
    const submitResponse = () => {
        setLoading(true)
        const data = {
            responses: responses,
            respondent: email,
            // member_phone: phone
        }
        axios.post(`/surveys/${survey_id}/submit_response`, data, {headers: {Token: token}})
        .then(
            res => {
                setLoading(false)
                toggleOverlay()
                console.log(res)
                setTimeout(function(){ moveToHome(); },3000)
            }
        )
        .catch(err => {
            // setLoading(false)
            setLoading(false)
            console.log(err.response)
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
                    'Network Error',
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
        <View style= {styles.flexContainer}>
            <View style= {{width: '70%'}}>
                <Form>
                <Item placeholderLabel= {styles.labelField} floatingLabel>
                <Label>Email Address / Phone Number</Label>
                <Input
                keyboardType= "email-address" 
                autoCapitalize= {"none"}
                onChangeText = {setEmail}
                value= {email} 
                style= {styles.pickerField} />
                </Item>
                </Form>
            </View>
            {/* <View style= {{width: '35%'}}>
                <Form>
                <Item placeholder= "Phone Number" placeholderLabel= {styles.labelField} floatingLabel>
                <Label>Phone Number</Label>
                <Input
                autoCapitalize= {"none"}
                keyboardType= "phone-pad"
                placeholder= "Phone Number"
                onChangeText = {setPhone}
                value= {phone} 
                style= {styles.pickerField} />
                </Item>
                </Form>
            </View> */}
            <View style= {{width: '30%'}}>
            <InnerBtn onPress= {submitResponse} color= "white" bg= "#FDB813" text= "Submit" />
            </View>

        </View>
        </View>
        <View>
            <Overlay  supportedOrientations={['portrait', 'landscape']} isVisible={visible} onBackdropPress={moveToHome}>
                <OverLayContent text= "Feedback Submitted Successfully" />
            </Overlay>
          </View>

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    biggerContainer: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        marginHorizontal: 25,
        height: Dimensions.get('window').height/1.3
    },
    labelField: {
        // backgroundColor: 'red'
        
    }
});

export default CustomerDetails
