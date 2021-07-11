import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import db from "../../store/apis/db";
import AsyncStorage from "@react-native-community/async-storage";

import { DefaultAlert, Spinner, DefaultServerErrorMessage } from 'components';
import {
  ProfileScreenHeader,
  LongInputWithDoubleHeight,
  LongInput,
  ShortInput,
  AdminUserHeading,
  EmployeeUserHeading,
  UserDetailTouchableWithHelper,
  UserDetailTouchable,
  ChangePasswordTouchable,
  CloseAccountTouchable,
  VerificationRequiredWarning,
  ConfirmPhoneChangedWarning,
  ChangeConfirmation,
  PasswordChangeConfirmation
} from './ProfileScreen.UI';
import { TITLES, COLORS, STRINGS } from 'constants';

import styles from './ProfileScreen.component.styles';
import { navigateToEditProfile, navigateToCatalogCarte } from '../../store/authentication';
import { withAuthentication } from "../../HOC";
import { store } from '../../App';
import { errorStatusHandler } from "../../store/errorStatusHandler";

const AlertEmailHasChangeAndVerificationRequired = React.forwardRef((props, ref) => (
  <DefaultAlert ref={ref} {...props} />
));
AlertEmailHasChangeAndVerificationRequired.displayName = 'AlertEmailHasChangeAndVerificationRequired';
const AlertPhoneNumberChanged = React.forwardRef((props, ref) => <DefaultAlert ref={ref} {...props} />);
AlertPhoneNumberChanged.displayName = 'AlertPhoneNumberChanged';

class ProfileScreen extends React.Component {
  alertEmailHasChangedRef = React.createRef();
  alertUserNameHasChangedRef = React.createRef();
  alertPhoneChangedRef = React.createRef();
  alertUserPasswordHasChangedRef = React.createRef();
  state = {
    name: '',
    email: '',
    phone: '',
    isLoading: true,
    hasErroredLoadingData: false,
    error: null
  }

  async componentDidMount() {
    try {
      const result = await (await db.apiUsers({}, store.getState)).get("User");
      this.setState({ name: result.data.name, email: result.data.email, phone: result.data.phoneNumber, isLoading: false });
    } catch (error) {
      this.setState({ hasErroredLoadingData: true, isLoading: false, error: errorStatusHandler(error) });
    }

  }

  alertEmailConfirmationRequiredCallBack = (email) => {
    this.alertEmailHasChangedRef.open();
    this.setState({ email });
  };
  alertUserNameConfirmationCallBack = (name) => {
    this.alertUserNameHasChangedRef.open();
    this.setState({ name });
  };
  alertUserPhoneConfirmationCallBack = (phone) => {
    this.alertPhoneChangedRef.open();
    this.setState({ phone });
  };
  alertUserPasswordConfirmationCallBack = (name) => {
    this.alertUserPasswordHasChangedRef.open();
  };
  alertUserPhoneChangedNotification = () => {
    return (
      <AlertEmailHasChangeAndVerificationRequired
        ref={(ref) => { this.alertPhoneChangedRef = ref; }}
        options={(
          <ChangeConfirmation
            userName={this.state.phone}
            onPress={() => this.alertPhoneChangedRef.close()}
          />
        )}
      />
    );
  }
  alertEmailChangedNotification = () => {
    return (
      <AlertEmailHasChangeAndVerificationRequired
        ref={(ref) => { this.alertEmailHasChangedRef = ref; }}
        options={(
          <VerificationRequiredWarning
            email={this.state.email}
            onPress={() => this.alertEmailHasChangedRef.close()}
          />
        )}
      />
    );
  }
  alertUserNameChangedNotification = () => {
    return (
      <AlertEmailHasChangeAndVerificationRequired
        ref={(ref) => { this.alertUserNameHasChangedRef = ref; }}
        options={(
          <ChangeConfirmation
            userName={this.state.name}
            onPress={() => this.alertUserNameHasChangedRef.close()}
          />
        )}
      />
    );
  }

  alertUserPhoneChangedNotification = () => {
    return (
      <AlertEmailHasChangeAndVerificationRequired
        ref={(ref) => { this.alertPhoneChangedRef = ref; }}
        options={(
          <ChangeConfirmation
            userName={this.state.phone}
            onPress={() => this.alertPhoneChangedRef.close()}
          />
        )}
      />
    );
  }

  alertUserPasswordChangedNotification = () => {
    return (
      <AlertEmailHasChangeAndVerificationRequired
        ref={(ref) => { this.alertUserPasswordHasChangedRef = ref; }}
        options={(
          <PasswordChangeConfirmation
            onPress={() => this.alertUserPasswordHasChangedRef.close()}
          />
        )}
      />
    );
  }

  alertPhoneChangedCallBack = ({ phone }) => {
    this.alertPhoneChangedRef.open();
    this.setState({ phone });
  };

  alertPhoneHasChanged = () => (
    <AlertPhoneNumberChanged
      ref={(ref) => { this.alertPhoneChangedRef = ref; }}
      options={(
        <ConfirmPhoneChangedWarning onPress={() => this.alertPhoneChangedRef.close()} />
      )}
    />
  )

  renderBody = () => {
    const {
      name,
      email,
      phone,
      isLoading,
      hasErroredLoadingData
    } = this.state;

    const {
      styles,
      navigateToEditProfile,
      navigateToCatalogCarte
    } = this.props;

    return (<ScrollView keyboardShouldPersistTaps={"always"}>
      {this.alertEmailChangedNotification()}
      {this.alertUserNameChangedNotification()}
      {this.alertUserPasswordChangedNotification()}
      {this.alertPhoneHasChanged()}
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >

        <View style={styles.body}>
          {/* {this.renderMainProviderData()} */}
          <AdminUserHeading />
          <UserDetailTouchableWithHelper
            heading={"Nombre usuario"}
            onPress={() => navigateToEditProfile({
              userData: name,
              title: TITLES.nameOfUser,
              heading: 'Escribe un nombre de usuario',
              finishEditCallBack: (name) => this.alertUserNameConfirmationCallBack(name)
            })}
            userDetail={name}
            helperText={"Este campo es obligatorio."}
          />

          <UserDetailTouchable
            heading={"Direción de email"}
            onPress={() => navigateToEditProfile({
              userData: email,
              title: TITLES.editUserEmail,
              heading: 'Escribe tu nuevo email',
              finishEditCallBack: (email) => this.alertEmailConfirmationRequiredCallBack(email)
            })}
            userDetail={email}
          />

          <UserDetailTouchable
            heading={"Teléfono móvil"}
            onPress={() => navigateToEditProfile({
              userData: phone,
              title: TITLES.editPhone,
              heading: 'Introduce aquí tu número de teléfono móvil',
              finishEditCallBack: (phone) => this.alertUserPhoneConfirmationCallBack(phone)
            })}
            userDetail={phone}
          />
          
          <View style={styles.btn_wrapper}>
            <ChangePasswordTouchable onPress={() => navigateToEditProfile({
              userData: '',
              title: TITLES.changePassword,
              heading: 'Escribe tu contraseña actual',
              finishEditCallBack: () => this.alertUserPasswordConfirmationCallBack()
            })}
            />
            {/* <CloseAccountTouchable onPress={() => console.log('pressed close account')} /> */}
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={{ height: 200 }} />
    </ScrollView>)
  }
  //

  renderContent = () => {
    const {
      isLoading,
      hasErroredLoadingData,
      error
    } = this.state;
    if (isLoading) {
      return <Spinner />
    }
    if (hasErroredLoadingData) {
      return <View style={styles.container}>
        <View style={styles.body}>
          <DefaultServerErrorMessage containerStyles={{ marginTop: 90 }} error={error} />
        </View>
      </View>
    }
    return this.renderBody();
  }

  render() {
    const {
      styles,
      navigateToEditProfile,
      navigateToCatalogCarte
    } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <StatusBar backgroundColor={COLORS.neutral_min} barStyle="dark-content" />
          <ProfileScreenHeader
            headerText={"Editar Usuario"}
            onPressBack={() => navigateToCatalogCarte()}
            onPressAccept={() => navigateToCatalogCarte()}
          />
          {this.renderContent()}
        </View >
      </SafeAreaView>
    );
  }
}

ProfileScreen.defaultProps = {
  styles
};

ProfileScreen.propTypes = {
  hideSplashScreen: PropTypes.func.isRequired,
  navigateToEditProfile: PropTypes.func.isRequired,
  navigateToCatalogCarte: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  navigateToEditProfile,
  navigateToCatalogCarte
};

ProfileScreen = withAuthentication((connect(null, mapDispatchToProps)(ProfileScreen)));

export { ProfileScreen };
