import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import { BottomShadowLine } from 'shared';
import { SIZE } from 'constants';
import {
  DefaultButton,
  FilterBar,
  TitleSectionWithLeftAndOptionalRightButton,
  ProductImage,
  TouchableItem,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansLightItalic,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansSemiBold,
  OrderTotalSkuDisplay,
  OrderDateDisplay
} from 'components';

import styles from './ValidationScreen.component.styles';

import XMainIcon from '../../../assets/actionIcons/x_main.svg';
import BasketButton from '../../../assets/actionIcons/add_basket_orange.svg';
import XIcon from '../../../assets/actionIcons/x_secondary.svg';
import TrashIcon from '../../../assets/actionIcons/trash_secondary.svg';
import PencilBlue from '../../../assets/actionIcons/pencil_main.svg';
import PencilOrange from '../../../assets/actionIcons/pencil_secondary.svg';
import LinkIcon from '../../../assets/displayIcon/link.svg';
import Camera from '../../../assets/actionIcons/camera.svg';
import WarningTriangleIcon from '../../../assets/displayIcon/warning_triangle.svg';

export const EditProductQuantity = ({ product, onPressCancel }) => (
    <View style={styles.edit_product_container}>
      <View style={styles.product_detail_wrapper}>
        <View style={styles.edit_image_wrapper}>
        <ProductImage imageUrl={product.image} size={styles.image} />
        </View>

        <View style={styles.product_right}>
          <View style={styles.detail_wrapper}>
            <View>
              <TypoGraphyOpenSans style={styles.reference} text={product.ref_value} />
            </View>
            <View>
              <TypoGraphyOpenSansLight style={styles.format} text={`Formato: ${product.format}`} />
            </View>
          </View>

          <TypoGraphyOpenSans style={styles.name} text={product.name} />

          <View style={styles.quantity_wrapper}>
            <View>
              <TypoGraphyOpenSansSemiBold style={styles.quantity} text={"CANTIDAD"} />
            </View>
            <TextInput keyboardType={"number-pad"} placeholder={String(product.quantity)} style={styles.textInput} />
          </View>

        </View>
      </View>
      <View style={styles.btn_wrapper}>
        <DefaultButton
          onPress={() => onPressCancel()}
          btnText={<TypoGraphyOpenSansBold style={styles.cancel} text={"CANCELAR"} />}
          btnStyle={styles.cancelBtn}
        />

        <DefaultButton
          onPress={() => console.log('pressed APPLIED')}
          btnText={<TypoGraphyOpenSansBold style={styles.apply} text={"APLICAR"} />}
          btnStyle={styles.applyBtn}
        />
      </View>
    </View>
  );

EditProductQuantity.propTypes = {
  product: PropTypes.object.isRequired,
  onPressCancel: PropTypes.func.isRequired
};

export const SecondaryEditPencil = ({ onPress }) => (
  <TouchableItem
    onPress={() => onPress()}
    item={(
      <View style={styles.padding_right}>
        <PencilOrange {...styles.large_pencil} />
      </View>
    )}
  />
);

SecondaryEditPencil.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const MainEditPencil = ({ onPress }) => (
  <TouchableItem
    onPress={() => onPress()}
    item={<PencilBlue {...styles.small_pencil} style={styles.main_pencil} />}
  />
);

MainEditPencil.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export const Product = ({
  backgroundColor,
  product,
  editBtn
}) => (
    <View style={backgroundColor}>
      <View style={{ ...styles.product, ...backgroundColor }}>
        <View style={styles.image_wrapper}>
        <ProductImage imageUrl={product.image} size={styles.image} />
        </View>

        <View style={styles.product_detail}>
          <View style={styles.row_direction}>
            <View style={styles.ref_section}>
              <TypoGraphyOpenSans style={styles.ref_value} text={product.ref} />
            </View>
            <View style={styles.edit_section_wrapper}>
              {editBtn}
            </View>
          </View>

          <TypoGraphyOpenSansSemiBold style={styles.product_name} text={product.name} />

          <View style={styles.row_direction}>
            <View style={styles.ref_section}>
              <TypoGraphyOpenSans style={styles.key_ref} text={"Cant.: "} />
              <TypoGraphyOpenSansLight style={styles.key_ref} text={product.quantity} />
            </View>
            <View style={styles.ref_section}>
              <TypoGraphyOpenSans style={styles.key_ref} text={"Formato: "} />
              <TypoGraphyOpenSansLight style={styles.key_ref} text={product.format} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

Product.propTypes = {
  backgroundColor: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  editBtn: PropTypes.element,
};

export const CameraIcon = () => <Camera {...SIZE.quare_89} />;

export const PendingProduct = ({
  product,
  onPress,
  blurry
}) => (
    <View style={styles.pending_product_background}>
      <View style={blurry} />
      <View style={styles.pending_product}>
        <View style={styles.image_wrapper}>
          <ProductImage imageUrl={product.image} size={styles.image} />
        </View>
        <View style={styles.fillScreen}>
          <TypoGraphyOpenSansSemiBold style={styles.product_name} text={product.name} />
          <TouchableItem
            onPress={() => onPress(product)}
            item={(
              <View style={styles.pending_icon_wrapper}>
                <LinkIcon {...SIZE.square_25} />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );

PendingProduct.propTypes = {
  product: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  blurry: PropTypes.object.isRequired
};

export const EditProviderPopUp = ({ onPressClose }) => (
  <View style={styles.popUp_wrapper}>
    <View style={styles.popUp_icon}>
      <TouchableItem
        onPress={() => onPressClose()}
        item={(
          <View style={styles.xIcon_wrapper}>
            <XMainIcon {...SIZE.square_20} />
          </View>
        )}
      />
    </View>
    <View style={styles.popUp_heading} >
      <TypoGraphyOpenSansSemiBold style={styles.popUp_text} text={"Editar Línea de Pedido"} />
    </View>
    <View style={styles.fillScreen} />
  </View>
);

EditProviderPopUp.propTypes = {
  onPressClose: PropTypes.func.isRequired
};

const ValidationButton = ({ 
  onPress,
  disableBtnStyle,
  disableBtnTextStyle,
  disabled
}) => (
  <DefaultButton
    onPress={() => onPress()}
    btnStyle={disableBtnStyle}
    btnText={(
      <TypoGraphyOpenSansBold
        style={disableBtnTextStyle}
        text={"Validar Pedido"} />
    )}
    disabled={disabled}
  />
);

ValidationButton.propTypes = {
  onPress: PropTypes.func,
  disableBtnStyle: PropTypes.object.isRequired,
  disableBtnTextStyle: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export const DisabledValidationButtonWithProductsPendingToLinkWarning = () => (
  <View>
    {ValidationButton({
      disableBtnStyle: styles.disabledBtn,
      disableBtnTextStyle: styles.disabledText,
      disabled: true
    })}
    <View style={styles.warning_wrapper}>
      <WarningTriangleIcon {...SIZE.square_12} style={styles.icon} />
      <TypoGraphyOpenSansLightItalic
        style={styles.warning}
        text={"Este pedido tiene productos pendientes de enlazar"}
      />
    </View>
  </View>
);

export const EnableValidationButton = ({ onPress }) => (
  <View>
    {ValidationButton({
      onPress,
      disableBtnStyle: styles.validate_btn,
      disableBtnTextStyle: styles.btnText,
      disabled: false
    })}
  </View>
);

EnableValidationButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const FinishedStatus = ({ date }) => (
  <View style={styles.finished_wrapper}>
    <TypoGraphyOpenSansBold
      style={styles.order_heading}
      text={`Pedido Validado`}
    />
    <View style={styles.order_heading_two_wrapper}>
      <TypoGraphyOpenSansBold
        style={styles.order_heading_two}
        text={`Previsión entrega`}
      />
      <TypoGraphyOpenSansLightItalic style={styles.date} text={date} />
    </View>
  </View>
);

FinishedStatus.propTypes = {
  date: PropTypes.string.isRequired
};

export const OrderValidationStatus = ({ 
  blurry,
  validationOrder,
  numberOfSku,
  action
}) => (
  <View style={styles.fillScreen}>
    <View style={blurry} />
    <View style={styles.adjustMargins}>
      <View style={styles.summary}>
        <View>
          <TypoGraphyOpenSansBold
            style={styles.order_number}
            text={`Pedido #${validationOrder.orderNumber}`}
          />
        </View>

        <View style={styles.add_paddingTop}>
          <OrderTotalSkuDisplay numberOfSku={numberOfSku} />
        </View>

        <View style={styles.add_paddingTop}>
          <OrderDateDisplay orderDate={validationOrder.date} />
        </View>
      </View>
      {action}
    </View>
  </View>
);

OrderValidationStatus.propTypes = {
  blurry: PropTypes.object.isRequired,
  validationOrder: PropTypes.object.isRequired,
  numberOfSku: PropTypes.number.isRequired,
  action: PropTypes.element.isRequired
};

export const AddProductButton = ({ onPress }) => (
  <View style={styles.basket_btn_wrapper}>
    <TouchableItem
      onPress={() => onPress()}
      item={<BasketButton />}
    />
  </View>
);

AddProductButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const EditProductHeader = ({
  numberOfProductEditing,
  onPressCancelEdit,
  button
}) => {
  const sectionHeight = styles.headerHeight;
  const component = (
    <View style={styles.edit_header_container}>
      <TypoGraphyOpenSansSemiBold style={styles.edit_header_heading} text={"Producto seleccionado"} />
      <View style={styles.action_wrapper}>
        <View style={styles.flex_direction_row}>
          <TouchableItem
            onPress={() => onPressCancelEdit()}
            item={(
              <View onPress={() => onPressCancelEdit()} style={styles.cancel_btn}>
                <XIcon {...SIZE.square_25} />
              </View>
            )}
          />
          <TypoGraphyOpenSansSemiBold style={styles.numberOfEdit} text={numberOfProductEditing} />
        </View>
        <View style={styles.flex_direction_row}>
          {button}
          <TrashIcon {...SIZE.square_20} />
        </View>
      </View>
    </View>
  );

  return BottomShadowLine({ component, sectionHeight });
};

EditProductHeader.propTypes = {
  onPressCancelEdit: PropTypes.func.isRequired,
  numberOfProductEditing: PropTypes.number.isRequired,
  button: PropTypes.element,
};

export const ValidationScreenHeader = ({
  onFilter,
  optionLeftIcon,
  blurry,
  popUp,
  headerText
}) => {
  const sectionHeight = styles.headerHeight;
  const component = (
    <View style={styles.header_container}>
      {blurry}
      {popUp}
      <FilterBar
        onFilter={(text) => onFilter(text)}
        placeholderText={"Buscar Producto"}
      />
      <View style={styles.header_title_wrapper}>
        <TitleSectionWithLeftAndOptionalRightButton
          optionLeftIcon={optionLeftIcon}
          headerText={headerText}
        />
      </View>
    </View>
  );

  return BottomShadowLine({ component, sectionHeight });
};

ValidationScreenHeader.propTypes = {
  onFilter: PropTypes.func.isRequired,
  optionLeftIcon: PropTypes.element,
  blurry: PropTypes.object.isRequired,
  popUp: PropTypes.object.isRequired,
  headerText: PropTypes.string.isRequired
};