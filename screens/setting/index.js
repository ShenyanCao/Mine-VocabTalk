import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable, Share} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import LogoutButton from '../../components/AppButton';

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
                style={styles.shareButtonBackground}>
                <Text style={styles.shareButton}>Sharing with others</Text>
            </Pressable>

            <View  style={styles.feedbackContainer}>
              <Text style={styles.feedbackMain}>Help or feedback:</Text>
              <Text style={styles.feedbackEmail}>sycao@uw.edu:</Text>
            </View>
            
            <Pressable
                onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Login'}],
                })}
                style={styles.logoutButtonBackground}>
                <Text style={styles.logoutButton}>Logout</Text>
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
  shareButton: {
    color: 'black',
    fontSize: '25rem',
    fontWeight: '600',
    textDecorationLine: 'underline',
    paddingVertical: '5rem',
  },
  shareButtonBackground: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    marginTop: '15%',
    marginLeft: '5%',
    marginBottom: '2%',
  },
  feedbackContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginLeft: '5%',
    marginBottom: '2%',
  },
  feedbackMain: {
    color: 'black',
    fontSize: '25rem',
    fontWeight: '600',
    textDecorationLine: 'underline',
    paddingVertical: '5rem',
  },
  feedbackEmail: {
    color: 'black',
    fontSize: '18rem',
    fontWeight: '400',
    paddingVertical: '5rem',
  },
  logoutButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: '25rem',
    fontWeight: '600',
    paddingVertical: '5rem',
  },
  logoutButtonBackground: {
    backgroundColor: 'tomato',
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginBottom: '2%',
    marginLeft: '5%',
    width: '40%',
    borderRadius: '10rem',
  },
  
});