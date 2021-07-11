import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './TransitionSelectView.component.styles';

const TransitionSelectView = ({
  icon,
  headingText,
  contentText,
  buttons
}) => (
  <View style={styles.container}>
    <View style={styles.fillScreen} >
      <View style={styles.icon_wrapper}>
        <View>
          {headingText}
        </View>
        {icon}
      </View>

      <View style={styles.fillScreen} />

      <View style={styles.content_wrapper}>
        {contentText}
      </View>

      <View style={styles.fillScreen} />

      <View style={styles.buttons_wrapper}>
        {buttons}
      </View>
    </View>
  </View>
);

TransitionSelectView.propTypes = {
  headingText: PropTypes.string,
  icon: PropTypes.element.isRequired,
  contentText: PropTypes.element.isRequired,
  buttons: PropTypes.any.isRequired
};

export { TransitionSelectView }; 