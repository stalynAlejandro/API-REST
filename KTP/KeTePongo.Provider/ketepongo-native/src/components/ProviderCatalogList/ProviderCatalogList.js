import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  DefaultFlatList,
  LongRoundButton,
  ProductImage,
  TypoGraphyOpenSansSemiBold
} from 'components';
import { SIZE } from 'constants';

import styles from './ProviderCatalogList.component.styles';

class ProviderCatalogList extends React.Component {
  SingleProduct = ({item, index}) => {
    const { onPressAddProduct } = this.props;
    return (
      <View key={index} style={styles.product}>
        <View style={styles.image_wrapper}>
          <ProductImage imageUrl={item.imageUrl} size={SIZE.square_115} />
        </View>

        <View style={styles.description_wrapper}>
          <TypoGraphyOpenSansSemiBold numberOfLines={5} style={styles.name} text={item.name.toUpperCase()} />
          <LongRoundButton
            buttonText={"Añadir a mis Productos"}
            onPressButton={() => onPressAddProduct(item.id)}
            btnStyle={styles.btn}
          />
        </View>
      </View>
    );
  }

  render() {
    const { list } = this.props;

    if (!list || list.length === 0) {
      return <View />;
    }

    return (
      <View style={styles.container}>
        <DefaultFlatList
          list={list}
          renderSingleListItem={({item, index}) => this.SingleProduct({item, index})}
        />
      </View>
    );
  }
}

ProviderCatalogList.propTypes = {
  list: PropTypes.array,
  onPressAddProduct: PropTypes.func.isRequired,
};

export { ProviderCatalogList };