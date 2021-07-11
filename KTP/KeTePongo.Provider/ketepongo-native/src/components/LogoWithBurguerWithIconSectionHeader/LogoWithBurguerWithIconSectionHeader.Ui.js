import React from 'react';
import { View } from 'react-native';
import { SIZE } from 'constants';
import { TypoGraphyOpenSansBold } from 'components';

import styles from './LogoWithBurguerWithIconSectionHeader.component.styles';

import FilterIcon from '../../../assets/All_Icons/basic/filter.svg';

export const FilterWithIcon = () => (
  <View style={styles.heading_center}>
    <FilterIcon {...SIZE.square_25} />
    <TypoGraphyOpenSansBold style={styles.heading_title} text={"Filtros"} />
  </View>
);
