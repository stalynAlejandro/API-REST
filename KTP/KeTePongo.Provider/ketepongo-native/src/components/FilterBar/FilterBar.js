import React from 'react';
import { View, TextInput } from 'react-native';
import Proptypes from 'prop-types';
import { SIZE, COLORS } from 'constants';
import { BurguerMenuButton } from 'components';

import styles from './FilterBar.component.styles';
import IConKTP from '../../../assets/All_Icons/logos/icon_ktp.svg';
import SearchIcon from '../../../assets/All_Icons/basic/search.svg';

//Need autocapitalize and autoCorrect to fix bug in RN https://github.com/facebook/react-native/issues/11068
const FilterBar = ({
  onFilter,
  onSubmit,
  placeholderText,
  value,
  hasToDisplayImpersonateButton
}) => (
  <View style={styles.container}>
    <IConKTP {...SIZE.square_35}/>
    <View style={styles.search_container}>
      <SearchIcon {...SIZE.square_14} style={styles.search_icon} />
      <TextInput
        style={styles.searchInput}
        type="text"
        placeholder={placeholderText}
        placeholderTextColor={COLORS.neutral_strong}
        onSubmitEditing={() => onSubmit() }
        value={value}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(textSearch) => onFilter(textSearch)} />
    </View>
    <View style={styles.burguer_wrapper}>
      <BurguerMenuButton hasToDisplayImpersonateButton={hasToDisplayImpersonateButton}/>
    </View>
  </View>
);

FilterBar.propTypes = {
  onFilter: Proptypes.func.isRequired,
  onSubmit: Proptypes.func.isRequired,
  placeholderText: Proptypes.string
};

export { FilterBar };
