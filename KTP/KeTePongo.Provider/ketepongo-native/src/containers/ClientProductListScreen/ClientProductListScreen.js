import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { STRINGS } from 'constants';
import {
  ConditionalBackground,
  DefaultFlatList,
  FilterBar,
  TabCreator,
  UnlinkProductCard
} from 'components';
import { TabHeading, ProductCard } from './ClientProductListScreen.UI';

import styles from './ClientProductListScreen.component.styles';

class ClientProductListScreen extends React.Component {
  state = {
    routes: [
      { key: STRINGS.all, title: STRINGS.all },
      { key: STRINGS.pending, title: STRINGS.pending },
      { key: STRINGS.rejected, title: STRINGS.rejected }
    ],
  };

  renderApproveList = ({ approved, tradeName }) => {
    const { styles } = this.props;
    return (
      <View style={styles.fillScreen}>
        <TabHeading heading={"Lista de Productos"} tradeName={tradeName} />

        <View style={styles.body}>
          <DefaultFlatList
            list={approved || []}
            renderSingleListItem={({ item, index }) => (
              <ConditionalBackground
                isValid={true}
                component={(
                  <ProductCard
                    key={index}
                    product={item}
                    textStyle={{}}
                  />
                )}
              />
            )}
          />
        </View>
      </View>
    );
  }

  renderPendingList = ({ pending, tradeName }) => {
    const { styles } = this.props;

    return (
      <View style={styles.fillScreen}>
        <TabHeading heading={"Productos Pendientes de Enlazar"} tradeName={''} />

        <View style={styles.body}>
          <DefaultFlatList
            list={pending}
            renderSingleListItem={({ item, index }) => (
              <UnlinkProductCard
                key={index}
                product={{ ...item, tradeName }}
                onPressReject={() => console.log('rejected')}
                navigateToLinkProductSelection={() => console.log('link to product')}
              />
            )}
          />
        </View>
      </View>
    );
  }

  renderRejectedList = ({ rejected, tradeName }) => {
    const { styles } = this.props;

    return (
      <View style={[styles.fillScreen, styles.dark_background]}>
        <TabHeading heading={"Productos Rechazados"} tradeName={tradeName} />

        <View style={styles.body}>
          <DefaultFlatList
            list={rejected || []}
            renderSingleListItem={({ item, index }) => (
              <ConditionalBackground
                isValid={false}
                component={(
                  <ProductCard
                    key={index}
                    product={item}
                    textStyle={styles.color_dark}
                  />
                )}
                notValidBackgroundColor={styles.dark_background}
              />
            )}
          />
        </View>
      </View>
    );
  }

  render() {
    const { clientProducts, styles } = this.props;

    if (!clientProducts) {
      return null;
    }

    const {
      tradeName,
      approved,
      pending,
      rejected
    } = clientProducts;

    const sceneMap = {
      [STRINGS.all]: () => this.renderApproveList({ approved, tradeName }),
      [STRINGS.pending]: () => this.renderPendingList({ pending, tradeName }),
      [STRINGS.rejected]: () => this.renderRejectedList({ rejected, tradeName })
    };

    return (
      <View style={styles.fillScreen}>
        <TabCreator
          topHeader={(
            <FilterBar
              onFilter={() => console.log('filter')}
              placeholderText={"Buscar Producto"}
            />
          )}
          sceneMap={sceneMap}
          navigationState={this.state}
          pendingListLength={pending? pending.length : 0}
        />
      </View>
    );
  }
}

ClientProductListScreen.defaultProps = {
  styles
};

ClientProductListScreen.propTypes = {
  clientProducts: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    clientProducts: state.products.inspectClientProducts
  };
};

const mapDispatchToProps = {

};

ClientProductListScreen = connect(mapStateToProps, mapDispatchToProps)(ClientProductListScreen);

export { ClientProductListScreen };