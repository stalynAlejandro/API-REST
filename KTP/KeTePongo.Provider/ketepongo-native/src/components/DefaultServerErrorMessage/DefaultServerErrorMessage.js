import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { COLORS, FONTSIZE } from 'constants';
import { TypoGraphyOpenSans } from 'components';
import PropTypes from 'prop-types';

const DefaultServerErrorMessage = ({ error, ...props }) => {
  if(!error){
    return <View/>
  }
  return <View style={{...styles.container,...(props.containerStyles ? props.containerStyles:{})}}>
    <TypoGraphyOpenSans
      style={{...styles.error_text,...(props.styles?props.styles:{})}}
      text={error.description}
      {...props}
    />
  </View>;
};
DefaultServerErrorMessage.propTypes = {
  errorMessage: PropTypes.shape({
    status: PropTypes.string,
    description: PropTypes.string
  }),
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 30,
    paddingLeft: 30
  },
  error_text: {
    color: COLORS.KO,
    ...FONTSIZE.secondary_small
  }
});

export { DefaultServerErrorMessage };
