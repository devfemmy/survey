import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from '../assets/successicon.svg';


const OverLayContent = (props) => {
    return (
        <View style= {styles.container}>
            <Icon width= {450} height= {250} />
            <Text style= {styles.textSyle}>
            {props.text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 100,
        width: '100%'
    },
    textSyle: {
        fontSize: 22,
        marginVertical: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2E434E'
    }
})

export default OverLayContent;