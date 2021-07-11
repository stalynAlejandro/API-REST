import React from 'react';
import { View, StyleSheet } from 'react-native';
import BouncingPreloader from 'react-native-bouncing-preloader';

import ASSETS from '../../../../assets';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const BouncyLoader = () => (
  <View style={styles.container}>
    <BouncingPreloader
      icons={[
        ASSETS.ketepongo,
        ASSETS.te_logo,
        ASSETS.te_logo,
      ]}
      leftRotation="-680deg"
      rightRotation="360deg"
      leftDistance={-180}
      rightDistance={-250}
      speed={500} />
  </View>
);

export { BouncyLoader };