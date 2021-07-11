import React from 'react';
import PropTypes from 'prop-types';
import { SIZE } from 'constants';
import { View } from 'react-native';
import {
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansWithHighlight,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansSemiBold,
  LongSquareButton,
  TransitionSelectView,
} from 'components';

import styles from './ProviderProductCatalogScreen.component.styles';
import ProductIcon from '../../../assets/All_Icons/basic/products_circle.svg';
import LostIcon from '../../../assets/All_Icons/basic/lost.svg';

export const ProviderCatalogHeading = ({ providerName }) => (
  <View>
    <TypoGraphyOpenSansBold style={styles.main_heading} text={"Catálogo de Productos"} />
    <TypoGraphyOpenSansSemiBold style={styles.heading} text={providerName} />
  </View>
);

ProviderCatalogHeading.propTypes = {
  providerName: PropTypes.string.isRequired
};

export const TransitionNoProduct = ({
  onPressChangeProvider,
  onPressCreateProduct
}) => {
  const contentText = (
    <View style={styles.transition_wrapper}>
      <TypoGraphyOpenSansBold style={styles.transition_title} text={"¿No encuentras lo que buscas? "} />
      <TypoGraphyOpenSansWithHighlight
        style={styles.transition_body}
        text={"Puedes buscar este producto en el "}
        highlightText={"catálogo de otro proveedor"}
        secondText={"."}
      />
      <TypoGraphyOpenSansWithHighlight
        style={styles.transition_body}
        text={"O bien puedes "}
        highlightText={"Añadir tú mismo un producto personalizado."}
      />
    </View>
  );
  const buttons = (
    <View style={styles.btn_wrapper}>
      <LongSquareButton
        btnText={<TypoGraphyOpenSansBold text={"Cambiar Proveedor"} style={styles.secondary_btn_text} />}
        onPress={() => onPressChangeProvider()}
        btnStyle={styles.secondary_btn}
      />
      <LongSquareButton
        btnText={<TypoGraphyOpenSansBold text={"Añadir un Producto Personalizado"} style={styles.main_btn_text} />}
        onPress={() => onPressCreateProduct()}
        btnStyle={styles.main_btn}
      />
    </View>
  );

  return (
    <TransitionSelectView
      icon={<LostIcon {...SIZE.square_100} />}
      contentText={contentText}
      buttons={buttons}
    />
  );
};

TransitionNoProduct.propTypes = {
  onPressChangeProvider: PropTypes.func.isRequired,
  onPressCreateProduct: PropTypes.func.isRequired,
};

export const TransitionProviderNotLinked = ({ onPressCreateNewProduct, onPressInviteProvider }) => {
  const contentText = (
    <View style={styles.transition_wrapper}>
      <TypoGraphyOpenSansBold style={styles.transition_title} text={"Vaya, este proveedor no está enlazado."} />
      <TypoGraphyOpenSansWithHighlight
        style={styles.transition_body}
        text={"Puedes "}
        highlightText={"Crear el Producto"}
        secondText={" tú mismo para añadirlo a Tus Productos."}
      />
      <TypoGraphyOpenSansWithHighlight
        style={styles.transition_body}
        text={"O bien puedes "}
        highlightText={"Invitar al Proveedor"}
        secondText={" para que se enlace con Ketepongo y puedas ver su catálogo completo de productos."}
      />
    </View>
  );
  const buttons = (
    <View style={styles.btn_wrapper}>
      <LongSquareButton
        btnText={<TypoGraphyOpenSansBold text={"Crear Nuevo Producto"} style={styles.secondary_btn_text} />}
        onPress={() => onPressCreateNewProduct()}
        btnStyle={styles.secondary_btn}
      />
      <LongSquareButton
        btnText={<TypoGraphyOpenSansBold text={"Invitar al Proveedor"} style={styles.main_btn_text} />}
        onPress={() => onPressInviteProvider()}
        btnStyle={styles.main_btn}
      />
    </View>
  );

  return (
    <TransitionSelectView
      icon={<ProductIcon {...SIZE.square_100} />}
      contentText={contentText}
      buttons={buttons}
    />
  );
};

TransitionProviderNotLinked.propTypes = {
  onPressCreateNewProduct: PropTypes.func.isRequired,
  onPressInviteProvider: PropTypes.func.isRequired,
};

export const LoadingMessageDisplay = () => <TypoGraphyOpenSans text={"Loading..."} />;