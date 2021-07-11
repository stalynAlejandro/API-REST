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
import styles from "./ShareQRCarteScreen.component.styles";
import { TYPOGRAPHY } from "constants";

import { ScrollView, View, Text } from "react-native";

export const QRCodeImage = (providerCode: string, width, height) =>
  new QRCode({
    content: `https://app.ketepongo.com/businessQR/${providerCode}`,
    width,
    height,
  }).svg();
export const templateQR = (providerCode: string, providerName: string) => `
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

export const templateQRA4 =(providerCode:string, providerName:string)=> `
<head>
    <meta charset="utf-8" />
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <title></title>
    <style>
    body {
      margin: 0 auto;
      padding: 0;
  }
  
  .wrapper {
      width: 595px;
      height: 841px;
      margin: 0 auto;
      padding: 0;
      font-family: 'Nunito', sans-serif;
      background-color: #F1CC53;
  }
  
  .logo_ketepongo {
      display: block;
      margin: auto;
      padding-top: 40px;
      width: 250px;
  }
  
  .name {
      color: #381A56;
      position: relative;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
  }
  
  .main_image {
      display: block;
      margin: auto;
      width: 100%;
      padding-top: 5px;
  }
  
  svg {
       width: 256px;
       height: 256px;
       border-radius: 20px;
       margin-left: 40px;
       margin-top: -120px;
       z-index: 999;
  }
  
  .main-list {
      color: #381A56;
      position: relative;
      margin-left: 295px;
      margin-right: 15px;
      margin-top: -100px;
      font-size: 20px;
  }
  
  .badges {
      position: relative;
      margin-top: 180px;
      margin-left: 40px;
  }
  
  .applestore-badge {
      position: relative;
      margin-bottom: 8px;
  }
  
  .googleplay-badge {
      width: 150px;
   
  }
  
  .icon-ketepongo {
      position: relative;
      width: 200px;
      float: right;
      margin-top: -190px;
  }
    </style>
</head>
<body>
    <div class="wrapper">
        <header>
            <img src="https://www.pccom.es/cms/wp-content/uploads/2020/05/ktp-logoweb-1.png" class="logo_ketepongo" />
            <p class="name">${providerName}</p>
        </header>
        <section>
            <img src="https://www.pccom.es/cms/wp-content/uploads/2020/06/mask-cartelweb-02.png" class="main_image"/>

            ${QRCodeImage(providerCode, 256, 256)}

            <ul class="main-list">
                <li><b>Escanea el código QR con tu cámara</b> y podrás ver la carta del establecimiento.</li>
            </ul>

            <div class="badges">
                <img src="https://www.pccom.es/cms/wp-content/uploads/2020/05/google-play-badge-1.png" class="googleplay-badge"/>
                <img src="https://www.pccom.es/cms/wp-content/uploads/2020/05/Apple-Badge.png" class="applestore-badge"/>
            </div>

            <img src="https://www.pccom.es/cms/wp-content/uploads/2020/06/cartel-ktpicon.png" class="icon-ketepongo"/>
        </section>
    </div>
</body>

`
export const templateStickerQR =(providerCode:string, providerName:string)=> `
<head>
    <meta charset="utf-8" />
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <title></title>
    <style>
    body {
      margin: 0 auto;
      padding: 0;
  }
  
  .wrapper {
      width: 283px;
      height: 283px;
      margin: 0 auto;
      padding: 0;
      font-family: 'Nunito', sans-serif;
      background-color: #F1CC53;
  }
  
  .logo_ketepongo {
      display: block;
      margin: auto;
      padding-top: 20px;
      width: 150px;
  }
  
  .name {
      color: #381A56;
      position: relative;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
  }
  
  .main_image {
      display: block;
      margin: auto;
      width: 100%;
      padding-top: 25px;
  }
  
  svg {
       width: 100px;
       height: 100px;
       border-radius: 10px;
       margin-left: 20px;
       margin-top: 5px;
  }
  
  .main-list {
      color: #381A56;
      position: relative;
      margin-left: 110px;
      margin-right: 10px;
      margin-top: -100px;
      font-size: 12px;
  }
  
  .badges {
      display: block;
      margin-left: 35px;
      position: relative;
      margin-top: 70px;
      z-index: 999;
  }
  
  .applestore-badge {
      position: relative;
      margin-bottom: 7px;
      width: 90px;
  }
  
  .googleplay-badge {
      width: 110px;
   
  }
  
  .icon-ketepongo {
      position: relative;
      width: 70px;
      margin-left: -6.5px;
      margin-bottom: 20px;
      margin-top: -75px;
      -moz-transform: scaleX(-1);
      -o-transform: scaleX(-1);
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
      filter: FlipH;
      -ms-filter: "FlipH";
  }
    </style>
</head>
<body>
    <div class="wrapper">
        <header>
            <img src="https://www.pccom.es/cms/wp-content/uploads/2020/05/ktp-logoweb-1.png" class="logo_ketepongo" />
            <p class="name">${providerName}</p>
        </header>
        <section>

        ${QRCodeImage(providerCode, 100, 100)}

            <ul class="main-list">
                <li><b>Escanea el código QR con tu cámara</b> y podrás ver la carta del establecimiento.</li>
            </ul>

            <div class="badges">
                <img src="https://www.pccom.es/cms/wp-content/uploads/2020/05/google-play-badge-1.png" class="googleplay-badge"/>
                <img src="https://www.pccom.es/cms/wp-content/uploads/2020/05/Apple-Badge.png" class="applestore-badge"/>
            </div>

            <img src="https://www.pccom.es/cms/wp-content/uploads/2020/06/cartel-ktpicon.png" class="icon-ketepongo"/>
        </section>
    </div>
</body>

`
export const templateCardQR =(providerCode:string, providerName:string)=> `
<head>
    <meta charset="utf-8" />
    <link href="tarjetaktp.css" type="text/css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <title></title>
    <style>
    .main-body {
      margin: 0 auto;
      padding: 0;
  }
  
  .wrapper {
      width: 240px;
      height: 155px;
      margin: 0 auto;
      padding: 0;
      font-family: 'Nunito', sans-serif;
      background-color: #F1CC53;
  }
  
  .logo_ketepongo {
      position: relative;
      margin-top: 10px;
      float: right;
      width: 75px;
      margin-right: 35px;
  
  }
  
  .main_image {
      display: block;
      margin: auto;
      width: 100%;
      padding-top: 25px;
  }
  
  svg {
       border-radius: 10px;
       margin-left: 10px;
       margin-top: 10px;
  
  }
  
  .main-list {
      color: #381A56;
      position: relative;
      margin-left: 75px;
      margin-right: 10px;
      font-size: 9px;
      margin-top: -40px;
  }
  
  .name {
      color: #381A56;
      position: relative;
      margin-left: 10px;
      font-size: 12px;
      font-weight: bold;
  }
  
  .badges {
      display: block;
      margin-left: 10px;
      position: relative;
      z-index: 999;
      margin-top: -5px;
  }
  
  .applestore-badge {
      position: relative;
      margin-bottom: 3px;
      width: 50px;
  }
  
  .googleplay-badge {
      width: 60px;
   
  }
  
  .icon-ketepongo {
      position: relative;
      width: 40px;
      float: right;
      margin-top: -45px;
  
  }
</style>
</head>
<body class="main-body">
    <div class="wrapper">
    ${QRCodeImage(providerCode, 80, 80)}
            <img src="https://www.pccom.es/cms/wp-content/uploads/2020/05/ktp-logoweb-1.png" class="logo_ketepongo" />

            <ul class="main-list">
                <li><b>Escanea el código QR con tu cámara</b> y podrás ver la carta del establecimiento.</li>
            </ul>

        <p class="name">${providerName}</p>

            <div class="badges">
                <img src="https://www.pccom.es/cms/wp-content/uploads/2020/05/google-play-badge-1.png" class="googleplay-badge"/>
                <img src="https://www.pccom.es/cms/wp-content/uploads/2020/05/Apple-Badge.png" class="applestore-badge"/>
            </div>

            <img src="https://www.pccom.es/cms/wp-content/uploads/2020/06/cartel-ktpicon.png" class="icon-ketepongo"/>
    </div>
</body>

`