import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { BottomShadowLine } from 'shared';
import { IconWithBackArrowButtonHeader, LogoWithBurguerMenu } from 'components';
import { FilterWithIcon } from './LogoWithBurguerWithIconSectionHeader.Ui';

const LogoWithBurguerWithIconSectionHeader = ({ onPressBack }) => {
  const component = (
    <View>
      <LogoWithBurguerMenu />

      <IconWithBackArrowButtonHeader onPressBack={() => onPressBack()} icon={<FilterWithIcon />}/>
    </View>
  );

  return BottomShadowLine({ component });
};

LogoWithBurguerWithIconSectionHeader.propTypes = {
  onPressBack: PropTypes.func.isRequired,
};

export { LogoWithBurguerWithIconSectionHeader };