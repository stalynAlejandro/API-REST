import React, { useEffect }from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { View, BackHandler,SafeAreaView, Platform } from "react-native";
import {
  AuthHeader,
  BusinessRegistrationForm,
  Spinner,
  DefaultServerErrorMessage,
  ContinueButtonHook,
  TouchableIcon,
  TypoGraphyOpenSans,
  TitleSection,
  DefaultAlert,
  DefaultAcceptCancelDialog
} from "components";

import styles from "./AuthBusinessRegistrationScreen.component.styles";
import {
  BusinessRegistrationHeadings,
  StepperIcon
} from "./AuthBusinessRegistrationScreen.UI";
import {
  navigateToAddUsers,
  registerBusiness,
  signOutAsync,
  navigateToAuthScreen,
  navigateToAuthConfirmationWithData
} from "../../../store/authentication";

import { useForm, FormContext } from "react-hook-form";
import BackArrow from '../../../../assets/All_Icons/arrows/back_main.svg';
import CheckIcon from '../../../../assets/All_Icons/basic/check_main.svg';
import { withAuthentication } from "../../../HOC";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

let AuthBusinessRegistrationScreen = ({ ...props }) => {
  const dispatch = useDispatch();
  const {
    errorRequest,
    isWaitingAnswerFromServer,
    registerBusiness,
  } = props;

  const [data, setData] = React.useState({
    imageUrl:"",
    postalCode:null,
    id:0,
    town: "",
    stateOrProvince: "",
    address: "",
    tradeName: "",
    sanitaryMeasures: [],
    welcomeMessage: ""
  });

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress",backAction
    );

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", ()=>backAction);
  }, []);

  const [hasToDisplayLoginAlert, setHasToDisplayLoginAlert] = React.useState(false);

  const backAction =  ()=>{
    setHasToDisplayLoginAlert(true);
    return true
  }

  useEffect(()=>{
    if(data.tradeName!==""){
        const dataToSubmit = {
          businessData:{
            TradeName: data.tradeName,
            Address: data.address,
            StateOrProvince: data.stateOrProvince,
            Town: data.town,
            PostalCode: data.postalCode,
            WelcomeMessage: data.welcomeMessage ? data.welcomeMessage : ""
          },
          sanitaryMeasures: data.sanitaryMeasures,
          imageFile:data.imageUrl && data.imageUrl.uri? data.imageUrl : ""
        };

        if(Platform.OS ==="ios" && dataToSubmit.imageFile && !dataToSubmit.imageFile.fileName){
          dataToSubmit.imageFile.fileName = `${Date.now().toString()}.jpg`;
        }

      //  registerBusiness(dataToSubmit);
    }
      return ()=>{}
  },[data]);

  const onPressContinue = (data) => {
    setData(data);
    dispatch(navigateToAuthConfirmationWithData(data));
  };

  const onPressOk = ()=>{
    setHasToDisplayLoginAlert(false);
    dispatch(signOutAsync());
    dispatch(navigateToAuthScreen());
  }

  if (isWaitingAnswerFromServer) {
    return <Spinner />;
  }
  return  <EditBusinessForm dispatch={dispatch} data={data} onSubmit={onPressContinue} errorRequest={errorRequest}
   hasToDisplayGoingBackDialog={hasToDisplayLoginAlert} onPressOk={onPressOk} onPressCancel={()=>setHasToDisplayLoginAlert(false)} setHasToDisplayLoginAlert={setHasToDisplayLoginAlert}/>
}


const EditBusinessForm = ({data, onSubmit, errorRequest, dispatch, hasToDisplayGoingBackDialog, onPressOk, onPressCancel, setHasToDisplayLoginAlert }) =>{
  const defaultValues ={
    imageUrl:typeof data.imageUrl === "object"? data.imageUrl : {uri: ""},
    postalCode:data.postalCode,
     town: data.town,
     stateOrProvince: data.stateOrProvince,
     address: data.address,
     tradeName: data.tradeName,
     Id: data.id,
     sanitaryMeasures: data.sanitaryMeasures
    };

  const  methods = useForm({defaultValues});
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
    <AuthHeader onPressBack={() =>{
     setHasToDisplayLoginAlert(true)
    } } />
    {hasToDisplayGoingBackDialog &&
    <DefaultAcceptCancelDialog onPressOk={onPressOk} onPressCancel={onPressCancel} onPressOut={onPressCancel}
    text={"¿Desea cerrar sesión y volver a la pantalla inicial?"}/>}
    <FormContext {...methods} >
      <TitleSection headerText={"Datos del establecimiento"}/>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"} extraHeight={200} enableResetScrollToCoords={false} >
              <BusinessRegistrationForm code={""} serverErrorValidations={errorRequest?.validationErrors?errorRequest?.validationErrors:{}}/>
              {errorRequest && errorRequest.status!=="400" && <DefaultServerErrorMessage error={errorRequest} containerStyles={styles.serverError_container} />}
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

)(AuthBusinessRegistrationScreen)),true);

export { AuthBusinessRegistrationScreen };
