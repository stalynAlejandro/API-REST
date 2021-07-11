import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { FilterBarAndTitleSectionHeader } from 'components';
import { SingleRejectedProduct } from './RejectedProductScreen.UI';

import styles from './RejectedProductScreen.component.styles';
import { navigateToProductCatalog } from '../../../store/consumption/products';
import { withAuthentication } from "../../../HOC";

class RejectedProductScreen extends React.Component {
  state = {
    rejectedList: [],
    nameSearch: ''
  }

  componentDidMount() {
    const { rejectedList } = this.props;

    if (rejectedList) {
      this.setState({ rejectedList });
    }
  }

  renderList = () => {
    const { rejectedList } = this.state;
    const { providerDictionary } = this.props;

    if (!rejectedList || rejectedList.length === 0) {
      return null;
    }

    let product;
    return rejectedList.map((prod, index) => {
      product = prod;
      product.provider = providerDictionary[prod.providerId] ? providerDictionary[prod.providerId].tradeName : '';

      return (
        <SingleRejectedProduct
          key={index}
          product={product}
          onPressReActivate={(product) => console.log('reactivate product: ' + product)}
        />
      );
    });
  };

  onSearch = (nameSearch) => {
    const rejectedList = this.props.rejectedList.filter((prod) => prod.name.includes(nameSearch));
    this.setState({ nameSearch, rejectedList });
  };

  render() {
    const { navigateToProductCatalog } = this.props;
    return (
      <View style={styles.container}>
        <FilterBarAndTitleSectionHeader
          onSearch={(nameSearch) => this.onSearch(nameSearch)}
          filterPlaceholder={"Buscar Productos"}
          onPressNavigateBack={() => navigateToProductCatalog()}
          headerText={"Productos Rechazados"}
        />
        <View style={styles.body}>
          <ScrollView>
            {this.renderList()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

RejectedProductScreen.defaultProps = {
  styles
};

RejectedProductScreen.propTypes = {
  rejectedList: PropTypes.array.isRequired,
  providerDictionary: PropTypes.object.isRequired,
  navigateToProductCatalog: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    rejectedList: state.consumption.products.rejectedList,
    providerDictionary: state.consumption.providers.dictionary
  };
};

const mapDispatchToProps = {
  navigateToProductCatalog
};

RejectedProductScreen = withAuthentication((connect(mapStateToProps, mapDispatchToProps)(RejectedProductScreen)));

export { RejectedProductScreen };
