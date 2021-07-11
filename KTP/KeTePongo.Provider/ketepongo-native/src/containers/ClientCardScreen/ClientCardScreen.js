import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import {
  ClientCardHeading,
  ClientDetail,
  ClientEmployeeCard,
  MainHeading
} from './ClientCardScreen.UI';

import styles from './ClientCardScreen.component.styles';

import { navigateBack } from '../../store/clients';

class ClientCardScreen extends React.Component {

  renderEmployeeList = (employeeList) => employeeList.map((employee, index) => (
    <ClientEmployeeCard key={index} employee={employee} index={index} />
  ));

  render() {
    const { 
      client, 
      navigateBack,
      styles 
    } = this.props;
    const {
      tradeName,
      name,
      email,
      phone,
      address,
      city,
      employeeList,
    } = client;

    return (
      <View style={styles.fillScreen}>
        <ClientCardHeading onPressBack={() => navigateBack()} tradeName={tradeName} />

        <ScrollView>
          <View style={styles.body}>
            <ClientDetail heading={"Cliente"} detail={tradeName || ''} />
            <ClientDetail heading={"Nombre Contacto"} detail={name || ''} />
            <ClientDetail heading={"Email"} detail={email || ''} />
            <ClientDetail heading={"Teléfono"} detail={phone || ''} />
            <ClientDetail heading={"Dirección"} detail={address || ''} />
            <ClientDetail heading={"Población"} detail={city || ''} />

            <View style={styles.employee_heading_wrapper}>
              <MainHeading heading={"Empleados"} />
            </View>

            {this.renderEmployeeList(employeeList)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

ClientCardScreen.defaultProps = {
  styles
};

ClientCardScreen.propTypes = {
  client: PropTypes.object.isRequired,
  navigateBack: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    client: state.clients.selectedClient
  };
};

const mapDispatchToProps = {
  navigateBack
};

ClientCardScreen = connect(mapStateToProps, mapDispatchToProps)(ClientCardScreen);

export { ClientCardScreen };
