import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base'
import InnerBtn from '../../Components/Innerbtn';
import axios from '../../axios';


const CustomerDetails = (props) => {
    const {responses, survey_id} = props.route.params;
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')

    console.log("responses", responses);
    console.log("survey_id", survey_id);

    const submitResponse = () => {
        const data = {
            responses: responses,
            member_email: email,
            member_phone: phone
        }
        axios.post(`/surveys/${survey_id}/submit_response`, data)
        .then(
            res => {
                console.log(res)
            }
        )
        .catch(err => {
            // setLoading(false)
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
    return (
        <ScrollView style= {styles.container}>
        <View style= {styles.biggerContainer}>
        <View style= {styles.flexContainer}>
            <View style= {{width: '35%'}}>
                <Form>
                <Item placeholderLabel= {styles.labelField} floatingLabel>
                <Label>Email Address</Label>
                <Input
                keyboardType= "email-address" 
                autoCapitalize= {false}
                onChangeText = {setEmail}
                value= {email} 
                style= {styles.pickerField} />
                </Item>
                </Form>
            </View>
            <View style= {{width: '35%'}}>
                <Form>
                <Item placeholder= "Phone Number" placeholderLabel= {styles.labelField} floatingLabel>
                <Label>Phone Number</Label>
                <Input
                autoCapitalize= {false} 
                keyboardType= "phone-pad"
                placeholder= "Phone Number"
                onChangeText = {setPhone}
                value= {phone} 
                style= {styles.pickerField} />
                </Item>
                </Form>
            </View>
            <View style= {{width: '30%'}}>
            <InnerBtn onPress= {submitResponse} color= "white" bg= "#FDB813" text= "Submit" />
            </View>

        </View>
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
        marginHorizontal: 25,
        height: Dimensions.get('window').height/1.3
    },
    labelField: {
        // backgroundColor: 'red'
        
    }
});

export default CustomerDetails
