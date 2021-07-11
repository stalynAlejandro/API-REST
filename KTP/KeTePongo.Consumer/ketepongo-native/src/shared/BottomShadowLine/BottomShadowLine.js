import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Platform } from 'react-native';
import { COLORS, HEIGHT } from 'constants';

const styles = StyleSheet.create({
  transparent: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: COLORS.shadow,
    ...HEIGHT.topHeaderHeight,
    width: '100%',
    zIndex: 50,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .5,
        shadowRadius: 1,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  header: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: COLORS.neutral_min,
    ...HEIGHT.topHeaderHeight,
    width: '100%',
    zIndex: 100,
    paddingBottom: 1.5
  },
});

const BottomShadowLine = ({
  sectionHeight,
  component
}) => (
    <View style={{ ...styles.transparent, ...(sectionHeight ? sectionHeight : {}) }}>
      <View style={{ ...styles.header, ...(sectionHeight ? sectionHeight : {}) }}>
        {component}
      </View>
    </View>
  );

BottomShadowLine.propTypes = {
  sectionHeight: PropTypes.object,
  component: PropTypes.any
};

export { BottomShadowLine };