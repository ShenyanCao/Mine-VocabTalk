import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
} from 'react-native';

import styles from './styles';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('UserDatabase.db');
const Welcome = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(100), password VARCHAR(100), profile VARCHAR(100), is_login BOOLEAN DEFAULT(TRUE))',
              []
            );
          } else {
            console.log('table table_user already exists')
          }
        }
      );
    });
  }, []);


  return (
    <SafeAreaView style={styles.mainConainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images.webp')}
        />
        <Text style={styles.welcomText}>Welcome to our App</Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Login')}
        style={{width: '100%'}}>
        <View style={styles.loginButtonBackground}>
          <Text style={styles.button}>Login</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('SignUp')}
        style={{width: '100%'}}>
        <View style={styles.signUpButtonBackground}>
          <Text style={styles.button}>Sign Up</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Welcome;
