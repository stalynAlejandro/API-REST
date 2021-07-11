import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { LongSquareButton, TypoGraphyOpenSansSemiBold } from 'components';
import { COLORS, FONTSIZE } from 'constants';

const styles = StyleSheet.create({
  continue_btn_wrapper: {
    marginLeft: 25,
    marginRight: 25,
    height:38
  },
  btn_text: {
    ...FONTSIZE.secondary,
    color: COLORS.neutral_min,
  }
});

const ContinueButton = ({ onPress, text, containerStyles }) => (
  <View style={{...styles.continue_btn_wrapper,...(containerStyles?containerStyles:{})}}>
    <LongSquareButton
      btnText={<TypoGraphyOpenSansSemiBold text={text?text:"Continuar"} style={styles.btn_text} />}
      onPress={() => onPress()}
    />
  </View>
);

ContinueButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string
};

export { ContinueButton };
