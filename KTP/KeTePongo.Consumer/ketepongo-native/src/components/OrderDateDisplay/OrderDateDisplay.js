import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import moment from 'moment';
import { SIZE } from 'constants';
import { TypoGraphyOpenSansLight } from 'components';

import styles from './OrderDateDisplay.component.styles';
import ClockIcon from '../../../assets/All_Icons/basic/clock.svg';

const OrderDateDisplay = ({ orderDate }) => (
  <View style={styles.container}>
    <View style={styles.icon_wrapper}>
      <ClockIcon {...SIZE.square_14} />
    </View>
    <View>
      <TypoGraphyOpenSansLight style={styles.date} text={moment(orderDate).format("DD/MM/YYYY")} />
      <TypoGraphyOpenSansLight style={styles.date} text={`${moment(orderDate).format("kk:mm")} h`} />
    </View>
  </View>
);

OrderDateDisplay.propTypes = {
  orderDate: PropTypes.instanceOf(Date)
};

export { OrderDateDisplay };