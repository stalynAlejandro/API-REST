import React from 'react';
import { View } from 'react-native';
import { TypoGraphyOpenSansSemiBold } from 'components';
import { SIZE } from 'constants';

import styles from './MainHeader.component.style';

import TLogo from '../../../assets/logos/t_logo.svg';
import BurguerMenuIcon from '../../../assets/actionIcons/burguer_menu.svg';

class MainHeader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.section} />
        <View style={styles.section}>
          <TLogo {...SIZE.square_69} />
        </View>
        <View style={styles.burguer_section}>
          <View style={styles.burguer_wrapper}>
            <BurguerMenuIcon {...SIZE.square_20} />
            <TypoGraphyOpenSansSemiBold style={styles.menu} text={"Menú"} />
          </View>
        </View>
      </View>
    );
  }
}

MainHeader.defaultProps = {
  styles
};

export { MainHeader };