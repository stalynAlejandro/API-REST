import React from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { STRINGS } from 'constants';
import { DefaultTextInput, DefaultInputError,  PasswordInput, TypoGraphyOpenSans, TypoGraphyOpenSansWithHighlight, DefaultCheckBox } from 'components';
import styles from './AuthUserForm.component.styles';
import {
  LoginHelper,
  PasswordError
} from './AuthUserForm.UI';
import { TextInput } from 'react-native-gesture-handler';
import AlertIcon from "../../../assets/All_Icons/basic/alert-circle.svg"
import ErrorIcon from "../../../assets/All_Icons/basic/alert-circle-error.svg"

const PasswordBox = React.forwardRef((props, ref) => <PasswordInput ref={ref} {...props} />);
PasswordBox.displayName = 'PasswordBox';
const EmailBox = React.forwardRef((props, ref) => <DefaultTextInput ref={ref} {...props} />);
EmailBox.displayName = 'EmailBox';

const NameBox = React.forwardRef((props, ref) => <DefaultTextInput ref={ref} {...props} />);
NameBox.displayName = 'NameBox';

const AcceptPolicyCheckBox = React.forwardRef((props, ref) => <DefaultCheckBox ref={ref} {...props} />);
AcceptPolicyCheckBox.displayName = 'AcceptPolicyCheckBox';

class AuthUserForm extends React.Component<IProps,{}> {
  nameRef = React.createRef();
  passwordRef = React.createRef();
  emailRef = React.createRef();

  state = {
    securedPasswordView: true,
  };



  onSubmitName = () =>{
    this.emailRef.defaultInput.focus();
    this.props.checkName();
  }

  onBlurName = () =>{
    this.props.checkName();
  }

  onSubmitEmail = () => {
    this.props.checkEmail()
    this.passwordRef.input.focus()
  };

  onBlurEmail = ()=> {
    this.props.checkEmail()
  }


  renderAuthType = (navigateToForgotPassword, invalidPassword) => {
    if (this.props.type === STRINGS.login) {
      return <LoginHelper hasError={invalidPassword} onPress={() => navigateToForgotPassword()} />;
    }
  }

  render() {
    const isLogin = this.props.type === STRINGS.login;
    const {
      styles,
      onSubmit,
      onChangeEmail,
      onChangePassword,
      onCheckEnteredPassword,
      data,
      onChangeName,
      navigateToForgotPassword,
      serverErrorValidations,
      onChangeAcceptPolicy
    } = this.props;
    const { email,
      password,
      invalidPassword,
      errorValidatorPasswordMessage,
      invalidEmail,
      errorValidatorEmailMessage,
      name,
      invalidName,
      errorValidatorNameMessage,
      acceptPolicy,
      invalidAcceptPolicy,
      errorValidatorAcceptPolicyMessage 
      } = data;
    const { securedPasswordView } = this.state;
    return (
      <View>
         {!isLogin && <View style={{...styles.name_wrapper}}>
          <NameBox
            ref={(ref) => { this.nameRef = ref; }}
            placeholder={"tu nombre"}
            onChangeText={onChangeName}
            value={name}
            name="name"
            hasError={invalidName}
            onSubmitEditing={this.onSubmitName}
            onBlur={this.onBlurName}
          />
        </View>}
        <DefaultInputError style={{marginTop: -25, marginBottom:25}} state={invalidName} errorMessage={errorValidatorNameMessage}/>

        <View style={{ ...styles.email_wrapper, ...(!invalidEmail ? {} : styles.less_margin) }}>
          <EmailBox
            ref={(ref) => { this.emailRef = ref; }}
            placeholder={"email"}
            keyboardType={"email-address"}
            onChangeText={onChangeEmail}
            value={email}
            name="email"
            hasError={invalidEmail}
            onSubmitEditing={this.onSubmitEmail}
            onBlur={this.onBlurEmail}
          />
        </View>
        <DefaultInputError style={{marginTop: -10, marginBottom:10}} state={invalidEmail} errorMessage={errorValidatorEmailMessage}/>
        <PasswordBox
          ref={(ref) => { this.passwordRef = ref; }}
          placeholder={"contraseña"}
          secureTextEntry={securedPasswordView}
          value={password}
          name="password"
          onChangeText={onChangePassword}
          onSubmitEditing={onCheckEnteredPassword}
          blurOnSubmit={true}
          onBlur={onCheckEnteredPassword}
          displayState={securedPasswordView}
          setHide={()=> this.setState({ securedPasswordView: false })}
          setDisplay={() => this.setState({ securedPasswordView: true })}
          hasError = {invalidPassword}
          isLogin = {isLogin}
        />
        {invalidPassword && <View style={styles.password_hint_container_error}><ErrorIcon width={14} height={14} color="red" style={styles.alert_icon_error}/>
          <DefaultInputError style={styles.password_hint_error} state={invalidPassword} errorMessage={errorValidatorPasswordMessage}/>
          </View>
        }
        {this.renderAuthType(navigateToForgotPassword, invalidPassword)}
        {!isLogin && !invalidPassword &&<PasswordHint />}
        {!isLogin &&
        <View style={{ marginLeft:-15, flexDirection:'row', marginTop:20, alignItems:'center', justifyContent:'space-between'}}>
          <AcceptPolicyCheckBox style={{alignSelf:'flex-start', marginRight:5}} value={acceptPolicy} onValueChange={onChangeAcceptPolicy} />
          <TypoGraphyOpenSansWithHighlight style={styles.policy_text} text={"Acepto la política de privacidad y las condiciones determinadas en"}
          highlightText={" www.ketepongo.com/legal/index.html"}
          onPress={() =>
            Linking.openURL("https://www.ketepongo.com/legal/index.html")
          } />
        </View>
        }
        <DefaultInputError style={{marginTop: 5, marginBottom:-15}} state={invalidAcceptPolicy} errorMessage={errorValidatorAcceptPolicyMessage}/>
      </View>
    );
  }
}


const PasswordHint = ()=>{
  return <View style={styles.password_hint_container}><AlertIcon width={14} height={14} style={styles.alert_icon}/><TypoGraphyOpenSans style={styles.password_hint}
    text={"La contraseña debe contener almenos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial o símbolo (.#~%/),."}/>
  </View>
}


AuthUserForm.defaultProps = {
  styles,
  checkEmail: ()=>{},
  onSubmit: () =>{},
};

AuthUserForm.propTypes = {
  onRef: PropTypes.shape({ current: PropTypes.instanceOf(AuthUserForm) }),
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onCheckEnteredPassword: PropTypes.func.isRequired,
  checkEmail: PropTypes.func,
  data: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  onChangeName: PropTypes.func.isRequired,
  navigateToForgotPassword: PropTypes.func,
  onChangeAcceptPolicy: PropTypes.func.isRequired
};

interface IProps{
  styles : any;
  type : string;
  onSubmit : Function;
  onChangeEmail : Function;
  onChangePassword : Function;
  onCheckEnteredPassword : Function;
  data : Function;
  onChangeName : Function;
  navigateToForgotPassword : Function;
  serverErrorValidations: { [key: string]: string };
  onChangeAcceptPolicy: Function;
}

export { AuthUserForm };
