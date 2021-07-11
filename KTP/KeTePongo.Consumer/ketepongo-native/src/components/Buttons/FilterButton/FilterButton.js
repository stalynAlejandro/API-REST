import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { TypoGraphyOpenSansSemiBold, TouchableIcon } from 'components';

import styles from './FilterButton.component.styles';
import FilterIcon from '../../../../assets/All_Icons/basic/filter.svg';

const FilterButton = ({ onPressFilter }) => (
  <TouchableIcon
    styles={styles.touchable}
    onPress={() => onPressFilter()}
    icon={(
      <View style={styles.container}>
        <FilterIcon {...styles.filter_icon} />
        <TypoGraphyOpenSansSemiBold style={styles.heading} text={"Filtros"} />
      </View>
    )}
  />
);

FilterButton.propTypes = {
  onPressFilter: PropTypes.func.isRequired,
};

export { FilterButton };