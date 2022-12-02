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
    const [item, setItem] = useState(route.params.current);
    const [index, setIndex] = useState(route.params.index);
    const [items, setItems] = useState(route.params.items);
    const [results, setResults] = useState([]);
    const [isListening, setIsListening] = useState(false);

    function askquestion (thingToSay) {
      Speech.stop();
      console.log("speaking words:" + thingToSay);
      Speech.speak(thingToSay, {
        language: 'en-US',
      });
    };

    function speak () {
        const thingToSay = item.pictureWord;
        askquestion(thingToSay);
    };

    function askPicture () {
      const thingToSay = "Do you know what is this? Click recording to record your answer or click question button for help";
      askquestion(thingToSay);
  };

  useEffect(() => {
    function onSpeechResults(e) {
      setResults(e.value ?? []);
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

useEffect(() => {
  var words = results.length > 0 ? results.map(e => e ?? "").join('') : "";
  if (String(words).toLowerCase().indexOf(item.pictureWord) !== -1){
    askquestion("well done");
    Voice.stop();
    setIsListening(false);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Recording', params: { current: items[index+1], index:  (index < (items.length - 2)) ? index+1 : 0, items: items}}],
    })
  } else if (String(words).length > 0 && !isListening) {
    askquestion("try again, or Help");
  }
}, [results]);

async function record() {
  Speech.stop();
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
            onPress={() => Speech.stop() && navigation.reset({
                      index: 0,
                      routes: [{ name: 'Dashboard'}],
                    })}
            style={styles.homeContainer}>
            <Image source={require('../../assets/home.png') } style={styles.homeButton} />
          </Pressable>
           
          <View style={styles.itemImageContainer}>
            <Pressable
              onPress={askPicture}>
              <Image source={{url: item.pictureURL}} style={styles.itemImage} />
            </Pressable>
          </View>
          

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
            
           
            <Pressable
              onPress={() => navigation.reset({
                  index: 0,
                  routes: [{ name: 'Recording', params: { current: items[index+1], index:  (index < (items.length - 2)) ? index+1 : 0, items: items}}],
                })}
              style={styles.nextContainer}>
              <Image source={require('../../assets/next.png') } style={styles.nextButton} />
            </Pressable>

          </View>
          
          <Text style={styles.resultText}>{results[0]}</Text>
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
      marginTop: '5%',
      marginLeft: '5%',
    },
    homeButton: {
      width: '30rem',
      height: '30rem',
    },
    itemImageContainer: {
      flexDirection: 'row', 
      justifyContent: 'center',
      marginTop: '3%',
  },
    itemImage: {
      alignSelf: 'center',
      width: '250rem',
      height: '250rem',
    },
    recordContainer: {
      flexDirection: 'row', 
      justifyContent: 'center',
      marginTop: '4%',
    },
    recordButton: {
        width: '60rem',
        height: '60rem',
    },
    bottomPart: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: '5%',
      marginLeft: '2%',
    },
    questionContainer: {
      width:'50%',
    },
    questionButton: {
      height: '60rem',
      width: '60rem',
      alignSelf: 'center',
    },
    resultText: {
      color: '#76BA1B',
      fontSize: '10rem',
      fontWeight: '600',
      paddingHorizontal: '1%',
      textAlign: 'center',
      marginLeft: '2%',
    },
    nextContainer: {
      width:'50%',
    },
    nextButton: {
      height: '60rem',
      width: '60rem',
      alignSelf: 'center',
    },
});