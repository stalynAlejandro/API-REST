import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';
import { TouchableIcon, TypoGraphyOpenSansBold } from 'components';
import { COLORS } from 'constants';
import { ASSETS } from 'assets';

import styles from './CatalogProductQuantity.component.styles';
import {
  addProductToOrderRequest,
  reduceProductFromOrderRequest,
  removeProductFromOrderRequest
} from '../../store/order';

class CatalogProductQuantity extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disable: false };

    this.animatedQuanityBackgroundColor = new Animated.Value(0);
    this.interpolateBackgroundColor = this.animatedQuanityBackgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.ok, COLORS.neutral_medium_strong]
    });

    this.animatedQuantityBarWidth = new Animated.Value(192);
    this.animatedPedirHeight = new Animated.Value(20);
    this.animatedPlusSign = new Animated.Value(0);
    this.animatedMinusWrapper = new Animated.Value(0);
    this.animatedMinusSign = new Animated.Value(0);
    this.animatedTrash = new Animated.Value(0);
    this.animatedTrashWrapper = new Animated.Value(0);
  }

  componentDidMount() {
    if (this.props.orderLineQuantity === 0) {
      this.resetQuantityDisplayButtons();
    } else {
      this.setQuantityDisplayButtons();
    }
  }

  resetQuantityDisplayButtons = () => {
    this.animatedQuanityBackgroundColor.setValue(0);
    this.animatedQuantityBarWidth.setValue(192);
    this.animatedPedirHeight.setValue(20); 
    this.animatedPlusSign.setValue(0);
    this.animatedMinusWrapper.setValue(0);
    this.animatedMinusSign.setValue(0);
    this.animatedTrashWrapper.setValue(0);
    this.animatedTrash.setValue(0);
  }

  setQuantityDisplay = () => {
    this.animatedQuanityBackgroundColor.setValue(1);
    this.animatedPedirHeight.setValue(0);
    this.animatedQuantityBarWidth.setValue(150);
    this.animatedPlusSign.setValue(12);
    this.animatedMinusWrapper.setValue(32);
    this.animatedMinusSign.setValue(16);
    this.animatedTrashWrapper.setValue(32);
    this.animatedTrash.setValue(24);
  }

  setQuantityDisplayButtons = () => {
    Animated.stagger(5, [
      Animated.spring(this.animatedQuanityBackgroundColor, {
        toValue: 1,
        duration: 150
      }),
      Animated.spring(this.animatedPedirHeight, {
        toValue: 0,
        bounciness: 0,
        duration: 0
      }),
      Animated.timing(this.animatedQuantityBarWidth, {
        toValue: 32,
        duration: 150
      }),
      Animated.spring(this.animatedPlusSign, {
        toValue: 12,
        bounciness: 0,
        duration: 0
      }),
      Animated.spring(this.animatedMinusWrapper, {
        toValue: 32,
        bounciness: 0,
        duration: 0
      }),
      Animated.spring(this.animatedMinusSign, {
        toValue: 16,
        bounciness: 0,
        duration: 0
      }),
      Animated.spring(this.animatedTrashWrapper, {
        toValue: 32,
        bounciness: 0,
        duration: 0
      }),
      Animated.spring(this.animatedTrash, {
        toValue: 24,
        bounciness: 0,
        duration: 0
      }),
    ]).start();
  }

  onHandlePressDelete = (orderLineQuantity) => {
    if (orderLineQuantity === 0) {
      return;
    }

    this.resetQuantityDisplayButtons();
    const { removeProductFromOrderRequest, product } = this.props;
    removeProductFromOrderRequest(product);
  }
  
  onHandlePressMinus = (orderLineQuantity) => {
    if (orderLineQuantity === 1) {
      this.resetQuantityDisplayButtons();
    }

    const { reduceProductFromOrderRequest, product } = this.props;
    reduceProductFromOrderRequest(product);
  }

  onHandlePressAdd = (orderLineQuantity) => {
    if (orderLineQuantity === 0) {
      this.setQuantityDisplayButtons();
    }

    const { addProductToOrderRequest, product } = this.props;
    addProductToOrderRequest(product);
  }

  renderQuantity = (orderLineQuantity) => {
    if (!orderLineQuantity || orderLineQuantity === 0) {
      return null;
    }

    return <TypoGraphyOpenSansBold style={styles.quantity} text={String(orderLineQuantity)} />;
  }

  render() {
    const { styles, orderLineQuantity } = this.props;

    const AnimatedQuantityBar = {
      backgroundColor: this.interpolateBackgroundColor,
      width: this.animatedQuantityBarWidth
    };
    const AnimatedPedirText = { height: this.animatedPedirHeight };
    const AnimatedPlusSign = {
      height: this.animatedPlusSign,
      width: this.animatedPlusSign,
    };
    const AnimatedMinusWrapper = {
      height: this.animatedMinusWrapper,
      width: this.animatedMinusWrapper
    };
    const AnimatedMinusSign = {
      height: this.animatedMinusSign,
      width: this.animatedMinusSign
    };
    const AnimatedTrashWrapper = {
      height: this.animatedTrashWrapper,
      width: this.animatedTrashWrapper
    };
    const AnimatedTrash = {
      height: this.animatedTrash,
      width: this.animatedTrash
    };

    return (
      <View style={styles.container}>
        <TouchableIcon
          disabled={this.state.disable}
          onPress={() => this.onHandlePressDelete(orderLineQuantity)}
          icon={(
            <Animated.View style={[styles.trash_wrapper, AnimatedTrashWrapper]}>
              <Animated.Image source={ASSETS.trash_grey} style={AnimatedTrash} />
            </Animated.View>
          )}
        />

        <View style={styles.quantity_container}>
          <TouchableIcon
            disabled={this.state.disable}
            onPress={() => this.onHandlePressMinus(orderLineQuantity)}
            icon={(
              <Animated.View style={[styles.minus_button, AnimatedMinusWrapper]}>
                <Animated.Image source={ASSETS.minus_grey} style={AnimatedMinusSign} />
              </Animated.View>
            )}
          />

          {this.renderQuantity(orderLineQuantity)}
          
          <TouchableIcon
            disabled={this.state.disable}
            onPress={() => this.onHandlePressAdd(orderLineQuantity)}
            icon={(
              <Animated.View style={[styles.add_button, AnimatedQuantityBar]}>
                <Animated.Text style={[styles.pedir, AnimatedPedirText]}>Pedir</Animated.Text>
                <Animated.Image source={ASSETS.plus_main} style={AnimatedPlusSign} />
              </Animated.View>
            )}
          />
        </View>
      </View>
    );
  }
}

CatalogProductQuantity.defaultProps = {
  styles
};

CatalogProductQuantity.propTypes = {
  product: PropTypes.object.isRequired,
  orderLineQuantity: PropTypes.number.isRequired,
  addProductToOrderRequest: PropTypes.func.isRequired,
  reduceProductFromOrderRequest: PropTypes.func.isRequired,
  removeProductFromOrderRequest: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

const mapStateToDispatch = {
  addProductToOrderRequest,
  reduceProductFromOrderRequest,
  removeProductFromOrderRequest
};

CatalogProductQuantity = connect(null, mapStateToDispatch)(CatalogProductQuantity)

export { CatalogProductQuantity };