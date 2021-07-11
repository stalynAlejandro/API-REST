import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { BottomShadowLine } from 'shared';
import {
  LogoWithBurguerMenu,
  TitleSectionWithLeftAndOptionalRightButton,
  BackRoundButton
} from 'components';

import styles from './LogoWithBurguerWithTitleSectionHeader.component.styles';

const LogoWithBurguerWithTitleSectionHeader = ({ onPressBack, headerText }) => {
  const leftButton = (
    <BackRoundButton
      onPressBack={() => onPressBack()}
      btnStyle={styles.backButton}
      iconSize={styles.arrow_size}
    />
  );
  const component = (
    <View>
      <LogoWithBurguerMenu />

      <View style={styles.bottom_header}>
        <TitleSectionWithLeftAndOptionalRightButton
          leftButton={leftButton}
          headerText={headerText}
        />
      </View>
    </View>
  );

  return BottomShadowLine({ component });
};

LogoWithBurguerWithTitleSectionHeader.propTypes = {
  onPressBack: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired
};

export { LogoWithBurguerWithTitleSectionHeader };