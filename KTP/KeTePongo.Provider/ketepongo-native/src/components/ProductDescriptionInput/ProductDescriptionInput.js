import React from 'react';
import PropTypes from 'prop-types';

import { DescriptionInput } from './ProductDescriptionInput.Ui';

class ProductDescriptionInput extends React.Component {
  state = {
    description: ''
  };

  componentDidMount = () => this.setState({ description: this.props.description });

  render = () => (
    <DescriptionInput
      description={this.state.description}
      {...this.props}
      onChangeText={(description) => this.setState({ description })}
    />
  );
}

ProductDescriptionInput.propTypes = {
  description: PropTypes.string,
};

export { ProductDescriptionInput };