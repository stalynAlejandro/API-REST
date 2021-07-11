import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { View, SafeAreaView, Platform } from "react-native";
import {
  BusinessRegistrationForm,
  Spinner,
  DefaultServerErrorMessage,
  ContinueButtonHook,
  TitleSection,
  BasicButtonComponent,
  HeaderWithBackComponent
} from "components";
import styles from "./AuthBusinessRegistrationScreen.component.styles";
import {
  navigateToAddUsers,
  registerBusiness,
  signOutAsync,
  navigateToAuthScreen,
  navigateToSelectModeConsumerRegistration,
  navigateToAuthConfirmationWithData
} from "../../../store/authentication";

import { useForm, FormContext } from "react-hook-form";
import { withAuthentication } from "../../../HOC";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useBackDispatch } from 'constants/UtilsHooks'
import { ConsumerType } from '../../../model/DTOs/Consumer/ConsumerType'

let AuthBusinessRegistrationScreen = ({ ...props }) => {
  const dispatch = useDispatch();
  useBackDispatch(navigateToSelectModeConsumerRegistration)

  const {
    errorRequest,
    isWaitingAnswerFromServer,
    registerBusiness,
  } = props;


  const [data, setData] = React.useState({
    imageUrl: "",
    postalCode: undefined,
    id: 0,
    town: "",
    stateOrProvince: "",
    address: "",
    tradeName: "",
    sanitaryMeasures: [],
    welcomeMessage: "",
    consumerType: props.navigation.state.params.consumerType
  });

  useEffect(() => {
    if (data.tradeName !== "") {
      const dataToSubmit = {
        businessData: {
          TradeName: data.tradeName,
          Address: data.address,
          StateOrProvince: data.stateOrProvince,
          Town: data.town,
          PostalCode: data.postalCode,
          WelcomeMessage: data.welcomeMessage ? data.welcomeMessage : "",
          ConsumerType: data.consumerType
        },
        sanitaryMeasures: data.sanitaryMeasures,
        imageFile: data.imageUrl && data.imageUrl.uri ? data.imageUrl : ""
      };

      if (Platform.OS === "ios" && dataToSubmit.imageFile && !dataToSubmit.imageFile.fileName) {
        dataToSubmit.imageFile.fileName = `${Date.now().toString()}.jpg`;
      }
    }
    return () => { }
  }, [data]);

  const onPressContinue = (dataToSubmit) => {
    const saveData = { ...dataToSubmit, ConsumerType: data.consumerType }
    setData(saveData);
    dispatch(navigateToAuthConfirmationWithData(saveData));
  };


  if (isWaitingAnswerFromServer) {
    return <Spinner />;
  }
  return <EditBusinessForm consumerType={data.consumerType } dispatch={dispatch} data={data} onSubmit={onPressContinue} errorRequest={errorRequest} navigateBack={navigateToSelectModeConsumerRegistration} />
}


const EditBusinessForm = ({ consumerType, data, onSubmit, errorRequest, dispatch, navigateBack }) => {
  const defaultValues = {
    imageUrl: typeof data.imageUrl === "object" ? data.imageUrl : { uri: "" },
    postalCode: data.postalCode,
    town: data.town,
    stateOrProvince: data.stateOrProvince,
    address: data.address,
    tradeName: data.tradeName,
    Id: data.id,
    sanitaryMeasures: data.sanitaryMeasures,
  };

  const methods = useForm({ defaultValues });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {consumerType === ConsumerType.Individual ?
          <HeaderWithBackComponent onPress={() => navigateBack()(dispatch)} title={"Mi Dirección"} />
          :
          <HeaderWithBackComponent onPress={() => navigateBack()(dispatch)} title={"Datos del establecimiento"} />
        }
        <FormContext {...methods} >
          <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"} extraHeight={200} enableResetScrollToCoords={false} >
            <BusinessRegistrationForm consumerType={consumerType} code={""} serverErrorValidations={errorRequest?.validationErrors ? errorRequest?.validationErrors : {}} />
            {errorRequest && errorRequest.status !== "400" && <DefaultServerErrorMessage error={errorRequest} containerStyles={styles.serverError_container} />}
            <View style={styles.fillScreen} />
            <ContinueButtonHook onPress={methods.handleSubmit(onSubmit)} text={"Finalizar Registro"} />
          </KeyboardAwareScrollView>
        </FormContext>
      </View >
    </SafeAreaView>
  );
}
AuthBusinessRegistrationScreen.defaultProps = {
  styles
};

AuthBusinessRegistrationScreen.propTypes = {
  isWaitingAnswerFromServer: PropTypes.bool.isRequired,
  errorRequest: PropTypes.object,
  registerBusiness: PropTypes.func.isRequired,
  postalCode: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return {
    isWaitingAnswerFromServer: state.authentication.isWaitingAnswerFromServer,
    errorRequest: state.authentication.error
  };
};
const mapDispatchToProps = {
  navigateToAddUsers,
  registerBusiness,
  signOutAsync,
  navigateToAuthScreen
};

AuthBusinessRegistrationScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps,

)(AuthBusinessRegistrationScreen)), true);

export { AuthBusinessRegistrationScreen };
