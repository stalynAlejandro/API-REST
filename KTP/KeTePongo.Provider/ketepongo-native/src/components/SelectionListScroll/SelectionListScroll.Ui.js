import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { SIZE } from 'constants';
import {
  TypoGraphyOpenSansSemiBold,
  TypoGraphyOpenSansBold,
  TouchableIcon
} from 'components';

import styles from './SelectionListScroll.component.styles';

import ConnectIcon from '../../../assets/All_Icons/basic/connect_grey.svg';
import PencilIcon from '../../../assets/All_Icons/basic/pencil_large.svg';

export const TouchableEditIcon = ({ onPressEdit }) => (
  <TouchableIcon
    onPress={() => onPressEdit()}
    styles={styles.name_edit}
    icon={<PencilIcon {...SIZE.square_20} />}
  />
);

TouchableEditIcon.propTypes = {
  onPressEdit: PropTypes.func.isRequired,
};

export const ConnectIconDisplay = () => (
  <ConnectIcon {...SIZE.square_20} />
);

export const ChoiceNameDisplay = ({ name }) => (
  <TypoGraphyOpenSansBold style={styles.name_1} text={name} />
);

ChoiceNameDisplay.propTypes = {
  name: PropTypes.string.isRequired
};

export const TouchableChoiceNameDisplay = ({ name, onPressSelect}) => (
    <TouchableIcon
      onPress={() => onPressSelect()}
      styles={styles.name_wrapper}
      icon={<TypoGraphyOpenSansSemiBold style={styles.name} text={name} />}
    />
  );

  TouchableChoiceNameDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  onPressSelect: PropTypes.func.isRequired
};
