import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { TITLES } from 'constants';
import { DefaultAlert } from 'components';
import {
  CartDetailHeader,
  CartDetailHeading,
  ProviderHeading,
  EmptyComment,
  HasComment,
  CartDetailButton,
  CloseOrderDate,
  OpenCalendar,
  OpenComment,
  AlertChangeNotSaved,
  AlertInvalidDeliveryDate
} from './CartDetailScreen.UI';

import styles from './CartDetailScreen.component.styles';
import { navigateBack, IOrderProvidersDetail, IOrderProviderDetail, updateOrderProvidersObservations } from '../../store/order';
import { AppState , NavigationProps} from "store";
import { withAuthentication } from "../../HOC";

const AlertChangesNotSaved = React.forwardRef((props, ref) => <DefaultAlert ref={ref} {...props} />);
AlertChangesNotSaved.displayName = 'AlertChangesNotSaved';
const AlertInvalidaDeliveryDate = React.forwardRef((props, ref) => <DefaultAlert ref={ref} {...props} />);
AlertInvalidaDeliveryDate.displayName = 'AlertInvalidaDeliveryDate';

class CartDetailScreenComponent extends React.Component<IProps, IState> {
  alertChangesNoSavedRef = React.createRef();
  alertInvalidDeliveryDateRef = React.createRef();

  state : IState = {
    title: '',
    providerOriginaList: [],
    providerList: []
  }

  componentDidMount() {
    const title = this.props.navigation.getParam('title', '');
    const { providerList } = this.props;
    if (title) {
      this.setState({ title, providerList, providerOriginaList: providerList });
    }
  }

  renderButton = () => {
    const { title } = this.state;

    if (title === TITLES.providerObservations) {
      return <CartDetailButton onPress={() => {
        this.props.navigateBack();
        this.props.updateOrderProvidersObservations( this.state.providerList);
      }} btnText={"Aceptar"} />;
    }

    if (title === TITLES.orderDeliveryDates) {
      let providerListObj: IOrderProvidersDetail = {};
      this.state.providerList.map((provider) => {
        if (!providerListObj[provider.id]) {
          providerListObj[provider.id] = provider;
        }
      });

      return (
        <CartDetailButton
          onPress={() =>{} /*TODO update dates. EFO-197*/}
          btnText={"Modificar fechas"}
        />
      );
    }

    return null;
  };

  renderHasObservation = (observation: string, tradeName: string) => {
    if (!observation || observation === '') {
      return <EmptyComment onPress={() => this.setState({ openProvider: tradeName })} />;
    }
    return <HasComment onPress={() => this.setState({ openProvider: tradeName })} />;
  }

  onSelectDay = (date: string | null = null) => {
    const {
      providerList,
      openProvider,
      invalidDate
    } = this.state;
    let formatDate: string;

    if (date) {
      formatDate = date.slice(8) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);
    } else {
      formatDate = invalidDate.slice(8) + '/' + invalidDate.slice(5, 7) + '/' + invalidDate.slice(0, 4);
    }

    const updatedProviderList = providerList.map((provider) => {
      if (provider.tradeName === openProvider) {
        return {
            ...provider,
          deliveryDate: formatDate
        };
      }

      return provider;
    });

    this.setState({ openProvider: undefined, providerList: updatedProviderList, invalidDate: undefined });
    this.alertInvalidDeliveryDateRef.close();
  }

  onPressInvalidDate = (date: string) => {
    this.alertInvalidDeliveryDateRef.open();
    this.setState({ invalidDate: date });
  };

  temporarySaveObservation = (observation: string, providerList : IOrderProviderDetail[]) => {
    const updateProviderList = providerList.map((provider) => {
      if (provider.tradeName === this.state.openProvider) {
        return {
          ...provider,
          observation
        }
      } else {
        return provider;
      }
    })

    this.setState({
      providerList: updateProviderList,
      openProvider: undefined
    })
  }

  renderProviders = () => {
    const {
      title,
      openProvider,
      providerList
    } = this.state;

    if (!providerList) {
      return null;
    }

    return providerList.map((provider, index) => {
      const {
        tradeName,
        deliveryDate,
        observation
      } = provider;
      const isProviderOpen = openProvider === tradeName;

      if (!isProviderOpen) {
        return (
          <View key={index} style={styles.provider_close_section}>
            <ProviderHeading tradeName={tradeName} />
            {title === TITLES.providerObservations ?
              this.renderHasObservation(observation, tradeName)
              :
              <CloseOrderDate onPress={() => this.setState({ openProvider: tradeName })} date={deliveryDate} />
            }
          </View>
        );
      }

      if (title === TITLES.providerObservations) {
        return (
          <OpenComment
            key={index}
            comment={observation}
            tradeName={tradeName}
            onPressCancel={() => this.setState({ openProvider: undefined })}
            onPressSave={(observation) => this.temporarySaveObservation(observation, providerList)}
          />
        )
      } else {
        return (
          <OpenCalendar
            key={index}
            tradeName={tradeName}
            onSelectDay={(date: string) => this.onSelectDay(date)}
            onPressInvalidDate={(date: string) => this.onPressInvalidDate(date)}
            onSelectCloseProviderDate={() => this.setState({ openProvider: undefined })}
          />
        );
      }
    });
  }

  renderAlertInvalidDeliveryDate = () => (
    <AlertInvalidaDeliveryDate
      ref={(ref) => { this.alertInvalidDeliveryDateRef = ref; }}
      options={(
        <AlertInvalidDeliveryDate
          onPressYes={() => this.onSelectDay()}
          onPressNo={() => this.alertInvalidDeliveryDateRef.close()}
        />
      )}
    />
  );

  onPressConfirmDontSave = () => {
    this.props.navigateBack();
    this.alertChangesNoSavedRef.close();
  }

  renderWarningChangesNotSaved = () => (
    <AlertChangesNotSaved
      ref={(ref) => { this.alertChangesNoSavedRef = ref; }}
      options={(
        <AlertChangeNotSaved
          onPressYes={() => this.onPressConfirmDontSave()}
          onPressNo={() => this.alertChangesNoSavedRef.close()}
        />
      )}
    />
  );

  onPressReturn = () => {
    const { providerList, providerOriginaList } = this.state;

    if (JSON.stringify(providerList) !== JSON.stringify(providerOriginaList)) {
      return this.alertChangesNoSavedRef.open();
    } else {
      return this.props.navigateBack();
    }
  }

  render() {
    const { title } = this.state;

    return (
      <View style={styles.container}>
        {this.renderAlertInvalidDeliveryDate()}
        {this.renderWarningChangesNotSaved()}
        <CartDetailHeader onPressBack={() => this.onPressReturn()} />
        <View style={styles.body}>
          <CartDetailHeading title={title} />
          <ScrollView style={styles.scrollView}>
            {this.renderProviders()}
          </ScrollView>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

CartDetailScreenComponent.defaultProps = {
  styles
};

CartDetailScreenComponent.propTypes = {
  providerList: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  navigateBack: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  updateOrderProvidersObservations: PropTypes.func.isRequired
};

interface IState {
  title: string;
  providerOriginaList: IOrderProviderDetail[];
  providerList: IOrderProviderDetail[];
  openProvider?: string;
  invalidDate?: Date;
}

interface IProps extends NavigationProps{
  providerList: IOrderProviderDetail[];
  navigateBack: Function;
  providersDetail: IOrderProvidersDetail;
  updateOrderProvidersObservations: Function;
}

const mapStateToProps = (state: AppState) : { providersDetail : IOrderProvidersDetail} => {
  return {
    providersDetail: state.order.currentOrder.providerDetail //TODo why we need this to use on mergeProps when afterwards we only use providerList. Maybe remove?
  };
};

const mapDispatchToProps = {
  navigateBack,
  updateOrderProvidersObservations
};

const mergeProps = (propsFromState : { providersDetail : IOrderProvidersDetail}, propsFromDispatch, ownProps) => {
  const { providersDetail  } = propsFromState;
  const providerList = Object.values(providersDetail);

  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    providerList
  };
};


export const CartDetailScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CartDetailScreenComponent)), false);
