import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const colors = {
  active: '#57AAF4',
};

const Badge = props => {
  const {status} = props.employee;

  const getStatus = status => {
    const s = status.charAt(0).toUpperCase() + status.slice(1);
    return s;
  };
  
  // console.log(getStatus);
  return (
    <View style={styles.parent}>
      <Text color="#fff" style={styles.text}>
        {getStatus(status)}
      </Text>
    </View>
  );
};

export default Badge;

const styles = EStyleSheet.create({
  parent: {
    paddingHorizontal: '0.5rem',
    paddingVertical: '0.5rem',
    borderRadius: '1rem',
    backgroundColor: '#57AAF4',
  },
  text: {
    color: '#fff',
    fontSize: '1rem',
    fontWeights: 'normal',
  },
});
