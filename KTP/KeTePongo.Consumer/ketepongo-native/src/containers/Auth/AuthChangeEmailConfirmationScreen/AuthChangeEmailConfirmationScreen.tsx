import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AuthHeader, LongSquareButton, TypoGraphyOpenSansSemiBold, DefaultServerErrorMessage, Spinner } from 'components';
import {
  CodeConfirmationInputs,
  ConfirmationCodeAssitance,
  IntructionsOfCodeConfirmation,
  JoinKetepongoHeading,
  StepIcon,
} from './AuthChangeEmailConfirmationScreen.UI';

import styles from './AuthChangeEmailConfirmationScreen.component.styles';
import { navigateBack, confirmChangeEmail } from '../../../store/authentication';
import { withAuthentication } from "../../../HOC";

class AuthChangeEmailConfirmationScreen extends React.Component {

  state = {
    code: ''
  }

  onPressSubmitUserCode = () => {
    const { code } = this.state;
    this.props.confirmChangeEmail(code)
  }

  handleCodeConfirmation = (value) => {
    this.setState({ code: value.join("") })
  }

  render() {
    if (this.props.isWaitingAnswerFromServer) {
      return <Spinner />;
    }
    const { styles, errorRequest } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <AuthHeader onPressBack={() => this.props.navigateBack()} />

            <JoinKetepongoHeading />

            <IntructionsOfCodeConfirmation />

            <KeyboardAvoidingView
              behavior="padding"
              style={styles.fillScreen}
              keyboardVerticalOffset={60}
            >
              <DefaultServerErrorMessage
                errorMessage={errorRequest}
              />
              <View style={styles.fillScreen}>
                <CodeConfirmationInputs onPressSubmit={this.handleCodeConfirmation} isFilled={this.state.code.length >= 6} />
              </View>
            </KeyboardAvoidingView>
            <View style={styles.fillScreen} />
            <ConfirmationCodeAssitance onPress={() => { }} />

            <StepIcon />

            <View style={ styles.buttonContinue}>
              <LongSquareButton
                btnText={<TypoGraphyOpenSansSemiBold text={"Continuar"} style={styles.btn_text} />}
                onPress={() => this.onPressSubmitUserCode()}
              />
            </View>
          </View >
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

AuthChangeEmailConfirmationScreen.defaultProps = {
  styles
};

AuthChangeEmailConfirmationScreen.propTypes = {
  isWaitingAnswerFromServer: PropTypes.bool.isRequired,
  navigateBack: PropTypes.func.isRequired,
  confirmChangeEmail: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  errorRequest: PropTypes.string,
};
const mapStateToProps = (state) => {
  return {
    errorRequest: state.authentication.error,
    isWaitingAnswerFromServer: state.authentication.isWaitingAnswerFromServer,
  };
};

const mapDispatchToProps = {
  navigateBack,
  confirmChangeEmail
};

AuthChangeEmailConfirmationScreen = withAuthentication((connect(mapStateToProps, mapDispatchToProps)(AuthChangeEmailConfirmationScreen)), true);

export { AuthChangeEmailConfirmationScreen };
