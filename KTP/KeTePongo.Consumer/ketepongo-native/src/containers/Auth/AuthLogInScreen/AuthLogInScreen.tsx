import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, KeyboardAvoidingView, BackHandler,SafeAreaView,TouchableWithoutFeedback, Keyboard } from "react-native";
import { STRINGS, LAYOUT } from 'constants';
import {
  AuthHeader,
  AuthUserForm,
  GoogleSignInButton,
  Spinner,
  TermsAndConditionsFooter,
  DefaultServerErrorMessage,
  DefaultAcceptCancelDialog,
  DefaultAlert
} from 'components';
import { LoginButton, WelcomeHeading, NotAllowed } from './AuthLogInScreen.UI';
import Background from '../../../../assets/All_Icons/basic/background.svg';
import { AppState, ErrorDetail } from "store";

import styles from "./AuthLogInScreen.component.styles";
import {
  getAccessTokenUsingKeTePongoServer,
  navigateToAuthScreen,
  navigateToForgotPassword,
  ActivateAsConsumer
} from "../../../store/authentication";
import { withAuthentication } from "../../../HOC";

 interface IState{
   email: string;
   password: string;
 }

class AuthLogInScreen extends React.Component<IProps, IState> {
  state = {
    email: '',
    password: '',
    isValidEmail: false,
    isValidPassword: false,
    errorValidatorPasswordMessage: '',
    errorValidatorNameMessage: '',
    hasToDisplayAdminProviderProfileAlert: false,
    hasToDisplayNoAdminProviderProfileAlert : false
  }

  componentWillReceiveProps(nextProps: IProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.errorRequest !== this.props.errorRequest) {
      const serverErrorValidations = nextProps.errorRequest?.validationErrors?nextProps.errorRequest?.validationErrors:{}
      this.setState({
        invalidEmail: serverErrorValidations["email"] ? true: false,
        errorValidatorEmailMessage: serverErrorValidations["email"],
        invalidPassword: serverErrorValidations["password"] || serverErrorValidations["error_description"] ? true: false,
        errorValidatorPasswordMessage: serverErrorValidations["password"] ? serverErrorValidations["password"] : serverErrorValidations["error_description"]
      });
    }
    if(nextProps.providerUser === "PROVIDER ADMIN USER"){
      this.setState({
        hasToDisplayAdminProviderProfileAlert: true
      });
    }
    if(nextProps.providerUser === "PROVIDER USER"){
      this.setState({
        hasToDisplayNoAdminProviderProfileAlert: true
      });
    }
  }
  onPressOk = ()=>{
    this.setState({hasToDisplayAdminProviderProfileAlert: false})
    this.props.ActivateAsConsumer({email:this.state.email, password: this.state.password});
  }
 
  onPressCancel = ()=>{
    this.setState({hasToDisplayAdminProviderProfileAlert: false});
  }
  signInUsingKetePongoServer() {
    if (this.props.isWaitingAnswerFromServer) {
      return;
    }
    this.props.getAccessTokenUsingKeTePongoServer({email:this.state.email, password: this.state.password});
  }
  handleChange = (value, name) => {
    this.setState({ [name]: value })
  }

  render() {
    if (this.props.isWaitingAnswerFromServer) {
      return <Spinner />;
    }
    const { errorRequest } = this.props;
    const { height, width } = LAYOUT.WINDOW;

    return (
      <SafeAreaView style={{flex:1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Background height={height} width={width} style={styles.background} />
        {this.state.hasToDisplayAdminProviderProfileAlert && <DefaultAcceptCancelDialog onPressOk={this.onPressOk}
        onPressCancel={this.onPressCancel.bind(this)} onPressOut={this.onPressCancel.bind(this)}
          text={"La cuenta asociada a su usuario no tiene características de consumidor, ¿desea activarlas?"}/>}

 {this.state.hasToDisplayNoAdminProviderProfileAlert && <DefaultAlert isVisible={true}
          options={
            (<NotAllowed onPress={()=> this.setState({hasToDisplayNoAdminProviderProfileAlert: false})}/>)
          } />
        }
        <AuthHeader onPressBack={() => this.props.navigateToAuthScreen()} />

        <WelcomeHeading />
        {errorRequest && errorRequest.status!=="400" && <DefaultServerErrorMessage
          error={errorRequest}
        />}
        <KeyboardAvoidingView
          behavior="height"
          style={styles.fillScreen}
        >
        <View style={styles.body}>
          <AuthUserForm
            onChangeEmail={this.handleChange}
            onChangePassword={this.handleChange}
            onChangeName={this.handleChange}
            data={this.state}
            type={STRINGS.login}
            onSubmit={this.signInUsingKetePongoServer.bind(this)}
            onCheckEnteredPassword={()=>{}}
            onChangeAcceptPolicy={this.handleChange}
            navigateToForgotPassword={this.props.navigateToForgotPassword}
            serverErrorValidations={errorRequest?.validationErrors?errorRequest?.validationErrors:{}}
          />

        </View>

        <View style={styles.fillScreen} />

        <View style={styles.btn_wrapper}>
          {/*<GoogleSignInButton />*/}
          <LoginButton onPress={() => this.signInUsingKetePongoServer()} />
        </View>

        <View style={styles.footer_wrapper}>
          <TermsAndConditionsFooter />
        </View>
      </KeyboardAvoidingView>
      </View >
      </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

AuthLogInScreen.propTypes = {
  isWaitingAnswerFromServer: PropTypes.bool.isRequired,
  getAccessTokenUsingKeTePongoServer: PropTypes.func.isRequired,
  navigateToAuthScreen: PropTypes.func.isRequired,
  errorRequest: PropTypes.object,
  navigateToForgotPassword: PropTypes.func,
  providerUser: PropTypes.string.isRequired,
  ActivateAsConsumer: PropTypes.func
};

const mapStateToProps = (state : AppState) => {
  return {
    isWaitingAnswerFromServer: state.authentication.isWaitingAnswerFromServer,
    errorRequest: state.authentication.error,
    providerUser: state.authentication.providerUser
  };
};

interface IPropsFromState{
  isWaitingAnswerFromServer: boolean;
  errorRequest: ErrorDetail;
  providerUser: string;
}

interface IProps extends IPropsFromState{
  getAccessTokenUsingKeTePongoServer: Function;
  navigateToAuthScreen: Function;
  navigateToForgotPassword: Function;
  ActivateAsConsumer:Function;
}

const mapDisaptchToProps = {
  getAccessTokenUsingKeTePongoServer,
  navigateToAuthScreen,
  navigateToForgotPassword,
  ActivateAsConsumer
};

AuthLogInScreen = withAuthentication((connect(mapStateToProps, mapDisaptchToProps)(AuthLogInScreen)), true);

export { AuthLogInScreen };
