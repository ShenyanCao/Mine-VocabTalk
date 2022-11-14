import React, {useState} from 'react';
import { useEffect } from 'react';
import {StyleSheet, Text, Pressable, View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Speech from 'expo-speech';
import { useRoute } from '@react-navigation/native';
import Voice, {
    SpeechResultsEvent,
    SpeechErrorEvent,
  } from "@react-native-voice/voice";

const Recording = ({ navigation }) => {
    const route = useRoute();
    const [item, setItem] = useState(route.params.current)
    const [index, setIndex] = useState(route.params.index)
    const [items, setItems] = useState(route.params.items)
    const [results, setResults] = useState([]);
    const [isListening, setIsListening] = useState(false);

    function askquestion (thingToSay) {
      console.log("speaking words:" + thingToSay);
      Speech.speak(thingToSay, {
        language: 'en-US',
      });
    };

    function speak () {
        const thingToSay = item.pictureWord;
        askquestion(thingToSay);
    };

    useEffect(() => {
        function onSpeechResults(e) {
          setResults(e.value ?? []);
          console.log("You said word: " + results[0]);
          if(String(results[0]).trim().toLowerCase() === item.pictureWord) {
            askquestion("well done");
          } else {
            askquestion("try again, or Help");
          }
        }
        function onSpeechError(e) {
          console.log(e);
        }
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        return function cleanup() {
          Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);
    
    async function record() {
        try {
          if (isListening) {
            await Voice.stop();
            setIsListening(false);
          } else {
            setResults([]);
            await Voice.start("en-US");
            setIsListening(true);
          }
        } catch (e) {
          console.error(e);
        }
    }

    return (
        <View style={styles.mainContainer}>
          <Pressable
            onPress={() => navigation.reset({
                      index: 0,
                      routes: [{ name: 'Dashboard'}],
                    })}
            style={styles.homeContainer}>
            <Image source={require('../../assets/home.png') } style={styles.homeButton} />
          </Pressable>
           
            <Image source={{url: item.pictureURL}} style={styles.itemImage} />
          
          
          <Pressable
            onPress={record}
            style={styles.recordContainer}>
            <Image source={isListening ? require('../../assets/recording.png') : require('../../assets/record.png') } style={styles.recordButton} />
          </Pressable>

          <View style={styles.bottomPart}>      
            <Pressable
              onPress={speak}
              style={styles.questionContainer}>
              <Image source={require('../../assets/question.png') } style={styles.questionButton} />
            </Pressable>
            
            <Text style={styles.resultText}>Results: {results[0]}</Text>
            {(index < items.length - 1) ?
            <Pressable
              onPress={() => navigation.reset({
                  index: 0,
                  routes: [{ name: 'Recording', params: { current: items[index+1], index: index+1, items: items}}],
                })}
              style={styles.nextContainer}>
              <Image source={require('../../assets/next.png') } style={styles.nextButton} />
            </Pressable>
            : 
            <View></View>
            }
          </View>
        </View>
    );
};

export default Recording;

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    homeContainer: {
      flexDirection: 'row', 
      justifyContent: 'flex-start',
      marginTop: '1rem',
      marginLeft: '2rem',
    },
    homeButton: {
        width: '3rem',
        height: '3rem',
    },
    itemImage: {
        alignSelf: 'center',
        width: '25rem',
        height: '25rem',
    },
    recordContainer: {
      flexDirection: 'row', 
      justifyContent: 'center',
      marginTop: '2rem',
      marginRight: '1rem',
    },
    recordButton: {
        width: '6rem',
        height: '6rem',
    },
    bottomPart: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: '1rem',
    },
    questionContainer: {
      flexDirection: 'row', 
      justifyContent: 'flex-start',
      marginTop: '1rem',
      marginLeft: '2rem',
    },
    questionButton: {
      width: '5rem',
      height: '5rem',
    },
    resultText: {
      color: '#76BA1B',
      fontSize: '2rem',
      fontWeight: '600',
      paddingHorizontal: '2rem',
      textAlign: 'center',
      marginTop: '2rem',
      marginLeft: '1.5rem',
    },
    nextContainer: {
      flexDirection: 'row', 
      justifyContent: 'flex-end',
      marginTop: '2rem',
      marginLeft: '2rem',
    },
    nextButton: {
      width: '3rem',
      height: '3rem',
    },
});