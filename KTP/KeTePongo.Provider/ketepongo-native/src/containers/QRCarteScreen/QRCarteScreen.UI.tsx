import QRCode from "./qrcode.js";
import React from "react";
import {
  BackRoundButton,
  CommentBox,
  DualOptionButtons,
  LongSquareButton,
  TitleSectionWithLeftAndOptionalRightButton,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansSemiBold,
  TouchableIcon,
  TypoGraphyOpenSansItalic,
  OrderDatePicker,
  TypoGraphyOpenSansWithHighlight,
} from "components";
import styles from "./QRCarteScreen.component.styles";
import { TYPOGRAPHY } from "constants";

import { ScrollView, View, Text } from "react-native";

export const QRCodeImage = (providerCode: string, width, height) =>
  new QRCode({
    content: `https://app.ketepongo.com/businessQR/${providerCode}`,
    width,
    height,
  }).svg();
export const template = (providerCode: string, providerName: string) => `
<head>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <style>
    .main-body {
      margin: 0 auto;
      padding: 0;
  }

  .wrapper {
      margin: 0 auto;
      padding: 0;
      font-family: 'Nunito', sans-serif;
      width: 300px;
  }

  svg {
      box-shadow: 0px 0px 10px #000000;
      border-radius: 10px;
      margin: auto;
      display: block;
  }

  .main-body__logo {
      width: 200px;
      margin: auto;
      padding-top: 10px;
      display: block;
  }

  .main-body__title {
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      color: #8274AC;
      padding: 0 10px;
  }

  .main-body__text {
      text-align: center;
      padding: 10px 10px;
      font-size: 22px;
      font-weight: 600;
  }

  .main-body__footer {
      background-color: #F1CC53;
      text-align: left;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
  }

  .main-body__footer__text {
      margin-left: 10px;
      color: white;
      font-weight: 300;
  }

  .main-body__footer__img {
      position: relative;
      left: 75px;
      top: 10px;
      color: #381A56
  }

  .main-body__footer__web {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      padding-bottom: 1px;
      color: #381A56;
  }
    </style>
</head>
<body class="main-body">
    <div class="wrapper">
        <img class="main-body__logo" src="https://www.pccom.es/cms/wp-content/uploads/2020/05/logo-ketepongo.png" />
        <p class="main-body__title">${providerName}</p>
        ${QRCodeImage(providerCode, 256, 256)}
        <p class="main-body__text">Escanea este código QR para acceder a la carta del establecimiento a través de tu smartphone.</p>
        <div class="main-body__footer">
            <span class="main-body__footer__img">
                <img class="" src="https://www.pccom.es/cms/wp-content/uploads/2020/05/instagram.png" />
                <img class="" src="https://www.pccom.es/cms/wp-content/uploads/2020/05/facebook.png" />
                <img class="" src="https://www.pccom.es/cms/wp-content/uploads/2020/05/twitter.png" />
                <img class="" src="https://www.pccom.es/cms/wp-content/uploads/2020/05/youtube.png" />
            </span>
            <div class="main-body__footer__web">
                <p>www.ketepongo.com</p>
            </div>

        </div>
    </div>
</body>
`;

export const QRCodeHint = () => (
  <View style={styles.hint_container}>
    <Text>
      <Text style={{ ...TYPOGRAPHY.openSans_semi_bold, ...styles.hint_body }}>
        Este es tu código QR.{" "}
      </Text>
      <Text style={{ ...TYPOGRAPHY.openSans_light, ...styles.hint_body }}>
        Imprímelo y colócalo a la vista de tus clientes para que puedan{" "}
      </Text>
      <Text style={{ ...TYPOGRAPHY.openSans_semi_bold, ...styles.hint_body }}>
        acceder a tu carta{" "}
      </Text>
      <Text style={{ ...TYPOGRAPHY.openSans_light, ...styles.hint_body }}>
        a través de él o muéstrales esta pantalla para que puedan escanearlo.{" "}
      </Text>
    </Text>
  </View>
);
