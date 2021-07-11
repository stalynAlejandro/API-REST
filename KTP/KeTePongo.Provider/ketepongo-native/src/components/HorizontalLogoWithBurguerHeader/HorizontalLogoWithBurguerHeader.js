import React from 'react';
import { View } from 'react-native';
import LogoKTPhorizontal from '../../../assets/All_Icons/logos/LogoKTPhorizontal.svg';
import {BurguerMenuButton} from 'components';
import styles from './HorizontalLogoWithBurguerHeader.component.styles';

export const HorizontalLogoWithBurguerHeader = ({ }) => (
  <View>
    <View style={styles.headerContainer}>
      <LogoKTPhorizontal />
      <BurguerMenuButton />
    </View>
    <View style={styles.shadowLine}></View>
  </View >
);