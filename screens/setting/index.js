import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable, Share} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('UserDatabase.db');

const Setting = ({ navigation }) => {
    const route = useRoute();
    const [user, setUser] = useState('');
    const [photo, setPhoto] = useState('');

    function lookupUser(email) {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_user where email = ?',
          [email],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              //console.log(results.rows.item(0));
              setPhoto(results.rows.item(0).profile);
              setUser(results.rows.item(0));
            } else {
              setPhoto("");
            }
          }
        );
      });
    }

    const onShare = async () => {
      try {
        const result = await Share.share({
          message: 'VocabTalk is a really great educational game app for toddlers.',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    }

    return (
        <View  style={styles.mainContainer}>
             <Pressable
                onPress={onShare} 
                style={{width: '100%'}}>
                <View style={styles.ButtonBackground}>
                <Text style={styles.button}>Sharing</Text>
                </View>
            </Pressable>

            <Pressable
                onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Login'}],
                })}
                style={{width: '100%'}}>
                <View style={styles.loginButtonBackground}>
                <Text style={styles.button}>Logout</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default Setting;

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginButton: {
    marginHorizontal: 32,
    bottom: 18,
  },
  loginButtonBackground: {
    width: '100%',
    height: 70,
    backgroundColor: 'tomato',
    justifyContent: 'center',
  },
  button: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});