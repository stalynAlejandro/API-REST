import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import { COLORS, TYPOGRAPHY, FONTSIZE } from 'constants';
import styled from "styled-components/native";

export const DefaultTextInputWithError = styled.TextInput`
  ${TYPOGRAPHY.openSans};
  ${FONTSIZE.tertiary};
  borderBottomColor: ${props =>props.hasError ? COLORS.KO : COLORS.main};
  color: ${(props) => (props.hasError ? COLORS.KO : COLORS.main)};
  borderBottomWidth: 1;
  paddingBottom: 0;
  paddingLeft: 0;
  width: 100%;
`;

class DefaultTextInput extends React.Component {
  onChangedText(value) {
    this.props.onChangeText(value, this.props.name)
  }
  constructor (props) {
    super(props)
    this.onChangedText = this.onChangedText.bind(this)
  }

  render() {
    const {
      inputStyle,
      placeholder,
      value,
      name,
      onChangeText,
      onSubmitEditing,
      keyboardType,
      blurOnSubmit,
      hasError,
      ...extraProps
    } = this.props;

    const keyboard = keyboardType ? keyboardType : 'default';
    const placeholderTextColor = placeholderTextColor ? placeholderTextColor : COLORS.neutral_min;
    const blurOn = blurOnSubmit ? blurOnSubmit : false;

    return (
      <DefaultTextInputWithError
        ref={(ref) => this.defaultInput = ref}
        style={inputStyle}
        placeholder={placeholder}
        placeholderTextColor={hasError?COLORS.KO: COLORS.main}
        keyboardType={keyboard}
        onChangeText={this.onChangedText}
        value={value}
        name={name}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOn}
        hasError={hasError}
        {...extraProps}
      />
    );
  }
}

DefaultTextInput.propTypes = {
  inputStyle: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  placeholderTextColor: PropTypes.string,
  blurOnSubmit: PropTypes.bool,
  keyboardType: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired
};

export { DefaultTextInput };
