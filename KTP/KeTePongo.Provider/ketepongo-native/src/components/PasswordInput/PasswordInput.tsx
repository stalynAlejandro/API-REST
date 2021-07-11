import React from "react";
import PropTypes from "prop-types";
import {PasswordInputWithError, Wrapper} from "./PasswordInput.styles";
import OpenEye from "../../../assets/All_Icons/basic/show_password.svg";
import CloseEye from "../../../assets/All_Icons/basic/hide_password.svg";
import ErrorIcon from "../../../assets/All_Icons/basic/alert-circle-error.svg"
import { TouchableIcon } from "components";
import { COLORS, SIZE } from "constants";

const OpenEyeTouchable = ({ onPress }) => (
  <TouchableIcon
  isWhiteBackground={true}
    onPress={() => onPress()}
    icon={<OpenEye {...SIZE.square_20} />}
  />
);

const CloseEyeTouchable = ({ onPress }) => (
  <TouchableIcon
  isWhiteBackground={true}
    onPress={() => onPress()}
    icon={<CloseEye {...SIZE.square_20} />}
  />
);

const ErrorPasswordIcon = ({onPress}) => (
  <TouchableIcon
  styles={{marginLeft:-20}}
    onPress={() => onPress()}
    icon={<ErrorIcon {...SIZE.square_20} />}
  />
)

export class PasswordInput extends React.Component {
  input = React.createRef();

  onChangedText(value) {
    this.props.onChangeText(value, this.props.name);
  }
  constructor(props) {
    super(props);
    this.onChangedText = this.onChangedText.bind(this);
  }

  renderSeePasssword = ({ displayState, setHide, setDisplay }) => {
    if (displayState) {
      return <OpenEyeTouchable onPress={() => setHide()} />;
    }
    return <CloseEyeTouchable onPress={() => setDisplay()} />;
  };

  render() {
    const {
      inputStyle,
      placeholder,
      secureTextEntry,
      value,
      name,
      onSubmitEditing,
      onBlur,
      blurOnSubmit,
      setHide,
      setDisplay,
      displayState,
      hasError,
      isLogin,
    } = this.props;

    const blurOn = blurOnSubmit ? blurOnSubmit : false;
    return (
      <Wrapper hasError={hasError} isLogin={isLogin}>
        {hasError && <ErrorPasswordIcon onPress={() => setHide()}  />}
    
        <PasswordInputWithError
          ref={(ref) => {
            this.input = ref;
          }}
          placeholder={placeholder}
          placeholderTextColor={hasError?COLORS.KO: COLORS.main}
          secureTextEntry={secureTextEntry}
          value={value}
          name={name}
          blurOnSubmit={false}
          onChangeText={this.onChangedText}
          onSubmitEditing={onSubmitEditing}
          hasError={hasError}
          onBlur={onBlur}
          blurOnSubmit={blurOn}
        />
        {this.renderSeePasssword({
          displayState,
          setHide,
          setDisplay
        })}
      </Wrapper>
    );
  }
}

PasswordInput.propTypes = {
  inputStyle: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
};
