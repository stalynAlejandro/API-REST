import React from 'react';
import PropTypes from 'prop-types';
import { 
  View, 
  Text, 
  TextInput 
} from 'react-native';
import { SIZE } from 'constants';
import {
  TypoGraphyOpenSansWithHighlight,
  TypoGraphyOpenSansSemiBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans,
  TouchableIcon,
  LongSquareButton,
  ProductImage,
  CatalogProductQuantity
} from 'components';

import styles from './CatalogProductList.component.styles';
import PencilEdit from '../../../assets/All_Icons/basic/pencil_grey.svg';
import LostIcon from '../../../assets/All_Icons/basic/lost.svg';
import CommentIcon from '../../../assets/All_Icons/basic/comment.svg';
import CommentSelectedIcon from '../../../assets/All_Icons/basic/comment_selected.svg';

export const TransitionNoProducts = ({ navigateToProviderSelect }) => (
  <View style={styles.transitionContainer}>
    <View style={styles.icon_wrapper}>
      <LostIcon {...styles.lost_icon} />
    </View>

    <View style={styles.fillScreen} />

    <View style={styles.transition_text_wrapper}>
      <TypoGraphyOpenSansBold style={styles.transition_title} text={"¿No encuentras lo que buscas?"} />
      <TypoGraphyOpenSansWithHighlight
        style={styles.transition_body}
        text={"Puedes "}
        highlightText={"añadir un producto"}
        secondText={" a tu lista buscándolo en el catálogo del proveedor."}
      />
      <TypoGraphyOpenSansLight
        style={styles.transition_footer}
        text={"De esta forma estará más accesible en Tus Productos cuando quieras hacer un pedido."}
      />
    </View>

    <View style={styles.btn_wrapper}>
      <LongSquareButton
        btnText={<TypoGraphyOpenSansSemiBold text={"Añadir un Producto"} style={styles.add_btn_text} />}
        onPress={() => navigateToProviderSelect()}
        btnStyle={styles.main_btn}
      />
    </View>
  </View>
);

TransitionNoProducts.propTypes = {
  navigateToProviderSelect: PropTypes.func.isRequired
};

const ProductDetail = ({ details, detailHeading }) => (
  <Text numberOfLines={1} maxLength={20}>
    <TypoGraphyOpenSansLight style={styles.description} text={detailHeading} />
    <TypoGraphyOpenSans style={styles.content} text={details} />
  </Text>
);

ProductDetail.propTypes = {
  details: PropTypes.string.isRequired,
  detailHeading: PropTypes.string.isRequired,
};

const ProductNameWithIcon = ({ name, icon }) => (
  <View style={styles.name_wrapper}>
    <TypoGraphyOpenSansSemiBold style={styles.product_name} text={name.toUpperCase()} />
    {icon}
  </View>
);

ProductNameWithIcon.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

const SingleCatalogProduct = ({
  lastItem,
  index,
  item,
  providerName,
  locationList,
  icon,
  orderLineQuantity
}) => (
  <View key={`${index}${item.id}${item.name}`}
    style={(
      lastItem ? 
      {...styles.product_container, ...styles.add_margin_bottom} 
      : 
      styles.product_container
    )}
  >
    <View style={styles.image_wrapper}>
      <ProductImage imageUrl={item.imageUrl} size={SIZE.square_116} />
    </View>
    <View style={styles.product_description}>
      <View style={styles.product_details}>
        <ProductNameWithIcon
          name={item.name}
          icon={icon}
        />
        <ProductDetail details={locationList} detailHeading={"Lugares: "} />
        <ProductDetail details={providerName} detailHeading={"Proveedor: "} />
      </View>

      <View style={styles.quantity_wrapper}>
        <CatalogProductQuantity product={item} orderLineQuantity={orderLineQuantity} />
      </View>
    </View>
  </View>
);

SingleCatalogProduct.propTypes = {
  lastItem: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  providerName: PropTypes.string.isRequired,
  locationList: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  orderLineQuantity: PropTypes.number.isRequired,
};

export const SingleCatalogProductWithComment = ({
  lastItem,
  index,
  item,
  providerName,
  locationList,
  openCommentBoxForOrderLine,
  orderLineQuantity,
  isEmpty
}) => {
  const icon = (
    <TouchableIcon
      onPress={() => openCommentBoxForOrderLine(item.id)}
      styles={styles.edit_area}
      icon={!isEmpty?<CommentSelectedIcon />:<CommentIcon />}
    />
  );
  return SingleCatalogProduct({
    lastItem,
    index,
    item,
    providerName,
    locationList,
    orderLineQuantity,
    icon
  });
};

export const SingleCatalogProductWithEditButton = ({
  lastItem,
  index,
  item,
  providerName,
  locationList,
  navigateToEditProduct,
  orderLineQuantity
}) => {
  const icon = (
    <TouchableIcon
      onPress={() => navigateToEditProduct(item.id)}
      styles={styles.edit_area}
      icon={<PencilEdit />}
    />
  );
  return SingleCatalogProduct({
    lastItem,
    index,
    item,
    providerName,
    locationList,
    orderLineQuantity,
    icon
  });
};

SingleCatalogProduct.propTypes = {
  lastItem: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  providerName: PropTypes.string.isRequired,
  locationList: PropTypes.string.isRequired,
  navigateToEditProduct: PropTypes.func.isRequired,
  orderLineQuantity: PropTypes.number.isRequired,
};

export const CommentBox = ({ 
  onPressCancel, 
  onPressSave,
  onChangeText,
  comment
}) => (
  <View style={styles.comment_container}>
    <TypoGraphyOpenSansSemiBold 
      style={styles.comment} 
      text={"Indica cualquier aspecto a tener en cuenta para servirte este producto en este pedido:"} 
    />

    <TextInput
      multiline={true}
      numberOfLines={10}
      placeholder={"Escribe aquí tu comentario..."}
      onChangeText={(comment) => onChangeText(comment)}
      value={comment}
      style={styles.text_input}
      onSubmitEditing={() => onPressSave()}
    />

    <View style={styles.comment_btn_wrapper}>
      <TouchableIcon
        onPress={() => onPressCancel()}
        icon={<TypoGraphyOpenSansSemiBold style={styles.cancel_btn} text={"Cancelar"} />}
      />

      <TouchableIcon
        styles={styles.accept_btn_wrapper}
        onPress={() => onPressSave()}
        icon={<TypoGraphyOpenSansBold style={styles.accept_btn} text={"Aceptar"} />}
      />
    </View>
  </View>
);

CommentBox.propTypes = {
  onPressCancel: PropTypes.func.isRequired,
  onPressSave: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired
};

export const LoadingMessageDisplay = () => (
  <View style={styles.fillScreen}>
    <TypoGraphyOpenSans style={{}} text={"Cargando..."} />
  </View>
);