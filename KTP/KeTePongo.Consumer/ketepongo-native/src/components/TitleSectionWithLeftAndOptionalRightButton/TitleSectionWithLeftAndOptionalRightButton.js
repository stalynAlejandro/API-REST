import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TypoGraphyOpenSansBold } from 'components';

import styles from './TitleSectionWithLeftAndOptionalRightButton.component.styles';

const TitleSectionWithLeftAndOptionalRightButton = ({ 
  leftButton,
  headerText,
  rightButton
}) => (
  <View style={styles.container}>
    <View style={styles.section_left}>
      {leftButton && leftButton}
    </View>
    <View style={rightButton?styles.section_heading:styles.section_heading_without_right}>
      <TypoGraphyOpenSansBold style={styles.main_heading} text={headerText} />
    </View>
    <View style={styles.section_right}>
      {rightButton && <View style={styles.section_right}>
      {rightButton}
    </View>}
    </View>
  </View>
);

TitleSectionWithLeftAndOptionalRightButton.propTypes = {
  leftButton: PropTypes.any,
  headerText: PropTypes.string.isRequired,
  rightButton: PropTypes.any
};

export { TitleSectionWithLeftAndOptionalRightButton };
