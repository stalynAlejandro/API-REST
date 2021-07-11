import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { COLORS } from 'constants';
import {
  DefaultAlert,
  DualOptionButtons,
  LongSquareButton,
  TypoGraphyOpenSansSemiBold,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans
} from 'components';
import styles from './LocationCRUDScreen.component.styles';

export const AlertNameChangeNotSave = ({ onPressConfirmDoNotSave, onPressCancel }) => (
  <View style={styles.modal}>
    <TypoGraphyOpenSans
      style={styles.warningText_top}
      text={"Se perderán los cambios realizados."}
    />
    <TypoGraphyOpenSansBold
      style={styles.warningText}
      text={"¿Estas seguro?"}
    />
    <DualOptionButtons
      textLeft={"Sí"}
      textRight={"No"}
      onPressLeft={onPressConfirmDoNotSave}
      onPressRight={onPressCancel}
    />
  </View>
);

AlertNameChangeNotSave.propTypes = {
  onPressConfirmDoNotSave: PropTypes.func.isRequired,
  onPressCancel: PropTypes.func.isRequired,
};

export const AlertDeleteConfirm = ({ onPressCancelDelete, onPressConfirmDelete }) => (
  <View style={styles.modal}>
    <TypoGraphyOpenSansBold
      numberOfLines={2}
      style={styles.warningText}
      text={"¿Deseas eliminar este lugar de tu lista?"}
    />
    <DualOptionButtons
      textLeft={"Sí"}
      textRight={"No"}
      onPressLeft={onPressConfirmDelete}
      onPressRight={onPressCancelDelete}
    />
  </View>
);

AlertDeleteConfirm.propTypes = {
  onPressConfirmDelete: PropTypes.func.isRequired,
  onPressCancelDelete: PropTypes.func.isRequired,
};

export const DeleteAndAddButtons = ({
  onPressDeleteFromList,
  onPressChangeName,
  disabled
}) => (
  <View style={styles.btns_wrapper}>
    <LongSquareButton
      btnText={<TypoGraphyOpenSansBold text={"Eliminar de Mis Lugares"} style={styles.eliminate_btn_text} />}
      onPress={onPressDeleteFromList}
      btnStyle={styles.delete_btn}
    />
    <LongSquareButton
      btnText={(
        <TypoGraphyOpenSansBold
          text={"Guardar Cambios"}
          style={disabled ? styles.save_btn_text_disable : styles.save_btn_text}
        />
      )}
      onPress={onPressChangeName}
      btnStyle={disabled ? styles.disabled_btn : styles.save_btn}
      disabled={disabled}
    />
  </View>
);

DeleteAndAddButtons.propTypes = {
  onPressDeleteFromList: PropTypes.func.isRequired,
  onPressChangeName: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export const LocationNameInput = ({
  onChangeText,
  value
}) => (
  <View style={styles.fillScreen}>
    <TypoGraphyOpenSansSemiBold style={styles.location_heading} text={"Nombre Lugar"} />
    <TextInput
      onChangeText={onChangeText}
      value={value}
      placeholder={"Máximo 11 caracteres"}
      placeholderTextColor={COLORS.neutral_min}
      style={styles.input}
    />
  </View>
);

LocationNameInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};