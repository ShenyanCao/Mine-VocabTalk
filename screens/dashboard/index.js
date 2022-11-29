import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, Text, View, Pressable, ActivityIndicator, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { FlatGrid } from 'react-native-super-grid';
import CachedData from '../../constants/cached_data';

const URL = 'https://gist.githubusercontent.com/ShenyanCao/5691099b520203f2da2fa964db39d5d5/raw/db.json';

var db = SQLite.openDatabase('UserDatabase.db');

const Dashboard = ({ navigation }) => {
  const [empList, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // alert("on dashboard.")

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
    <View style={styles.mainContainer}>
      <Pressable
          onPress={() => navigation.navigate('Setting')} 
          style={styles.menuContainer}>
          <Image source={require('../../assets/settings.png') } style={styles.settingImage}/>
      </Pressable>
    <FlatGrid
      itemDimension={150}
      data={empList}
      style={styles.gridView}
      adjustGridToStyles={true}
      maxItemsPerRow={4}
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
  
};

export default Dashboard;

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    marginTop: '5%',
    marginRight: '5%'
  },
  settingImage: {
    width: '30rem',
    height: '30rem',
  },
  gridView: {
    flex: 1,
    marginTop: '2%',
    marginLeft: '3%',
    marginRight: '3%',
  },
  itemContainer: {
    justifyContent: 'space-evenly', 
    paddingTop: '1%',
  },
  itemName: {
    fontSize: '13rem',
    fontWeight: '600',
    paddingTop: '1%',
    textAlign: 'center',
  },
  categoryImage: {
    width: '80rem',
    height: '80rem',
    alignSelf: 'center',
  }
});
