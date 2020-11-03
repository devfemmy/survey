import React, { useState,useEffect } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Alert,
    Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SurveyCard from '../../Components/SurveyCard';
import axios from '../../axios';

const Home = (props) => {
    const [loading, setLoading] = useState(true);
    const [surveys, setSurveys] = useState([]);
    const [base_url, setUrl] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [token, setToken] = useState(null);
    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          if(value !== null) {
            // value previously stored
            setToken(value)
          }
        } catch(e) {
          // error reading value
        }
      }
  
    const fetchSurvey = () => {
    
        const savedToken = AsyncStorage.getItem('token').then(
            res => {
                axios.get('surveys/all', {headers: {Token: res}})
                .then(
                    res => {
                        setLoading(false)
                        console.log('surveys', res.data)    
                        const response = res.data;
                        const surveys = response.data.surveys;   
                        const base_url = response.data.base_url;
                        const imageUri = response.data.banner_url.original;
                        const reverseArray = surveys.reverse()
                        setSurveys(reverseArray);
                        setUrl(base_url);
                        setImageUri(imageUri)            
                    }
                )
                .catch(err => {
                    setLoading(false)
                    console.log(err.response)
                    const code = err.response.status;
                    if (code === 401) {
                        Alert.alert(
                            'Error!',
                            'Unauthorized Token, Please Configure Device',
                            [
                              {text: 'OK', onPress: () => {props.navigation.goBack()}},
                            ],
                            { cancelable: false }
                          )
                      
                    } else {
        
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
          ).catch(err => console.log(err));

    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getData()
            fetchSurvey()
          });
  
        
        return unsubscribe;
      }, [props.navigation]);
    if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#FDB813" />
          </View>
        );
      }
    return (
        <ScrollView style= {styles.container}>
            <ImageBackground defaultSource= {require('../../assets/background.png')} style= {styles.imageStyle} source= {{uri: imageUri}}>

            </ImageBackground>
            <View style= {styles.lowerContainer}>
                {surveys.map((survey, index) => {
                    const title = survey.survey_title;
                    const id = survey.id;
                    const questions = survey.questions
                    return (
                        <TouchableOpacity key= {index} onPress= {() => props.navigation.navigate('Survey', {name: title, survey_id: id, questions: questions, base_url: base_url, token: token})}>
                        <SurveyCard>
                            <View style= {styles.textContainer}>
                                <Text style= {styles.textStyle}>
                                  {survey.survey_title}
                                </Text>
                                <View style= {styles.flexContainer}>
                                    <Text style= {styles.textStyle2}>
                                        ENTER SURVEY
                                    </Text>
                                    
                                </View>
                            </View>
                        </SurveyCard>
                    </TouchableOpacity>
                    )
                })}
            </View>
         
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    imageStyle: {
        width: '100%',
        height: Dimensions.get('window').height/3,
        resizeMode: 'contain'
    },
    textStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    textStyle2: {
        color: 'white',
        fontSize: 13
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    lowerContainer: {
        marginHorizontal: 30,
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    
    },
    textContainer: {
        width: '60%',
        marginVertical: 20,
        marginHorizontal: 20
    }
});

export default Home