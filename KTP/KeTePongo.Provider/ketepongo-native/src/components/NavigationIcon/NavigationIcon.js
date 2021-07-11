import React from 'react';
import PropTypes from 'prop-types';
import { AppState, StyleSheet, View } from 'react-native';
import { SIZE, ROUTES } from 'constants';

import HomeIcon from '../../../assets/All_Icons/navigationBar/home.svg';
import HomeIconSelected from '../../../assets/All_Icons/navigationBar/home_selected.svg';
import BasketIcon from '../../../assets/All_Icons/navigationBar/basket.svg';
import BasketIconSelected from '../../../assets/All_Icons/navigationBar/basket_selected.svg';
import LocationSquare from '../../../assets/All_Icons/navigationBar/location_square.svg';
import LocationSquareSelected from '../../../assets/All_Icons/navigationBar/location_square_selected.svg';
import StarIcon from '../../../assets/All_Icons/navigationBar/star.svg';
import StarIconSelected from '../../../assets/All_Icons/navigationBar/star_selected.svg';
import BellIcon from '../../../assets/navigation/bell.svg';
import BellIconSelected from '../../../assets/navigation/bell_selected.svg';
import TabNotificationDot from '../../../assets/navigation/tab_dot.svg';
import NotificationsIcon from '../../../assets/navigation/notifications.svg';
import NotificationsIconSelected from '../../../assets/navigation/notifications_selected.svg';
import ClientsIcon from '../../../assets/navigation/clients.svg';
import ClientsIconSelected from '../../../assets/navigation/clients_selected.svg';
import OrdersIcon from '../../../assets/navigation/orders.svg';
import OrdersIconSelected from '../../../assets/navigation/orders_selected.svg';
import SectionsIcon from '../../../assets/navigation/sections.svg';
import SectionsIconSelected from '../../../assets/navigation/sections_selected.svg';
import MyProductsIcon from '../../../assets/navigation/myProducts.svg';
import MyProductsIconSelected from '../../../assets/navigation/myProducts_selected.svg';
import { COLORS } from 'constants';
import { useSelector } from 'react-redux';

function NavigationIcon ({ active, navigation })  {
  anyNotificationPendingToRead = useSelector((state) => state.notifications.anyNotificationPendingToRead)
  const { routeName , routes } = navigation.state;
  const routedictironary = {
    [ROUTES.myProducts]: {
      normal: <MyProductsIcon {...SIZE.square_25} style={styles.icon} />,
      selected: <MyProductsIconSelected {...SIZE.square_25} style={styles.icon} />
    },
    [ROUTES.providers]: {
      normal: <BasketIcon {...SIZE.square_10} style={styles.icon} />,
      selected: <BasketIconSelected {...SIZE.square_10} style={styles.icon} />
    },
     [ROUTES.locations]: {
       normal: <LocationSquare {...SIZE.square_10} style={styles.icon} />,
       selected: <LocationSquareSelected {...SIZE.square_10} style={styles.icon} />,
     },
    [ROUTES.sections]: {
      normal: <SectionsIcon {...SIZE.square_25} style={styles.icon} />,
      selected: <SectionsIconSelected {...SIZE.square_25} style={styles.icon} />,
    },
    [ROUTES.myOrders]: {
      normal: <StarIcon {...SIZE.square_10} style={styles.icon} />,
      selected: <StarIconSelected {...SIZE.square_10} style={styles.icon} />
    },
    ["productsOld"]: {
      normal: <HomeIcon {...SIZE.square_25} style={styles.icon} />,
      selected: <HomeIconSelected {...SIZE.square_10} style={styles.icon} />
    },
    [ROUTES.Orders]: {
      normal: <OrdersIcon {...SIZE.square_25} style={styles.icon} />,
      selected: <OrdersIconSelected {...SIZE.square_25} style={styles.icon} />
    },
    [ROUTES.Clients]: {
      normal: <ClientsIcon {...SIZE.square_25} style={styles.icon} />,
      selected: <ClientsIconSelected {...SIZE.square_25} style={styles.icon} />,
    },
    [ROUTES.Notifications]: {
      normal: <View>
      {anyNotificationPendingToRead && <TabNotificationDot {...SIZE.square_25} style={styles.notificationDot}/>}
        <NotificationsIcon {...SIZE.square_25} style={styles.icon} />
      </View>,
      selected: <View>
        <NotificationsIconSelected {...SIZE.square_25} style={styles.icon} />
      </View>,
    },
  };

  const type = active && routes.length === 1? 'selected' : 'normal';
  return routedictironary[routeName][type];
};

const styles = StyleSheet.create({
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 10,
  },
  inactiveIcon: {
    marginTop: 10,
    opacity: 0.7,
  },
  notificationDot: {
    marginTop: 10,
    position: 'absolute'
  },
});

NavigationIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired
};

export { NavigationIcon };
