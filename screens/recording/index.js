import React, {useState} from 'react';
import { useEffect } from 'react';
import {StyleSheet, Text, Pressable, View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Speech from 'expo-speech';
import { useRoute } from '@react-navigation/native';
// import Voice, {
//     SpeechResultsEvent,
//     SpeechErrorEvent,
//   } from "@react-native-voice/voice";

const Recording = ({ navigation }) => {
    const route = useRoute();
    const [item, setItem] = useState(route.params.current)
    const [index, setIndex] = useState(route.params.index)
    const [items, setItems] = useState(route.params.items)
    const [results, setResults] = useState([]);
    const [isListening, setIsListening] = useState(false);

    function speak () {
        const thingToSay = item.pictureWord;
        console.log("speaking words:" + thingToSay);
        Speech.speak(thingToSay, {
          language: 'en-US',
        });
    };

    // useEffect(() => {
    //     function onSpeechResults(e) {
    //       setResults(e.value ?? []);
    //     }
    //     function onSpeechError(e) {
    //       console.error(e);
    //     }
    //     Voice.onSpeechError = onSpeechError;
    //     Voice.onSpeechResults = onSpeechResults;
    //     return function cleanup() {
    //       Voice.destroy().then(Voice.removeAllListeners);
    //     };
    // }, []);
    
    async function record() {
        // try {
        //   if (isListening) {
        //     await Voice.stop();
        //     setIsListening(false);
        //   } else {
        //     setResults([]);
        //     await Voice.start("en-US");
        //     setIsListening(true);
        //   }
        // } catch (e) {
        //   console.error(e);
        // }
    }

    return (
        <View style={styles.mainContainer}>
          <Pressable
            onPress={() => navigation.reset({
                      index: 0,
                      routes: [{ name: 'Dashboard'}],
                    })}
            style={{width: '100%'}}>
            <Image source={require('../../assets/home.png') } style={styles.homeButton} />
          </Pressable>
          <Image source={{url: item.pictureURL}} style={styles.itemImage} />
          <Pressable
            onPress={speak}
            style={{width: '100%'}}>
            <Image source={require('../../assets/question.png') } style={styles.recordButton} />
          </Pressable>
          <Pressable
            onPress={record}
            style={{width: '100%'}}>
            <Image source={require('../../assets/record.png') } style={styles.recordButton} />
          </Pressable>
          <Text>Results:</Text>
            {results.map((result, index) => {
                return <Text key={`result-${index}`}>{result}</Text>;
            })}
          {(index < items.length - 1) ?
          <Pressable
            onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Recording', params: { current: items[index+1], index: index+1, items: items}}],
              })}
            style={{width: '100%'}}>
            <Image source={require('../../assets/next.png') } style={styles.recordButton} />
          </Pressable>
          : 
          <View></View>
        }
        </View>
    );
};

export default Recording;

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    homeButton: {
        width: '8rem',
        height: '8rem',
    },
    itemImage: {
        width: '15rem',
        height: '15rem',
    },
    recordButton: {
        width: '8rem',
        height: '8rem',
    },
});