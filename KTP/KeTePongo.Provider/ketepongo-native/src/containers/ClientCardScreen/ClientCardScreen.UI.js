import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  BackRoundButton,
  ClientEmailAndIcon,
  ClientPhoneAndIcon,
  ClientUserNameAndIcon,
  MainHeader,
  TitleSectionWithLeftOptionIcon,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
} from 'components';
import { BottomShadowLine } from 'shared';

import styles from './ClientCardScreen.component.styles';

export const ClientEmployeeCard = ({ employee }) => (
  <View style={styles.employee_wrapper}>
    <View style={styles.employee_top_wrapper}>
      <View style={styles.name_wrapper}>
        <ClientUserNameAndIcon name={employee.name} />
      </View>
      <View style={styles.phone_wrapper}>
        <ClientPhoneAndIcon phone={employee.phone} />
      </View>
    </View>
    <ClientEmailAndIcon email={employee.email} />
  </View>
);

ClientEmployeeCard.propTypes = {
  employee: PropTypes.object.isRequired
};

export const MainHeading = ({ heading }) => (
  <TypoGraphyOpenSansBold text={heading} style={styles.main_heading} />
);

MainHeading.propTypes = {
  heading: PropTypes.string.isRequired
};

export const ClientDetail = ({ heading, detail }) => (
  <View>
    <TypoGraphyOpenSansBold text={heading} style={styles.main_heading} />
    <TypoGraphyOpenSans text={detail} style={styles.detail} />
  </View>
);

ClientDetail.propTypes = {
  heading: PropTypes.string.isRequired,
  detail: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
};

export const ClientCardHeading = ({ tradeName, onPressBack }) => {
  const component = (
    <View style={styles.header_container}>
      <MainHeader />

      <View style={styles.heading_wrapper}>
        <TitleSectionWithLeftOptionIcon
          headerText={tradeName}
          optionLeftIcon={<BackRoundButton onPress={() => onPressBack()} />}
        />
      </View>
    </View>
  );

  return BottomShadowLine({ component });
};