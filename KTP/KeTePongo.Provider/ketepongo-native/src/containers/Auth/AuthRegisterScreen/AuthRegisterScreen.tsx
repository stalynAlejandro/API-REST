import React from 'react';
import { View, SafeAreaView, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { STRINGS, LAYOUT } from 'constants';
import {
  AuthHeader,
  AuthUserForm,
  TypoGraphyOpenSansBold,
  ContinueButton,
  TypoGraphyOpenSans,
  Spinner,
  DefaultServerErrorMessage
} from 'components';

import styles from './AuthRegisterScreen.component.styles';
import FirstStepSquareIcon from '../../../../assets/All_Icons/loader/first_square_of_four.svg';
import { navigateBack, registerUser } from '../../../store/authentication';
import * as EmailValidator from 'email-validator';
import * as PasswordValidator from 'password-validator-minimalist';
import Background from '../../../../assets/All_Icons/basic/background.svg';
import { withAuthentication } from "../../../HOC";
import { AppState, ErrorDetail } from "store";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";

interface IState{
  email: string;
  password: string;
  invalidEmail: boolean;
  invalidPassword: boolean;
  name: string;
  invalidName: boolean;
  errorValidatorEmailMessage: string;
  errorValidatorPasswordMessage: string;
  errorValidatorNameMessage: string;
  acceptPolicy:boolean;
  errorValidatorAcceptPolicyMessage:string;
  invalidAcceptPolicy: boolean;
}

class AuthRegisterScreen extends React.Component<IProps,IState> {
  state = {
    email: '',
    password: '',
    invalidEmail: false,
    invalidPassword: false,
    name:'',
    invalidName: false,
    errorValidatorEmailMessage: '',
    errorValidatorPasswordMessage: '',
    errorValidatorNameMessage: '',
    acceptPolicy:false,
    errorValidatorAcceptPolicyMessage:'',
    invalidAcceptPolicy:false
  }

  componentWillReceiveProps(nextProps: IProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.errorRequest !== this.props.errorRequest) {
      const serverErrorValidations = nextProps.errorRequest?.validationErrors?nextProps.errorRequest?.validationErrors:{}
      this.setState({
        invalidEmail: serverErrorValidations["email"] ? true: false,
        errorValidatorEmailMessage: serverErrorValidations["email"],
        invalidPassword: serverErrorValidations["password"] ? true: false,
        errorValidatorPasswordMessage: serverErrorValidations["password"],
        invalidName:  serverErrorValidations["name"] ? true: false,
        errorValidatorNameMessage: serverErrorValidations["name"]
      });
    }
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.hasSentNewOrderSuccesfullyToServer) {
      this.alertOrderConfirmedRef.open();
      this.props.resetOrderServerStatus();
    }
  }

  onPressSubmitNewUser = () => {
    this.checkEmail()
    this.checkEnteredPassword()
    this.checkSubmittedName();
    this.checkAcceptPolicy();
    const { invalidEmail, invalidPassword, invalidName, invalidAcceptPolicy } = this.state;
    if (!invalidEmail && !invalidPassword && !invalidName && !invalidAcceptPolicy ) {
      this.props.registerUser({...this.state,...{repeatPassword: this.state.password}})
    }
  }

  checkEmail = () => {
    const { email } = this.state;
    if (EmailValidator.validate(email)) {
      this.setState({ invalidEmail: false });
      this.setState({ errorValidatorEmailMessage: '' })
    }
    else {
      this.setState({ invalidEmail: true });
      this.setState({ errorValidatorEmailMessage: 'El Email no es válido. Por favor introduce un Email válido.' })
    }
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value })
  }
  handleAcceptPolicyChange=(value)=>{
    this.setState({ acceptPolicy: value })
  }
  checkEnteredPassword = () => {
    const { password } = this.state;
    var passwordValidator = PasswordValidator.validate(password, {
      lowercase: true,
      uppercase: true,
      number: true,
      specialChar: true
    }, 8)
    if (!passwordValidator.isValidated) {
      this.setState({ invalidPassword: true });
      var errorValidatorMessage = ''
      if (!passwordValidator.has_specialChar)
        errorValidatorMessage = 'La contraseña tiene que contener mínimo 1 carácter especial'
      if (!passwordValidator.has_number)
        errorValidatorMessage = 'La contraseña tiene que contener mínimo 1 número'
      if (!passwordValidator.has_uppercase)
        errorValidatorMessage = 'La contraseña tiene que contener mínimo 1 letra mayúscula'
      if (!passwordValidator.has_lowercase)
        errorValidatorMessage = 'La contraseña tiene que contener mínimo 1 letra minúscula'
      if (!passwordValidator.has_minimum_length || password.length> 20)
        errorValidatorMessage = 'La contraseña tiene que contener mínimo 8 carácteres y máximo 20 carácteres'

      this.setState({ errorValidatorPasswordMessage: errorValidatorMessage })
    }
    else {
      this.setState({ invalidPassword: false })
      this.setState({ errorValidatorPasswordMessage: '' })
    }
  }

  checkSubmittedName = () =>{
    const {name} = this.state;
    if(name.length < 2){
        this.setState({ invalidName: true, errorValidatorNameMessage: "Por favor, escriba un nombre" })
    }else{
        this.setState({ invalidName: false, errorValidatorNameMessage: "" })
    }
  }
  checkAcceptPolicy = () =>{
    const {acceptPolicy} = this.state;
    if(!acceptPolicy){
        this.setState({ invalidAcceptPolicy: true, errorValidatorAcceptPolicyMessage: "Debe leer y aceptar la politica de privadad y las condiciones determinadas" })
    }else{
        this.setState({ invalidAcceptPolicy: false, errorValidatorAcceptPolicyMessage: "" })
    }
  }

  render() {
    if (this.props.isWaitingAnswerFromServer) {
      return <Spinner />;
    }
    const { errorRequest } = this.props;
    const { height, width } = LAYOUT.WINDOW;

    return (
      <SafeAreaView style={{flex:1}}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View  style={styles.container}>
        <Background height={height} width={width} style={styles.background} />
        <AuthHeader onPressBack={() => this.props.navigateBack()} />

        <TypoGraphyOpenSansBold style={styles.heading} text={"¡Únete a Ketepongo!"} />
          <View style={styles.body}>
            <AuthUserForm
              onChangeEmail={this.handleChange}
              onChangePassword={this.handleChange}
              onChangeName={this.handleChange}
              onCheckEnteredPassword={this.checkEnteredPassword}
              checkEmail={this.checkEmail}
              checkName = {this.checkSubmittedName}
              type={STRINGS.registration}
              data={this.state}
              onSubmit={this.onPressSubmitNewUser}
              onChangeAcceptPolicy={this.handleAcceptPolicyChange}
              serverErrorValidations={errorRequest?.validationErrors?errorRequest?.validationErrors:{}}
            />
          </View>
          {errorRequest && errorRequest.status!=="400" && <DefaultServerErrorMessage
            error={errorRequest}
          />}

          <View >
            <ContinueButton containerStyles={styles.extra_margin} text={"Continuar Registro"} onPress={() => this.onPressSubmitNewUser()} />
          </View>
          <View style={styles.stepper_icon}>
            <FirstStepSquareIcon />
          </View>
      </View >
      </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

AuthRegisterScreen.defaultProps = {
  styles
};

AuthRegisterScreen.propTypes = {
  isWaitingAnswerFromServer: PropTypes.bool.isRequired,
  navigateBack: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  errorRequest: PropTypes.object,
};

const mapDispatchToProps = {
  navigateBack,
  registerUser
};

const mapStateToProps = (state: AppState) :IPropsFromState => {
  return {
    isWaitingAnswerFromServer: state.authentication.isWaitingAnswerFromServer,
    errorRequest: state.authentication.error
  }
}

interface IPropsFromState{
  isWaitingAnswerFromServer: boolean;
  errorRequest: ErrorDetail | null
}

interface IProps extends IPropsFromState{
  navigateBack: Function;
  registerUser: Function;
}


AuthRegisterScreen = withAuthentication((connect(mapStateToProps, mapDispatchToProps)(AuthRegisterScreen)), true);

export { AuthRegisterScreen };
