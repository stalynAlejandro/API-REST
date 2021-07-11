import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
import { FONTSIZE, COLORS } from 'constants';

const styles = StyleSheet.create({
  product_name_input: {
    paddingBottom: 0,
    width: '90%',
    height: '100%',
    ...FONTSIZE.main_large,
    color: COLORS.main,
  },
});

export const NameInput = ({ name, onChangeText, ...props }) => (
  <TextInput
    autoFocus={props.focus}
    numberOfLines={2}
    multiline
    style={styles.product_name_input}
    onChangeText={(name) => onChangeText(name)}
    onFocus={() => props.onFocus()}
    value={name}
    onBlur={() => props.onSubmitChangeName(name)}
    blurOnSubmit={true}
    onSubmitEditing={() => props.onSubmitChangeName(name)}
  />
);

NameInput.propTypes = { 
  onChangeText: PropTypes.func.isRequired,
  name: PropTypes.string,
  focus: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onSubmitChangeName: PropTypes.func.isRequired,
};