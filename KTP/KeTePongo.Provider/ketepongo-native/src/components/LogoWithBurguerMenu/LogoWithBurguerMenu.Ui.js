import React from 'react';
import { View } from 'react-native';
import { SIZE } from 'constants';

import styles from './LogoWithBurguerMenu.component.styles';
import IConKTP from '../../../assets/All_Icons/logos/icon_ktp.svg';

export const KetepongoIcon = () => (
  <View style={styles.logo_wrapper}>
    <IConKTP {...SIZE.square_60} />
  </View>
);
