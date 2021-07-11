import React from "react";
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Easing,
  Animated
} from "react-native";

import PropTypes from "prop-types";
import { COLORS } from "constants";

export class LinearProgressSpinner extends React.Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.animate();
  }
  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2200,
      easing: Easing.linear
    }).start(() => this.animate());
  }

  render() {
    const linearSpinnerAnimation = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"]
    });

    return (
      <View style={this.props.styles}>
        <Animated.View
          style={{
            marginLeft: linearSpinnerAnimation,
            marginTop: 5,
            height: 3,
            width: 85,
            backgroundColor: COLORS.main
          }}
        />
      </View>
    );
  }
}
