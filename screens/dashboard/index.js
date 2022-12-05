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
  const route = useRoute();
  const user_id = route.params.user_id;
  const [empList, setList] = useState(CachedData);
  const [isLoading, setLoading] = useState(true);
  // alert("on dashboard.")

  console.log('rendered...');

  useEffect(() => {
    // setting default 
    setList(CachedData);
  });

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

  function nextWordRecording(item) {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user_progress where user_id = ? and cat_id = ?',
        [user_id, item.categoryID],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            console.log(results.rows.item(0));
            var wordlist = [];
            for (let i=0;i<len;i++) {
              wordlist.push(results.rows.item(i).word_id);
            }
            var go_to_index = 0;
            for (let i=0;i<item.categoryList.length;i++) {
              if(!wordlist.includes(item.categoryList[i].pictureID)) {
                go_to_index = i;
                break;
              }
            }
            navigation.reset({
              index: 0,
              routes: [{ name: 'Recording', params: { user_id: user_id, cat_id: item.categoryID, current: item.categoryList[go_to_index], index: go_to_index, items: item.categoryList}}],
            });
          } else {
            console.log("no progress for category " + item.categoryName);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Recording', params: { user_id: user_id, cat_id: item.categoryID, current: item.categoryList[0], index: 0, items: item.categoryList}}],
            });
          }
        },
        (error) => {
            console.log("execute error: " + JSON.stringify(error))
            alert(JSON.stringify(error));
        }
      );
    });
  }

  return (
    <View style={styles.mainContainer}>
      <Pressable
          onPress={() => navigation.navigate('Setting', {user_id: user_id, data: empList})} 
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
            onPress={() => nextWordRecording(item)}
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
    marginTop:'2%',
  },
  itemName: {
    fontSize: '14rem',
    fontWeight: '500',
    marginTop: '2%',
    marginBottom: '5%',
    textAlign: 'center',
  },
  categoryImage: {
    width: '85rem',
    height: '85rem',
    alignSelf: 'center',
  }
});
