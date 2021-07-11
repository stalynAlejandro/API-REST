import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import {
  FilterCatalog,
  LogoWithBurguerWithIconSectionHeader,
  TouchableIcon,
  TypoGraphyOpenSans
} from 'components';

import styles from './ProductCatalogFilterScreen.component.styles';
import { withAuthentication } from "../../HOC";

class ProductCatalogFilterScreen extends React.Component {
  state = {
    statusBarHeight: 25
  }

  componentDidMount = () => {
    Platform.OS === 'ios' ? '' : this.setState({ statusBarHeight: StatusBar.currentHeight });
  }

  onPressFilter = () => this.child.onPressFilter();

  render() {
    return (
      <View style={styles.container}>
        <LogoWithBurguerWithIconSectionHeader onPressBack={() => this.onPressFilter()} />

        <View style={styles.filterCatalog}>
          <FilterCatalog onRef={(child) => this.child = child} statusBarHeight={this.state.statusBarHeight} />
        </View>

        <TouchableIcon
          onPress={() => this.onPressFilter()}
          styles={styles.btn}
          icon={<TypoGraphyOpenSans style={styles.btn_text} text={"Filtrar"} />}
        />
      </View>
    );
  }
}

ProductCatalogFilterScreen.defaultProps = {
  styles
};

ProductCatalogFilterScreen.propTypes = {
  styles: PropTypes.object.isRequired
};

export { ProductCatalogFilterScreen };
