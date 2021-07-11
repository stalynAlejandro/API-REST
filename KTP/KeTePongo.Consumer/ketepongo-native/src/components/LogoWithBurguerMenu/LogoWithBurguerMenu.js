import React from 'react';
import { View } from 'react-native';
import { BurguerMenuButton } from 'components';
import { KetepongoIcon} from './LogoWithBurguerMenu.Ui';

import styles from './LogoWithBurguerMenu.component.styles';

const LogoWithBurguerMenu = () => (
  <View style={styles.container}>
    <View style={styles.top_section} />

    <KetepongoIcon />

    <View style={styles.burguer_menu_wrapper}>
      <BurguerMenuButton />
    </View>
  </View>
);

export { LogoWithBurguerMenu };