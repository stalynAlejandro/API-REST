import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { LAYOUT, SIZE } from 'constants';
import {
  Animated,
  ScrollView,
  TouchableHighlight,
  Vibration,
  View,
} from 'react-native';
import { BackRoundButton } from 'components';
import {
  AddProductButton,
  DisabledValidationButtonWithProductsPendingToLinkWarning,
  EnableValidationButton,
  FinishedStatus,
  MainEditPencil,
  EditProductHeader,
  EditProductQuantity,
  EditProviderPopUp,
  PendingProduct,
  Product,
  SecondaryEditPencil,
  OrderValidationStatus,
  ValidationScreenHeader
} from './ValidationScreen.UI';

import styles from './ValidationScreen.component.styles';

import { navigateBack } from '../../store/orders';

import TrashIcon from '../../../assets/actionIcons/trash_white.svg';

import { navigateToLinkProductSelection } from '../../store/orders';

class ValidationScreen extends React.Component {
  state = {
    editProductList: [],
    editProductQuantity: undefined,
    editingProduct: false
  };

  onPressValidate = () => { };

  onPressProductQuantity = (product) => this.setState({ editProductQuantity: product, editingProduct: true });

  onPressAddProductEditList = (product) => {
    const { editProductList } = this.state;
    Vibration.vibrate([100, 300, 100]);

    if (editProductList.includes(product)) {
      let newEditList = editProductList.filter((prod) => prod.id !== product.id);
      this.setState({
        editProductList: newEditList,
        editingProduct: newEditList.length === 0
      });
    } else {
      this.setState({
        editProductList: [...editProductList, product],
        editingProduct: true
      });
    }
  };

  renderPendingList = (pendingProduct) => {
    if (!pendingProduct) {
      return null;
    }

    const { editProductQuantity } = this.state;
    const { 
      navigateToLinkProductSelection, 
      validationOrder, 
      styles
    } = this.props;

    return pendingProduct.map((product, index) => (
      <PendingProduct
        key={index}
        product={product}
        onPress={(product) => navigateToLinkProductSelection({ ...product, tradeName: validationOrder.tradeName })}
        blurry={!editProductQuantity ? {} : styles.blurry}
      />
    ));
  }

  renderRightActions = (progress, dragX) => {
    const { styles } = this.props;
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [50, 0, 0, -100],
    });
    const AnimatedStyle = { transform: [{ translateX: trans }] };

    return (
      <Animated.View style={[{ flex: 1 }, AnimatedStyle]}>
        <View style={styles.delete_background}>
          <TrashIcon {...SIZE.square_25} />
        </View>
      </Animated.View>
    );
  }

  renderProduct = ({ product, blurry }) => {
    const { editProductList } = this.state;
    const { styles } = this.props;
    const editProduct = editProductList.includes(product);
    
    return (
      <View>
        {blurry ?
          <View style={blurry} />
          :
          null
        }
        <TouchableHighlight
          onLongPress={() => this.onPressAddProductEditList(product)}
          delayLongPress={80}
        >
          <Product
            product={product}
            backgroundColor={editProduct ? styles.highlight : styles.product_background}
            editBtn={(
              editProduct ?
                null
                :
                <MainEditPencil onPress={() => this.onPressProductQuantity(product)} />
            )}
          />
        </TouchableHighlight>
      </View>
    );
  }

  renderSwipeableProduct = (product) => (
    <Swipeable
      onSwipeableRightOpen={() => console.log('delete product')}
      overshootRight={true}
      rightThreshold={LAYOUT.WINDOW.width / 3}
      renderRightActions={this.renderRightActions}
    >
      {this.renderProduct({ product })}
    </Swipeable>
  )

  renderProductList = (products) => {
    const { editingProduct, editProductQuantity } = this.state;
    const { styles } = this.props;

    if (editProductQuantity) {
      return products.map((product, index) => (
        <View key={index}>
          {editProductQuantity.id === product.id ?
            <EditProductQuantity
              product={product}
              onPressCancel={() => (
                this.setState({ editProductQuantity: undefined, editingProduct: false, editProductList: [] })
              )}
            />
            :
            this.renderProduct({ product, blurry: styles.blurry })
          }
        </View>
      ));
    }

    if (products) {
      return products.map((product, index) => (
        <View key={index}>
          {editingProduct ?
            this.renderProduct({ product })
            :
            this.renderSwipeableProduct(product)
          }
        </View>
      ));
    }

    return null;
  }

  renderHeader = () => {
    const { navigateBack, styles } = this.props;
    const {
      editProductList,
      editingProduct,
      editProductQuantity
    } = this.state;
    const numberOfProductEditing = editProductList.length;
    const optionLeftIcon = editingProduct ? undefined : <BackRoundButton onPress={() => navigateBack()} />;

    if (editProductQuantity) {
      return (
        <ValidationScreenHeader
          optionLeftIcon={optionLeftIcon}
          onFilter={() => console.log('filter')}
          headerText={"Restaurante Maria Pepa Garcia"}
          blurry={<View style={styles.blurry} />}
          popUp={(
            <EditProviderPopUp onPressClose={() => this.setState({ editingProduct: false })} />
          )}
        />
      );
    }

    if (numberOfProductEditing === 0) {
      return (
        <ValidationScreenHeader
          optionLeftIcon={optionLeftIcon}
          onFilter={() => console.log('filter')}
          headerText={"Restaurante Maria Pepa Garcia"}
          blurry={<View />}
          popUp={<View />}
        />
      );
    }

    return (
      <EditProductHeader
        button={(
          numberOfProductEditing > 1 ?
            <View />
            :
            <SecondaryEditPencil onPress={() => (
              this.setState({ editProductQuantity: this.state.editProductList[0], editingProduct: true })
            )}
            />
        )}
        onPressCancelEdit={() => this.setState({ editProductList: [], editingProduct: false })}
        numberOfProductEditing={numberOfProductEditing}
      />
    );
  };

  renderAddProductBtn = () => <AddProductButton onPress={() => console.log('add product')} />;

  validationStatus = ({ blurry, validationOrder, action }) => (
    <OrderValidationStatus 
      blurry={blurry} 
      validationOrder={validationOrder}
      numberOfSku={(
        validationOrder && validationOrder.products?
          validationOrder.products.length 
          :
          0
      )}
      action={action}
    />
  );

  renderOrderValidationStatus = () => {
    const { validationOrder, styles } = this.props;
    const { editProductQuantity } = this.state;
    let action = <EnableValidationButton onPress={() => console.log('validate')} />;
    let blurry = {};

    if (validationOrder.finished) {
      action = <FinishedStatus date={"05/07/2019"} />;
      return this.validationStatus({ blurry, validationOrder, action });
    }
    
    if (!validationOrder.validate || validationOrder.validate.length > 0){
      action = <DisabledValidationButtonWithProductsPendingToLinkWarning />;
      return this.validationStatus({ blurry, validationOrder, action });
    }

    if (editProductQuantity) {
      action = <View />;
      blurry = styles.blurry;
      return this.validationStatus({ blurry, validationOrder, action });
    }

    return this.validationStatus({ blurry, validationOrder, action });
  }

  render() {
    const { validationOrder, styles } = this.props;
    if (!validationOrder) {
      return null;
    }

    return (
      <View style={styles.fillScreen}>
        {this.renderHeader()}
        {this.renderAddProductBtn()}
        <ScrollView>
          <View style={styles.adjustBody}>
            <View style={styles.status_order_wrapper}>
              {this.renderOrderValidationStatus()}
            </View>

            <View>
              {this.renderPendingList(validationOrder.validate)}
            </View>

            <View style={styles.fillScreen}>
              {this.renderProductList(validationOrder.products)}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

ValidationScreen.defaultProps = {
  styles
};

ValidationScreen.propTypes = {
  validationOrder: PropTypes.object.isRequired,
  navigateBack: PropTypes.func.isRequired,
  navigateToLinkProductSelection: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    validationOrder: state.orders.validationOrder || {}
  };
};

const mapDispatchToProps = {
  navigateBack,
  navigateToLinkProductSelection
};

ValidationScreen = connect(mapStateToProps, mapDispatchToProps)(ValidationScreen);

export { ValidationScreen };
