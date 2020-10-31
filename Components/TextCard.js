import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';


export default class TextCard extends Component {
	state = {
		value: null,
	};
	pressedFunction = (id) => {
		this.setState({value: id})
	}
	functionPressed = (props) => {
		// console.log('I was pressed');
		props.pressed()
	}
	render() {
		const { PROP,pressed,question_id,option, baseUrl } = this.props;
        const { value } = this.state;
        // console.log('value', this.state)
		
		return (
			<View style={styles.container}>
				{PROP.map((res, index) => {
					return (
						<View style= {{marginRight: 25}} key={res.id}>
							<TouchableOpacity
								
								style={
									value === res.id && styles.selectedRb || styles.optionContainer
								}
								onPress= {
									() => {
										this.props.pressed({question_id, value: res.id}),
										this.pressedFunction(res.id)
										// this.functionPressed(this.props)
									}
								}
								>
                                    <Text style={
                                        value === res.id && styles.radioText || styles.radioText2
                                    }>{`${res.option}`}</Text>
                                    {/* {value === res.id && <Text style={styles.selectedRb} />} */}
							</TouchableOpacity>
						</View>
					);
				})}
                {/* <Text> Selected: {this.state.value} </Text> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        marginBottom: 15,
        // marginTop: 15,
        // alignItems: 'center',
		// flexDirection: 'row',
		backgroundColor: '#FCFCFC',
		height: 150,
		// borderWidth: 1,
		borderRadius: 3,
		// borderColor: '#EDEFF2',
        color: '#9B9B9B',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    optionContainer: {
        backgroundColor: '#fff',
        height: 150,
        minWidth: 120,
        maxWidth: 200,
        marginVertical: 20,
        borderColor: '#E6E6E6',
        borderWidth: 1,
        // width: 100,
        justifyContent: 'center',
    },
    radioText: {
        // marginRight: 35,
        fontSize: 22,
        color: 'white',
		fontWeight: '700',
		// width: '100%',
        paddingHorizontal: 15,
        textAlign: 'center'
		// backgroundColor: 'yellow'
	},
	radioText2: {
        color: '#9B9B9B',
        fontSize: 22,
        paddingHorizontal: 15,
        // backgroundColor: 'red',
        textAlign: 'center'

	},
	selectedRb: {
        // width: '100%',
        minWidth: 120,
        maxWidth: 200,
        height: 150,
		// borderRadius: 50,
		justifyContent: 'center',
		backgroundColor: '#2E434E',
		// paddingHorizontal: 15,
    },

});