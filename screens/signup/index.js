import React, {useState} from 'react';
import {StyleSheet, Text, Pressable, View, Image} from 'react-native';
import TextInputLayout from '../../components/TextInputLayout';
import LoginButton from '../../components/AppButton';
import * as SQLite from 'expo-sqlite';
import * as ImagePicker from 'expo-image-picker';
import { Base64 } from 'js-base64';
import * as ImageManipulator from 'expo-image-manipulator';

var db = SQLite.openDatabase('UserDatabase.db');
const ICON_SIZE = 100;

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [loginButtonStatus, setStatus] = useState(false);
  const [photo, setPhoto] = useState('');

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) && lookupUser(String(email).toLowerCase()) === null;
  }

  function lookupUser(email) {
    console.log("looking up user: " + email);
    var user_data = null;
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where email = ?',
        [email],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            user_data = results.rows.item(0);
          }
        }
      );
    });
    return user_data;
  }

  function handleEmail(emailAddress) {
    console.log('email= ', emailAddress);
    emailAddress = emailAddress.trim();
    setEmail(emailAddress);
    if (!validateEmail(emailAddress)) {
      setEmailError('Invalid Email or Email taken.');
    } else {
      setEmailError(' ');
    }

    repeatPassword !== '' &&
    repeatPassword !== undefined &&
    emailAddress !== '' &&
    emailAddress !== undefined &&
    password !== '' &&
    password !== undefined &&
    password === repeatPassword
      ? setStatus(true) && setRepeatPasswordError("")
      : setStatus(false) && setRepeatPasswordError("Please make sure the passwords are the same!");
  }
  function handlePassword(newPassword) {
    newPassword = newPassword.trim();
    setPassword(newPassword);
    
    repeatPassword !== '' &&
    repeatPassword !== undefined &&
    email !== '' &&
    email !== undefined &&
    newPassword !== '' &&
    newPassword !== undefined &&
    newPassword === repeatPassword
      ? setStatus(true) && setRepeatPasswordError("")
      : setStatus(false) && setRepeatPasswordError("Please make sure the passwords are the same!");
  }

  function handleRepeatPassword(newRepeatPassword) {
    newRepeatPassword = newRepeatPassword.trim();
    setRepeatPassword(newRepeatPassword);

    console.log(email, password, repeatPassword);

    newRepeatPassword !== '' &&
    newRepeatPassword !== undefined &&
    email !== '' &&
    email !== undefined &&
    password !== '' &&
    password !== undefined &&
    password === newRepeatPassword
      ? setStatus(true) && setRepeatPasswordError("")
      : setStatus(false) && setRepeatPasswordError("Please make sure the passwords are the same!");
  }

  const handleLogin = ({ navigation, route }) => {
    if (email === '' || password === '') {
      return;
    }
    const result = validateEmail(email);
    if (!result) {
      setEmailError('Invalid Email');
    }
  };

  const handleSignUp = async () => {
    if (email === '' || password === '' || repeatPassword === '') {
      return;
    }
    const result = validateEmail(email);
    if (!result) {
      setEmailError('Invalid Email');
    }

    var encode = Base64.encode(repeatPassword);

    const resizedPhoto = await ImageManipulator.manipulateAsync(
      photo,
      [{ resize: { width: ICON_SIZE, height: ICON_SIZE} }],
      { compress: 0.7, format: 'jpeg' },
    );

    console.log(email, password, encode, resizedPhoto.uri);

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (email, password, profile, is_login) VALUES (?,?,?,?)',
        [String(email).toLowerCase(), encode, resizedPhoto.uri, true],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'DrawerHome', params: { user: String(email).toLowerCase()}}],
            });
          } else {
            setPasswordError('Registration Failed');
            setRepeatPasswordError('Registration Failed');
          }
        }
      );
    });
  };

  const pickProfile = async () => {
    const permissionResult = ImagePicker.requestMediaLibraryPermissionsAsync().catch((error) => {
      alert(error.message);
    });
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync().catch((error) => {
      alert(error.message);
    });

    if (result && !result.cancelled) {
      setPhoto(result.uri);
      console.log(result.uri);
    }
  };

  const cameraProfile = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync().catch((error) => {
      alert(error.message);
    });

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync().catch((error) => {
      alert(error.message);
    });

    if (result && !result.cancelled) {
      setPhoto(result.uri);
      console.log(result.uri);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{marginTop: 24, paddingHorizontal: 36}}>
        <Text style={styles.welcomeText}>Welcome to this App</Text>
        <Text style={styles.welcomeDescription}>
          Sign Up use your own profile.
        </Text>
      </View>
      <View style={styles.inputBackground}>
        <View style={styles.photo}>
          <Pressable onPress={pickProfile}>
            <Image 
              style={styles.profile}
              source={photo === '' ? require('../../assets/profile.png') : {uri: photo}}
            />
          </Pressable>
          <Pressable onPress={cameraProfile}>
            <Image 
              style={styles.camera}
              source={require('../../assets/camera.png')}
            />
          </Pressable>
        </View>

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

        <TextInputLayout
          onChangeText={val => handleRepeatPassword(val)}
          placeholder={'Repeat your password'}
          maxLength={28}
          secureEntry={true}
          style={{marginTop: 12}}
        />
        <Text style={styles.errorText}>{repeatPasswordError}</Text>
      </View>

      <LoginButton
        style={styles.loginButton}
        loginText={'Sign Up'}
        onLoginClicked={handleSignUp}
        isEnable={loginButtonStatus}
        progress={false}
      />

      <Pressable
        onPress={() => navigation.navigate('Login')}
        style={{width: '100%'}}>
        <View style={styles.loginButtonBackground}>
          <Text style={styles.button}>Login</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
  profile: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginLeft: 60,
    marginBottom: 12,
  },
  camera: {
    width: 40,
    height: 40,
    marginTop: 60,
  },
  photo: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
