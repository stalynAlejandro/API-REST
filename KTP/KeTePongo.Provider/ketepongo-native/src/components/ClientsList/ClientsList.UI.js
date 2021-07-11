import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  TouchableItem,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansSemiBold
} from 'components';

import styles from './ClientsList.component.styles';

import VerticalDotIcon from '../../../assets/actionIcons/vertical_dots_main.svg';
import UserBlackIcon from '../../../assets/displayIcon/user_black.svg';
import PhoneBlackIcon from '../../../assets/displayIcon/phone_black.svg';
import MainBlackIcon from '../../../assets/displayIcon/mail_black.svg';
import NotePadIcon from '../../../assets/displayIcon/note_pad_white.svg';
import PackageIcon from '../../../assets/displayIcon/package_white.svg';
import UserIcon from '../../../assets/displayIcon/user_main.svg';
import RightGreyArrow from '../../../assets/arrows/right_arrow_grey.svg';

const TouchableClientDetail = ({
  onPress,
  icon,
  iconText,
  colorStyle
}) => (
    <View style={styles.detail_container}>
      <TouchableItem
        onPress={() => onPress()}
        item={(
          <View style={{ ...styles.icon_wrapper, backgroundColor: colorStyle.color }}>
            {icon}
          </View>
        )}
      />
      <TypoGraphyOpenSansSemiBold text={iconText} style={{ ...styles.icon_text, ...colorStyle }} />
    </View>
  );

TouchableClientDetail.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  iconText: PropTypes.string.isRequired,
  colorStyle: PropTypes.object.isRequired
};

export const ClientMenu = ({
  onPressClientOrder,
  onPressClientProducts,
  onPressClientInfo,
  onPress
}) => (
    <View style={styles.client_card_container}>
      <View style={styles.detail_icons_container}>
        {TouchableClientDetail({
          onPress: () => onPressClientOrder(),
          icon: <NotePadIcon />,
          iconText: "Pedidos",
          colorStyle: styles.main_color
        })}
        {TouchableClientDetail({
          onPress: () => onPressClientProducts(),
          icon: <PackageIcon />,
          iconText: "Productos",
          colorStyle: styles.secondary_color
        })}
        {TouchableClientDetail({
          onPress: () => onPressClientInfo(),
          icon: <UserIcon />,
          iconText: "Ver Cliente",
          colorStyle: styles.grey_color
        })}
      </View>
      <View style={styles.vertical_dots_container}>
        <TouchableItem
          onPress={() => onPress()}
          item={(
            <View style={styles.arrow_wrapper}>
              <RightGreyArrow />
            </View>
          )}
        />
      </View>
    </View>
  );

ClientMenu.propTypes = {
  onPressClientOrder: PropTypes.func.isRequired,
  onPressClientProducts: PropTypes.func.isRequired,
  onPressClientInfo: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

const ClientCardDetail = ({ icon, detail }) => (
  <View style={styles.client_card_detail_wrapper}>
    {icon}
    <TypoGraphyOpenSansLight text={detail} style={styles.card_detail_text} />
  </View>
);

ClientCardDetail.propTypes = {
  icon: PropTypes.element.isRequired,
  detail: PropTypes.string.isRequired
};

export const ClientCard = ({ client, onPress }) => (
  <View style={styles.client_card_container}>
    <View style={styles.client_card_tradeName}>
      <TypoGraphyOpenSansBold text={client.tradeName} style={styles.trandeName} />
    </View>

    <View style={styles.client_card_detail_container}>
      {ClientCardDetail({ icon: <UserBlackIcon />, detail: client.name })}
      {ClientCardDetail({ icon: <PhoneBlackIcon />, detail: String(client.phone) })}
      {ClientCardDetail({ icon: <MainBlackIcon />, detail: client.email })}
    </View>

    <View style={styles.vertical_dots_container}>
      <TouchableItem
        onPress={() => onPress()}
        item={(
          <View style={styles.vertical_dots_wrapper}>
            <VerticalDotIcon />
          </View>
        )}
      />
    </View>
  </View>
);

ClientCard.propTypes = {
  client: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};
