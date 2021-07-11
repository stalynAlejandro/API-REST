import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';
import { COLORS } from 'constants';

const renderTryLaterBtn = (optionalBtn) => {
  if (!optionalBtn) {
    return;
  }
  return <Button title={optionalBtn.text} onPress={optionalBtn.functionCall} />;
}

const ErrorMessage = ({ errorMessage, mainBtn, optionalBtn }) => {
  if (mainBtn) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{errorMessage.status}:{errorMessage.description}</Text>
        <View style={styles.btn_wrapper} >
          <Button title={mainBtn.text} onPress={mainBtn.functionCall} />
        </View>
        {/* {renderTryLaterBtn(optionalBtn)} */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 30,
    paddingLeft: 30
  },
  error: {
    color: COLORS.warningRed,
    fontSize: 20,
    textAlign: 'center',
    margin: 30
  },
  btn_wrapper: {
    marginBottom: 30
  }
});

export { ErrorMessage };
