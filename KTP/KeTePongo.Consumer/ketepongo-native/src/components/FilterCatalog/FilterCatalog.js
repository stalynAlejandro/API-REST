import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ARRAYS,
  STRINGS,
  TITLES,
  HEIGHT,
  LAYOUT
} from 'constants';
import {
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansSemiBold,
  TouchableIcon,
  TouchableHighlightIcon
} from 'components';

import styles from './FilterCatalog.component.styles';
import UpArrow from '../../../assets/All_Icons/arrows/arrow_up_noTail.svg';
import DownArrow from '../../../assets/All_Icons/arrows/arrow_down_noTail.svg';
import { filterCatalogRequest, navigateBackToCatalog } from '../../store/filterCatalog';

class FilterCatalog extends React.Component {
  state = {
    locationSelected: -1,
    providerSelected: -1,
    weekdaySelected: -1,
    locationShowed: false,
    providerShowed: false,
    weekdayShowed: false,
    spaceAvailable: LAYOUT.WINDOW.height,
    buttonHeight: HEIGHT.filterCatalogButtonHeight,
    filtersHeight: HEIGHT.initialFilterCatalogHeight
  }

  componentDidMount = () => this.props.onRef(this);

  componentWillUnmount = () => this.props.onRef(undefined);

  onResetFilter = () => {
    this.setState({
      locationSelected: -1,
      providerSelected: -1,
      weekdaySelected: -1,
      locationShowed: false,
      providerShowed: false,
      weekdayShowed: false,
    });
  }

  onPressFilter = () => {
    const {
      locationSelected,
      providerSelected,
      weekdaySelected
    } = this.state;

    this.props.navigateBackToCatalog();

    return this.props.filterCatalogRequest({
      keyword: undefined, 
      locationId: locationSelected, 
      providerId: providerSelected, 
      weekdays: [weekdaySelected]
    });
  }

  onPressFilterHeading = (type) => {
    const {
      locationShowed,
      providerShowed,
      weekdayShowed
    } = this.state;

    if (type === 'location') {
      return this.setState({ locationShowed: !locationShowed, providerShowed: false, weekdayShowed: false });
    }

    if (type === 'provider') {
      return this.setState({ locationShowed: false, providerShowed: !providerShowed, weekdayShowed: false });
    }

    if (type === 'weekday') {
      return this.setState({ locationShowed: false, providerShowed: false, weekdayShowed: !weekdayShowed });
    }
  }

  renderFilterSection = (headingText, type, showing, list, select) => (
    <View style={styles.section}>
      <TouchableIcon
        onPress={() => this.onPressFilterHeading(type)}
        icon={(
          <View style={styles.heading_wrapper}>
            <TypoGraphyOpenSansBold style={styles.heading} text={headingText} />
            {showing ? <UpArrow /> : <DownArrow />}
          </View>
        )}
      />
      {showing ?
        <View style={styles.option_list_height}>
          <ScrollView>
            {this.renderOptionList(list, type)}
          </ScrollView>
        </View>
        :
        this.renderSelectedOption(list[select])
      }
    </View>
  );

  renderSelectedOption = (selected) => {
    if (!selected) {
      return <View />;
    }

    const selectedName = (selected.name ? selected.name : selected.tradeName).toUpperCase();
    return <TypoGraphyOpenSansSemiBold style={styles.selected_option} text={selectedName} />;
  }

  renderOptionList = (list, type) => {
    const array = typeof list === 'object' ? Object.values(list) : list;
    const { styles } = this.props;
    const resetOptionValue = this.renderSingleOption(type, -1);
    let optionSelect;
    let optionText;
    const otherOptions = array.map((item, index) => {
      optionText = (item.name ? item.name : item.tradeName).toUpperCase();
      optionSelect = (
        <View style={index === (array.length - 1) ? styles.option_text_wrapper : { ...styles.option_text_wrapper, ...styles.divider }}>
          {item.id === this.state[`${type}Selected`] ?
            <TypoGraphyOpenSansBold
              style={{ ...styles.option_text, ...styles.option_text_selected }}
              text={optionText}
            />
            :
            <TypoGraphyOpenSansSemiBold
              style={styles.option_text}
              text={optionText}
            />
          }
        </View>
      );

      return this.renderSingleOption(type, item.id, optionSelect, (index + 1));
    });

    return [resetOptionValue, ...otherOptions];
  }

  renderSingleOption = (type, selectId, optionSelect, key) => {
    const { styles } = this.props;
    return (
      <TouchableHighlightIcon
        key={!key ? selectId : key}
        style={styles.option}
        onPress={() => this.setState({ [`${type}Selected`]: selectId, [`${type}Showed`]: false })}
        icon={(
          optionSelect ?
            optionSelect
            :
            <View style={styles.divider}>
              <TypoGraphyOpenSansBold style={styles.option_text} text={type === STRINGS.weekday ? "-" : "TODOS"} />
            </View>
        )}
      />
    );
  }

  render() {
    const {
      styles,
      locationDictionary,
      providerDictionary,
      statusBarHeight
    } = this.props;
    const {
      locationSelected,
      providerSelected,
      weekdaySelected,
      locationShowed,
      providerShowed,
      weekdayShowed,
      spaceAvailable,
      filtersHeight,
      buttonHeight
    } = this.state;
    const navigationHeight = HEIGHT.navigationHeight.height;
    
    return (
      <View
        style={styles.container}
        onLayout={({ nativeEvent }) => this.setState({ spaceAvailable: nativeEvent.layout.height - statusBarHeight - navigationHeight })}
      >
        <ScrollView style={styles.container}>
          <View style={{ ...styles.scrollView, height: styles.scrollView.height - statusBarHeight }}>
            <View
              style={styles.filters_wrapper}
              onLayout={({ nativeEvent }) => this.setState({ filtersHeight: nativeEvent.layout.height + statusBarHeight })}
            >
              {this.renderFilterSection(TITLES.lugar, STRINGS.location, locationShowed, locationDictionary, locationSelected)}
              {this.renderFilterSection(TITLES.proveedor, STRINGS.provider, providerShowed, providerDictionary, providerSelected)}
              {this.renderFilterSection(TITLES.diaRecogida, STRINGS.weekday, weekdayShowed, ARRAYS.weekdays, weekdaySelected)}
            </View>

            <View style={{ height: spaceAvailable - buttonHeight - filtersHeight }} />

            {filtersHeight + buttonHeight > spaceAvailable ?
              <View />
              :
              <View style={styles.btn_wrapper} onLayout={({ nativeEvent }) => this.setState({ buttonHeight: nativeEvent.layout.height })}>
                <TouchableIcon
                  onPress={() => this.onPressFilter()}
                  styles={styles.btn}
                  icon={<TypoGraphyOpenSansBold style={styles.btn_text} text={"Filtrar"} />}
                />
              </View>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

FilterCatalog.defaultProps = {
  styles
};

FilterCatalog.propTypes = {
  onRef: PropTypes.any.isRequired,
  statusBarHeight: PropTypes.number.isRequired,
  locationDictionary: PropTypes.object.isRequired,
  providerDictionary: PropTypes.object.isRequired,
  filterCatalogRequest: PropTypes.func.isRequired,
  navigateBackToCatalog: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    locationDictionary: state.consumption.locations.dictionary,
    providerDictionary: state.consumption.providers.dictionary,
  };
};

const mapDispatchToProps = {
  filterCatalogRequest,
  navigateBackToCatalog
};

FilterCatalog = connect(mapStateToProps, mapDispatchToProps)(FilterCatalog);

export { FilterCatalog };