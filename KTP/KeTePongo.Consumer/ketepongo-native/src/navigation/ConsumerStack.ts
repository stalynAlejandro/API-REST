import { createStackNavigator } from 'react-navigation-stack'
import { MyProductListsScreen } from '../containers/MyProductListsScreen';
import { MyProvidersScreen } from '../containers/MyProvidersScreen';
import { MyLocationsScreen } from '../containers/MyLocationsScreen';
import { NewProviderScreen } from '../containers/NewProviderScreen';
import { FilterScreen } from '../containers/FilterScreen';
import { NotificationsScreen } from '../containers/NotificationsScreen';
import { ROUTES } from '../constants'
import { MyAccountScreen } from '../containers/MyAccountScreen';
import { EditBusinessProfileScreen } from '../containers/EditBusinessProfileScreen'
import { ProductCarteCatalogScreen } from '../containers/ProductCarteCatalogScreen'
import {ProductCarteCatalogFilterScreen} from '../containers/ProductCarteCatalogFilterScreen'
import {CartScreen} from '../containers/CartScreen'


export default createStackNavigator({
    [ROUTES.MyProductsScreen]: {
        screen: MyProductListsScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    [ROUTES.FilterScreen]: {
        screen: FilterScreen,
        navigationOptions: {
            headerShown: false
        }
    },

    [ROUTES.MyAccountScreen]: {
        screen: MyAccountScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    [ROUTES.MyProvidersScreen]: {
        screen: MyProvidersScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    [ROUTES.AddNewProviderScreen]: {
        screen: NewProviderScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    [ROUTES.MyLocationsScreen]: {
        screen: MyLocationsScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    [ROUTES.EditBusinessProfileScreen]:{
        screen: EditBusinessProfileScreen,
        navigationOptions:{
            headerShown: false
        }
    },
    [ROUTES.NotificationsScreen]: {
        screen: NotificationsScreen,
        navigationOptions:{
            headerShown: false
        }
    },
    [ROUTES.ProductCarteCatalogScreen]:{
        screen: ProductCarteCatalogScreen,
        navigationOptions:{
            headerShown: false
        }
    },
    [ROUTES.ProductCarteCatalogFilterScreen]: {
        screen: ProductCarteCatalogFilterScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    [ROUTES.CartScreen]: {
        screen: CartScreen,
        navigationOptions: {
            headerShown: false
        }
    },
})
