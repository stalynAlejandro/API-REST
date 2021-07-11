import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TITLES } from 'constants';
import { DefaultAlert } from 'components';
import {
  AlertDeleteOrderDisplay,
  TouchableVerticalDots,
  VerticalMenuDisplay
} from './VerticalDotsMenuButton.Ui';

import styles from './VerticalDotsMenuButton.component.styles';
import { navigateToDetailScreen } from '../../../store/order';

const VerticalMenuPopUp = React.forwardRef((props, ref) => <DefaultAlert ref={ref} {...props} />);
VerticalMenuPopUp.displayName = 'VerticalMenuPopUp';
const AlertDeleteOrder = React.forwardRef((props, ref) => <DefaultAlert ref={ref} {...props} />);
AlertDeleteOrder.displayName = 'AlertDeleteOrder';

class VerticalDotsMenuButton extends React.Component {
  verticalMenuRef = React.createRef();
  alertDeleteOrderRef = React.createRef();

  onPressConfirmDeleteOrder = () => {
    // @TODO  - Delete order in serve and reroute
    this.alertDeleteOrderRef.close();
  };

  renderDeleteOrderAlert = () => (
    <AlertDeleteOrder
      ref={(ref) => { this.alertDeleteOrderRef = ref; }}
      options={(
        <AlertDeleteOrderDisplay
          onPressYes={() => this.onPressConfirmDeleteOrder()}
          onPressNo={() => this.alertDeleteOrderRef.close()}
        />
      )}
    />
  );

  onPressDeleteOrder = () => {
    this.verticalMenuRef.close();
    this.alertDeleteOrderRef.open();
  };

  onPressChangeOrderDetail = (title) => {
    this.verticalMenuRef.close();
    this.props.navigateToDetailScreen(title);
  }

  renderVerticalMenu = () => (
    <VerticalMenuPopUp
      ref={(ref) => { this.verticalMenuRef = ref; }}
      options={(
        <VerticalMenuDisplay
        onPressClose={() => this.verticalMenuRef.close()}
        onPressChangeOrderDate={() => this.onPressChangeOrderDetail(TITLES.orderDeliveryDates)}
        onPressAddComment={() => this.onPressChangeOrderDetail(TITLES.providerObservations)}
        onPressDeleteOrder={() => this.onPressDeleteOrder()}
        />
      )}
    />
  )

  render() {
    return (
      <View>
        <TouchableVerticalDots onPress={() => this.verticalMenuRef.open()}/>
        {this.renderVerticalMenu()}
        {this.renderDeleteOrderAlert()}
      </View>
    );
  }
}

VerticalDotsMenuButton.propTypes = {
  navigateToDetailScreen: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  navigateToDetailScreen
};

VerticalDotsMenuButton = connect(null, mapDispatchToProps)(VerticalDotsMenuButton);

export { VerticalDotsMenuButton };
