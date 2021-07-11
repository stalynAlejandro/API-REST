import React from 'react';
import PropTypes from 'prop-types';
import { COLORS } from 'constants';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  blurry: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.shadow_dark_black,
    zIndex: 50
  }
})
class DefaultAlert extends React.Component {
  constructor(props) {
    super(props);
    if (props && props.isVisible) {
      this.state = {
        isVisible: true
      };
      return;
    }
    this.state = {
      isVisible: false
    };
  }

  close = () => this.setState({ isVisible: false });

  open = () => this.setState({ isVisible: true });

  render() {
    const { isVisible } = this.state;
    const {
      blurryStyle,
      styles,
      options,
      onPressOut,
      hasToAvoidCloseOnPressOut
    } = this.props;

    return (
      <Modal
        presentationStyle={"overFullScreen"}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => { }}
      >
        <TouchableWithoutFeedback onPress={() => {
          if (!hasToAvoidCloseOnPressOut) {
            this.close()
          }
        }} onPressOut={() => {
          if (onPressOut) {
            onPressOut();
          }
          if (!hasToAvoidCloseOnPressOut) {
            this.close()
          }
        }}
        >
          <View style={blurryStyle ? blurryStyle : styles.blurry} />
        </TouchableWithoutFeedback >

        {options}

      </Modal>
    );
  }
}

DefaultAlert.defaultProps = {
  styles
}

DefaultAlert.propTypes = {
  blurryStyle: PropTypes.object,
  styles: PropTypes.object.isRequired,
  options: PropTypes.any.isRequired
};

export { DefaultAlert };
