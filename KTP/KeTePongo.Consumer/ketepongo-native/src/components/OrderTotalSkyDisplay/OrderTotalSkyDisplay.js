import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { TypoGraphyOpenSansLight } from 'components';
import { SIZE } from 'constants';

import styles from './OrderTotalSkyDisplay.component.styles';

import ClipBoardIcon from '../../../assets/All_Icons/basic/clip_board.svg';

const OrderTotalSkyDisplay = ({ numberOfSku }) => (
  <View style={styles.container}>
    <View style={styles.icon_wrapper}>
      <ClipBoardIcon {...SIZE.square_14} />
    </View>
    <View>
      <TypoGraphyOpenSansLight style={styles.date} text={`${numberOfSku} Productos`} />
    </View>
  </View>
);

OrderTotalSkyDisplay.propTypes = {
  numberOfSku: PropTypes.number.isRequired
};

export { OrderTotalSkyDisplay };