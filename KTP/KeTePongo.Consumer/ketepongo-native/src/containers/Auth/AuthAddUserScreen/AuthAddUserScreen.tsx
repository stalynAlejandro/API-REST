import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, SafeAreaView  } from "react-native";
import {
  AuthHeader,
  ContinueButtonHook,
  LongSquareButton,
  TypoGraphyOpenSansSemiBold,
  DefaultServerErrorMessage,
  Spinner
} from "components";
import { ComponentFactory } from 'shared';

import styles from "./AuthAddUserScreen.component.styles";
import {
  AddUserHeading,
  AddUserInstructions,
  InsertEmailHeading,
  StepperIcon
} from "./AuthAddUserScreen.UI";
import {
  navigateBack,
  navigateToCatalog,
  navigateToCatalogCarte,
  sendInvitations
} from "../../../store/authentication";
import * as EmailValidator from "email-validator";
import { useForm } from "react-hook-form";
import { withAuthentication } from "../../../HOC";

const validateEmail = value => {
  if (!value || EmailValidator.validate(value)) {
    return true;
  }
  return "Email Invalido";
};

const EmailInputFactory = (nameInput, displayName) => {
  const EmailInput = ComponentFactory(displayName, "DefaultHookFormTextInput");
  return React.forwardRef((props, ref) => (
    <EmailInput
      ref={ref}
      placeholder={"email"}
      name={nameInput}
      rules={{ required: false, validate: validateEmail }}
      keyboardType={"email-address"}
      {...props}
    ></EmailInput>
  ));
};

const Email1 = EmailInputFactory("email1", "Email1");
const Email2 = EmailInputFactory("email2", "Email2");
const Email3 = EmailInputFactory("email3", "Email3");

let AuthAddUserScreen = ({ ...props }) => {
  const { handleSubmit, errors, watch, control } = useForm();

  const onPressSkipStep = () => {
    // props.navigateToCatalog();
    props.navigateToCatalogCarte();
  };
  const onPressContinue = data => {
    props.sendInvitations(data);
  };

  const { errorRequest, isWaitingAnswerFromServer } = props;

  if (isWaitingAnswerFromServer) {
    return <Spinner />;
  }
  return (
    <SafeAreaView style={{flex:1}}>
    <View  style={styles.container}>
      <AuthHeader onPressBack={() => this.props.navigateBack()} />
      <View style={styles.body}>
        <AddUserHeading />

        <AddUserInstructions />

        <InsertEmailHeading />
        <Email1 watch={watch} errors={errors} control={control} />
        <Email2 watch={watch} errors={errors} control={control} />
        <Email3 watch={watch} errors={errors} control={control} />
        <DefaultServerErrorMessage error={errorRequest} />
        <StepperIcon />
      </View>

      <View style={styles.skip_btn_wrapper}>
        <LongSquareButton
          btnText={
            <TypoGraphyOpenSansSemiBold
              text={"Saltar Paso"}
              style={styles.jump_btn_text}
            />
          }
          onPress={onPressSkipStep}
          btnStyle={styles.jumpBtn}
        />
      </View>

      <ContinueButtonHook onPress={handleSubmit(onPressContinue)} text={"Continuar Registro"} />
    </View >
    </SafeAreaView>
  );
};

AuthAddUserScreen.defaultProps = {
  styles
};

AuthAddUserScreen.propTypes = {
  navigateBack: PropTypes.func.isRequired,
  navigateToCatalog: PropTypes.func.isRequired,
  navigateToCatalogCarte: PropTypes.func.isRequired,
  sendInvitations: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  errorRequest: PropTypes.object
};

const mapDispatchToProps = {
  navigateBack,
  navigateToCatalog,
  navigateToCatalogCarte,
  sendInvitations
};
const mapStateToProps = state => {
  return {
    isWaitingAnswerFromServer: state.authentication.isWaitingAnswerFromServer,
    errorRequest: state.authentication.error
  };
};

AuthAddUserScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthAddUserScreen)),true);

export { AuthAddUserScreen };
