import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { DefaultAlert, DualOptionButtons, TypoGraphyOpenSansBold } from 'components';
import { BurguerMenuDisplay, TouchableBurguerMenu, } from './BurguerMenuButton.Ui';

import { signOutAsync, navigateToImpersonate, navigateToAuthScreen } from '../../../store/authentication';
import { navigateToProfile, navigateToEmployeeList, navigateToQRForm, navigateToEditBusinessProfile } from '../../../store/providerCatalogProducts';
import { navigateToRejectedProduct } from '../../../store/consumption/products';
import styles from './BurguerMenuButton.component.styles';
import { navigateToEditDisplayOrder } from '../../../store/filterCatalogCarte';
const BurguerMenuPopUp = React.forwardRef((props, ref) => <DefaultAlert ref={ref} {...props} />);
BurguerMenuPopUp.displayName = 'BurguerMenuPopUp';
const ConfirmCloseSessionPopUp = React.forwardRef((props, ref) => <DefaultAlert ref={ref} {...props} />);
ConfirmCloseSessionPopUp.displayName = 'ConfirmCloseSessionPopUp';

class BurguerMenuButton extends React.Component {
  burguerMenuRef = React.createRef();
  confirmCloseSessionPopUpRef = React.createRef();

  state = {
    hasToDisplayImpersonateButton: false
  }

  componentDidMount() {
    const displayImpersonate = this.props.hasToDisplayImpersonateButton;
    if (displayImpersonate) this.setState({ hasToDisplayImpersonateButton: true })
  }

  onPressNavigate = (navigateTo) => {
    this.burguerMenuRef.close();
    navigateTo();
  }
  async signOutApplicationAsync() {
    await this.props.signOutAsync();
    this.confirmCloseSessionPopUpRef.close();
    this.props.navigateToAuthScreen();
  }

  showAlert = () => {
    this.burguerMenuRef.close();
    this.confirmCloseSessionPopUpRef.open()
  }

  pressImpersonateUser = () => {
    const { navigateToImpersonate } = this.props;
    this.setState({ hasToDisplayImpersonateButton: false })
    this.onPressNavigate(navigateToImpersonate)
  }

  renderBurguerMenu = () => {
    const {
      navigateToProfile,
      navigateToEmployeeList,
      navigateToRejectedProduct,
      navigateToQRForm,
      navigateToEditBusinessProfile,
      navigateToEditDisplayOrder
    } = this.props;

    return (
      <BurguerMenuPopUp
        ref={(ref) => { this.burguerMenuRef = ref; }}
        options={(
          <BurguerMenuDisplay
            onPressClose={() => this.burguerMenuRef.close()}
            onPressSeeProfile={() => this.onPressNavigate(navigateToProfile)}
            onPressCheckEmployees={() => this.onPressNavigate(navigateToEmployeeList)}
            onPressCheckRejectedProducts={() => this.onPressNavigate(navigateToRejectedProduct)}
            onPressCloseSession={() => this.showAlert()}
            onPressSeeQRForm={() => this.onPressNavigate(navigateToQRForm)}
            onPressSeeBusiness={() => this.onPressNavigate(() => { navigateToEditBusinessProfile(true) })}
            onPressEditDisplayOrder={() => this.onPressNavigate(navigateToEditDisplayOrder)}
            onPressImpersonateUsers={() => this.pressImpersonateUser()}
            displayImpersonateOption={this.state.hasToDisplayImpersonateButton}
          />
        )}
      />
    );
  }

  renderConfirmCloseSessionPopUp = () => {

    return (
      <ConfirmCloseSessionPopUp
        ref={(ref) => { this.confirmCloseSessionPopUpRef = ref; }}
        options={(

          <View style={styles.delete_alert_wrapper}>
            <TypoGraphyOpenSansBold text={"¿Está seguro de que desea cerrar sesión?"} style={styles.delete_alert_text} />

            <DualOptionButtons
              textLeft={"Cancelar"}
              textRight={"Salir"}
              onPressLeft={() => this.confirmCloseSessionPopUpRef.close()}
              onPressRight={async () => await this.signOutApplicationAsync()}
            />
          </View>
        )}
      />
    );
  }

  render() {
    return (
      <View>
        <TouchableBurguerMenu onPress={() => this.burguerMenuRef.open()} />
        {this.renderConfirmCloseSessionPopUp()}
        {this.renderBurguerMenu()}

      </View>
    );
  }
}


BurguerMenuButton.propTypes = {
  navigateToProfile: PropTypes.func.isRequired,
  navigateToEmployeeList: PropTypes.func.isRequired,
  navigateToRejectedProduct: PropTypes.func.isRequired,
  navigateToAuthScreen: PropTypes.func.isRequired,
  navigateToQRForm: PropTypes.func.isRequired,
  navigateToEditBusinessProfile: PropTypes.func.isRequired,
  navigateToImpersonate: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  navigateToProfile,
  navigateToEmployeeList,
  navigateToRejectedProduct,
  navigateToAuthScreen,
  signOutAsync,
  navigateToQRForm,
  navigateToEditBusinessProfile,
  navigateToEditDisplayOrder,
  navigateToImpersonate
};

BurguerMenuButton = connect(null, mapDispatchToProps)(BurguerMenuButton);

export { BurguerMenuButton };
