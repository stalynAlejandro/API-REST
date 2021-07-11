import React from "react";
import { View } from "react-native";
import styles from "./BusinessRegistrationForm.component.styles";
import { validCIF } from "spain-id";
import { ComponentFactory, InputHookAppFactoryNumber } from 'shared';
import PropTypes from 'prop-types';

import {
  ProviderCoverPhoto,
  TypoGraphyOpenSansWithHighlight,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansItalic,
  TypoGraphyOpenSans,
  TouchableIcon,
  ListEditor,
  DefaultTextInput,
  DefaultInputError
} from 'components';
const BusinessNameInput =  ComponentFactory("BusinessNameInput", "DefaultHookFormTextInput");
const TradeNameInput = ComponentFactory("TradeNameInput", "DefaultHookFormTextInput");
const WelcomeMessageInput = ComponentFactory("WelcomeMessageInput", "DefaultHookFormTextInput");
const CIFInput = ComponentFactory("CIFInput", "DefaultHookFormTextInput");
const PostalCodeInput = InputHookAppFactoryNumber("postalcode","PostalCodeInput", "Introduce el CP");
const PostalBox = React.forwardRef((props, ref) => <DefaultTextInput ref={ref} {...props} />);
PostalBox.displayName = 'EmailBox';
const AddressInput = ComponentFactory("AddressInput", "DefaultHookFormTextInput");
const TownInput = ComponentFactory("TownInput", "DefaultHookFormTextInput");
const StateOrProvinceInput = ComponentFactory("StateOrProvinceInput", "DefaultHookFormTextInput");
// const TelephoneInput = ComponentFactory("TelephoneInput", "DefaultHookFormTextInput");
const IdInput = ComponentFactory("IdInput", "DefaultHookFormTextInput");
import AlertCircle from "../../../assets/All_Icons/alertCircle.svg";
import { Controller, useFormContext } from "react-hook-form";
import CirclePlus from "../../../assets/All_Icons/circlePlus.svg";

const BusinessRegistrationForm = ({code, serverErrorValidations} :{code:any,serverErrorValidations: { [key: string]: string }}) => {
  const methods = useFormContext();
  const validateCIF = value => {
    if (validCIF(value)) {
      return true;
    }
    return "CIF Inválido";
  };

  const tradeNameRef = React.useRef();
  const welcomeMessageRef = React.useRef();
  const addressRef = React.useRef();
  const stateOrProvinceRef = React.useRef();
  const townRef = React.useRef();
  const postalCodeRef = React.useRef();
  // const telephoneRef = React.useRef();

  const onChange = args => methods.setValue('imageUrl', args);
  const image= methods.watch("imageUrl");
  const sanitaryMeasures = methods.watch("sanitaryMeasures");
  
  const haveToShowCode = code !=="";
  const errorValidation=()=>{
   
  
    if( methods.errors["tradeName"]){
      tradeNameRef.current.focus();
      return;
    }
    
    if(addressRef.current && tradeNameRef.current.isFocused()){
      return;
    }
    
    if(methods.errors["address"]){
      addressRef.current.focus();
      return;
    }
    if(addressRef.current && addressRef.current.isFocused()){
      return;
    }
    if(methods.errors["stateOrProvince"]){
      stateOrProvinceRef.current.focus();
      return;
    }
    if(stateOrProvinceRef.current && stateOrProvinceRef.current.isFocused()){
      return true;
    }
    if(methods.errors["town"]){
      townRef.current.focus();
      return;
    }
    if(townRef.current && townRef.current.isFocused()){
      return true;
    }
    if(methods.errors["postalCode"]){
      postalCodeRef.current.focus();
      return;
    }
    if(postalCodeRef.current && postalCodeRef.current.isFocused()){
      return true;
    }
    // if(methods.errors["telephone"]){
    //   telephoneRef.current.focus();
    //   return;
    // }
    // if(telephoneRef.current && telephoneRef.current.isFocused()){
    //   return true;
    // }
  }
  errorValidation();

  return (
    <View>
      <Controller
        as={
          <ProviderCoverPhoto
            name={"imageUrl"}
          />
        }
        control={methods.control}
        name={"imageUrl"}
        onSetImage={onChange}
        image={image}
        onRemove={()=> methods.setValue('imageUrl', {uri: ""})}
      />

      <View style={styles.body}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <AlertCircle style={{ marginTop: 3, marginRight: 5 }} />
          <TypoGraphyOpenSansWithHighlight
            style={styles.image_info}
            text={""}
            highlightText={"Esta imagen aparecerá cuando tu cliente acceda a tu carta virtual."}
            secondText={
              " Te recomandamos que añadas una imagen que identifique a tu restaurante como tu logo, o una foto de tu fachada. \nSi no asignas imagen aparecerá una por defecto."
            }
          />
        </View>
        {haveToShowCode && <View>
          <TypoGraphyOpenSansBold text="Código Ketepongo" style={styles.label_input} />
        <TypoGraphyOpenSansWithHighlight
            style={styles.code_info}
            text={"Este código le servirá al usuario para poder"}
            highlightText={"identicar tu local en la app y acceder a tu carta."}
            secondText={" para hacerte el pedido."}
          />
          <TypoGraphyOpenSansWithHighlight
            style={styles.code_info_2}
            text={""}
            highlightText={"Te recomendamos que tengas este código bien visible dentro de tu local,"}
            secondText={" para que tus clientes puedan localizarlo fácilmente y entrar a tu carta."}
          />
          <View style={styles.code_wrapper}>
            <TypoGraphyOpenSansBold style={styles.code} text={code}/>
          </View>
        </View>}
        

        <TypoGraphyOpenSansBold text="Nombre del establecimiento" style={styles.label_input} />

        <TradeNameInput
          placeholder={"Introduce aquí el nombre"}
          control={methods.control}
          name={"tradeName"}
          referencia={tradeNameRef}
          rules={{ required: "Campo Obligatorio" }}
          watch={methods.watch}
          errors={methods.errors}
          isHidden={false}
          onSubmitEditing={()=>welcomeMessageRef.current.focus()}
          blurOnSubmit={false}
        />
        {!methods.errors["tradeName"] &&<TypoGraphyOpenSansItalic text="Este campo es obligatorio" style={styles.hint_input} />}

        <TypoGraphyOpenSansBold text="Mensaje de bienvenida" style={styles.label_input} />

        <WelcomeMessageInput
          placeholder={"Introduce aquí el mensaje de bienvenida"}
          control={methods.control}
          name={"welcomeMessage"}
          multiline
          referencia={welcomeMessageRef}
          watch={methods.watch}
          errors={methods.errors}
          isHidden={false}
          onSubmitEditing={()=>addressRef.current.focus()}
          blurOnSubmit={false}
        />

        <TypoGraphyOpenSansBold text="Dirección del establecimiento" style={styles.label_input} />
        <AddressInput
          placeholder={"Introduce aquí la dirección"}
          control={methods.control}
          name={"address"}
          referencia={addressRef}
          rules={{
            required: "Campo Obligatorio"
          }}
          watch={methods.watch}
          errors={methods.errors}
          isHidden={false}
          onSubmitEditing={()=> stateOrProvinceRef.current.focus()}
          blurOnSubmit={false}
        />
        {!methods.errors["address"] &&<TypoGraphyOpenSansItalic text="Este campo es obligatorio" style={styles.hint_input} />}

        <TypoGraphyOpenSansBold text="Provincia" style={styles.label_input} />
        <StateOrProvinceInput
          placeholder={"Introduce aquí la provincia"}
          control={methods.control}
          name={"stateOrProvince"}
          referencia={stateOrProvinceRef}
          rules={{
            required: "Campo Obligatorio"
          }}
          watch={methods.watch}
          errors={methods.errors}
          isHidden={false}
          onSubmitEditing={()=>townRef.current.focus()}
          blurOnSubmit={false}
        />
        {!methods.errors["stateOrProvince"] &&<TypoGraphyOpenSansItalic text="Este campo es obligatorio" style={styles.hint_input} />}

        <TypoGraphyOpenSansBold text="Localidad" style={styles.label_input} />
        <TownInput
          placeholder={"Introduce aquí la localidad"}
          control={methods.control}
          name={"town"}
          referencia={townRef}
          rules={{
            required: "Campo Obligatorio"
          }}
          watch={methods.watch}
          errors={methods.errors}
          isHidden={false}
          onSubmitEditing={()=>postalCodeRef.current.focus()}
          blurOnSubmit={false}
        />
        {!methods.errors["town"] &&<TypoGraphyOpenSansItalic text="Este campo es obligatorio" style={styles.hint_input} />}

        <TypoGraphyOpenSansBold text="Código Postal" style={styles.label_input} />
        <PostalCodeInput
          placeholder={"Introduce aquí CP"}
          control={methods.control}
          name={"postalCode"}
          referencia={postalCodeRef}
          rules={{
            required: "Campo Obligatorio y deben ser números",
            pattern: /^\d+$/
          }}
          watch={methods.watch}
          errors={methods.errors}
          isHidden={false}
          // onSubmitEditing={()=>telephoneRef.current.focus()}
          blurOnSubmit={false}
        />
        {!methods.errors["postalCode"] && <TypoGraphyOpenSansItalic text="Este campo es obligatorio y deben ser números." style={styles.hint_input} />}

        {/* <TypoGraphyOpenSansBold text="Teléfono" style={styles.label_input} />
        <TelephoneInput
          placeholder={"Introduce aquí el teléfono"}
          control={methods.control}
          name={"telephone"}
          referencia={telephoneRef}
          rules={{
            required: "Campo Obligatorio"
          }}
          watch={methods.watch}
          errors={methods.errors}
          isHidden={false}
          blurOnSubmit={true}
        />
        {!methods.errors["telephone"] && !serverErrorValidations["telephone"] &&<TypoGraphyOpenSansItalic text="Este campo es obligatorio" style={styles.hint_input} />}
        {serverErrorValidations["telephone"] && <ErrorField message={serverErrorValidations["telephone"]} />} */}

        <TypoGraphyOpenSansBold text="Medidas de Seguridad" style={styles.label_input} />
        <TypoGraphyOpenSans text="Puedes añadir las medidas de seguridad que vas a tomar frente al COVID-19 para que todos tus clientes puedan leerlas antes de pedir."
          style={styles.sanitary_measures_info} />
        <Controller
          as={
            <ListEditor
              listData={sanitaryMeasures}
              OpenEditorButton={AddSanitaryMeasuresButton}
              dialogTitle={"Añadir Medidas de Seguridad"}
              dialogPlaceholder={"Escribe aquí tu medida de seguridad"}
            />
          }
          control={methods.control}
          name={"sanitaryMeasures"}
          onSave={(data)=> {methods.setValue("sanitaryMeasures", data)
        }}
        />

        <IdInput
          placeholder={"id"}
          control={methods.control}
          name={"id"}
          styles={styles.hidden_input}
          watch={methods.watch}
          errors={methods.errors}
          isHidden={true}
        />

      </View>
    </View>
  );
};

const AddSanitaryMeasuresButton = ({onPress}) => (
  <View>
    <TouchableIcon
      onPress={onPress}
      isWhiteBackground={true}
      icon={
        <View style={styles.add_sanitary_measure_button}>
          <CirclePlus width={25} height={25} style={styles.sanitary_measures_button} />
          <TypoGraphyOpenSans
            text="Añadir Medida de Seguridad"
            style={styles.label_button}
          />
        </View>
      }
    />
  </View>
)

const ErrorField = ({message}) => (
    <TypoGraphyOpenSans text={message} style={styles.error_text} />
)

BusinessRegistrationForm.defaultProps = {
  styles
};

BusinessRegistrationForm.propTypes = {

};

export { BusinessRegistrationForm };
