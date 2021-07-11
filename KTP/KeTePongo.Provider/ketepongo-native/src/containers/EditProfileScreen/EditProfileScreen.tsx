import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, SafeAreaView  } from 'react-native';
import { TITLES, COUNTRIES } from 'constants';
import {
  CodeNumberInputs,
  DefaultAlert,
  DefaultFlatList,
  DefaultInputError
} from 'components';
import {
  EditProfileScreenHeader,
  EditProfileHeading,
  EditPhoneInput,
  RegularInput,
  EditProfileButton,
  HelperMessage,
  CountrySelectionHeading,
  CountrySearch,
  CountryPhoneCode,
  InstructionForConfirmationCode,
  PasswordInput,
  HelperTextWithLink
} from './EditProfileScreen.UI';

import styles from './EditProfileScreen.component.styles';
import {
  navigateBack,
  changeEmailRequested,
  confirmChangeEmail,
  changePhoneRequested,
  confirmChangePhone,
  changeUserNameRequested,
  changeUserPasswordRequested,
  navigateToForgotPassword

} from '../../store/authentication';

import { withAuthentication } from "../../HOC";
import { AppState, ErrorDetail} from "store";

const AlertShowCountryList = React.forwardRef((props, ref) => <DefaultAlert ref={ref} {...props} />);
AlertShowCountryList.displayName = 'AlertShowCountryList';

class EditProfileScreen extends React.Component {
  alertPhoneCountriesRef = React.createRef();

  state = {
    code: '',
    securedPasswordView: true,
    securedNewPasswordView: true,
    originalUserData: '',
    userData: '',
    title: '',
    heading: '',
    countries: undefined,
    filterCountries: undefined,
    originalselectedCountry: COUNTRIES.ES,
    selectedCountry: COUNTRIES.ES,
    displayConfirmationCode: false
  }

  componentDidMount() {
    const userData = this.props.navigation.getParam('userData', undefined);
    const title = this.props.navigation.getParam('title', '');
    const heading = this.props.navigation.getParam('heading', '');

    if (title && heading || userData) {
      let countries;
      if (title === TITLES.editPhone) {
        countries = Object.values(COUNTRIES).sort((a, b) => {
          if (a.name.spa > b.name.spa) {
            return 1;
          }

          if (a.name.spa < b.name.spa) {
            return -1;
          }

          return 0;
        });
      }

      this.setState({
        originalUserData: userData,
        userData,
        title,
        heading,
        countries,
        filteredCountries: countries
      });
    }
  }

  renderHelperMessage = () => {
    const { title } = this.state;
    let message;
    if (title === TITLES.nameOfUser) {
      message = ``;
    }

    if (title === TITLES.editUserEmail) {
      message = `Te mandaremos un correo con un código de validación.`;
    }

    return <HelperMessage message={message} />;
  };

  renderActionButton = () => {
    const {
      title,
      userData,
      originalUserData,
      originalselectedCountry,
      selectedCountry,
      displayConfirmationCode
    } = this.state;
    const {error} = this.props;
    const serverValidationErrors = error?.validationErrors?error?.validationErrors:{}
    let finishEditCallBack;

    if (title === TITLES.nameOfUser) {
      const { navigation, changeUserNameRequested } = this.props;
      finishEditCallBack = navigation.getParam('finishEditCallBack');
      return (
        <View>
        <EditProfileButton
          btnText={'Confirmar'}
          onPress={() => changeUserNameRequested({ userName: userData, renderAlertUserNameChanged: finishEditCallBack })}
          userDataHasChange={originalUserData !== userData && userData!==""}
        />
        <DefaultInputError errorMessage={error?.description && error?.description!==""?"No se pudo actualizar el nombre. Por favor, inténtelo de nuevo": ""} />
        </View>
      );
    }

    if (title === TITLES.editUserEmail) {
      const { navigation, changeEmailRequested, confirmChangeEmail } = this.props;
      finishEditCallBack = navigation.getParam('finishEditCallBack');

      return (
        <View>
        {(!displayConfirmationCode) ?
            <>
              <EditProfileButton
                btnText={'Siguiente'}
                onPress={() => {
                  this.setState({ displayConfirmationCode: true })
                  changeEmailRequested({ email: userData, renderAlertEmailVerification: finishEditCallBack });
                }}
                userDataHasChange={originalUserData !== userData}
              />
              <DefaultInputError errorMessage={serverValidationErrors["newemail"]} />
            </>
            :
            <>
              <EditProfileButton
                btnText={'Confirmar'}
                onPress={() => {
                  // this.setState({ displayConfirmationCode: true })
                  confirmChangeEmail({ code: this.state.code });
                }}
                userDataHasChange={originalUserData !== userData}
              />
              <DefaultInputError errorMessage={serverValidationErrors["newemail"]} />
            </>
          }
        </View>
      );
    }

    if (title === TITLES.editPhone) {
      const { navigation, changePhoneRequested, confirmChangePhone } = this.props;
      finishEditCallBack = navigation.getParam('finishEditCallBack');
      return (
        <View>
        {(!displayConfirmationCode) ?
          <EditProfileButton
            btnText={'Siguiente'}
            onPress={() => {
              this.setState({ displayConfirmationCode: true })
              changePhoneRequested({ phone: userData, renderAlertPhoneVerification: finishEditCallBack });
            }}
            userDataHasChange={originalUserData !== userData}
          />
          :
          <EditProfileButton
            btnText={'Confirmar'}
            onPress={() => {
              // this.setState({ displayConfirmationCode: true })
              confirmChangePhone({ code: this.state.code });
            }}
            userDataHasChange={originalUserData !== userData}
          />
        }
      </View>
      );
    }

    if (title === TITLES.changePassword) {
      const { navigation, changeUserPasswordRequested } = this.props;
      finishEditCallBack = navigation.getParam('finishEditCallBack');
      return (
        <View style={styles.password_btn_wrapper}>
          <EditProfileButton
            btnText={'Confirmar'}
            onPress={() => changeUserPasswordRequested({ oldPassword: originalUserData, newPassword: userData, renderAlertUserPasswordChanged: finishEditCallBack })}
            userDataHasChange={originalUserData !== userData && originalUserData !== ''}
          />
        </View>
      );
    }
  }
  updateCode = (code) => {
    this.setState({ code: code.join("") })
  }
  renderForm = () => {
    const {
      title,
      originalUserData,
      userData,
      selectedCountry,
      securedPasswordView,
      securedNewPasswordView,
      displayConfirmationCode,
    } = this.state;
    const { styles, error } = this.props;
    const serverValidationErrors = error?.validationErrors?error?.validationErrors:{}

    if (displayConfirmationCode) {
      return (
        <View>
          <InstructionForConfirmationCode />

          <View style={styles.input_code_container}>
            <CodeNumberInputs
              lineStyle={styles.input_code_line}
              numberOfInputs={6}
              onPressSubmit={(code) => this.updateCode(code)}
            />
          </View>

          <HelperTextWithLink
            heading={"¿No has recibido el código? Pulsa "}
            onPress={() => console.log('help with code')}
          />
        </View>
      );
    }

    if (title === TITLES.changePassword) {
      return (
        <View>
          <PasswordInput
            placeholder={"contraseña"}
            password={originalUserData}
            onChangeText={(password) => this.setState({ originalUserData: password })}
            displayValue={securedPasswordView}
            onPressHide={() => this.setState({ securedPasswordView: false })}
            onPressShow={() => this.setState({ securedPasswordView: true })}
          />
          <DefaultInputError style={{marginTop:-20, marginBottom: 20}} errorMessage={serverValidationErrors["currentpassword"]} />
          <HelperTextWithLink
            heading={"¿Has olvidado tu contraseña? Pulsa "}
            onPress={() => this.props.navigateToForgotPassword()}
          />

          <EditProfileHeading heading={"Escribe tu nueva contraseña"} />

          <PasswordInput
            placeholder={"nueva contraseña"}
            password={userData}
            onChangeText={(password) => this.setState({ userData: password })}
            displayValue={securedNewPasswordView}
            onPressHide={() => this.setState({ securedNewPasswordView: false })}
            onPressShow={() => this.setState({ securedNewPasswordView: true })}
          />
          {serverValidationErrors["password"] && serverValidationErrors["password"].map(x=><View><DefaultInputError errorMessage={x} /></View>)}


        </View>
      );
    }

    if (title === TITLES.editPhone) {
      return (
        <EditPhoneInput
          value={userData}
          country={selectedCountry}
          onChangeText={(userData) => this.setState({ userData })}
          onPressChangeCountry={() => this.alertPhoneCountriesRef.open()}
          onPressX={() => console.log('pressed X icon')}
          keyboardType={'numeric'}
        />
      );
    }

    return (
      <RegularInput
        value={userData}
        onChangeText={(userData) => this.setState({ userData })}
        onPressX={() => this.setState({ userData:'' })}
        keyboardType={TITLES.editUserEmail ? 'email-address' : 'default'}
      />
    );

  };

  onPressSelectCountry = (country) => {
    this.alertPhoneCountriesRef.close();
    this.setState({ selectedCountry: country });
  }

  renderSingleCountryItem = ({ item, index }) => (
    <CountryPhoneCode
      key={index}
      country={item}
      onPressSelect={(country) => this.onPressSelectCountry(country)}
    />
  );

  renderCountryList = () => {
    const { filteredCountries } = this.state;
    if (!filteredCountries) {
      return null;
    }

    return (
      <DefaultFlatList
        list={filteredCountries}
        renderSingleListItem={(item, index) => renderSingleCountryItem({ item, index })}
        maxToRenderPerBatch={15}
      />
    );
  }

  searchCountry = (country) => {
    const { countries } = this.state;

    if (!countries) {
      return null;
    }

    const filteredCountries = countries.filter((countryObj) => countryObj.name.spa.includes(country));
    this.setState({ filteredCountries });
  };

  renderPhoneCountryOptions = () => (
    <AlertShowCountryList
      ref={(ref) => { this.alertPhoneCountriesRef = ref; }}
      options={(
        <View style={styles.modal}>
          <View style={styles.modal_top_wrapper}>
            <CountrySelectionHeading />
            <CountrySearch onChangeText={(country) => this.searchCountry(country)} />
          </View>
          <View style={{ flex: 1 }}>
            {this.renderCountryList()}
          </View>
        </View>
      )}
    />
  );

  renderHeading = () => {
    const { heading, displayConfirmationCode } = this.state;
    if (displayConfirmationCode) {
      return null;
    }

    return <EditProfileHeading heading={heading} />;
  };

  render() {
    const { navigateBack, error } = this.props;
    const { title } = this.state;

    return (
      <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <EditProfileScreenHeader onPressBack={() => navigateBack()} title={title} />
        {this.renderPhoneCountryOptions()}

        <View style={styles.body}>
          {this.renderHeading()}
          {this.renderForm()}
          {this.renderActionButton()}
          {this.renderHelperMessage()}
        </View>
      </View >
      </SafeAreaView>
    );
  }
}

EditProfileScreen.defaultProps = {
  styles
};

EditProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  navigateBack: PropTypes.func.isRequired,
  changeEmailRequested: PropTypes.func.isRequired,
  changePhoneRequested: PropTypes.func.isRequired,
  changeUserNameRequested: PropTypes.func.isRequired,
  confirmChangeEmail: PropTypes.func.isRequired,
  confirmChangePhone: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  changeUserPasswordRequested:PropTypes.func.isRequired,
  navigateToForgotPassword: PropTypes.func.isRequired
};

const mapStateToProps = (state: AppState) => {
  return {
    error: state.authentication.error
  };
};

const mapDispatchToProps = {
  navigateBack,
  changeEmailRequested,
  changePhoneRequested,
  changeUserNameRequested,
  confirmChangeEmail,
  confirmChangePhone,
  changeUserPasswordRequested,
  navigateToForgotPassword
};

EditProfileScreen = withAuthentication((connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)))

export { EditProfileScreen };
