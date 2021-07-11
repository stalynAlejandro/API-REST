import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { STRINGS } from 'constants';
import {
  TabView,
  SceneMap,
  TabBar,
} from 'react-native-tab-view';
import {
  DefaultAlert,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans
} from 'components';

import styles from './TabCreator.component.styles';

const AlertBox = React.forwardRef((props,ref) => (
  <DefaultAlert ref={ref} {...props} />
));
AlertBox.displayName = 'AlertBox';

class TabCreator extends React.Component {
  state = {
    index: 0
  };

  renderLabel = ({ route, focused }) => {
    return (
      <View style={styles.label_container}>
        {this.renderLabelText(focused, route.title)}
        {this.renderDot(route.title)}
      </View>
    );
  }

  renderLabelText = (focused, title) => {
    if (focused) {
      return <TypoGraphyOpenSansBold style={styles.tab_label} text={title} />;
    }

    return <TypoGraphyOpenSans style={styles.tab_label} text={title} />;
  }

  renderDot = (title) => {
    const { pendingListLength } = this.props;
    if (pendingListLength > 0 && title === STRINGS.pending) {
      return <View style={styles.label_dot} />;
    }

    return null;
  }

  resetTabCallBack = () => this.setState({ index: 0 });

  render() {
    const {
      styles,
      topHeader,
      navigationState,
      sceneMap,
      alertBox
    } = this.props;
    
    if (!sceneMap || !navigationState) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {topHeader}
        </View>
        <View style={styles.tab_container}>
          {alertBox}
          <TabView
            springConfig={{ mass: 0.2, restSpeedThreshold: 0 }}
            lazy={false}
            swipeVelocityImpact={1}
            style={styles.tab_header}
            navigationState={{...navigationState, index: this.state.index }}
            onIndexChange={(index) => this.setState({ index })}
            initialLayout={styles.initialLayout}
            renderScene={SceneMap(sceneMap)}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                activeColor={styles.tab_color}
                inactiveColor={styles.tab_color}
                style={styles.tab_style}
                indicatorStyle={styles.indicatorStyle}
                renderLabel={({ route, focused }) => this.renderLabel({ route, focused })}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

TabCreator.defaultProps = {
  styles
};

TabCreator.propTypes = {
  alertBoxOpen: PropTypes.bool,
  alertBox: PropTypes.element,
  sceneMap: PropTypes.object.isRequired,
  navigationState: PropTypes.object.isRequired,
  topHeader: PropTypes.element.isRequired,
  pendingListLength: PropTypes.number.isRequired,
  styles: PropTypes.object.isRequired
};

export { TabCreator };