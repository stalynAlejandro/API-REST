import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ClientOrderListHeader } from './ClientOrderListScreen.UI';
import {
  DefaultFlatList,
  OrderCard
} from 'components';

import styles from './ClientOrderListScreen.component.styles';

import { navigateToClientOrderValidation } from '../../store/clients';

class ClientOrderListScreen extends React.Component {
  renderItem = ({ item, index }) => (
    <OrderCard
      key={index}
      order={item}
      isValid={item.validate && item.validate.length > 0}
      navigate={() => this.props.navigateToClientOrderValidation(item)}
    />
  );

  renderClientsOrders = () => {
    const { clientOrders } = this.props;

    if (!clientOrders) {
      return null;
    }

    return (
      <DefaultFlatList
        list={clientOrders}
        renderSingleListItem={({ item, index }) => this.renderItem({ item, index })}
      />
    );
  }

  render() {
    const { styles } = this.props;
    
    return (
      <View style={styles.fillScreen}>
        <ClientOrderListHeader />

        <View style={styles.body}>
          {this.renderClientsOrders()}
        </View>
      </View>
    );
  }
}

ClientOrderListScreen.defaultProps = {
  styles
};

ClientOrderListScreen.propTypes = {
  clientOrders: PropTypes.array.isRequired,
  navigateToClientOrderValidation: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    clientOrders: state.orders.inspectClientOrders
  };
};

const mapDispatchToProps = {
  navigateToClientOrderValidation
};

ClientOrderListScreen = connect(mapStateToProps, mapDispatchToProps)(ClientOrderListScreen);

export { ClientOrderListScreen };
