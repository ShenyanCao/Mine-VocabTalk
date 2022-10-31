import React, {useRef, useState} from 'react';
import {View, TextInput, Image, StyleSheet, Pressable} from 'react-native';
/*
    @props:
        placeholder:
*/
const ICON_SIZE = 24;
const TextInputLayout = props => {
  const {style = {}, secureEntry = false} = props;
  const [isFocused, setFocused] = useState(false);
  const [passwordVisibility, setShowOrHidePassword] = useState(false);
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
                  ? require('../assets/ic_show_password.png')
                  : require('../assets/ic_hide_password.png')
              }
            />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default TextInputLayout;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 2,
  },
  input: {
    elevation: 4,
    borderWidth: 2,
    borderColor: '#C7C1C1',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    fontWeight: '600',
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
    marginEnd: 12,
  },
});
