import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { COLORS, SIZE } from 'constants';
import {
  DefaultAlert,
  DualOptionButtons,
  LongSquareButton,
  TypoGraphyOpenSansSemiBold,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans,
  TouchableIcon
} from 'components';
import styles from './SectionCRUDScreen.component.styles';
import PencilIcon from '../../../assets/All_Icons/basic/pencil_large.svg';

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
      text={"¿Deseas eliminar esta sección de tu lista?"}
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
  disabled,
  isDeleteEnabled
}) => (
  <View style={styles.btns_wrapper}>
    {isDeleteEnabled && <LongSquareButton
      btnText={<TypoGraphyOpenSans text={"Eliminar esta sección"} style={styles.eliminate_btn_text} />}
      onPress={onPressDeleteFromList}
      btnStyle={styles.delete_btn}
    />}

    <LongSquareButton
      btnText={(
        <TypoGraphyOpenSansBold
          text={isDeleteEnabled?"Guardar Cambios":"Añadir Sección"}
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
  disabled: PropTypes.bool.isRequired,
  isDeleteEnabled: PropTypes.bool.isRequired
};

export const SectionNameInput = React.forwardRef(({
  onChangeText,
  value,
  ...props
}, ref) => {
  return (
  <View>
    <TypoGraphyOpenSansSemiBold style={styles.section_heading} text={"Nombre Sección"} />
    <View style={styles.row}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        ref={ref}
        placeholder={"Introduce aquí el nombre"}
        placeholderTextColor={COLORS.gray_3}
        style={styles.input}
      />
      <TouchableIcon
        onPress={() => { ref.current.focus(); }}
        icon={<PencilIcon style={{marginLeft:-15, marginTop:15}} {...SIZE.square_20} />}
      />

    </View>
  </View>
);
});

SectionNameInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};