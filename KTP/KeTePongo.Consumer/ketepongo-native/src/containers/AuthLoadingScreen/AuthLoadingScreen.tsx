import React from "react";
import { View, StatusBar, ActivityIndicator, StyleSheet, BackHandler } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import decode from "jwt-decode";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reloadAccessToken, hideSplashScreen } from "../../store/authentication";
import { withAuthentication } from "../../HOC";
import { ROUTES } from 'constants'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onInit(props);
  }

  onInit = async props => {
    props.hideSplashScreen();
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      await props.reloadAccessToken();
      const token = decode(accessToken);
      if (token) {
        if (token.role.includes("NO") || token.role.includes("PENDING") || token.role.includes("PROVIDER")) {
          this.props.navigation.navigate("Auth");
        } else {
          this.props.navigation.navigate('AuthStack', { scren: ROUTES.MyProductsScreen });
          // this.props.navigation.navigate("AppStackToBuy");
        }
      }
    } else {
      this.props.navigation.navigate("Auth");
    }
    setTimeout(() => {
      props.hideSplashScreen() //Just in case user goes back. Store stays the same but Android considers it is again Activity starting and doesn't dispose splash
    }, 5000)
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
AuthLoadingScreen.propTypes = {
  reloadAccessToken: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  reloadAccessToken,
  hideSplashScreen
};

AuthLoadingScreen = withAuthentication((connect(null, mapDispatchToProps)(AuthLoadingScreen)));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
export { AuthLoadingScreen };
