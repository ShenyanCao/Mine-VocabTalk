import React, {useState} from 'react';
import {StyleSheet, Text, Pressable, View, Image} from 'react-native';
import TextInputLayout from '../../components/TextInputLayout';
import TextInputLayoutPassword from '../../components/TextInputLayoutPassword';
import SignupButton from '../../components/AppButton';
import * as SQLite from 'expo-sqlite';
import * as ImagePicker from 'expo-image-picker';
import { Base64 } from 'js-base64';
import * as ImageManipulator from 'expo-image-manipulator';
import EStyleSheet from 'react-native-extended-stylesheet';

var db = SQLite.openDatabase('UserDatabase.db');
const ICON_SIZE = 100;

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [signupButtonStatus, setStatus] = useState(false);
  const [photo, setPhoto] = useState('');

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
      return re.test(String(email).toLowerCase()) && lookupUser(String(email).toLowerCase()) === null;
  }

  function validateUsername(username) {
    if (!username) return false;
    return true;
  }

  function lookupUser(email) {
    console.log("looking up user: " + email);
    var user_data = null;
    db.transaction((tx) => {
        'SELECT * FROM table_user where email = ?',
        [email],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            user_data = results.rows.item(0);
          }
        }
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

  function handleUsername(username) {
    console.log('username= ', username);
    username = username.trim();
    setUsername(username);
    if (!validateUsername(username)) {
      setUsernameError('Please enter your kid\'s name.');
    } else {
      setUsernameError(' ');
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
    if (username === '' || email === '' || password === '' || repeatPassword === '') {
      return;
    }
    const result = validateEmail(email);
    if (!result) {
      setEmailError('Invalid Email');
    }
    // alert("email valid");
    var encode = Base64.encode(repeatPassword);

    const resizedPhoto = await ImageManipulator.manipulateAsync(
      photo,
      [{ resize: { width: ICON_SIZE, height: ICON_SIZE} }],
      { compress: 0.7, format: 'jpeg' },
    );
    // alert("photo valid");

    console.log(email, username, password, encode, resizedPhoto.uri);
    // alert("log valid");
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (email, username, password, profile, is_login) VALUES (?,?,?,?,?)',
        [String(email).toLowerCase(), username, encode, resizedPhoto.uri, true],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          // alert("db valid");
          if (results.rowsAffected > 0) {
          // alert("db ok");
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard', params: { user: String(email).toLowerCase()}}],
            });
          } else {
            setPasswordError('Registration Failed');
            setRepeatPasswordError('Registration Failed');
          }
        },
        (error) => {
            console.log("execute error: " + JSON.stringify(error))
            alert(JSON.stringify(error));
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

      <Text style={styles.welcomeText}>Sign up for VacabTalk</Text>
      
      <Text style={styles.welcomeDescription}>
        Upload profile picture below.
      </Text>

      <View style={styles.photo}>
        <Pressable onPress={pickProfile}>
          <Image 
            style={styles.profile}
            source={photo === '' ? require('../../assets/profile.png') : {uri: photo}}
          />
          <Text style={styles.profileDescription}>
            Photo Library
          </Text>
        </Pressable>
        <Pressable onPress={cameraProfile}>
          <Image 
            style={styles.camera}
            source={require('../../assets/camera.png')}
          />
          <Text style={styles.cameraDescription}>
            Take Photo
          </Text>
        </Pressable>
      </View>

        <TextInputLayout
          style={styles.textBox}
          onChangeText={val => handleEmail(val)}
          placeholder={'Enter your email'}
          maxLength={32}
        />
        <Text style={styles.errorText}>{emailError}</Text>

        <TextInputLayout
          style={styles.textBox}
          onChangeText={val => handleUsername(val)}
          placeholder={'Enter your child\'s name'}
        />
        <Text style={styles.errorText}>{usernameError}</Text>

        <TextInputLayoutPassword
          style={styles.textBox}
          onChangeText={val => handlePassword(val)}
          placeholder={'Enter your password'}
          maxLength={28}
          secureEntry={true}
        />
        <Text style={styles.errorText}>{passwordError}</Text>

        <TextInputLayoutPassword
          style={styles.textBox}
          onChangeText={val => handleRepeatPassword(val)}
          placeholder={'Repeat your password'}
          maxLength={28}
          secureEntry={true}
        />
        <Text style={styles.errorText}>{repeatPasswordError}</Text>

        <SignupButton
          style={styles.signupButton}
          buttonText={'Sign Up'}
          buttonColor={'#FB4F19'}
          onLoginClicked={handleSignUp}
          isEnable={signupButtonStatus}
          progress={false}
        />

      <Pressable
        onPress={() => navigation.navigate('Login')}
        style={{width: '100%'}}>
          <Text style={styles.loginButton}>
            Already have an account?
          <Text style={{color: '#1DC5BB'}}> Login!</Text>
          </Text>
      </Pressable>

    </View>
      
  );
};

export default SignUp;

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    color: '#1DC5BB',
    fontSize: '2rem',
    fontWeight: '700',
    marginTop: '3rem',
    marginBottom: '1rem',
  },
  welcomeDescription: {
    textAlign: 'center',
    color: '#FB4F00',
    fontSize: '1.5rem',
    fontWeights: 'normal',
    marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  photo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
  },
  profile: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignSelf: 'center',
  },
  profileDescription: {
    alignSelf: 'center',
    color: '#000',
    fontWeights: 'normal',
    fontSize: '1rem',
  },
  camera: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginLeft: '3rem',
    alignSelf: 'center',
  },
  cameraDescription: {
    alignSelf: 'center',
    color: '#000',
    fontWeights: 'normal',
    fontSize: '1rem',
    marginLeft: '3rem',
  },
  errorText: {
    color: '#EB5053',
    fontSize: '0.7rem',
    fontWeight: 'normal',
    paddingHorizontal: '0.9rem',
    textAlign: 'center',
    marginLeft: '2.5rem',
  },
  textBox: {
    width: '16rem',
    alignSelf: 'center',
    marginTop: '0.5rem',
    marginBottome: '0.5rem',
  },
  signupButton: {
    width: '10rem',
    alignSelf: 'center',
    marginTop: '0.5rem',
    marginBottome: '0.5rem',
  },
  loginButton: {
    color: '#000000',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'normal',
    marginBottom: '2rem',
    marginTop: '2rem',
  },
  
});
