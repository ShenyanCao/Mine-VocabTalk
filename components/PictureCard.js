import React from 'react';
import {View, Image, StyleSheet, Text, Linking} from 'react-native';
import Badge from '../components/Badge';
import EStyleSheet from 'react-native-extended-stylesheet';

const Card = props => {
  // console.log('card props= ', props);
  const {name, agency, image, wikipedia} = props.employee;

  const openProfile = () => {
    Linking.openURL(wikipedia);
    // console.log('profile URL= ', wikipedia);
  };


  return (
    <View style={styles.parentContainer}>
      <Image source={{url: image}} style={styles.profileImage} />
      <View style={{justifyContent: 'space-between'}}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.agency}>{agency}</Text>
            <View style={{flexDirection: 'row', flexShrink: 1, marginStart: 8}}>
              <Badge employee={props.employee} />
            </View>
          </View>
        </View>
        <View style={{marginBottom: 12, marginTop: 12}}>
          <Text onPress={openProfile} style={styles.url}>
            Wikipedia
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  parentContainer: {
    marginHorizontal: '1rem',
    marginVertical: '1rem',
    backgroundColor: '#BFDFFC',
    flexDirection: 'row',
    borderRadius: '1rem',
    elevation: '0.5rem',
  },
  nameContainer: {
    flexDirection: 'column',
    flexShrink: 1,
  },
  profileImage: {
    width: '1rem',
    height: '1rem',
    margin: '1rem',
    borderRadius: '1rem',
    borderWidth: '0.1rem',
    borderColor: '#b3b3b3',
  },
  name: {
    fontWeights: 'normal',
    fontSize: '1rem',
    marginTop: '1rem',
  },
  agency: {
    fontWeight: '300',
    fontSize: 14,
    marginTop: 4,
  },
  url: {
    bottom: 0,
    color: '#086ebd',
  },
});

export default Card;
