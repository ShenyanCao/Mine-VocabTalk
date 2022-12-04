import React, {useState} from 'react';
import { useEffect } from 'react';
import {StyleSheet, Text, Pressable, View, Image} from 'react-native';
import TextInputLayout from '../../components/TextInputLayout';
import TextInputLayoutPassword from '../../components/TextInputLayoutPassword';
import LoginButton from '../../components/AppButton';
import * as SQLite from 'expo-sqlite';
import { Base64 } from 'js-base64';
import EStyleSheet from 'react-native-extended-stylesheet';

var db = SQLite.openDatabase('UserDatabase.db');
const ICON_SIZE = '50rem';

const Login = ({ navigation }) => {

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
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(100), username VARCHAR(100), password VARCHAR(100), profile VARCHAR(100), is_login BOOLEAN DEFAULT(TRUE))',
              []
            );
          } else {
            console.log('table table_user already exists')
          }
        }
      );
    });
  }, []);  // runs on first render

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user_progress'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user_progress', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user_progress(progress_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, cat_id VARCHAR(100), word_id VARCHAR(100), word VARCHAR(100))',
              []
            );
            txn.executeSql("CREATE UNIQUE INDEX table_user_progress_user_cat_word on table_user_progress ( user_id, cat_id, word_id )" ,[]);
            console.log('table table_user_progress created');
          } else {
            console.log('table table_user_progress already exists');
          }
        },
        (error) => {
            console.log("execute error: " + JSON.stringify(error))
            alert(JSON.stringify(error));
        }
      );
    },
    (error) => {
      alert(JSON.stringify(error));
    },
    () => console.log("TRANSACTION DONE")
    );
  }, []);  // runs on first render

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginButtonStatus, setStatus] = useState(false);
  const [photo, setPhoto] = useState('');
  const [login_data, setUser] = useState(undefined);

  function validateEmail(email) {
    lookupUser(String(email).toLowerCase());
    
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
      return re.test(String(email).toLowerCase());
  }

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

  function handleEmail(emailAddress) {
    console.log('email= ', emailAddress);
    emailAddress = emailAddress.trim();
    setEmail(emailAddress);
    if (validateEmail(emailAddress)) {
      setEmailError('');
    } else {
      setEmailError('Email invalid!');
    }

    password === '' ||
    password === undefined ||
    emailAddress === '' ||
    emailAddress === undefined
      ? setStatus(false)
      : setStatus(true);
  }

  function handlePassword(newPassword) {
    newPassword = newPassword.trim();
    setPassword(newPassword);
    newPassword === '' ||
    newPassword === undefined ||
    email === '' ||
    email === undefined
      ? setStatus(false)
      : setStatus(true);
  }

  const handleLogin = () => {
    if (email === '' || password === '') {
      return;
    }
    const result = validateEmail(email);
    if (!result || login_data === undefined) {
      setEmailError('Invalid Email');
      return;
    }

    // alert("email valid");
    var encode = Base64.encode(password);
    console.log(login_data, encode);
    if (login_data === null || login_data.password !== encode) {
      setPasswordError("Email or password incorrect!");
      return;
    } 
    
    // alert("password valid");
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard', params: { user: login_data.email, user_id: login_data.user_id}}],
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.welcomeText}>Welcome to VocabTalk</Text>
      
      <View style={styles.photo}>
        <Image 
            style={styles.profile}
            source={photo === '' ? require('../../assets/empty.png') : {uri: photo}}
        />
      </View>

      <TextInputLayout
        style={styles.textBox}
        onChangeText={val => handleEmail(val)}
        placeholder={'Enter your email'}
        maxLength={32}
      />
      <Text style={styles.errorText}>{emailError}</Text>
      <TextInputLayoutPassword
        style={styles.textBox}
        onChangeText={val => handlePassword(val)}
        placeholder={'Enter your password'}
        maxLength={28}
        secureEntry={true}
      />
      <Text style={styles.errorText}>{passwordError}</Text>
      

      <LoginButton
        style={styles.loginButton}
        loginText={'Login'}
        buttonColor={'#1DC5BB'}
        onLoginClicked={handleLogin}
        isEnable={loginButtonStatus}
        progress={false}
      />

      <Pressable
        onPress={() => navigation.navigate('SignUp')}
        style={{width: '100%'}}>
        <View>
        <Text style={styles.signupButton}>
            Don't have an account?
            <Text style={{color: '#FB4F19'}}> Signup!</Text>
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#1DC5BB',
    fontSize: '25rem',
    fontWeight: '700',
    marginTop: '3%',
    marginBottom: '2%',
  },
  photo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '2%',
    marginTop: '1%',
  },
  profile: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignSelf: 'center',
  },
  errorText: {
    color: '#EB5053',
    fontSize: '12rem',
    fontWeight: 'normal',
    paddingHorizontal: '2rem',
    textAlign: 'center',
    marginBottom: '1%',
  },
  textBox: {
    width: '60%',
    alignSelf: 'center',
    marginTop: '0.5%',
    marginBottome: '0.5%',
  },
  loginButton: {
    width: '30%',
    alignSelf: 'center',
    marginTop: '3%',
    marginBottom: '1%'
  },
  signupButton: {
    color: '#000000',
    textAlign: 'center',
    fontSize: '13rem',
    fontWeight: 'normal',
    marginTop: '15%',
    marginBottom: '1%'
  },
});

  
  