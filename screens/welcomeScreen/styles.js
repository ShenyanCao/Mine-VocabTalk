import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainConainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 10,
  },
});

export default styles;
