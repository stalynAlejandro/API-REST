import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { SIZE, ROUTES } from 'constants';

import HomeIcon from '../../../assets/All_Icons/navigationBar/home.svg';
import HomeIconSelected from '../../../assets/All_Icons/navigationBar/home_selected.svg';
import BasketIcon from '../../../assets/All_Icons/navigationBar/basket.svg';
import BasketIconSelected from '../../../assets/All_Icons/navigationBar/basket_selected.svg';
import LocationSquare from '../../../assets/All_Icons/navigationBar/location_square.svg';
import LocationSquareSelected from '../../../assets/All_Icons/navigationBar/location_square_selected.svg';
import StarIcon from '../../../assets/All_Icons/navigationBar/star.svg';
import StarIconSelected from '../../../assets/All_Icons/navigationBar/star_selected.svg';

const NavigationIcon = ({ active, navigation }) => {
  const { routeName , routes } = navigation.state;
  const routedictironary = {
    [ROUTES.myProducts]: {
      normal: <HomeIcon {...SIZE.square_25} style={styles.icon} />,
      selected: <HomeIconSelected {...SIZE.square_25} style={styles.icon} />
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
      normal: <LocationSquare {...SIZE.square_20} style={styles.icon} />,
      selected: <LocationSquareSelected {...SIZE.square_20} style={styles.icon} />,
    },
    [ROUTES.myOrders]: {
      normal: <StarIcon {...SIZE.square_10} style={styles.icon} />,
      selected: <StarIconSelected {...SIZE.square_10} style={styles.icon} />
    },
    ["productsOld"]: {
      normal: <HomeIcon {...SIZE.square_10} style={styles.icon} />,
      selected: <HomeIconSelected {...SIZE.square_10} style={styles.icon} />
    },
  };

  const type = active && routes.length === 1? 'selected' : 'normal';
  return routedictironary[routeName][type];
};

const styles = StyleSheet.create({
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginTop: 10
  }
});

NavigationIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired
};

export { NavigationIcon };
