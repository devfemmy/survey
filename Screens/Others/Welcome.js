import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SurveyIcon from '../../assets/pro-survey.svg';
import SettingsIcon from '../../assets/pro-settings.svg';
import { useLinkProps } from '@react-navigation/native';


const WelcomeScreen = (props) => {
    return (
        <View style= {styles.container}>
            <View style= {styles.innerContainer}>
                    <TouchableOpacity onPress= {() => props.navigation.navigate('Home')}>
                        <SurveyIcon width= {150} height= {200} />
                        <Text style= {styles.textStyle}>Surveys</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress= {() => props.navigation.navigate('Settings')}>
                        <SettingsIcon width= {150} height= {200} />
                        <Text style= {styles.textStyle}>Settings</Text>
                    </TouchableOpacity>
                   
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: Dimensions.get('window').height/2,
        justifyContent: 'center'
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 0,
        padding: 0
    }
    
});

export default WelcomeScreen;