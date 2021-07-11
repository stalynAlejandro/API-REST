import React from 'react';
import { View } from 'react-native';
import { BottomShadowLine } from 'shared';
import { MainHeader, TitleSectionWithLeftOptionIcon } from 'components';

import styles from './ClientOrderListScreen.component.styles';

export const ClientOrderListHeader = () => {
  const component = (
    <View style={styles.header_container}>
      <MainHeader />
      <View style={styles.heading_wrapper}>
        <TitleSectionWithLeftOptionIcon headerText={"Restaurante Ejemplo 1"}/>
      </View>
    </View>
  );

  return BottomShadowLine({ component });
};