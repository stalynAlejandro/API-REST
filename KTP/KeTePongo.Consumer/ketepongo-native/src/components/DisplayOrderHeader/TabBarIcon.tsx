import React from 'react';
import { View, Text, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { TouchableIcon, NavigationIcon, NavigationLabel, TypoGraphyOpenSans } from "components";
import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, SIZE, LAYOUT } from 'constants';
import styles from "./DisplayOrderHeader.styles";


export class CustomTabBarIcon extends React.PureComponent {
  render() {
    const { index, focused, routeName, navigation } = this.props;


    if (Platform.OS === "ios") {
      return (<SafeAreaView style={{ flex: 1 }}>
        <View>
          <TouchableOpacity
            onPress={() => this.onSelect(routeName)}>
            <View style={[focused ? styles.active : styles.inactive]}>
              <TypoGraphyOpenSans style={focused ? styles.tab_title_active : styles.tab_title_inactive} text={routeName} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>)
    }

    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => this.onSelect(routeName)}>
          <View style={[focused ? styles.active : styles.inactive]}>
            <TypoGraphyOpenSans style={focused ? styles.tab_title_active : styles.tab_title_inactive} text={routeName} />
          </View>
        </TouchableWithoutFeedback>
      </View>

    );
  }

  onSelect = (routeName) => {
    this.props.onPress(routeName);
  }
}
