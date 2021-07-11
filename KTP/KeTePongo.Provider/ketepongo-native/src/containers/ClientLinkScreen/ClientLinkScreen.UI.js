import React from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, View } from 'react-native';
import {
  BackRoundButton,
  MainHeader,
  TitleSectionWithLeftOptionIcon,
  TouchableItem,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansSemiBold,
  TypoGraphyOpenSansBold
} from 'components';
import { BottomShadowLine } from 'shared';

import styles from './ClientLinkScreen.component.styles';

import PencilIcon from '../../../assets/actionIcons/pencil_main.svg';
import LinkIcon from '../../../assets/displayIcon/link.svg';

export const LinkClientButton = ({ onPressLinkClient }) => (
  <TouchableItem
    onPress={() => onPressLinkClient()}
    item={(
      <View style={styles.btn_wrapper}>
        <LinkIcon />
        <TypoGraphyOpenSansBold text={"Enlazar Cliente"} style={styles.btn_link_text} />
      </View>
    )}
  />
);

LinkClientButton.propTypes = {
  onPressLinkClient: PropTypes.func.isRequired
};

export const CodeInput = ({ onChangeText }) => (
  <View style={styles.input_section_container}>
    <View style={styles.input_wrapper}>
      <TextInput
        onChangeText={(code) => onChangeText(code)}
        placeholder={"Escribe aquí el código correspondiente al cliente"}
        placeholderStyle={styles.placeholder}
        style={styles.code_input}
      />
      <View style={styles.pencil_wrapper}>
        <PencilIcon />
      </View>
    </View>

    <Text style={styles.input_text_wrapper} numberOfLines={2}>
      <TypoGraphyOpenSansLight text={"Puedes encontrar el "} style={styles.input_text} />
      <TypoGraphyOpenSansSemiBold text={"código de cliente"} style={styles.input_text_semi_bold} />
      <TypoGraphyOpenSansLight text={" en cualquier factura del cliente."} style={styles.input_text} />
    </Text>
  </View>
);

CodeInput.propTypes = {
  onChangeText: PropTypes.func.isRequired
};

const Heading = (title) => (
  <TypoGraphyOpenSans text={title} style={styles.heading} />
);

Heading.PropTypes = {
  title: PropTypes.string.isRequired
};

export const PendingClientCard = ({ client }) => (
  <View style={styles.pending_client_card_container}>
    <View style={styles.pending_client_card_top}>
      {Heading("Comercio")}
      <TypoGraphyOpenSansSemiBold text={client.tradeName} style={styles.tradeName} />
    </View>
    <View style={styles.pending_client_card_bottom}>
      <View style={styles.pending_client_section}>
        {Heading("Dirección")}
        <TypoGraphyOpenSansSemiBold text={client.address} style={styles.bottom_card_text} />
      </View>
      <View style={styles.pending_client_section}>
        {Heading("Contacto")}
        <TypoGraphyOpenSansSemiBold text={client.email} style={styles.bottom_card_text} />
        <TypoGraphyOpenSansSemiBold text={client.phone} style={styles.bottom_card_text} />
      </View>
    </View>
  </View>
);

PendingClientCard.propTypes = {
  client: PropTypes.object.isRequired
};

export const ClientLinkHeader = ({ onPressBack }) => {
  const component = (
    <View style={styles.header_container}>
      <MainHeader />

      <View style={styles.heading_wrapper}>
        <TitleSectionWithLeftOptionIcon
          headerText={"Enlazar Cliente"}
          optionLeftIcon={<BackRoundButton onPress={() => onPressBack()} />}
        />
      </View>
    </View>
  );

  return BottomShadowLine({ component });
};