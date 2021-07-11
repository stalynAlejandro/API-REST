import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { View, SafeAreaView, BackHandler, Platform, KeyboardAvoidingView } from "react-native";
import {
  BusinessRegistrationForm,
  Spinner,
  DefaultServerErrorMessage,
  BackGreyArrowButton,
  TitleSectionWithLeftAndOptionalRightButton,
  TypoGraphyOpenSansSemiBold,
  DefaultAcceptCancelDialog,
  LongSquareButton,
  DialogDetail
} from "components";
import db from "../../store/apis/db";
import styles from "./EditBusinessProfileScreen.component.styles";
import { updateBusiness } from '../../store/authentication';
import {
  navigateBack, refreshProviderCatalogProductsFromServer
} from '../../store/providerCatalogProducts';
import { useSelector } from 'react-redux'
import { useForm, FormContext } from "react-hook-form";
import { withAuthentication } from "../../HOC";
import { store } from '../../App';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BottomShadowLine } from 'shared';
import { actionConsts } from "../../store/authentication/actionTypes";

let EditBusinessProfileScreen = ({ ...props }) => {
  const {
    errorRequest,
    updateBusiness,
    navigateBack,
    refreshProviderCatalogProductsFromServer
  } = props;

  const [businessData, setData] = useState(null);
  const [consumerType, setAuxConsumerType] = useState()
  const [anyDataChanged, setAnyDataChanged] = useState(false)
  const dispatch = useDispatch()
  const stateBussines = useSelector(state => state.authentication.updateBussines)
  useEffect(() => {
    async function fetch() {
      const result = await (await db.apiConsumers({}, store.getState)).get("Consumer");
      if (result.data.welcomeMessage === null) {
        result.data.welcomeMessage = "";
      }
      setData(result.data);
      setAuxConsumerType(result.data.consumerType)
      setAnyDataChanged(false)
    }
    fetch()
    return () => { }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backActionHardware);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backActionHardware);
    }
  }, [anyDataChanged]);

  const [hasToDisplayLoginAlert, setHasToDisplayLoginAlert] = React.useState(false);

  const backActionHardware = () => {
    if (anyDataChanged) {
      setHasToDisplayLoginAlert(true);
      return true
    }
    else {
      navigateBack();
      return true;
    }
  }

  const onPressContinue = data => {
    const dataToSubmit = {
      businessData: {
        WelcomeMessage: data.welcomeMessage,
        TradeName: data.tradeName,
        Address: data.address,
        StateOrProvince: data.stateOrProvince,
        Town: data.town,
        PostalCode: data.postalCode,
        Id: data.id,
        consumerType: consumerType,
      },
      imageFile: data.imageUrl,
      sanitaryMeasures: data.sanitaryMeasures
    }
    if (Platform.OS === "ios" && dataToSubmit.imageFile && !dataToSubmit.imageFile.fileName) {
      dataToSubmit.imageFile.fileName = `${Date.now().toString()}.jpg`;
    }

    updateBusiness(dataToSubmit)(dispatch);
  };

  const onPressOk = () => {
    setHasToDisplayLoginAlert(false);
    refreshProviderCatalogProductsFromServer();
    navigateBack();
  }

  const backActionNoHardware = () => {
    if (anyDataChanged) {
      setHasToDisplayLoginAlert(true);
    }
    else {
      refreshProviderCatalogProductsFromServer();
      navigateBack();
    }
  }

  if (!businessData) { return <Spinner /> }
  const action = () => dispatch({ type: actionConsts.REQUEST_UPDATE_REQUESTED })
  return <EditBusinessForm stateBussines={stateBussines} action={action} consumerType={consumerType} anyDataChanged={anyDataChanged} setAnyDataChanged={setAnyDataChanged} backActionNoHardware={backActionNoHardware} setHasToDisplayLoginAlert={setHasToDisplayLoginAlert} onPressOk={onPressOk} onPressCancel={() => setHasToDisplayLoginAlert(false)} hasToDisplayGoingBackDialog={hasToDisplayLoginAlert} data={businessData} onSubmit={onPressContinue} errorRequest={errorRequest} navigateBack={navigateBack} />
};

const EditBusinessForm = ({ stateBussines, action, consumerType, anyDataChanged, setAnyDataChanged, backActionNoHardware, setHasToDisplayLoginAlert, onPressOk, onPressCancel, hasToDisplayGoingBackDialog, data, onSubmit, errorRequest, navigateBack }) => {
  const defaultValues = {
    imageUrl: { uri: data.imageUrl },
    postalCode: data.postalCode,
    town: data.town,
    stateOrProvince: data.stateOrProvince,
    address: data.address,
    tradeName: data.tradeName,
    Id: data.id,
    welcomeMessage: data.welcomeMessage,
    sanitaryMeasures: data.sanitaryMeasures,
  };
  const methods = useForm({ defaultValues });
  setAnyDataChanged(methods.formState.dirty);

  const EditBusinessProfileScreenHeader = () => {
    const sectionHeight = styles.header_height;
    const component = (
      <View>
        <TitleSectionWithLeftAndOptionalRightButton
          leftButton={<BackGreyArrowButton onPress={() => backActionNoHardware()} />}
          headerText={(consumerType) ? "Mi Dirección" : "Datos del establecimiento"}
        />
      </View>
    );
    return BottomShadowLine({ sectionHeight, component });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {hasToDisplayGoingBackDialog &&
          <DefaultAcceptCancelDialog onPressOk={onPressOk} onPressCancel={onPressCancel} onPressOut={onPressCancel}
            text={"¿Desea salir sin guardar los cambios?"} />}
        <FormContext {...methods} >
          <EditBusinessProfileScreenHeader />
          <KeyboardAwareScrollView pagingEnabled={false} keyboardShouldPersistTaps={"handled"} extraHeight={200} enableResetScrollToCoords={false} >
            <BusinessRegistrationForm consumerType={consumerType} code={data.code} serverErrorValidations={errorRequest?.validationErrors ? errorRequest?.validationErrors : {}} />
            {errorRequest && errorRequest.status !== "400" && <DefaultServerErrorMessage error={errorRequest} />}
            <View style={styles.fillScreen} />
          </KeyboardAwareScrollView>
          <View style={styles.continue_btn_wrapper}>
            <LongSquareButton
              btnStyle={methods.formState.dirty ? styles.btnStyle : styles.btnStyle_disabled}
              btnText={<TypoGraphyOpenSansSemiBold text={"Guardar Cambios"} style={methods.formState.dirty ? styles.btn_text : styles.btn_text_disabled} />}
              onPress={methods.handleSubmit(onSubmit)}
              disabled={!methods.formState.dirty}
            />
          </View>
        </FormContext>
      </View >
    </SafeAreaView>
  );
}

EditBusinessProfileScreen.defaultProps = {
  styles
};

const mapStateToProps = state => {
  return {
    isWaitingAnswerFromServer: state.authentication.isWaitingAnswerFromServer,
    errorRequest: state.authentication.error,
    accessToken: state.authentication.accessToken,

  };
};
const mapDispatchToProps = {
  navigateBack,
  updateBusiness,
  refreshProviderCatalogProductsFromServer
};

EditBusinessProfileScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps,

)(EditBusinessProfileScreen)));

export { EditBusinessProfileScreen };
