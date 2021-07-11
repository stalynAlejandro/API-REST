import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native';
import { 
  LongSquareButton,
  TypoGraphyOpenSansSemiBold,
  TypoGraphyOpenSansBold
} from 'components';

import styles from './DualOptionButtons.component.styles';

const DualOptionButtons = ({ 
  textLeft,
  textRight,
  onPressLeft,
  onPressRight,
}) => (
  <View style={styles.btns_wrapper}>
    <LongSquareButton
      btnStyle={styles.white_btn}
      btnText={<TypoGraphyOpenSansSemiBold text={textLeft} style={styles.text_left} />}
      onPress={() => onPressLeft()}
    />
    <LongSquareButton
      btnStyle={styles.blue_btn}
      btnText={<TypoGraphyOpenSansBold text={textRight} style={styles.text_right} />}
      onPress={() => onPressRight()}
    />
  </View>
)

DualOptionButtons.propTypes = {
  textLeft: PropTypes.string.isRequired,
  textRight: PropTypes.string.isRequired,
  onPressLeft: PropTypes.func.isRequired,
  onPressRight: PropTypes.func.isRequired,
}

export { DualOptionButtons };