import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../Components/styles';
const {primary, black} = Colors;

const Header = ({style, textStyle, text}) => {
  return (
    <View style={[styles.headerStyle, style]}>
      <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    padding: 15,
    backgroundColor: primary,
  },
  textStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: black,
  },
});
export default Header;
