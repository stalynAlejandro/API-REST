import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { DefaultFlatList,TouchableIcon } from 'components';
import { SIZE } from 'constants';
import styles from './SelectionListScroll.component.styles';
import {
  ConnectIconDisplay,
  TouchableChoiceNameDisplay,
  ChoiceNameDisplay,
  TouchableEditIcon
} from './SelectionListScroll.Ui';
import PencilIcon from '../../../assets/All_Icons/basic/pencil_large.svg';
import PencilIconMain from '../../../assets/All_Icons/basic/pencil_large_main.svg';
class SelectionListScroll extends React.Component {

  renderNameDisplay = ({ item }) => {
    if (!item){
      return null;
    }

    const name = item.name ? item.name : item.tradeName;
    const { onPressSelect } = this.props;

    if (onPressSelect) {
      return (
        <TouchableChoiceNameDisplay
          name={name}
          onPressSelect={() => onPressSelect(item)}
        />
      );
    }

    return <ChoiceNameDisplay name={name} />;
  };

  renderProviderLinkedIcon = (tradeName) => {
    if (!tradeName) {
      return null;
    }

    return <ConnectIconDisplay />;
  };

  renderSingleListItem = ({ item, index }) => {
    const { list,onPressEdit } = this.props;
    return (
      <TouchableIcon
    onPress={() => onPressEdit(item)}
    styles={styles.name}
    icon={<View key={index} style={index === list.length - 1 ? styles.container : {...styles.container, ...styles.underLine}}>
    {/* <View style={styles.icon_wrapper}>
      {this.renderProviderLinkedIcon(item.tradeName || undefined)}
    </View> */}

    {this.renderNameDisplay({ item })}

    <View style={styles.pencil_wrapper}>
      <PencilIconMain {...SIZE.square_20} />
    </View>
  </View>}
  />

    )
  }

  render() {
    const { list } = this.props;

    if (!list) {
      return null;
    }

    return (
      <View style={styles.selectionList}>
        <DefaultFlatList
          list={list}
          renderSingleListItem={({item, index}) => this.renderSingleListItem({item, index})}
        />
      </View>
    );
  }
}

SelectionListScroll.propTypes = {
  list: PropTypes.array,
  onPressSelect: PropTypes.func,
  onPressEdit: PropTypes.func,
};

export { SelectionListScroll };
