import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, Text, View, Pressable, ActivityIndicator} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { FlatGrid } from 'react-native-super-grid';


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
    return (
        <View  style={styles.mainContainer}>
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