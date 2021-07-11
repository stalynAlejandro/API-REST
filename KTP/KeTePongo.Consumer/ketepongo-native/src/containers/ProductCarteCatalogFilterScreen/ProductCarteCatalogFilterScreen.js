import React from 'react';
import { View, Platform, StatusBar , SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import {
  FilterCatalogCarte,
  LogoWithBurguerWithIconSectionHeader,
  TouchableIcon,
  TypoGraphyOpenSans,
  TitleSectionWithLeftAndOptionalRightButton,
  BackGreyArrowButton
} from 'components';

import styles from './ProductCarteCatalogFilterScreen.component.styles';
import { withAuthentication } from "../../HOC";

class ProductCarteCatalogFilterScreen extends React.Component {
  state = {
    statusBarHeight: 25
  }

  componentDidMount = () => {
    Platform.OS === 'ios' ? '' : this.setState({ statusBarHeight: StatusBar.currentHeight });
  }

  onPressFilter = () => this.child.onPressFilter();

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      <View  style={styles.container}>
        <TitleSectionWithLeftAndOptionalRightButton
          leftButton={<BackGreyArrowButton onPress={() => this.onPressFilter()} />}
          headerText={"Filtros"}
        />
        <View style={styles.filterCatalog}>
          <FilterCatalogCarte onRef={(child) => this.child = child} statusBarHeight={this.state.statusBarHeight} />
        </View>
      </View >
      </SafeAreaView>
    );
  }
}

ProductCarteCatalogFilterScreen.defaultProps = {
  styles
};

ProductCarteCatalogFilterScreen.propTypes = {
  styles: PropTypes.object.isRequired
};

ProductCarteCatalogFilterScreen = withAuthentication(ProductCarteCatalogFilterScreen);

export { ProductCarteCatalogFilterScreen };
