import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  CodeInput,
  ClientLinkHeader,
  LinkClientButton,
  PendingClientCard
} from './ClientLinkScreen.UI';

import styles from './ClientLinkScreen.component.styles';

import { linkClientRequested, navigateBack } from '../../store/clients';

class ClientLinkScreen extends React.Component {
  state = {
    code: ''
  }
  
  onPressLinkClient = (client) => {
    const linkClientCallBack = this.props.navigation.getParam('linkClientCallBack');
    this.props.linkClientRequested({ client, linkClientCallBack });
  }

  render() {
    const { 
      client, 
      navigateBack,
      styles 
    } = this.props;

    if (!client) {
      return null;
    }

    return (
      <View style={styles.fillScreen}>
        <ClientLinkHeader onPressBack={() => navigateBack()} />
        <View style={styles.body}>
          <PendingClientCard client={client} />

          <CodeInput onChangeText={(code) => this.setState({ code })} />

          <LinkClientButton onPressLinkClient={() => this.onPressLinkClient(client)} />
        </View>
      </View>
    );
  }
}

ClientLinkScreen.defaultProps = {
  styles
};

ClientLinkScreen.propTypes = {
  client: PropTypes.object.isRequired,
  linkClientRequested: PropTypes.func.isRequired,
  navigateBack: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => {
  return {
    client: state.clients.selectedClient
  };
};

const mapDispatchToProps = {
  linkClientRequested,
  navigateBack,
};

ClientLinkScreen = connect(mapStateToProps, mapDispatchToProps)(ClientLinkScreen);

export { ClientLinkScreen };

