import React from 'react';
import PropTypes, { number } from 'prop-types';
import { View } from 'react-native';
import { BottomShadowLine } from 'shared';
import {
  BackRoundButton,
  CommentBox,
  DualOptionButtons,
  LongSquareButton,
  TitleSectionWithLeftAndOptionalRightButton,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansSemiBold,
  TouchableIcon,
  TypoGraphyOpenSansItalic,
  OrderDatePicker
} from 'components';

import styles from './CartDetailScreen.component.styles';
import CommentIcon from '../../../assets/All_Icons/basic/comment.svg';
import CommentSelectedIcon from '../../../assets/All_Icons/basic/comment_selected.svg';
import ArrowDownIcon from '../../../assets/All_Icons/arrows/arrow_down_noTail_grey.svg';
import ArrowUpIcon from '../../../assets/All_Icons/arrows/arrow_up_noTail_grey.svg';

export const OpenComment = ({
  comment,
  tradeName,
  onPressCancel,
  onPressSave
}) => (
  <View style={styles.provider_open_section}>
    <View style={styles.provider_wrapper}>
      <ProviderHeading tradeName={tradeName} />
    </View>

    <CommentBox
      comment={comment}
      commentStyleSize={styles.container}
      onPressCancel={() => onPressCancel()}
      onPressSave={(observation) => onPressSave(observation)}
    />
  </View>
);

OpenComment.propTypes = {
  comment: PropTypes.string.isRequired,
  tradeName: PropTypes.string,
  onPressCancel: PropTypes.func.isRequired,
  onPressSave: PropTypes.func.isRequired
};

export const OpenCalendar = ({
  tradeName,
  onSelectDay,
  onPressInvalidDate,
  onSelectCloseProviderDate
} : {tradeName: string, onSelectDay: Function, onPressInvalidDate: Function, onSelectCloseProviderDate: Function})  => (
  <View style={{ flex: 1 }}>
    <View style={styles.provider_heading_calendar_wrapper}>
      <View style={styles.provider_with_calendar_heading}>
        <ProviderHeading tradeName={tradeName} />
        <DeliveryDateHeading />
      </View>
      <View>
        <OpenOrderDate onPress={() => onSelectCloseProviderDate()} date={"02/08/2019"} />
      </View>
    </View>
    <OrderDatePicker
      onPressSelect={(date: string) => onSelectDay(date)}
      onPressInvalidDate={(date: string) => onPressInvalidDate(date)}
    />
  </View>
);

OpenCalendar.propTypes = {
  tradeName: PropTypes.string,
  onSelectDay: PropTypes.func.isRequired,
  onPressInvalidDate: PropTypes.func.isRequired,
  onSelectCloseProviderDate: PropTypes.func.isRequired
}

const AlertYesOrNo = ({
  warningText,
  onPressSecondButton,
  onPressFirstButton,
  firstBtn,
  secondBtn
}) => (
  <View style={styles.modal}>
    <TypoGraphyOpenSans style={styles.alert_heading} text={warningText} />
    <TypoGraphyOpenSansBold style={styles.alert_heading_question} text={"¿Estás seguro?"} />
    <DualOptionButtons
      textLeft={firstBtn.text}
      textRight={secondBtn.text}
      onPressLeft={() => onPressFirstButton()}
      onPressRight={() => onPressSecondButton()}
    />
  </View>
);

AlertYesOrNo.propTypes = {
  warningText: PropTypes.string.isRequired,
  onPressSecondButton: PropTypes.func.isRequired,
  onPressFirstButton: PropTypes.func.isRequired,
  firstBtn: PropTypes.object.isRequired,
  secondBtn: PropTypes.object.isRequired,
};

export const AlertInvalidDeliveryDate = ({
  onPressYes,
  onPressNo
}) => AlertYesOrNo({
  warningText: 'Estás eligiendo una fecha previa a la que ha establecido el proveedor. Es posible que no se cumpla.',
  onPressFirstButton: () => onPressNo(),
  onPressSecondButton: () => onPressYes(),
  firstBtn: {
    text: 'No',
    btnStyle: styles.white_btn
  },
  secondBtn: {
    text: 'Sí',
    btnStyle: styles.blue_btn
  }
});

AlertInvalidDeliveryDate.propTypes = {
  onPressYes: PropTypes.func.isRequired,
  onPressNo: PropTypes.func.isRequired,
};

export const AlertChangeNotSaved = ({
  onPressYes,
  onPressNo
}) => AlertYesOrNo({
  warningText: 'Perderás los cambios realizados.',
  onPressFirstButton: () => onPressYes(),
  onPressSecondButton: () => onPressNo(),
  firstBtn: {
    text: 'Sí',
    btnStyle: styles.white_btn
  },
  secondBtn: {
    text: 'No',
    btnStyle: styles.blue_btn
  }
});

export const DeliveryDateHeading = () => (
  <TypoGraphyOpenSansItalic text={"Días de entrega"} style={styles.delivery_heading} />
);

const OrderDate = ({ onPress, date, icon }) => (
  <TouchableIcon
    onPress={() => onPress()}
    icon={(
      <View style={styles.date_wrapper}>
        <TypoGraphyOpenSansSemiBold text={date} style={styles.date} />
        {icon}
        </View>
    )}
  />
);

OrderDate.propTypes = {
  icon: PropTypes.element.isRequired,
  onPress: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired
};

 const OpenOrderDate = ({ onPress, date }) => (
  OrderDate({ onPress, date, icon: <ArrowUpIcon />})
);

export const CloseOrderDate = ({ onPress, date }) => (
  OrderDate({ onPress, date, icon: <ArrowDownIcon />})
);

export const CartDetailButton = ({ onPress, btnText }) => (
  <View style={styles.btn_wrapper}>
    <LongSquareButton
      onPress={() => onPress()}
      btnText={<TypoGraphyOpenSansBold text={btnText} style={styles.btn_text} />}
      btnStyle={styles.btn}
    />
  </View>
);

CartDetailButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired
};

export const HasComment = ({ onPress }) => (
  <View style={styles.row_align}>
    <TypoGraphyOpenSans text={"Ver Observación"} style={styles.comment} />
    <TouchableIcon
      onPress={() => onPress()}
      icon={<CommentSelectedIcon />}
    />
  </View>
);

HasComment.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const EmptyComment = ({ onPress }) => (
  <TouchableIcon
    onPress={() => onPress()}
    icon={(
      <View style={styles.row_align}>
        <TypoGraphyOpenSans text={"Añadir Observación"} style={styles.empty_comment} />
        <CommentIcon />
      </View>
    )}
  />
);

EmptyComment.propTypes = {
  onPress: PropTypes.func.isRequired
};

export const ProviderHeading = ({ tradeName }) => (
  <TypoGraphyOpenSansBold text={tradeName} style={styles.provider} />
);

ProviderHeading.propTypes = {
  tradeName: PropTypes.string.isRequired
};

export const CartDetailHeading = ({ title }) => (
  <TypoGraphyOpenSans text={title} style={styles.heading} />
);

CartDetailHeading.propTypes = {
  title: PropTypes.string.isRequired
};

export const CartDetailHeader = ({ onPressBack }) => {
  const leftButton = (
    <BackRoundButton
      onPressBack={() => onPressBack()}
      btnStyle={styles.backButton}
      iconSize={styles.arrow_size}
    />
  );
  const sectionHeight = styles.header_height;

  const component = (
    <TitleSectionWithLeftAndOptionalRightButton
      headerText={"Mi Carrito"}
      leftButton={leftButton}
    />
  );

  return BottomShadowLine({ component, sectionHeight });
};

CartDetailHeader.propTypes = {
  onPressBack: PropTypes.func.isRequired,
};
