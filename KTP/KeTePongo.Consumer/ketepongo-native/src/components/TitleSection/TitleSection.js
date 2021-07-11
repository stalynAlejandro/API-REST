import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TypoGraphyOpenSansBold } from 'components';

import styles from './TitleSection.component.styles';

const TitleSection = ({ 
  
  headerText,
  
}) => (
  <View style={styles.container}>
    <View style={styles.section_heading}>
      <TypoGraphyOpenSansBold style={styles.main_heading} text={headerText} />
    </View>
  </View>
);

TitleSection.propTypes = {
  headerText: PropTypes.string.isRequired,
};

export { TitleSection };
