import React from 'react';
import PropTypes from 'prop-types';

import { NameInput } from './ProductNameInput.Ui';

class ProductNameInput extends React.Component {
  state = {
    name: ''
  };

  componentDidMount = () => this.setState({ name: this.props.name });

  render = () => (
    <NameInput
      name={this.state.name}
      {...this.props}
      onChangeText={(name) => this.setState({ name })}
    />
  );
}

ProductNameInput.propTypes = {
  name: PropTypes.string,
};

export { ProductNameInput };