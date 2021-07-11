import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { TypoGraphyOpenSansLight } from 'components';
import { SIZE } from 'constants';

import styles from './OrderTotalSkuDisplay.component.style';

import ClipBoardIcon from '../../../assets/displayIcon/clip_board.svg';

const OrderTotalSkuDisplay = ({ numberOfSku }) => (
  <View style={styles.container}>
    <View style={styles.icon_wrapper}>
      <ClipBoardIcon {...SIZE.square_14} />
    </View>
    <View>
      <TypoGraphyOpenSansLight style={styles.date} text={`${numberOfSku} Productos`} />
    </View>
  </View>
);

OrderTotalSkuDisplay.propTypes = {
  numberOfSku: PropTypes.number.isRequired
};

export { OrderTotalSkuDisplay };