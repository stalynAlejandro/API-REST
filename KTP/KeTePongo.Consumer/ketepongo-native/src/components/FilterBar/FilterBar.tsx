import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native';
import Proptypes from 'prop-types';
import { SIZE, COLORS } from 'constants';
import { BurguerMenuButton, SearchComponent,HeaderWithFilterAndBackComponent } from 'components';

import styles from './FilterBar.component.styles';
import IConKTP from '../../../assets/All_Icons/logos/icon_ktp.svg';
import SearchIcon from '../../../assets/All_Icons/basic/search.svg';
import ArrowBack from 'assets/svg/arrows/arrowBack.svg'
import { BottomShadowLine } from 'shared';


export const FilterBar = ({
  onFilter,
  onSubmit,
  placeholderText,
  value,
  goBackTo,
  goToFilters
}) => 

{
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const onPressSearch = () => setIsSearchVisible(!isSearchVisible)
  const component= (
    <View style={styles.search_container}>
        {(isSearchVisible) ? <SearchComponent onClose={onPressSearch} searchByWord={onFilter} pressGoToFilter={goToFilters} placeholderText={placeholderText} />  : <HeaderWithFilterAndBackComponent goBackTo={goBackTo} pressSearch={onPressSearch} displayMenu={()=>{}} />}
    </View>
  )
  const sectionHeight = styles.header_height;
  return BottomShadowLine({sectionHeight, component});

}