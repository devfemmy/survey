import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const SurveyCard = (props) => {
    return (
        <ImageBackground source= {require('../assets/card.png')} style= {styles.imageHeight}>
            {props.children}
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {

    },
    imageHeight: {
        width: 250,
        height: 120,
        marginRight: 25,
        marginVertical: 20,
        resizeMode: 'cover'
    }

})

export default SurveyCard;