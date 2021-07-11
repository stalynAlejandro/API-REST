import React from "react";
import { View, TextInput } from "react-native";
import styles from "./ListEditor.component.styles";

import {
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans,
  DefaultAlert,
  TouchableIcon,  
  DualOptionButtons
} from "components";

import PencilEdit from "../../../assets/All_Icons/basic/pencil_grey.svg";
import TrashIcon from "../../../assets/All_Icons/trash.svg";

interface IProps {
  listData: string[];
  onSave: (data: string[]) => void;
  OpenEditorButton: any;
  dialogTitle: string;
  dialogPlaceholder: string;
}

export const ListEditor = ({
  listData,
  onSave,
  OpenEditorButton,
  dialogTitle,
  dialogPlaceholder
}: IProps) => {
  const [data, setData] = React.useState(
    listData.map((x, index) => {
      return { text: x, id: index };
    })
  );
  const [isEditorOpen, setEditorOpen] = React.useState(false);
  const [lineToEdit, setLineToEdit] = React.useState({ id: -1, text: "" });
  const [currentIndex, setNextIndex] = React.useState(data.length);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [lineToDelete, setLineToDelete] = React.useState({ id: -1, text: "" });
  const onSaveLine = (text: string) => {
    let newData = [...data];
    if (lineToEdit.id >= 0) {
      newData = newData.map(p =>
        p.id === lineToEdit.id ? { ...p, text: text } : p
      );
    } else {
      newData.push({ id: currentIndex + 1, text });
      setNextIndex(currentIndex + 1);
    }
    setData(newData);
    setEditorOpen(false);
  };

  const onEditLine = line => {
    setLineToEdit(line);
    setEditorOpen(true);
  };

  const onRemoveLine = (line) =>{
    setLineToDelete(line);
    setConfirmDeleteOpen(true);
  };
  const removeLine = () =>{
    setData(data.filter(x => x.id !== lineToDelete.id));
    setConfirmDeleteOpen(false)
  };

  const onCreatingNewLine = () => {
    setLineToEdit({ id: -1, text: "" });
    setEditorOpen(true);
  };

  React.useEffect(() => {
    onSave(data.map(x => x.text));
  }, [data]);

  const renderEditor = () => (
    <DefaultAlert
      isVisible={true}
      hasToAvoidCloseOnPressOut={true}
      onPressOut={() => {}}
      options={
        <DialogEditor
          onPressSave={onSaveLine}
          onPressCancel={() => setEditorOpen(false)}
          text={lineToEdit.text}
          dialogTitle={dialogTitle}
          dialogPlaceholder={dialogPlaceholder}
        />
      }
    />
  );
  const renderConfirmDeletePopup = () => (
    <DefaultAlert
      isVisible={true}
      onPressOut={() => {
        setConfirmDeleteOpen(false);
      }}
      options={
        <ConfirmDeletePopup
          onPressDelete={removeLine}
          onPressCancel={() => setConfirmDeleteOpen(false)}
        />
      }
    />
  );

  const renderLines = (
    <View>
      {data.map(line => (
        <View key={line.id}>
          <TypoGraphyOpenSans text={line.text} style={styles.label_info} />
          <View style={styles.buttons_container}>
            <TouchableIcon
            isWhiteBackground={true}
              onPress={() => onRemoveLine(line)}
              styles={styles.edit_areaTwoButtons}
              icon={<TrashIcon />}
            />
            <TouchableIcon
            isWhiteBackground={true}
              onPress={() => onEditLine(line)}
              styles={{ ...styles.edit_areaTwoButtons, ...styles.edit_button }}
              icon={<PencilEdit />}
            />
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.lines_container}>
      {renderLines}
      {isEditorOpen && renderEditor()}
      {isConfirmDeleteOpen && renderConfirmDeletePopup()}
      <OpenEditorButton onPress={onCreatingNewLine} />
    </View>
  );
};

const DialogEditor = ({
  onPressSave,
  onPressCancel,
  text,
  dialogTitle,
  dialogPlaceholder
}) => {
  const [currentText, setCurrentText] = React.useState(text);
  return (
    <View style={styles.dialogEditor_container}>
      <TypoGraphyOpenSans
        style={styles.add_sanitary_mesaure_header}
        text={dialogTitle}
      />
      <TextInput
        multiline={true}
        style={styles.dialog_input}
        placeholder={dialogPlaceholder}
        onChangeText={text => setCurrentText(text)}
        value={currentText}
      />
      <View style={styles.separator_line} />
      <View style={styles.add_sanitary_measure_buttons_container}>
        <TouchableIcon
          styles={styles.ko_button}
          onPress={() => onPressCancel()}
          isWhiteBackground={true}
          icon={
            <TypoGraphyOpenSansBold
              text={"Cancelar"}
              style={styles.ko_btn_text}
            />
          }
        />
        <TouchableIcon
          styles={currentText==="" || currentText.trim() === ""?styles.ok_button_disabled:styles.ok_button}
          disabled={currentText==="" || currentText.trim() === ""}
          isWhiteBackground={true}
          onPress={() => onPressSave(currentText)}
          icon={
            <TypoGraphyOpenSansBold
              text={"Guardar"}
              style={currentText==="" || currentText.trim() === ""?styles.ok_btn_text_disabled:styles.ok_btn_text}
            />
          }
        />
      </View>
    </View>
  );
};
const ConfirmDeletePopup = ({
  onPressDelete,
  onPressCancel,
}) => {

  return (
    <View style={styles.delete_alert_wrapper}>
    <TypoGraphyOpenSansBold
      text={"¿Estás seguro de querer eliminar esta medida de seguridad?"}
      style={styles.delete_alert_text}
    />

    <DualOptionButtons
      textLeft={"Cancelar"}
      textRight={"Eliminar"}
      onPressLeft={() => onPressCancel()}
      onPressRight={() => onPressDelete()}
    />
  </View>
  );
};
