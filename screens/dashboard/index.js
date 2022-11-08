import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, Text, View, Pressable, ActivityIndicator} from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

import Card from '../../components/EmployeeCard';

const URL = 'https://gist.githubusercontent.com/ShenyanCao/5a9473984301a2c2fa20354cffad2d72/raw/test_gist';

var db = SQLite.openDatabase('UserDatabase.db');

const StudyList = ({ navigation }) => {
  const [empList, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState('');
  const [photo, setPhoto] = useState('');

  console.log('rendered...');
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      fetch(URL)
        .then(response => {
          response
            .json()
            .then(json => {
              // console.log('data = ', json);
              //setList(JSON.parse(json));
              setList(json);
              setLoading(false);
            })
            .catch(error => {
              setLoading(false);
              // console.log('weird data');
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  // console.log(URL);
  const route = useRoute();

  function lookupUser(email) {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where email = ?',
        [email],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            console.log(results.rows.item(0));
            setPhoto(results.rows.item(0).profile);
            setUser(results.rows.item(0));
          } else {
            setPhoto("");
          }
        }
      );
    });
  }

  lookupUser(route.params.user)

  return (
    <View>
      <Text style={styles.welcomeText}>{user.username}</Text>
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
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={empList}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => {
            // console.log('current Item= ', item);
            return <Card employee={item} />;
          }}
        />
      )}
    </View>
  );
};

export default StudyList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'dodgerblue',
  },
  welcomeText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 42,
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
