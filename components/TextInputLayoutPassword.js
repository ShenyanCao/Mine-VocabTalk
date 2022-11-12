import React, {useRef, useState} from 'react';
import {View, TextInput, Image, StyleSheet, Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
/*
    @props:
        placeholder:
*/
const ICON_SIZE = '1.5rem';

const TextInputLayoutPassword = props => {
  const {style = {}, secureEntry = false} = props;
  const [isFocused, setFocused] = useState(false);
  const [passwordVisibility, setShowOrHidePassword] = useState(true);
  const inputField = useRef(null);
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  const showOrHidePassword = () => {
    setShowOrHidePassword(!passwordVisibility);
    inputField.current.focus();
  };
  const borderColor = {
    borderColor: isFocused ? 'dodgerblue' : '#C7C1C1',
  };
  return (
    <View style={[styles.mainContainer, style]}>
      <TextInput
        ref={inputField}
        style={[styles.input, borderColor]}
        secureTextEntry={passwordVisibility}
        onChangeText={val => props.onChangeText(val)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
      />
      {secureEntry ? (
        <View pointerEvents={'box-none'} style={styles.togglePassword}>
          <Pressable onPress={showOrHidePassword}>
            <Image
              style={styles.icon}
              source={
                passwordVisibility
                  ? require('../assets/ic_hide_password.png')
                  : require('../assets/ic_show_password.png')
              }
            />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default TextInputLayoutPassword;

const styles = EStyleSheet.create({
  mainContainer: {
    paddingVertical: '0.1rem',
  },
  input: {
    elevation: '0.1rem',
    borderWidth: '0.05rem',
    borderColor: '#C7C1C1',
    borderRadius: '0.5rem',
    padding: '0.6rem',
    fontSize: '1rem',
    fontWeight: 'normal',
  },
  togglePassword: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginEnd: '0.5rem',
  },
});