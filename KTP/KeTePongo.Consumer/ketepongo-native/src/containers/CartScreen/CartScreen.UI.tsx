import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import RadioForm,
{
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import { COLORS } from 'constants';
import { ASSETS } from 'assets';
import {
  CommentBox,
  LongSquareButton,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansSemiBold,
  TouchableIcon,
  VerticalDotsMenuButton,
  DualOptionButtons,
  TypoGraphyNunitoLight,
  TypoGraphyNunitoRegular,
  TypoGraphyNunitoBold,
  TypoGraphyNunitoSemiBold,
  BackRoundButton,
  TitleSectionWithLeftAndOptionalRightButton,
  TypoGraphyOpenSansItalic,
  ProductImage,
  LinearProgressSpinner
} from 'components';
import { BottomShadowLine } from 'shared';
import CartStyles from "./CartScreen.component.styles";
import ObservationIcon from '../../../assets/All_Icons/basic/comment.svg';
import CommentSelectedIcon from '../../../assets/All_Icons/basic/comment_selected.svg';
import ArrowDownIcon from '../../../assets/All_Icons/arrows/arrow_down_noTail.svg';
import ArrowUpIcon from '../../../assets/All_Icons/arrows/arrow_up_noTail_grey.svg';
import ArrowBack from 'assets/svg/arrows/arrowBack.svg'
import CartIcon from 'assets/svg/buttons/buttonBuy.svg'
import AddIcon from 'assets/svg/buttons/moreButton.svg'
import LessIcon from 'assets/svg/buttons/lessButton.svg'
import IconOrder from 'assets/svg/info/misPedidos.svg';

export const AlertOrderSuccessfulDisplay = ({ onPressOk}) => (
  <View style={CartStyles.modal}>
    <TypoGraphyNunitoRegular style={CartStyles.alert_heading} text={"¡Enhorabuena! Has realizado los pedidos con éxito."} />
    <TypoGraphyNunitoBold
      onPress={()=>onPressOk()}
      style={CartStyles.okButton}
      text={"OK"}
    />
  </View>
);
export const AlertMakingOrderDisplay = ({ message, onPressYes, onPressNo }) => (
  <View style={CartStyles.modal}>
    <TypoGraphyOpenSans style={CartStyles.alert_heading} text={message} />
    <TypoGraphyOpenSansBold style={CartStyles.alert_heading_question} text={"¿Estás seguro?"} />
    <DualOptionButtons
      textLeft={"No"}
      textRight={"Sí"}
      onPressLeft={() => onPressNo()}
      onPressRight={() => onPressYes()}
    />
  </View>
);

AlertMakingOrderDisplay.propTypes = {
  onPressYes: PropTypes.func.isRequired,
  onPressNo: PropTypes.func.isRequired,
  message:PropTypes.string.isRequired
};

export const AlertErrorOrder = ({ onPressOk }) => (
  <View style={CartStyles.modal}>
    <TypoGraphyOpenSans style={CartStyles.alert_heading} text={""} />
    <TypoGraphyOpenSansBold style={CartStyles.alert_heading_question} text={"No se puede cursar el pedido en este momento, inténtalo de nuevo más tarde."} />
    <LongSquareButton
      onPress={() => onPressOk()}
      btnText={<TypoGraphyOpenSansBold text={"Ok"} style={CartStyles.main_btn_text} />}
      btnStyle={CartStyles.blue_btn}
    />
  </View>
);

export const CartActionButtons = ({ onPressContinueOrdering, onPressReturn, isWaitingAnswerFromServer, providerOrdersCount }) =>{ 
  const label = providerOrdersCount ===1? "Pedido":"Pedidos";
  return (
  <View style={CartStyles.cart_btn_wrapper}>
    <TouchableIcon
      onPress={() => onPressReturn()}
      icon={<TypoGraphyOpenSansBold style={CartStyles.return_text} text={"Seguir Comprando"} />}
    />
    <LongSquareButton
      btnStyle={isWaitingAnswerFromServer?CartStyles.continue_btn_with_Spinner:CartStyles.continue_btn}
      btnText={
      
      <TypoGraphyNunitoBold style={CartStyles.confirm_order_text} text={`Realizar ${providerOrdersCount} ${label}`} />
    }
      onPress={() => onPressContinueOrdering()}
    />
    {isWaitingAnswerFromServer && <LinearProgressSpinner/>}
  </View>
)};

CartActionButtons.propTypes = {
  onPressContinueOrdering: PropTypes.func.isRequired,
  onPressReturn: PropTypes.func.isRequired
};

export const CommentSelectedTouchable = ({ onPress }) => (
  <View>
    <TouchableIcon
      onPress={() => onPress()}
      icon={<CommentSelectedIcon {...CartStyles.comment_icon} />}
    />
  </View>
);

CommentSelectedTouchable.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const CommentTouchable = ({ onPress }) => (
  <View>
    <TouchableIcon
      onPress={() => onPress()}
      icon={<ObservationIcon {...CartStyles.comment_icon} />}
    />
  </View>
);

CommentTouchable.propTypes = {
  onPress: PropTypes.func.isRequired
};

const Touchable = ({ onPress, icon }) => (
  <View style={CartStyles.justify_center}>
    <TouchableIcon
      CartStyles={CartStyles.arrow_icon}
      onPress={() => onPress()}
      icon={icon}
    />
  </View>
);

Touchable.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.element
};

export const ArrowDown = ({ onPress }) => Touchable({ onPress, icon: <ArrowDownIcon /> });

export const ArrowUp = ({ onPress }) => Touchable({ onPress, icon: <ArrowUpIcon /> });

const SecondaryHeading = ({ productsCount }) => {
  const label= productsCount===1? "Producto":"Productos";
  return (
  <View style={CartStyles.productsCountContainer}>
    <IconOrder/>
    <TypoGraphyNunitoLight style={CartStyles.secondary_heading} text={`${productsCount} ${label}`} />
    </View>
)};

SecondaryHeading.propTypes = {
  productsCount: PropTypes.string
};
const CreateProviderOrder = ({ providerId, createOrderForThisProvider }) => {
  
  return (
    <TouchableOpacity onPress={createOrderForThisProvider} >
      <View style={CartStyles.createOrderContainer}>
          <TypoGraphyNunitoLight style={CartStyles.createOrder} text={'Realizar este pedido'} />
      </View>
    </TouchableOpacity>
  
)};

CreateProviderOrder.propTypes = {
  providerId: PropTypes.string
};

const MainHeading = ({ name }) => (
  <TypoGraphyOpenSansBold style={CartStyles.main_heading} text={name} />
);

MainHeading.propTypes = {
  name: PropTypes.string.isRequired
};

const ProviderNameHeading = ({
  name,
  productsCount,
  arrowIcon,
  providerId,
  createOrderForThisProvider
}) => (
    <View style={{ ...CartStyles.provider_heading, ...CartStyles.flew_row_space_between }}>
      <View>
        {MainHeading({ name })}
        {SecondaryHeading({ productsCount })}
        {CreateProviderOrder({providerId, createOrderForThisProvider})}
      </View>
      {arrowIcon}
    </View>
  );

ProviderNameHeading.propTypes = {
  arrowIcon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  productsCount: PropTypes.string,
  providerId: PropTypes.string,
};

export const OpenCategoryHeadingAndProductList = ({
  name,
  productsCount,
  arrowIcon,
  list,
  lastHeading,
  providerId,
  createOrderForThisProvider
}) => (
  <View style={lastHeading ? {} : CartStyles.provider_list}>
    {ProviderNameHeading({ name, productsCount, arrowIcon,providerId, createOrderForThisProvider })}
    {list}
  </View>
);

OpenCategoryHeadingAndProductList.propTypes = {
  lastHeading: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  arrowIcon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
};

export const CloseCategoryNameHeading = ({
  name,
  productsCount,
  arrowIcon,
  lastHeading,
  providerId,
  createOrderForThisProvider
}) => (
  <View style={lastHeading ? {} : CartStyles.provider_list}>
    {ProviderNameHeading({ name, productsCount, arrowIcon,providerId,createOrderForThisProvider })}
  </View>
);

CloseCategoryNameHeading.propTypes = {
  lastHeading: PropTypes.bool.isRequired,
  arrowIcon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
};

export const ProductHeadingWithLocationAndQuantity = ({
  name,
  location,
  quantity
}) => (
  <View style={CartStyles.flew_row_space_between}>
    <View style={CartStyles.container}>
      <TypoGraphyOpenSansSemiBold style={CartStyles.product_name} text={name} />
      <Text style={CartStyles.product_locations_wrapper} numberOfLines={1}>
        <TypoGraphyOpenSansLightItalic style={CartStyles.product_location} text={"También en "} />
        <TypoGraphyOpenSansItalic style={CartStyles.product_location} text={location} />
      </Text>
    </View>
    <TypoGraphyOpenSansSemiBold style={CartStyles.product_quantity} text={`x ${quantity}`} />
  </View>
);

ProductHeadingWithLocationAndQuantity.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
};

export const ProductHeadingWithoutLocation = ({ name, quantity }) => (
  <View style={CartStyles.flew_row_space_between}>
    <TypoGraphyNunitoSemiBold style={CartStyles.product_name} text={name} />
    <TypoGraphyNunitoBold style={CartStyles.product_quantity} text={`x ${quantity}`} />
  </View>
);

ProductHeadingWithoutLocation.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
};

const OrderSingleProduct = ({
  orderLine,
  index,
  orderProductHeading,
  observationIcon,
  onPressMinus,
  onPressPlus
}) => {
  const { product } = orderLine;
  const { imageUrl } = product;
  return (
    <View style={CartStyles.product_wrapper} key={index}>
      <View style={CartStyles.product_infor_wrapper}>
        {orderProductHeading}
        <View style={{ ...CartStyles.align_center, ...CartStyles.flew_row_space_between }}>
          {observationIcon}
          <View style={{ ...CartStyles.btn_container, ...CartStyles.flew_row_space_between }}>
            <TouchableIcon
              onPress={() => onPressMinus()}
              CartStyles={CartStyles.btn_wrapper}
              icon={<LessIcon />}
            />
            <TouchableIcon
              onPress={() => onPressPlus()}
              CartStyles={CartStyles.btn_wrapper}
              icon={<AddIcon/>}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

OrderSingleProduct.propTypes = {
  onPressMinus: PropTypes.func.isRequired,
  onPressPlus: PropTypes.func.isRequired,
  orderProductHeading: PropTypes.element.isRequired,
  observationIcon: PropTypes.element.isRequired,
  index: PropTypes.number.isRequired,
  orderLine: PropTypes.object.isRequired
};

export const OrderSingleProductWithoutObservationBox = ({
  orderLine,
  index,
  observationIcon,
  orderProductHeading,
  onPressMinus,
  onPressPlus
}) => (
    <View CartStyles={CartStyles.product_container}>
      {OrderSingleProduct({
        orderLine,
        index,
        observationIcon,
        orderProductHeading,
        onPressMinus,
        onPressPlus
      })
      }
    </View>
  );

OrderSingleProductWithoutObservationBox.propTypes = {
  onPressMinus: PropTypes.func.isRequired,
  onPressPlus: PropTypes.func.isRequired,
  orderProductHeading: PropTypes.element.isRequired,
  observationIcon: PropTypes.element.isRequired,
  index: PropTypes.number.isRequired,
  orderLine: PropTypes.object.isRequired
};

export const OrderSingleProductWithObservationBox = ({
  orderLine,
  index,
  onPressCancel,
  onPressSave,
  observationIcon,
  orderProductHeading,
  onPressMinus,
  onPressPlus
}) => (
  <View style={CartStyles.product_container}>
    {OrderSingleProduct({
      orderLine,
      index,
      observationIcon,
      orderProductHeading,
      onPressMinus,
      onPressPlus
    })
    }
    <CommentBox
      comment={orderLine.observation || ''}
      onPressCancel={() => onPressCancel()}
      onPressSave={(observation: string) => onPressSave(observation)}
    />
  </View>
);

OrderSingleProductWithObservationBox.propTypes = {
  onPressMinus: PropTypes.func.isRequired,
  onPressPlus: PropTypes.func.isRequired,
  orderProductHeading: PropTypes.element.isRequired,
  observationIcon: PropTypes.element.isRequired,
  onPressCancel: PropTypes.func.isRequired,
  onPressSave: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  orderLine: PropTypes.object.isRequired
};

const RadioOption = ({
  index,
  option,
  orderListSelection,
  onPressSelect
}) => (
  <View style={CartStyles.radio_wrapper} key={index}>
    <RadioButton labelHorizontal={true}>
      <RadioButtonInput
        obj={option}
        index={index}
        isSelected={orderListSelection === option.value}
        onPress={(value) => onPressSelect(value)}
        borderWidth={1}
        buttonInnerColor={COLORS.neutral_min}
        buttonOuterColor={COLORS.neutral}
        buttonSize={10}
        buttonOuterSize={20}
        buttonStyle={orderListSelection === option.value ? CartStyles.radio_selected : CartStyles.radio_white}
        buttonWrapStyle={index === 0 ? {} : { marginLeft: 10 }}
      />
      <RadioButtonLabel
        obj={option}
        index={index}
        labelHorizontal={true}
        onPress={(value) => onPressSelect(value)}
        labelStyle={CartStyles.radio_option_label}
      />
    </RadioButton>
  </View>
);

RadioOption.propTypes = {
  index: PropTypes.number.isRequired,
  option: PropTypes.object.isRequired,
  orderListSelection: PropTypes.number.isRequired,
  onPressSelect: PropTypes.func.isRequired
};

export const OrderViewSelector = ({
  radioOptions,
  orderListSelection,
  onPressSelect
}) => (
  <RadioForm
    formHorizontal={true}
    animation={true}
  >
    <View style={CartStyles.radio_option_wrapper}>
      {radioOptions.map((option, index) =>
        RadioOption({
          option,
          index,
          orderListSelection,
          onPressSelect
        }))
      }
    </View>
  </RadioForm>
);

OrderViewSelector.propTypes = {
  radioOptions: PropTypes.array.isRequired,
  orderListSelection: PropTypes.number.isRequired,
  onPressSelect: PropTypes.func.isRequired
};

export const OrderDetail = ({ numberOfSkus, numberOfProviders }) => {
  const productLabel = numberOfSkus===1 ?"Producto":"Productos";
  const providerlabel = numberOfSkus===1 ?"Proveedor":"Proveedores";
  return (
  <View style={CartStyles.detail_wrapper}>
    <TypoGraphyOpenSansBold style={CartStyles.detail} text={`${numberOfSkus} ${productLabel}`} />
    <TypoGraphyOpenSans style={CartStyles.detail} text={`${numberOfProviders} ${providerlabel}`} />
  </View>
)
};

OrderDetail.propTypes = {
  numberOfSkus: PropTypes.number.isRequired,
  numberOfProviders: PropTypes.number.isRequired
};

export const CartHeader = ({ onPressBack }) => {
  const leftButton = (
    <TouchableOpacity style={CartStyles.icon} onPress={() => onPressBack()}>
            <ArrowBack style={CartStyles.arrow} />
    </TouchableOpacity>
  )
  const sectionHeight = CartStyles.header_height;

  const component = (
    <TitleSectionWithLeftAndOptionalRightButton
      headerText={"Mi Carrito"}
      leftButton={leftButton}
    />
  );

  return BottomShadowLine({ component, sectionHeight });
};

CartHeader.propTypes = {
  onPressBack: PropTypes.func.isRequired,
};
