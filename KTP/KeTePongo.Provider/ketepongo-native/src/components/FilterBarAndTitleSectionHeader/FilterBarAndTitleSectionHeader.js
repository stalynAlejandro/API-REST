import React from 'react';
import PropTypes from 'prop-types';
import { View, Keyboard } from 'react-native';
import { 
  FilterBar, 
  TitleSectionWithLeftAndOptionalRightButton,
  BackRoundButton
} from 'components';
import { BottomShadowLine } from 'shared';
 
import styles from './FilterBarAndTitleSectionHeader.component.styles';

const FilterBarAndTitleSectionHeader = ({
  onSearch,
  filterPlaceholder,
  onPressNavigateBack,
  headerText
}) => {
  const leftButton = (
    <BackRoundButton
      onPressBack={() => onPressNavigateBack()}
      btnStyle={styles.backButton}
      iconSize={styles.back_arrow_size}
    />
  );
  
  const component = (
    <View>
      <FilterBar
        onFilter={(text) => onSearch(text)}
        onSubmit={Keyboard.dismiss}
        placeholderText={filterPlaceholder}
      />

      <View style={styles.bottom_header}>
        <TitleSectionWithLeftAndOptionalRightButton
          leftButton={leftButton}
          headerText={headerText} 
        />
      </View>
    </View>
  );
  
  return BottomShadowLine({ component });
};

FilterBarAndTitleSectionHeader.propTypes = {
  onSearch: PropTypes.func.isRequired,
  filterPlaceholder: PropTypes.string.isRequired,
  onPressNavigateBack: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired
};

export { FilterBarAndTitleSectionHeader };