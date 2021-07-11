import React from 'react';
import PropTypes from 'prop-types';
import { View, Keyboard } from 'react-native';
import { FilterBar, MainButton } from 'components';
import { BottomShadowLine } from 'shared';

import styles from './FilterBarAndActionButtonHeader.component.styles';

export const FilterBarAndActionButtonHeader = ({ 
  onChangeTextFilter,
  filterBarPlaceholder,
  onPressButton,
  buttonText
}) => {
  const component = (
    <View>
      <FilterBar
      onFilter={(text) => onChangeTextFilter(text)}
      onSubmit={Keyboard.dismiss}
      placeholderText={filterBarPlaceholder}
      />

      <View style={styles.align_center}>
        <View style={styles.btn_wrapper}>
          <MainButton onPressButton={() => onPressButton()} buttonText={buttonText} isSecondary={true}/>
        </View>
      </View>
    </View>
  );

  return BottomShadowLine({ component });
};

FilterBarAndActionButtonHeader.propTypes = {
  onChangeTextFilter: PropTypes.func.isRequired,
  filterBarPlaceholder: PropTypes.string.isRequired,
  onPressButton: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
