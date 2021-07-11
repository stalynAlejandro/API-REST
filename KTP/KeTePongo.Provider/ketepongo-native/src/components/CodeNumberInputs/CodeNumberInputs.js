import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';

import styles from './CodeNumberInputs.component.styles';

class CodeNumberInputs extends React.Component {
  state = {};

  componentDidMount() {
    const { numberOfInputs } = this.props;
    let stateInput = {};

    for (let i = 0; i < numberOfInputs; i++) {
      stateInput[i] = '';
      i = React.createRef();
      return;
    }

    stateInput.numberOfInputs = numberOfInputs;
    this.setState(stateInput);
  }

  onTypeCode = ({ i, number }) => {
    const { numberOfInputs, onPressSubmit } = this.props;
    const nextInput = i + 1;

    if (nextInput === numberOfInputs) {
      return onPressSubmit([...Object.values(this.state), number]);
    }

    this.setState({ [i]: number });
    if(number===""){
      return;
    }

    this[nextInput].focus();
    return;
  }

handleKeyPress = (event, i)=>{
  if(event.nativeEvent.key && event.nativeEvent.key==='Backspace' && i>0){
    this[i-1].focus();
  }
}

  renderInputs = (numberOfInputs) => {
    const { lineStyle, isFilled } = this.props;
    let inputs = [];

    for (let i = 0; i < numberOfInputs; i++) {
      inputs.push(
        <TextInput
          maxLength={1}
          key={i}
          style={!lineStyle? styles.input : {...styles.input,...lineStyle}}
          keyboardType={"numeric"}
          onChangeText={(number) => this.onTypeCode({ i, number })}
          onKeyPress={(event)=>this.handleKeyPress(event, i)}
          value={this.state[i]}
          returnKeyType={'done'}
          ref={(ref) => { this[i] = ref; }}
        />
      );
    }
    return (
      <View style={styles.input_wrapper}>
        {inputs}
      </View>
    );
  }

  render() {
    const { numberOfInputs } = this.props;
    if (!numberOfInputs) {
      return null;
    }

    return (
      <View styles={styles.container}>
        {this.renderInputs(numberOfInputs)}
      </View>
    );
  }
}

CodeNumberInputs.defaultProps = {
  styles
};

CodeNumberInputs.propTypes = {
  lineStyle: PropTypes.object,
  onPressSubmit: PropTypes.func.isRequired,
  numberOfInputs: PropTypes.number.isRequired,
  styles: PropTypes.object.isRequired
};

export { CodeNumberInputs };
