import React, {useState} from 'react';
import { useEffect } from 'react';
import {StyleSheet, Text, Pressable, View, Image} from 'react-native';
import TextInputLayout from '../../components/TextInputLayout';
import TextInputLayoutPassword from '../../components/TextInputLayoutPassword';
import LoginButton from '../../components/AppButton';
import * as SQLite from 'expo-sqlite';
import { Base64 } from 'js-base64';

var db = SQLite.openDatabase('UserDatabase.db');
const ICON_SIZE = 100;

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
  }, []);

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
    if (!result) {
      setEmailError('Invalid Email');
      return;
    }

    var encode = Base64.encode(password);
    console.log(login_data, encode);
    if (login_data === null || login_data.password !== encode) {
      setPasswordError("Password incorrect!");
      return;
    } 

    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard', params: { user: login_data.email}}],
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{marginTop: 24, paddingHorizontal: 36}}>
        <Text style={styles.welcomeText}>Welcome to VocabTalk</Text>
      </View>
      <View style={styles.inputBackground}>
        <Image 
          style={styles.profile}
          source={photo === '' ? require('../../assets/empty.png') : {uri: photo}}
        />
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
      </View>

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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,    
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  inputBackground: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 32,
  },
 
  input: {
    borderWidth: 1,
    borderColor: '#a3a0a0',
    padding: 8,
    margin: 24,
    marginBottom: 12,
    fontSize: 18,
  },
  textBox: {
    width: 400,
    alignSelf: 'center',
    marginTop: 10,
    marginBottome: 10,
  },
  welcomeText: {
    textAlign: 'center',
    color: '#1DC5BB',
    fontWeight: '800',
    fontSize: 42,
    marginTop: 50,
    marginBottom: 30,
  },
  errorText: {
    color: '#EB5053',
    fontSize: 13,
    fontWeight: '400',
    paddingHorizontal: 4,
  },
  profile: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignSelf: 'center',
    marginBottom: 50,
  },
  text: {
    color: 'black',
    marginStart: 24,
    marginEnd: 24,
    marginBottom: 12,
    fontSize: 16,
  },
  loginButton: {
    width: 300,
    alignSelf: 'center',
    marginBottome: 100,
  },
  signupButton: {
    color: '##FB4F19',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 100,
    marginTop: 100,
  },
  
});
