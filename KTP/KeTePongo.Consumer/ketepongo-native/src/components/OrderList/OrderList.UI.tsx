import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";
import { SIZE } from "constants";
import {
  OrderDateDisplay,
  OrderTotalSkyDisplay,
  ApprovedOrderDetail,
  PendingOrderDetail,
  TouchableIcon,
  TypoGraphyOpenSansSemiBold
} from "components";
import { IOrder } from "store/order";

import styles from "./OrderList.component.styles";
import RightArrowNoTailGrey from "../../../assets/All_Icons/arrows/arrow_right_noTail_grey.svg";
import RightArrowNoTailPink from "../../../assets/All_Icons/arrows/arrow_right_noTail_pink.svg";

const ApprovedLookIcon = () => (
  //TODO size.square_9 doesnt exist
  <View style={styles.validate_wrapper}>
    <TypoGraphyOpenSansSemiBold style={styles.look_text} text={"Ver"} />
    <RightArrowNoTailGrey {...SIZE.square_9} />
  </View>
);

const LookIcon = (isValidated: boolean, hasErrored: boolean) => {
  let styleToApply = isValidated ? styles.look_text: styles.look_text_warning;
  if(hasErrored) {
    styleToApply = {...styleToApply, ...styles.look_text_errored};
  }

  //TODO size.square_9 doesnt exist
  return(<View style={styles.validate_wrapper}>
    <TypoGraphyOpenSansSemiBold style={styleToApply} text={"Ver"} />
    <RightArrowNoTailPink {...SIZE.square_9} />
  </View>
)};

const TouchableOption = ({
  isValidated,
  hasErrored,
  onPress
}: {
  isValidated: boolean;
  hasErrored: boolean;
  onPress: Function;
}) => (
  <TouchableIcon
    onPress={() => onPress()}
    icon={LookIcon(isValidated, hasErrored)}
  />
);

TouchableOption.propTypes = {
  isValidated: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

const renderOrderStatus = (order: IOrder) => {
  const { id, creationDate, isValidated, providerName } = order;

  if (isValidated) {
    return (
      <ApprovedOrderDetail
        orderNumber={id}
        provider={providerName}
        date={moment(creationDate).format("DD/MM/YYYY")}
      />
    );
  }

  return <PendingOrderDetail orderNumber={id} provider={providerName} />;
};

const OrderDetails = ({
  order,
  onPress
}: {
  order: IOrder;
  onPress: Function;
}) => {
  const { creationDate, productLines, isValidated, hasError } = order;

  return (
    <View style={styles.singleOrder_wrapper}>
      {renderOrderStatus(order)}

      <View style={styles.section_date}>
        <OrderDateDisplay orderDate={creationDate} />

        <OrderTotalSkyDisplay numberOfSku={productLines.length || 0} />
      </View>

      <View style={styles.section_validate}>
        <TouchableOption
          isValidated={isValidated}
          hasErrored={hasError}
          onPress={() => onPress(order)}
        />
      </View>
    </View>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export const ValidatedOrderItemDisplay = ({
  order,
  onPress
}: {
  order: IOrder;
  onPress: Function;
}) => <View style={styles.container}>{OrderDetails({ order, onPress })}</View>;

ValidatedOrderItemDisplay.propTypes = {
  order: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export const NotValidatedOrderItemDisplay = ({
  order,
  onPress
}: {
  order: IOrder;
  onPress: Function;
}) => (
  <View style={styles.warningBackground}>
    {OrderDetails({ order, onPress })}
  </View>
);

NotValidatedOrderItemDisplay.propTypes = {
  order: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export const HeadingDisplay = ({ heading }: { heading: string }) => (
  <TypoGraphyOpenSansSemiBold style={styles.heading} text={heading} />
);

HeadingDisplay.propTypes = {
  heading: PropTypes.string.isRequired
};
