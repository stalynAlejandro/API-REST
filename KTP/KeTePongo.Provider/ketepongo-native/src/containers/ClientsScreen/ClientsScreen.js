import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { STRINGS } from 'constants';
import { 
  ClientsList,
  DefaultAlert,
  DefaultFlatList,
  FilterBar, 
  TabCreator 
} from 'components';
import { 
  EmployeeCard, 
  LinkedClientAlert,
  PendingClientCard 
} from './ClientsScreen.UI';

import { navigateToLinkClient } from '../../store/clients';

const ClientLinkedAlert = React.forwardRef((props,ref) => (
  <DefaultAlert ref={ref} {...props} />
));
ClientLinkedAlert.displayName = 'ClientLinkedAlert';

const TabCreatorDisplay = React.forwardRef((props,ref) => (
  <TabCreator ref={ref} {...props} />
));
TabCreatorDisplay.displayName = 'TabCreatorDisplay';


class ClientsScreen extends React.Component {
  clientLinkedRef = React.createRef();
  tabCreatorRef = React.createRef();
  
  state = {
    routes: [
      { key: STRINGS.all, title: STRINGS.all },
      { key: STRINGS.pending, title: STRINGS.pending },
    ],
    newLinkClient: undefined
  };

  renderEmployeeList = ({ employeeList }) => (
    employeeList.map((employee, index) => <EmployeeCard key={index} employee={employee} />)
  );

  renderPendingItem = ({ item, index }) => ( 
    <PendingClientCard
      key={index}
      client={item}
      onPressLink={() => this.props.navigateToLinkClient({ 
        client: item,
        linkClientCallBack: this.linkClientCallBack
      })}
      onPressReject={() => console.log('rejected')}
      employeeList={this.renderEmployeeList({ employeeList: item.employeeList })}
    />
  );

  linkClientCallBack = (client) => {
    this.tabCreatorRef.resetTabCallBack();
    setTimeout(() => {
      this.setState({ newLinkClient: client });
      this.clientLinkedRef.open();
    }, 0);
  }

  onPressOk = () => {
    this.setState({ newLinkClient: undefined });
    this.clientLinkedRef.close();
  }

  renderClientLinkedAlert = () => {
    const { newLinkClient } = this.state;
    const tradeName = !newLinkClient? '' : newLinkClient.tradeName;
    
    return (
      <ClientLinkedAlert
        ref={(ref) => { this.clientLinkedRef = ref; }}
        options={(
          <LinkedClientAlert tradeName={tradeName} onPress={() => this.onPressOk()} />
        )}
      />
    );
  };

  render() {
    const { clients, pendingClients } = this.props;
    const sceneMap = {
      [STRINGS.all]: () => <ClientsList list={clients} />,
      [STRINGS.pending]: () => (
        <DefaultFlatList
          list={pendingClients}
          renderSingleListItem={({item, index }) => this.renderPendingItem({ item, index })}
        />
      ),
    };

    return (
      <TabCreatorDisplay
        ref={(ref) => { this.tabCreatorRef = ref; }}
        topHeader={(
          <FilterBar
            onFilter={() => console.log('filter')}
            placeholderText={"Buscar Clientes"}
          />
        )}
        sceneMap={sceneMap}
        navigationState={this.state}
        pendingListLength={pendingClients? pendingClients.length : 0}
        alertBox={this.renderClientLinkedAlert()}
        alertBoxOpen={this.state.newLinkClient? true: false}
      />
    );
  }
}

ClientsScreen.propTypes = {
  clients: PropTypes.array.isRequired,
  pendingClients: PropTypes.array.isRequired,
  navigateToLinkClient: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    clients: state.clients.list,
    pendingClients: state.clients.pendingList
  };
};

const mapDispatchToProps = {
  navigateToLinkClient
};

ClientsScreen = connect(mapStateToProps, mapDispatchToProps)(ClientsScreen);
export { ClientsScreen };