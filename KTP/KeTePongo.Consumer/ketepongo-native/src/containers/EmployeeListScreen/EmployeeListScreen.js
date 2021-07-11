import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  EmployeeListScreenHeader,
  EmployeeScrollList,
  AddEmployeeButton
} from './EmployeeListScreen.UI';

import styles from './EmployeeListScreen.component.styles';
import {
  navigateToEditEmployee,
  navigateToCreateEmployee,
  navigateToCatalog
} from '../../store/employee';
import { withAuthentication } from "../../HOC";

class EmployeeListScreen extends React.Component {
  state = {
    userName: '',
    list: []
  }

  componentDidMount() {
    const { list } = this.props;

    if (list) {
      this.setState({ list });
    }
  }

  onSearchEmployee = (userName) => {
    const list = this.props.list.filter((user) => user.name.includes(userName));
    this.setState({ list, userName });
  }

  renderEmployeeList = () => {
    const { list } = this.state;
    if (!list || list.length === 0) {
      return null;
    }

    return (
      <EmployeeScrollList
        list={list}
        onPressEdit={(employee) => this.props.navigateToEditEmployee(employee)}
        onPressDelete={() => console.log('pressed delete employee')}/>
    );
  }

  render() {
    const {
      styles,
      navigateToCreateEmployee,
      navigateToCatalog
    } = this.props;

    return (
      <View style={styles.fillSpace}>
        <EmployeeListScreenHeader
          onPressBack={() => navigateToCatalog()}
          onPressAccept={() => navigateToCatalog()}
          onChangeText={(userName) => this.onSearchEmployee(userName)}
          userName={this.state.userName}
        />

        <View style={styles.body}>
          <View style={styles.fillSpace}>
            {this.renderEmployeeList()}
          </View>
          <View style={styles.add_employee_icon}>
            <AddEmployeeButton onPress={() => navigateToCreateEmployee()}/>
          </View>
        </View>
      </View>
    );
  }
}


EmployeeListScreen.defaultProps = {
  styles
};

EmployeeListScreen.propTypes = {
  list: PropTypes.array.isRequired,
  navigateToEditEmployee: PropTypes.func.isRequired,
  navigateToCreateEmployee: PropTypes.func.isRequired,
  navigateToCatalog: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    list: state.employees
  };
};

const mapDispatchToProps = {
  navigateToEditEmployee,
  navigateToCreateEmployee,
  navigateToCatalog
};

EmployeeListScreen = withAuthentication((connect(mapStateToProps, mapDispatchToProps)(EmployeeListScreen)));

export { EmployeeListScreen };
