import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView,SafeAreaView, BackHandler,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AuthHeader, ContinueButton, DefaultServerErrorMessage, Spinner, DefaultAlert, DefaultAcceptCancelDialog } from 'components';
import {
  CodeConfirmationInputs,
  ConfirmationCodeAssitance,
  IntructionsOfCodeConfirmation,
  JoinKetepongoHeading,
  StepIcon,
  ResendConfirmation
} from './AuthConfirmationScreen.UI';

import styles from './AuthConfirmationScreen.component.styles';
import Background from '../../../../assets/All_Icons/basic/background.svg';
import { confirmNewUser, registerBusiness, resendCode, signOutAsync, navigateToAuthScreen } from '../../../store/authentication';
import { LAYOUT } from "constants";
import { withAuthentication } from "../../../HOC";
import { ErrorDetail } from "store";
const AlertCodeResend = React.forwardRef((props, ref) => (
  <DefaultAlert ref={ref} {...props} />
));
AlertCodeResend.displayName = 'AlertCodeResend';
interface IState{
  code: string;
  validationError: Object;
}

class AuthConfirmationScreen extends React.Component<IProps,IState> {
  alertCodeResendRef = React.createRef();
  state = {
    code: '',
    validationError:{},
    hasConfirmedGoingBack: false,
    hasToDisplayLoginAlert: false
  }

  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backAction);
  }

  componentWillUnmount(){
    this.backHandler.remove()
  }

  backAction = () => {
    this.setState({hasToDisplayLoginAlert: true});
    return true
  };

  renderAlertCodeResend = () => {
    this.alertCodeResendRef.open();
  }
  onPressSubmitUserCode = async () => {
    const { code } = this.state;
    const dataToSubmit = {
      businessData:{
        TradeName: this.props.navigation.state.params.dataToSubmit.tradeName,
        Address: this.props.navigation.state.params.dataToSubmit.address,
        StateOrProvince: this.props.navigation.state.params.dataToSubmit.stateOrProvince,
        Town: this.props.navigation.state.params.dataToSubmit.town,
        PostalCode: this.props.navigation.state.params.dataToSubmit.postalCode,
        WelcomeMessage: this.props.navigation.state.params.dataToSubmit.welcomeMessage ? this.props.navigation.state.params.dataToSubmit.welcomeMessage : ""
      },
      sanitaryMeasures: this.props.navigation.state.params.dataToSubmit.sanitaryMeasures,
      imageFile:this.props.navigation.state.params.dataToSubmit.imageUrl && this.props.navigation.state.params.dataToSubmit.imageUrl.uri? this.props.navigation.state.params.dataToSubmit.imageUrl : ""
    };
    if(Platform.OS ==="ios" && dataToSubmit.imageFile && !dataToSubmit.imageFile.fileName){
      dataToSubmit.imageFile.fileName = `${Date.now().toString()}.jpg`;
    }
    if(code.length<6){
      this.setState({ validationError: {description:"Por favor rellene todos los digitos del código" }});
    }
    else{
      await this.props.confirmNewUser(code)
      await this.props.registerBusiness(dataToSubmit);
    }
  }
  onPressResendCode = () => {
    this.props.resendCode(()=> this.alertCodeResendRef.open());
  }

  handleCodeConfirmation = (value) => {
    let code = value.join("");
    if(code.length>=6){
      this.setState({ validationError: { }});
    }
    this.setState({ code: value.join("") })
  }
  alertCodeResendNotification = () => {
    return (
      <AlertCodeResend
        ref={(ref) => { this.alertCodeResendRef = ref; }}
        options={(
          <ResendConfirmation
            onPress={() => this.alertCodeResendRef.close()}
          />
        )}
      />
    );
  }

  onPressOk = ()=>{
    this.setState({hasToDisplayLoginAlert: false})
    this.props.signOutAsync();
    this.props.navigateToAuthScreen();
  }

  onPressCancel = ()=>{
    this.setState({hasToDisplayLoginAlert: false});
  }

  componentWillReceiveProps(nextProps: IProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
      if (nextProps.errorRequest !== this.props.errorRequest) {
        let parsedError ={};
        if(nextProps.errorRequest?.validationErrors?.code){
          parsedError = {description:nextProps.errorRequest.validationErrors.code[0] };
        }
        this.setState({
          validationError: parsedError,
        });
      }
    }
  render() {
    if (this.props.isWaitingAnswerFromServer) {
      return <Spinner />;
    }
    const { styles, errorRequest } = this.props;
    const { validationError, hasToDisplayLoginAlert } = this.state;
    const { height, width } = LAYOUT.WINDOW;

    return (
      <SafeAreaView style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View  style={styles.container}>
      {hasToDisplayLoginAlert && <DefaultAcceptCancelDialog onPressOk={this.onPressOk.bind(this)}
      onPressCancel={this.onPressCancel.bind(this)} onPressOut={this.onPressCancel.bind(this)}
        text={"¿Desea cerrar sesión y volver a la pantalla inicial?"}/>}
        <Background height={height} width={width} style={styles.background} />
        <AuthHeader onPressBack={() =>{
          this.setState({hasToDisplayLoginAlert: true});

        } } />

        <JoinKetepongoHeading />

        <IntructionsOfCodeConfirmation />
        {!validationError &&
        <DefaultServerErrorMessage
          error={errorRequest}
        />
        }

        <DefaultServerErrorMessage
          error={validationError}
        />

        <KeyboardAvoidingView
          behavior="height"
          style={styles.fillScreen}
          keyboardVerticalOffset={64}
        >
          {this.alertCodeResendNotification()}
          <View style={styles.fillScreen}>
            <CodeConfirmationInputs onPressSubmit={this.handleCodeConfirmation} isFilled={this.state.code.length>=6}/>
          </View>
        </KeyboardAvoidingView>
        <ConfirmationCodeAssitance onPress={this.onPressResendCode} />
        <ContinueButton onPress={this.onPressSubmitUserCode} text={"Continuar Registro"} />
        <StepIcon />
      </View >
      </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

AuthConfirmationScreen.defaultProps = {
  styles
};

AuthConfirmationScreen.propTypes = {
  isWaitingAnswerFromServer: PropTypes.bool.isRequired,
  confirmNewUser: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  errorRequest: PropTypes.object,
  resendCode:PropTypes.func.isRequired,
  registerBusiness: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
  return {
    errorRequest: state.authentication.error,
    isWaitingAnswerFromServer: state.authentication.isWaitingAnswerFromServer,
  };
};
interface IPropsFromState{
  isWaitingAnswerFromServer: boolean;
  errorRequest: ErrorDetail
}

interface IProps extends IPropsFromState{
  confirmNewUser: Function;
  resendCode: Function;
  signOutAsync: Function;
  navigateToAuthScreen: Function;
  registerBusiness: Function;
}
const mapDispatchToProps = {
  confirmNewUser,
  resendCode,
  signOutAsync,
  navigateToAuthScreen,
  registerBusiness,
};

AuthConfirmationScreen = withAuthentication((connect(mapStateToProps, mapDispatchToProps)(AuthConfirmationScreen)),true);

export { AuthConfirmationScreen };
