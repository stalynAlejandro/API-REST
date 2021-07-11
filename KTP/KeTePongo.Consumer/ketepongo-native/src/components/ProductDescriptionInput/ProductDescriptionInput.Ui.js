import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
import { FONTSIZE, COLORS } from 'constants';

const styles = StyleSheet.create({
  product_description_input: {
    paddingBottom: 0,
    width: '90%',
    height: '100%',
    ...FONTSIZE.main_large,
    color: COLORS.main,
  },
});

export const DescriptionInput = ({ description, onChangeText, ...props }) => (
  <TextInput
    autoFocus={props.focus}
    numberOfLines={2}
    multiline
    style={styles.product_description_input}
    onChangeText={(description) => onChangeText(description)}
    onFocus={() => props.onFocus()}
    value={description}
    onBlur={() => props.onSubmitChangeDescription(description)}
    blurOnSubmit={true}
    onSubmitEditing={() => props.onSubmitChangeDescription(description)}
  />
);

DescriptionInput.propTypes = { 
  onChangeText: PropTypes.func.isRequired,
  description: PropTypes.string,
  focus: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onSubmitChangeDescription: PropTypes.func.isRequired,
};