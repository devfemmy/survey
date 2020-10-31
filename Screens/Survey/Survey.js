import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import InnerBtn from '../../Components/Innerbtn';
import OptionCard from '../../Components/OptionsCard';
import TextCard from '../../Components/TextCard';


const Survey = (props) => {
    const {questions, base_url, survey_id} = props.route.params;
    const [saveQuestions, setQuestions] = useState([]);

    const saveSurvey = ({question_id,value})=>{

        const newQuestions = questions.map((question)=>{
            if(question.id === question_id)
            {
                return { choices:[value], question_id: question_id}
            }
           
            return question;
        });
        // console.log('value', value)
        setQuestions(newQuestions);
        // sortArray()
    };
    console.log('sorted', saveQuestions)
    return (
        <ScrollView style= {styles.container}>
           <View style= {styles.flexContainer}>
                {questions.map((question, index) => {

                    let response = question.options;
                    let question_id = question.id
                    const PROP = response
                    if (question.has_images === 0) {
                            return (
                                <View key= {index}>
                                <Text style= {styles.textStyle}>
                               {question.question}
                                </Text>
                                <TextCard 
                                    question_id={question_id} 
                                    baseUrl= {base_url}
                                    pressed= {saveSurvey} 
                                    PROP={PROP} />
                                </View>
                            )
                    } else {
                        return (
                            <View key= {index}>
                            <Text style= {styles.textStyle}>
                           {question.question}
                            </Text>
                            <OptionCard 
                                question_id={question_id} 
                                baseUrl= {base_url}
                                pressed= {saveSurvey} 
                                PROP={PROP} />
                            </View>
                        )
                    }


                })}
           </View>
           <View style= {{marginHorizontal: 320}}>
               <InnerBtn onPress= {() => props.navigation.navigate('Details', {responses: saveQuestions, survey_id: survey_id})} color= "white" bg= "#FDB813" text= "Submit" />
           </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC'
    },
    textStyle: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '500',
        marginVertical: 15

    },
    flexContainer: {
        // backgroundColor: 'red',
        // width: 250,
        // display: 'flex',
        // flexDirection: 'row',
        // flexWrap: 'wrap'
    }
});

export default Survey
