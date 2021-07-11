import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  View,
  Text
} from 'react-native';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  DefaultAlert,
  LogoWithBurguerWithTitleSectionHeader,
  LongSquareButton,
  TypoGraphyOpenSansSemiBold,
} from 'components';
import {
  AlertDeleteBox,
  EliminateTouchable,
  ErrorBlank,
  InputHeading,
  Input,
  MainHeading,
  ProviderIsLinked,
  ProviderUnchangeableData,
  ThereAreSomeErrors,
  TouchablePencilIcon,
} from './ProviderCRUDScreen.UI';

import styles from './ProviderCRUDScreen.component.styles';
import {
  navigateBack,
  addProviderRequested,
  updateProviderRequested,
  deleteProviderRequested
} from '../../store/consumption/providers';
import { ComponentFactory, EmailValidator, InputHookAppFactory, InputHookAppFactoryNumber } from 'shared';
import { useForm } from "react-hook-form";
import { COLORS } from '../../constants';
import { withAuthentication } from "../../HOC";

const DeletingProviderAlert = ComponentFactory("DeletingProviderAlert", "DefaultAlert");

const TradeNameInput = InputHookAppFactory("tradeName", "TradeNameInput", "Escribe la razón social", undefined)
const NameInput = InputHookAppFactory("name", "tradeName", "Escribe aquí el nombre del proveedor", undefined)
const EmailInput = InputHookAppFactory("email", "EmailInput", "Escribe aquí el email del proveedor", EmailValidator)
const TelephoneInput = InputHookAppFactoryNumber("telephone", "TelephoneInput", "Escribe aquí el telefono del proveedor", undefined)

let alertDeletingProviderRef = React.createRef();

let ProviderCRUDScreen = ({ navigateBack, ...props }) => {
  const { providerToEdit } = props;
  const { handleSubmit, errors, watch, control } = useForm();
  const { list } = useSelector(state => ({ ...state.consumption.products }));
  const [ products, setProducts ] = useState([]);
  let tradeNameRef = useRef();
  let nameRef = useRef();

  useEffect(() => {
    if( providerToEdit ) setProducts( list.filter(product => product.providerId === providerToEdit.id))
  }, [])

  const [provider, setProvider] = useState(
    !providerToEdit ?
      {
        id: '',
        tradeName: '',
        salesman: {
          name: '',
          email: '',
          telephone: ''
        },
        orderWeekDays: [],
      }
      :
      providerToEdit
  );

  const [didEntityChanged, setDidEntityChanged] = useState(false);

  let watchTradeName = watch("tradeName");
  let watchName = watch("name");

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setDidEntityChanged(true);
  }, [watchTradeName, watchName]);

  const onPressReturn = () => {
    if (didEntityChanged) {
      return Alert.alert(
        '¡Atención!',
        'Los cambios no serán guardados',
        [
          {
            text: 'Cancelar',
            onPress: () => '',
            style: 'cancel',
          },
          {
            text: 'Aceptar', onPress: navigateBack
          },
        ],
        { cancelable: false },
      );
    }
    else {
      return navigateBack();
    }
  }
  
  const onSubmitNewProvider = (data) => {
    const newProvider = {
      ...provider,
      tradeName: data.tradeName,
      salesman: {
        ...provider.salesman,
        name: data.name,
      }
    }
    if (data.email && data.telephone) {
      newProvider.salesman.email = data.email
      newProvider.salesman.telephone = data.telephone
      props.addProviderRequested(newProvider)
    }
    else {
      if (didEntityChanged) {
        props.updateProviderRequested(newProvider);
      } else {
        navigateBack()
      }
    }
  };

  const renderButton = () => {
    return (
      <View style={styles.btn_container}>
        <LongSquareButton
          btnStyle={styles.add_provider_btn}
          onPress={handleSubmit(onSubmitNewProvider)}
          btnText={<TypoGraphyOpenSansSemiBold text={!props.providerToEdit ? "Añadir Proveedor" : "Guardar Cambios"} style={styles.btn_text} />}
          disabled={!didEntityChanged}
        />
      </View>
    );
  }

  const focusOnTradeName = () => { tradeNameRef.current.focus() }
  const focusOnName = () => { nameRef.current.focus() }
  const alertDeletingProviderOpen = () => { alertDeletingProviderRef.open() }
  const alertDeletingProviderClose = () => { alertDeletingProviderRef.close() }

  const renderLinkedOrNotProvider = (tradeName) => {
    // @TODO - Need to review after changing server. This is being serve fix info
    if (providerToEdit) {
      return (
        <View>
          <ProviderIsLinked tradeName={tradeName} />
          < EliminateTouchable onPress={alertDeletingProviderOpen} />
        </View>)
    }
  }
  const renderTouchablePencilIcon = (errorName, focusInput) => {
    if (providerToEdit) {
      return (<View style={{
        ...styles.input_border,
        borderBottomColor: errors[errorName] ? COLORS.KO : COLORS.main,
      }}>
        <TouchablePencilIcon onPress={focusInput} />
      </View>)
    }
  }

  const renderForm = () => {
    return (
      <View style={styles.form_container}>
        <View style={styles.input_section}>
          <InputHeading heading={"Proveedor"} />
          <View style={{ ...styles.detail_wrapper }}>
            <View style={{ flex: 1 }}>
              <TradeNameInput
                control={control}
                watch={watch}
                errors={errors}
                defaultValue={provider.tradeName}
                referencia={tradeNameRef}
                keyboardType={'default'}
              ></TradeNameInput>
            </View>
            {renderTouchablePencilIcon("tradeName", focusOnTradeName)}
          </View>
        </View>
        <View style={styles.input_section}>
          <InputHeading heading={"Nombre Contacto"} />
          <View style={{ ...styles.detail_wrapper }}>
            <View style={{ flex: 1 }}>
              <NameInput
                control={control}
                watch={watch}
                errors={errors}
                defaultValue={provider.salesman.name}
                referencia={nameRef}
                keyboardType={'default'}
              ></NameInput>
            </View>
            {renderTouchablePencilIcon("name", focusOnName)}
          </View>
        </View>
        <View style={styles.input_section}>
          <InputHeading heading={"Email"} />
          {!providerToEdit ?
            <EmailInput
              control={control}
              watch={watch}
              errors={errors}
              keyboardType={"email-address"}
            ></EmailInput>
            : <ProviderUnchangeableData info={provider.salesman.email} />
          }
        </View>
        <View style={{...styles.input_section}}>
          <InputHeading heading={"Teléfono"}  />
          {!providerToEdit ?
            <TelephoneInput
              control={control}
              watch={watch}
              errors={errors}
              keyboardType={'numeric'}
            ></TelephoneInput>
            : <ProviderUnchangeableData info={provider.salesman.telephone} />
          }
        </View>
        {renderLinkedOrNotProvider(provider.tradeName)}
      </View>
    );
  }

  const onPressConfirmDeleteProvider  = () => {
    
    props.deleteProviderRequested(provider.id)
    alertDeletingProviderClose()
    navigateBack()
  }

  const renderDeleteProviderAlert = () => (
    <DeletingProviderAlert
      ref={(ref) => { alertDeletingProviderRef = ref; }}
      options={(
        <AlertDeleteBox
          onPressCancel={alertDeletingProviderClose}
          onPressConfirm={onPressConfirmDeleteProvider}
          productsToDelete={products}
        />
      )}
    />
  );
  return (
    <View style={styles.fillScreen}>
      {renderDeleteProviderAlert()}
      <LogoWithBurguerWithTitleSectionHeader
        onPressBack={onPressReturn}
        headerText={providerToEdit ? "Editar Proveedor" : "Nuevo Proveedor"}
      />
      <KeyboardAvoidingView
        behavior="margin"
        style={{ height:'95%'}}
      >
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.input_wrapper}>
              <MainHeading />
              {renderForm()}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {renderButton()}
    </View>
  );
}


ProviderCRUDScreen.propTypes = {
  navigation: PropTypes.object,
  providerToEdit: PropTypes.object,
  navigateBack: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  addProviderRequested: PropTypes.func.isRequired,
  updateProviderRequested: PropTypes.func.isRequired,
  deleteProviderRequested: PropTypes.func.isRequired
};

ProviderCRUDScreen.defaultProps = {
  styles
};

const mapStateToProps = (state) => {
  return {
    providerDictionary: state.consumption.providers.dictionary,
    loading: state.consumption.providers.loading,
    error: state.consumption.providers.error,
  };
};

const mapDispatchToProps = {
  navigateBack,
  addProviderRequested,
  updateProviderRequested,
  deleteProviderRequested
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {

  const provider = ownProps.navigation.getParam('provider', undefined);
  let providerToEdit;
  if (provider) {
    providerToEdit = JSON.parse(provider);
  }

  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    providerToEdit,
  };
};

ProviderCRUDScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ProviderCRUDScreen)));

export { ProviderCRUDScreen };