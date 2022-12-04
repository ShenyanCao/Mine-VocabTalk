import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, Text, View, Pressable, Share} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import LogoutButton from '../../components/AppButton';


var db = SQLite.openDatabase('UserDatabase.db');

const Setting = ({ navigation }) => {
  const route = useRoute();
  const user_id = route.params.user_id;
  const cat_list = route.params.data;
  const [user, setUser] = useState('');
  const [photo, setPhoto] = useState('');
  const [userProgress, setUserProgress] = useState({});
  const [userTotal, setUserTotal] = useState({});
  const [catIDToName, setCatIDToName] = useState({});

  function lookupUser(user_id) {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [user_id],
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

  useEffect(() => {
    var progress = {};
    var total = {};
    var catIdToName = {};
    for (let i=0;i<cat_list.length;i++) {
      progress[cat_list[i].categoryID] = 0;
      total[cat_list[i].categoryID] = cat_list[i].categoryList.length;
      catIdToName[cat_list[i].categoryID] = cat_list[i].categoryName;
    }

    setUserProgress(progress);
    setUserTotal(total);
    setCatIDToName(catIdToName);

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user_progress where user_id = ?',
        [user_id],
        (tx, results) => {
          var len = results.rows.length;
          for (let i=0;i<len;i++) {
            const cat_id = results.rows.item(i).cat_id;
            progress[cat_id]++;
          }

          setUserProgress(progress);
        }
      );
    });
  }, []);

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

    const clearProgress = () => {
      console.log("clearing cache...")
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM table_user_progress where user_id = ?',
          [user_id],
          (tx, results) => {
            alert("cleared cache!")
          },
          (error) => {
              console.log("execute error: " + JSON.stringify(error))
              alert(JSON.stringify(error));
          }
        );
      },
      (error) => {
          console.log("execute error: " + JSON.stringify(error))
          alert(JSON.stringify(error));
      });
    }

    return (
        <View  style={styles.mainContainer}>
             <View style={styles.shareButtonBackground}>
              <Text style={styles.shareButton}>Progress Report</Text>
              <FlatList
                data={Object.keys(userProgress)}
                renderItem={({item}) => <Text style={styles.progressReport}>{catIDToName[item] + " : " + userProgress[item] + "/" + userTotal[item]}</Text>}
              />
              <Pressable
                onPress={clearProgress} 
                style={styles.clearButtonBackground}>
                <Text style={styles.clearButton}>Clear progress</Text>
            </Pressable>
            </View>

             <Pressable
                onPress={onShare} 
                style={styles.shareButtonBackground}>
                <Text style={styles.shareButton}>Sharing with others</Text>
            </Pressable>

            <View  style={styles.feedbackContainer}>
              <Text style={styles.shareButton}>Help or feedback:</Text>
              <Text style={styles.feedbackEmail}>Please email us at sycao@uw.edu.</Text>
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
  progressReport: {
    color: 'black',
    fontSize: '11rem',
    fontWeight: '400',
    marginTop: '2rem',
  },
  clearButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: '13rem',
    fontWeight: '400',
    paddingVertical: '2rem',
  },
  clearButtonBackground: {
    backgroundColor: '#48C9B0',
    justifyContent: 'flex-start',
    marginTop: '5rem',
    width: '26%',
    borderRadius: '5rem',
  },
  shareButton: {
    color: 'black',
    fontSize: '20rem',
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginBottom: '2%'
  },
  shareButtonBackground: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginLeft: '5%',
  },
  feedbackContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginLeft: '5%',
    marginBottom: '2%',
  },
  feedbackEmail: {
    color: 'black',
    fontSize: '13rem',
    fontWeight: '400',
  },
  logoutButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: '15rem',
    fontWeight: '500',
    paddingVertical: '5rem',
  },
  logoutButtonBackground: {
    backgroundColor: 'tomato',
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginLeft: '5%',
    width: '20%',
    borderRadius: '10rem',
  },
  
});