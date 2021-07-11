import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, FONTSIZE } from 'constants';
import { TouchableIcon, TypoGraphyOpenSansSemiBold } from 'components';

const LongRoundButton = ({ onPressButton, buttonText, btnStyle }) => (
  <TouchableIcon
    onPress={() => onPressButton()} 
    styles={{...styles.container, ...btnStyle}}
    icon={<TypoGraphyOpenSansSemiBold style={styles.heading} text={buttonText} />}
  />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
    height: 28,
    paddingTop: 10,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral_max,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  heading: {
    ...FONTSIZE.tertiary,
    color: COLORS.neutral_min,
  }
});

LongRoundButton.propTypes = {
  onPressButton: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  btnStyle: PropTypes.object
};

export { LongRoundButton };