import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Linking, SafeAreaView, Alert, BackHandler  } from 'react-native';
import { LAYOUT } from 'constants';
import { GoogleSignInButton, TermsAndConditionsFooter, DefaultAcceptCancelDialog, DefaultAlert } from 'components';
import {
  LoginAccess,
  RegisterButton,
  SessionClosed,
} from './AuthScreen.UI';

import styles from './AuthScreen.component.styles';
import Background from '../../../../assets/All_Icons/basic/background.svg';
import KetepongoLogo from '../../../../assets/All_Icons/logos/LogoKTPVertical.svg';
import { withAuthentication } from "../../../HOC";

import {
  getAccessTokenUsingExternalProvider,
  hideSplashScreen,
  navigateToRegisterUser,
  navigateToLogIn,
  navigateToCatalog,
  navigateToAuthConfirmation,
} from '../../../store/authentication';

class AuthScreen extends React.Component {
  state = {
    hasToDisplayCloseAppAlert: false,
    hasToDisplaySessionWasClosedAlert: false
  }

  handleOpenUrl = (answer) => this.props.getAccessTokenUsingExternalProvider(answer.url);

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',  this.backAction.bind(this))
    const isSessionClosed = this.props.navigation.getParam('isSessionClosed', false);
    if(isSessionClosed){
      this.setState({hasToDisplaySessionWasClosedAlert:true});
    }
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.backAction.bind(this));
    Linking.removeEventListener("url", this.handleOpenUrl)
  }

  onPressOk = ()=>{
    this.setState({hasToDisplayCloseAppAlert: false})
    BackHandler.exitApp();
  }

  onPressCancel = ()=>{
    this.setState({hasToDisplayCloseAppAlert: false});
  }


  backAction = ()=>{
    if(!this.props.navigation.isFocused()){
       return false;
    }

    this.setState({hasToDisplayCloseAppAlert: true})
    return true;
  }

  render() {
    const { navigateToRegisterUser, navigateToLogIn } = this.props;
    const { height, width } = LAYOUT.WINDOW;

    return (

      <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
        <Background height={height} width={width} style={styles.background} />
        {this.state.hasToDisplayCloseAppAlert && <DefaultAcceptCancelDialog onPressOk={this.onPressOk}
        onPressCancel={this.onPressCancel.bind(this)} onPressOut={this.onPressCancel.bind(this)}
          text={"¿Desea cerrar la aplicación?"}/>}
        {this.state.hasToDisplaySessionWasClosedAlert && <DefaultAlert isVisible={true}
          options={
            (<SessionClosed onPress={()=> this.setState({hasToDisplaySessionWasClosedAlert: false})}/>)
          } />
        }
        
        <KetepongoLogo width={(width/3)*2} style={styles.logo} />
        <LoginAccess onPress={() => navigateToLogIn()} />
        <View style={styles.footer_wrapper}>
          {/*<GoogleSignInButton />*/}
          <RegisterButton onPress={() => navigateToRegisterUser()} />
          <View style={styles.inner_footer_wrapper}>
            <TermsAndConditionsFooter />
          </View>
        </View>
        </View>
      </SafeAreaView >
    );
  }
}

AuthScreen.defaultProps = {
  styles
};

AuthScreen.propTypes = {
  isUserLogged: PropTypes.bool.isRequired,
  isSplashScreenActive: PropTypes.bool.isRequired,
  isInitialAuthenticationStateRetrieved: PropTypes.bool.isRequired,
  getAccessTokenUsingExternalProvider: PropTypes.func.isRequired,
  hideSplashScreen: PropTypes.func.isRequired,
  navigateToRegisterUser: PropTypes.func.isRequired,
  navigateToLogIn: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  navigateToCatalog: PropTypes.func.isRequired,
  navigateToAuthConfirmation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    isUserLogged: state.authentication.isUserLogged,
    accessToken: state.authentication.accessToken,
    isSplashScreenActive: state.authentication.isSplashScreenActive,
    isInitialAuthenticationStateRetrieved: state.authentication.isInitialAuthenticationStateRetrieved,
  };
};

const mapDispatchToProps = {
  getAccessTokenUsingExternalProvider,
  hideSplashScreen,
  navigateToRegisterUser,
  navigateToLogIn,
  navigateToCatalog,
  navigateToAuthConfirmation
};

AuthScreen = withAuthentication((connect(mapStateToProps, mapDispatchToProps)(AuthScreen)), true);

export { AuthScreen };
