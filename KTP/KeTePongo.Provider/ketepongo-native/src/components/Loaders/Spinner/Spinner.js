import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from 'constants';

const Spinner = ({ text, customStyles }) => (
  <View style={customStyles ? customStyles : styles.container}>
    <ActivityIndicator size="large" color={COLORS.primaryBlueDark} />
    <Text style={styles.text}>{text ? text : ''}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    color: COLORS.main,
    marginLeft: 20
  }
});

Spinner.propTypes = {
  text: PropTypes.string,
  customStyles: PropTypes.object
};

export { Spinner };
