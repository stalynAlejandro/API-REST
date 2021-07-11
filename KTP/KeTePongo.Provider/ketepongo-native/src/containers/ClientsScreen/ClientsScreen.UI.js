import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View } from 'react-native';
import {
  ClientEmailAndIcon,
  ClientPhoneAndIcon,
  ClientUserNameAndIcon,
  DefaultButton,
  LinkProductButton,
  RejectLinkButton,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansSemiBold
} from 'components';

import styles from './ClientsScreen.component.styles';

export const LinkedClientAlert = ({ tradeName, onPress }) => (
  <View style={styles.alert_container}>
    <View style={styles.top_alert_text_wrapper}>
      <TypoGraphyOpenSans text={"¡ENHORABUENA!"} style={styles.main_font_14} />
    </View>
    <View>
      <Text style={styles.middle_alert_text}>
        <TypoGraphyOpenSans text={"Has enlazado "} style={styles.main_font_14} />
        <TypoGraphyOpenSansSemiBold text={tradeName} style={styles.main_font_14} />
        <TypoGraphyOpenSans text={" a tus clientes."} style={styles.main_font_14} />
      </Text>
    </View>
    <View style={styles.btn_container}>
      <DefaultButton
        onPress={() => onPress()}
        btnText={<TypoGraphyOpenSansBold text={"Ok"} style={styles.btn_text_ok} />}
        btnStyle={styles.btn_ok}
      />
    </View>
  </View>
);

LinkedClientAlert.propTypes = {
  tradeName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const ClientCardDetail = ({ icon, detail }) => (
  <View style={styles.client_card_detail_wrapper}>
    {icon}
    <TypoGraphyOpenSansLight text={detail} style={styles.card_detail_text} />
  </View>
);

ClientCardDetail.propTypes = {
  icon: PropTypes.element.isRequired,
  detail: PropTypes.string.isRequired
};

export const EmployeeCard = ({ employee }) => (
  <View style={styles.pending_card_employee_wrapper}>
    <View style={styles.client_detail_wrapper}>
      <ClientUserNameAndIcon name={employee.name} />
    </View>  
    <View style={styles.client_detail_wrapper}>
      <ClientPhoneAndIcon phone={employee.phone} />
    </View>  
    <View style={styles.client_emaill_wrapper}>
      <ClientEmailAndIcon email={employee.email} />
    </View>  
  </View>
);

EmployeeCard.propTypes = {
  employee: PropTypes.object.isRequired
};

export const PendingClientCard = ({
  client,
  employeeList,
  onPressLink,
  onPressReject
}) => (
  <View style={styles.pending_client_container}>
    <TypoGraphyOpenSansBold text={client.tradeName} style={styles.pending_card_tradeName} />
    <ScrollView>
      <View>
        {employeeList}
      </View>
    </ScrollView>
    <View style={styles.btn_container}>
      <RejectLinkButton onPress={() => onPressReject()} />
      <LinkProductButton onPress={() => onPressLink()} />
    </View>
  </View>
);

PendingClientCard.propTypes = {
  client: PropTypes.object.isRequired,
  employeeList: PropTypes.array.isRequired,
  onPressLink: PropTypes.func.isRequired,
  onPressReject: PropTypes.func.isRequired
};
