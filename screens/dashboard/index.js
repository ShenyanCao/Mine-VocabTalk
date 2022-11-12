import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, Text, View, Pressable, ActivityIndicator, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { FlatGrid } from 'react-native-super-grid';

import Card from '../../components/PictureCard';

const URL = 'https://gist.githubusercontent.com/ShenyanCao/5691099b520203f2da2fa964db39d5d5/raw/db.json';

var db = SQLite.openDatabase('UserDatabase.db');

const Dashboard = ({ navigation }) => {
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

  return (
    <View  style={styles.mainContainer}>
    <Pressable
          onPress={() => navigation.navigate('Setting')}
          style={{width: '100%'}}>
          <Image source={require('../../assets/settings.png') } style={styles.button} />
        </Pressable>
    <FlatGrid
      itemDimension={130}
      data={empList}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer]}>
          <Pressable
            onPress={() => navigation.reset({
                      index: 0,
                      routes: [{ name: 'Recording', params: { current: item.categoryList[0], index: 0, items: item.categoryList}}],
                    })}
            style={{width: '100%'}}>
            <Image source={{url: item.categoryImage}} style={styles.categoryImage} />
          </Pressable>
          <Text style={styles.itemName}>{item.categoryName}</Text>
        </View>
      )}
    />
    </View>
  );
  

  // // console.log(URL);

  // return (
  //   <View>
  //     <Pressable
  //       onPress={() => navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'Login'}],
  //       })}
  //       style={{width: '100%'}}>
  //       <View style={styles.loginButtonBackground}>
  //         <Text style={styles.button}>Logout</Text>
  //       </View>
  //     </Pressable>

  //     {isLoading ? (
  //       <ActivityIndicator />
  //     ) : (
  //       // <FlatList
  //       //   data={empList}
  //       //   keyExtractor={({id}, index) => id}
  //       //   renderItem={({item}) => {
  //       //     // console.log('current Item= ', item);
  //       //     return <Card employee={item} />;
  //       //   }}
  //       // />
  //       <FlatGrid
  //         itemDimension={130}
  //         data={empList}
  //         style={styles.gridView}
  //         // staticDimension={300}
  //         // fixed
  //         spacing={10}
  //         renderItem={({ item }) => {
  //           console.log(item.name);
  //           return <Text>{item.name}</Text>;
  //           // return <View style={[styles.itemContainer]}>
  //           //   {/* <Image source={{url: item.image}} style={styles.categoryImage} /> */}
  //           //   <Text style={styles.itemName}>{item.name}</Text>
  //           // </View>;
  //         }}
  //       />
  //     )}
  //   </View>
  // );
};

export default Dashboard;

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeText: {
    color: 'black',
    fontWeight: 'Bold',
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
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryImage: {
    width: '8rem',
    height: '8rem',
  }
});
