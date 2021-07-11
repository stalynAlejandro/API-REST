import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native'; 
import { ClientCard, ClientMenu } from './ClientsList.UI';
import { DefaultFlatList } from 'components';

import {
  inspectClientOrdersRequested,
  inspectClientProductsRequested,
  inspectClientRequest
} from '../../store/clients';

class ClientsList extends React.Component {
  state = {
    selectedClient: undefined
  }

  renderRegularItem = ({ item, index }) => {
    const client = item;
    const { 
      inspectClientOrdersRequested,
      inspectClientProductsRequested,
      inspectClientRequest
    } = this.props;
    const { clientMenu } = this.state;
  
    if (!client) {
      return null;
    }

    if (clientMenu === client) {
      return (
        <ClientMenu
          key={index}
          onPressClientOrder={() => inspectClientOrdersRequested(client)}
          onPressClientProducts={() => inspectClientProductsRequested(client)}
          onPressClientInfo={() => inspectClientRequest(client)}
          onPress={() => this.setState({ clientMenu: undefined })}
        />
      );
    }
  
    return (
      <ClientCard
        key={index}
        client={client}
        onPress={() => this.setState({ clientMenu: client })}
      />
    );
  };

  render() {
    const { list } = this.props;

    if (!list ){
      return null;
    }

    return (
      <DefaultFlatList
        list={list}
        renderSingleListItem={({item, index }) => this.renderRegularItem({ item, index })}
      />
    );
  }
}

ClientsList.propTypes = {
  list: PropTypes.array.isRequired,
  inspectClientOrdersRequested: PropTypes.func.isRequired,
  inspectClientProductsRequested: PropTypes.func.isRequired,
  inspectClientRequest: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  inspectClientOrdersRequested,
  inspectClientProductsRequested,
  inspectClientRequest
};

ClientsList = connect(null, mapDispatchToProps)(ClientsList);

export { ClientsList };