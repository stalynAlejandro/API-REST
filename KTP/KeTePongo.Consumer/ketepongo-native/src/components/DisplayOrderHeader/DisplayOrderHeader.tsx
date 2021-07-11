import React from 'react';
import { Animated, Platform, Easing, View, Text, SafeAreaView } from 'react-native';
import { useDispatch } from "react-redux";
import styles from "./DisplayOrderHeader.styles";
import { TitleSectionWithLeftAndOptionalRightButton, BackGreyArrowButton, TypoGraphyOpenSans } from "components";
import { CustomTabBarIcon } from "./TabBarIcon";
import { NavigationLabel } from '../NavigationLabel';
import { BottomShadowLine } from 'shared';
import { sendProductDisplayOrderUpdate } from '../../store/providerCatalogProducts/productsCarte';

export const DisplayOrderHeader = ({ navigationProps }) => {
    const { navigation } = navigationProps;
    const routes = navigation.state.routes;
    const dispatch = useDispatch();

    const navigationHandler = (routeName) => {
        navigation.navigate(routeName);
    }
    const HeaderEditingDisplayOrder = ({ onPressBack }) => {
        const component = (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.drag_header_container}>
                    <TitleSectionWithLeftAndOptionalRightButton
                        leftButton={<BackGreyArrowButton onPress={() => dispatch(sendProductDisplayOrderUpdate())} />}
                        headerText={"Ordenar Elementos "}
                    />
                    <TypoGraphyOpenSans style={styles.drag_subtext} text={"Mantén pulsado y arrastra parar ordenar"} />
                    <View style={styles.tabsContainer}>
                        {routes.map((route, index) =>
                            <View style={styles.tabBarItem} key={index}>
                                <CustomTabBarIcon
                                    key={route.key}
                                    routeName={route.routeName}
                                    onPress={() => navigationHandler(route.routeName)}
                                    focused={navigation.state.index === index}
                                    index={index}
                                    navigation={navigation}
                                />
                            </View>)
                        }
                    </View>
                </View>
            </SafeAreaView>
        );

        return BottomShadowLine({ component });
    }
    return (
        <HeaderEditingDisplayOrder onPressBack={() => navigation.goBack()} />
    )
}

