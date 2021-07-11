import React from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";

class DefaultFlatList extends React.Component {
  render() {
    const { list, renderSingleListItem, ...extraProps } = this.props;

    if (!list || !renderSingleListItem) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref={ref => {
            this.defaultFlacdtList = ref;
          }}
          {...extraProps}
          keyboardShouldPersistTaps="always"
          maxToRenderPerBatch={4}
          data={list}
          removeClippedSubviews={true}
          viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
          bounces={true}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) =>
            renderSingleListItem({ item, index })
          }
        />
      </View>
    );
  }
}

DefaultFlatList.propTypes = {
  list: PropTypes.array.isRequired,
  renderSingleListItem: PropTypes.func.isRequired
};

export { DefaultFlatList };