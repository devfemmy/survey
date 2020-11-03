import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import InnerBtn from '../../Components/Innerbtn';
import OptionCard from '../../Components/OptionsCard';
import SurveyInput from '../../Components/SurveyInput';
import TextCard from '../../Components/TextCard';


const Survey = (props) => {
    const {questions, base_url,token, survey_id} = props.route.params;
    const [saveQuestions, setQuestions] = useState([]);
    const [stateSurvey, setSurvey] = useState([]);

    const setSurveyState = () => {
        setSurvey(questions)
    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
           setSurveyState()
          });
  
        
        return unsubscribe;
      }, [props.navigation]);

    const saveSurvey = ({question_id,value})=>{

        const newQuestions = stateSurvey.map((question)=>{
            if(question.id === question_id)
            {
                return { choices:[value], question_id: question_id}
            }
           
            return question;
        });
        // console.log('value', value)
        setSurvey(newQuestions);
        // sortArray()
    };
    const saveInputChange = (value, id) => {
        console.log('inputsValue', value)
        const newQuestions = stateSurvey.map((question)=>{
            console.log("question", question)
            console.log("question_id", question.id)
            console.log("input_id", id)
          if(question.id === id)
          {
            // console.log('points', question)
            console.log('SUCCESS')
            
            return {...question, answer_text:value, question_id: id, choices: []}
          }
         
          return question;
      });
      setSurvey(newQuestions);

      }
    console.log('sorted', stateSurvey)
    return (
        <ScrollView style= {styles.container}>
           <View style= {styles.flexContainer}>
                {questions.map((question, index) => {

                    let response = question.options;
                    let question_id = question.id
                    const PROP = response;
                    const response_type = question.response_type_id;
                    if (response_type === 1) {
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
                    } else if (response_type === 3) {
                        const myQuesId = question.id;
                        console.log('MY QUESTION', myQuesId)
                        return (
                            <View key= {index} style= {styles.inputContainer}>
                                <Text style= {styles.textStyle}>
                            {question.question}
                                </Text>
                                <SurveyInput
                                 onChangeText = {(value) => saveInputChange(value, myQuesId)}
                                />
                            </View>
                        )
                    }



                })}
           </View>
           <View style= {{marginHorizontal: 320}}>
               <InnerBtn onPress= {() => props.navigation.navigate('Details', {responses: stateSurvey, survey_id: survey_id, token: token})} color= "white" bg= "#FDB813" text= "Submit" />
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
    inputContainer: {
        marginHorizontal: 100
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
