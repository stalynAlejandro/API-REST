import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { CALENDAR } from 'constants';
import { TouchableIcon, TypoGraphyOpenSansSemiBold } from 'components';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

import styles from './OrderDatePicker.component.styles';
import RightIcon from '../../../assets/All_Icons/arrows/right_arrow_noFill_noTail.svg';
import LeftIcon from '../../../assets/All_Icons/arrows/left_arrow_noFill_noTail.svg';

LocaleConfig.locales['es'] = CALENDAR;

LocaleConfig.defaultLocale = 'es';

class OrderDatePicker extends React.Component {
  state = {
    date: new Date(),
    deliveryDate: ''
  }

  renderDay = ({ date }) => {
    const { 
      styles, 
      onPressSelect,
      onPressInvalidDate
     } = this.props;
    const { deliveryDate } = this.state;
    const deliveryDates = [1, 3];
    const checkingDate = moment(date.dateString);
    const dow = checkingDate.day();

    if (deliveryDate === date.dateString) {
      return (
        <View style={styles.selected_day_wrapper}>
          <TypoGraphyOpenSansSemiBold style={styles.selected_day} text={date.day} />
        </View>
      );
    }

    if (deliveryDates.includes(dow)) {
      return (
        <TouchableIcon
          onPress={() => onPressSelect(date.dateString)}
          icon={<TypoGraphyOpenSansSemiBold style={styles.dates_available} text={date.day} />}
        />
      );
    } 
    
    return (
      <TouchableIcon
        onPress={() => onPressInvalidDate(date.dateString)}
        icon={<TypoGraphyOpenSansSemiBold style={styles.dates_not_available} text={date.day} />}
      />
    );
  }

  render() {
    const { date } = this.state;
    const formatDate = moment(date).format('DD/MM/YYYY');

    if (!formatDate) {
      return null;
    }

    return (
      <View>
        <Calendar
          minDate={String(formatDate)}
          maxDate={moment().add(10, 'years').startOf('day')}
          monthFormat={'MMMM'}
          renderArrow={(direction) => direction === 'left' ? <LeftIcon /> : <RightIcon />}
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={1}
          dayComponent={({ date, state }) => this.renderDay({ date, state })}
        />
      </View>
    );
  }
}

OrderDatePicker.defaultProps = {
  styles
};

OrderDatePicker.propTypes = {
  onPressInvalidDate: PropTypes.func.isRequired,
  onPressSelect: PropTypes.func.isRequired,
  // provider: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

export { OrderDatePicker };