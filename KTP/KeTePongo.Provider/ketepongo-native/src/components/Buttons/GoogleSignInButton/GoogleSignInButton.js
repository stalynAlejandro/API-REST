import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { STRINGS } from 'constants';
import { TypoGraphyOpenSansSemiBold, TypoGraphyOpenSans } from 'components';

import styles from './GoogleSignInButton.component.styles';
import GoogleIcon from '../../../../assets/All_Icons/logos/Google.svg';
import { navigateToExternalProviderLogin } from '../../../store/authentication';

class GoogleSignInButton extends React.Component {
  onPressLoginWithGoogle = () => {
    const { isWaitingAnswerFromServer, navigateToExternalProviderLogin } = this.props;
    if (isWaitingAnswerFromServer) {
      return;
    }

    navigateToExternalProviderLogin(STRINGS.google);
  };

  render = () => (
    <TouchableOpacity style={styles.touchable} onPress={() => this.onPressLoginWithGoogle()}>
      <View style={styles.googleBtn_wrapper}>
        <View style={styles.icon_wrapper} >
          <GoogleIcon />
        </View>
        <View style={styles.text_wrapper} >
          <TypoGraphyOpenSansSemiBold style={styles.btn_text} text={"Accede con Google"} />
        </View>
        <View style={styles.section} />
      </View>
    </TouchableOpacity>
  );
}

GoogleSignInButton.defaultProps = {
  styles
};

GoogleSignInButton.propTypes = {
  isWaitingAnswerFromServer: PropTypes.bool.isRequired,
  navigateToExternalProviderLogin: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    isWaitingAnswerFromServer: state.authentication.isWaitingAnswerFromServer,
  };
};

const mapDispatchToProps = {
  navigateToExternalProviderLogin
};

GoogleSignInButton = connect(mapStateToProps, mapDispatchToProps)(GoogleSignInButton);

export { GoogleSignInButton };