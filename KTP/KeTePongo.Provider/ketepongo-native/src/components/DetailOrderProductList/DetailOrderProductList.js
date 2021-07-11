import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  ProductRejected,
  ProductInformation,
  NoProductImage,
  ProductImage
} from './DetailOrderProductList.Ui';

import styles from './DetailOrderProductList.component.styles';

class DetailOrderProductList extends React.Component {

  renderProductPhoto = (image) => {
    if (!image || image == '') {
      return <NoProductImage />;
    } else {
      return <ProductImage imageUrl={image} />;
    }
  }

  renderProductList = () => {
    const { productLines, orderLines } = this.props;

    return productLines.map((product, index) => {
      const {
        imageUrl,
        name,
        productRef
      } = product;
      const image = this.renderProductPhoto(imageUrl);
      let quantity = 0;

      for(let i=0; i <orderLines.length; i++) {
        if (orderLines[i].productId === product.id) {
          quantity = orderLines[i].quantity;
          break;
        }
      }

      if (product.isRejected) {
        return (
          <ProductRejected
            key={`${name}-${index}`}
            image={image}
            name={name}
            quantity={quantity}
          />
        );
      }

      return (
        <ProductInformation
          key={`${name}-${index}`}
          image={image}
          name={name}
          productRef={productRef}
          quantity={quantity}
        />
      );
    })
  };

  render() {
    const { styles } = this.props;

    return (
      <View style={styles.container}>
        {this.renderProductList()}
      </View>
    );
  }
}

DetailOrderProductList.defaultProps = {
  styles
};

DetailOrderProductList.propTypes = {
  productLines: PropTypes.array.isRequired,
  orderLines: PropTypes.array.isRequired,
  styles: PropTypes.object.isRequired
};

export { DetailOrderProductList };
