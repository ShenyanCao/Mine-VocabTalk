import React, {useState} from 'react';
import {StyleSheet, Text, Pressable, View, Image} from 'react-native';
import TextInputLayout from '../../components/TextInputLayout';
import LoginButton from '../../components/AppButton';
import * as SQLite from 'expo-sqlite';
import { Base64 } from 'js-base64';

var db = SQLite.openDatabase('UserDatabase.db');
const ICON_SIZE = 100;

const Login = ({ navigation }) => {
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
      routes: [{ name: 'DrawerHome', params: { user: login_data.email}}],
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{marginTop: 24, paddingHorizontal: 36}}>
        <Text style={styles.welcomeText}>Welcome to this Club</Text>
        <Text style={styles.welcomeDescription}>
          Please login to continue using this service
        </Text>
      </View>
      <View style={styles.inputBackground}>
        <Image 
          style={styles.profile}
          source={photo === '' ? require('../../assets/empty.png') : {uri: photo}}
        />
        <TextInputLayout
          onChangeText={val => handleEmail(val)}
          placeholder={'Your email'}
          maxLength={32}
        />
        <Text style={styles.errorText}>{emailError}</Text>
        <TextInputLayout
          onChangeText={val => handlePassword(val)}
          placeholder={'Your password'}
          maxLength={28}
          secureEntry={true}
          style={{marginTop: 12}}
        />
        <Text style={styles.errorText}>{passwordError}</Text>
      </View>
      <LoginButton
        style={styles.loginButton}
        loginText={'Login'}
        onLoginClicked={handleLogin}
        isEnable={loginButtonStatus}
        progress={false}
      />

      <Pressable
        onPress={() => navigation.navigate('SignUp')}
        style={{width: '100%'}}>
        <View style={styles.signUpButtonBackground}>
          <Text style={styles.button}>Sign Up</Text>
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
  errorText: {
    color: '#EB5053',
    fontSize: 13,
    fontWeight: '400',
    paddingHorizontal: 4,
  },
  profile: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginLeft: 60,
    marginBottom: 12,
  },
  text: {
    color: 'black',
    marginStart: 24,
    marginEnd: 24,
    marginBottom: 12,
    fontSize: 16,
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
  signUpButtonBackground: {
    width: '100%',
    height: 70,
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
  },
  button: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  welcomeText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 42,
  },
  welcomeDescription: {
    top: 6,
    color: 'grey',
    fontWeight: '500',
    fontSize: 18,
  },
});
