import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  EmployeeBasicInformationInputs,
  EmployeeCRUDHeader,
  EmployeeRollHeading,
  CancelButton,
  OkButton,
  AdminSelectedTouchable,
  EmployeeSelectedTouchable
} from './EmployeeCRUDScreen.UI';

import styles from './EmployeeCRUDScreen.component.styles';
import { withAuthentication } from "../../HOC";

class EmployeeCRUDScreen extends React.Component {
  state = {
    employee: {
      name: '',
      email: '',
      telephone: '',
      role: '',
      id: undefined
    }
  }

  componentDidMount() {
    const employee = this.props.navigation.getParam('employee');
    if (employee) {
      this.setState({ employee: JSON.parse(employee) });
    }
  }

  renderRoleSelection = () => {
    const { employee } = this.state;
    const { role } = employee;

    if (!role || role === '' || role === 'employee') {
      return <EmployeeSelectedTouchable onPress={() => this.setState({
        employee: {
          ...employee,
          role: 'admin'
          }
        })
      } />;
    }

    return <AdminSelectedTouchable onPress={() => this.setState({
      employee: {
        ...employee,
        role: 'employee'
        }
      })
    } />;
  };

  renderButtons = () => {
    let okButton = <OkButton onPress={() => console.log('add new user')} btnText={"Agregar usuario"} />;

    if (this.state.employee.id) {
      okButton = <OkButton onPress={() => console.log('save employee')} btnText={"Aceptar cambios"} />;
    }

    return (
      <View style={styles.btn_wrapper}>
        <CancelButton onPressCancel={() => console.log('press cancel')} />
        {okButton}
      </View>
    );
  };

  renderHeader = (id) => (
    <EmployeeCRUDHeader
      onPressBackArrow={() => console.log('pressed back')}
      headerText={!id ? "Añadir Usuario" : "Editar Usuario"}
    />
  );

  render() {
    const { employee } = this.state;
    const {
      name,
      email,
      telephone,
      id,
    } = employee;

    return (
      <View style={styles.fillScreen}>
        {this.renderHeader(id)}

        <View style={styles.body}>
          <EmployeeBasicInformationInputs
            name={name}
            email={email}
            telephone={String(telephone)}
            onChangeName={(name) => this.setState({
              employee: {
                ...employee,
                name
              }
            })}
            onChangeEmail={(email) => this.setState({
              employee: {
                ...employee,
                email
              }
            })}
            onChangeTelephone={(telephone) => this.setState({
              employee: {
                ...employee,
                telephone
              }
            })}
          />

          <EmployeeRollHeading />

          {/* @TODO Images with touchable */}
          {this.renderRoleSelection()}
          {this.renderButtons()}
        </View>
      </View>
    );
  }
}

EmployeeCRUDScreen.defaultProps = {
  styles
};

EmployeeCRUDScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired
};


const mapDispatchToProps = {

};

EmployeeCRUDScreen = withAuthentication((connect(null, mapDispatchToProps)(EmployeeCRUDScreen)));

export { EmployeeCRUDScreen };
