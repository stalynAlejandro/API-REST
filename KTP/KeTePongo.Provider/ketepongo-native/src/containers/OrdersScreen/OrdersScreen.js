import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { STRINGS } from 'constants';
import {
  DefaultFlatList,
  MainHeader, 
  TabCreator, 
  OrderCard,
} from 'components';

import { navigateToValidationScreen } from '../../store/orders';

class OrdersScreen extends React.Component {
  state = {
    routes: [
      { key: STRINGS.all, title: STRINGS.all },
      { key: STRINGS.pending, title: STRINGS.pending },
    ],
  };

  renderItem = ({ item, index }) => (
    <OrderCard 
      key={index} 
      order={item} 
      isValid={item.validate && item.validate.length > 0}
      navigate={() => this.props.navigateToValidationScreen(item)}
      />
  );

  render() {
    const { orderList, pendingList } = this.props;
    const sceneMap = {
      [STRINGS.all]: () => (
          <DefaultFlatList 
          list={orderList} 
          renderSingleListItem={({ item, index }) => this.renderItem({ item, index })}
        />
      ),
      [STRINGS.pending]: () => (
        <DefaultFlatList 
          list={pendingList} 
          renderSingleListItem={({ item, index }) => this.renderItem({ item, index })}
        />
      ),
    };

    return (
      <TabCreator
        topHeader={<MainHeader />}
        sceneMap={sceneMap}
        navigationState={this.state}
        pendingListLength={pendingList? pendingList.length : 0}
      />
    );
  }
}

OrdersScreen.propTypes = {
  orderList: PropTypes.array.isRequired,
  pendingList: PropTypes.array.isRequired,
  navigateToValidationScreen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    orderList: state.orders.list || [],
    pendingList: state.orders.pending || [],
  };
};

const mapDispatchToProps = {
  navigateToValidationScreen
};

OrdersScreen = connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);

export { OrdersScreen };