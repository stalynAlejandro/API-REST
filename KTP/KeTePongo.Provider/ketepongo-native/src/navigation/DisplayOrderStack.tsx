import React from 'react';
import { ROUTES, COLORS, HEIGHT } from 'constants';
import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { DisplayOrderSectionsScreen } from "../containers/DisplayOrderSectionsScreen/DisplayOrderSectionsScreen";
import { DisplayOrderCatalogCarteScreen } from "../containers/DisplayOrderCatalogCarteScreen/DisplayOrderCatalogCarteScreen";
import { DisplayOrderHeader } from 'components';

const DisplayOrderStack = createMaterialTopTabNavigator({
    Productos: {
        screen: DisplayOrderCatalogCarteScreen,

    },
    Secciones: {
        screen: DisplayOrderSectionsScreen,
    }
},
    {
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
            },
        }),
        tabBarOptions: {
            initialRouteName: ROUTES.DisplayOrderCatalogCarteScreen,
            activeTintColor: COLORS.main,
            inactiveTintColor: COLORS.neutral_medium,

        },
        swipeEnabled: true,
        tabBarComponent: navigationProps => <DisplayOrderHeader navigationProps={navigationProps} />
    });

export default DisplayOrderStack;