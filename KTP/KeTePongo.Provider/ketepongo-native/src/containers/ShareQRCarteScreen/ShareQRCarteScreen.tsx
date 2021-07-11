import React, { useState, useEffect } from "react";
import { View, SafeAreaView  } from "react-native";
import { useDispatch } from "react-redux";
import * as Print from "expo-print";
import * as Share from "expo-sharing";
import { withAuthentication } from "../../HOC";
import styles from "./ShareQRCarteScreen.component.styles";
import {
  BackRoundButton,
  TitleSectionWithLeftAndOptionalRightButton,
  TouchableIcon,
  Spinner,
  DefaultServerErrorMessage,
  LongSquareButton,
  TypoGraphyOpenSans,
  TypoGraphyOpenSansSemiBold,
  BackGreyArrowButton
} from "components";

import { navigateToCatalogCarte, navigateBack } from "../../store/authentication";
import { templateQR, templateQRA4, templateStickerQR,templateCardQR, QRCodeHint, QRCodeImage } from "./ShareQRCarteScreen.UI";
import db from "../../store/apis/db";
import { store } from "../../App";
import { WebView } from "react-native-webview";
import { ProviderDTO } from "model/DTOs";
import ShareIcon from '../../../assets/All_Icons/Share.svg';
import CartelIcon from '../../../assets/All_Icons/Cartel.svg';
import Cartel1Icon from '../../../assets/All_Icons/CARTEL1.svg';
import PegatinaIcon from '../../../assets/All_Icons/Pegatina.svg';
import TarjetaIcon from '../../../assets/All_Icons/Tarjeta.svg';
import { SIZE } from "constants";
const ShareQRCarteScreenComponent = () => {
  const [providerData, setProviderData] = useState<ProviderDTO>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErroredGettingData, setHasErroredGettingData] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getProviderData() {
      try {
        const result = await db
          .apiProviders({}, store.getState)
          .get("Provider");
        setProviderData(result.data);
        setIsLoading(false);
      } catch {
        setHasErroredGettingData(true);
        setIsLoading(false);
      }
    }
    getProviderData();
    return () => {};
  }, []);

  const shareQR = async () => {
    let filePath = await Print.printToFileAsync({
      html: templateQR(providerData.code, providerData.tradeName),
    });
    await Share.shareAsync(filePath.uri);
  };
  const shareQRA4 = async () => {
    let filePath = await Print.printToFileAsync({
      html: templateQRA4(providerData.code, providerData.tradeName),
    });
    await Share.shareAsync(filePath.uri);
  };

  const shareStickerQR = async () => {
    let filePath = await Print.printToFileAsync({
      html: templateStickerQR(providerData.code, providerData.tradeName),
    });
    await Share.shareAsync(filePath.uri);
  };
  const shareCardQR = async () => {
    let filePath = await Print.printToFileAsync({
      html: templateCardQR(providerData.code, providerData.tradeName),
    });
    await Share.shareAsync(filePath.uri);
  };
  
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <View  style={styles.container}>
      <View style={{ marginLeft: -15 }}>
        <TitleSectionWithLeftAndOptionalRightButton
          leftButton={
            <BackGreyArrowButton
              onPress={() => dispatch(navigateBack())}
            />
          }
          headerText={"Compartir Código QR"}
        />
      </View>
      <View style={styles.body}>
        {hasErroredGettingData ? (
          <DefaultServerErrorMessage
            error={{
              description:
                "El servidor no pudo procesar esta petición en este momento, inténtelo pasados unos minutos, Gracias.",
            }}
          />
        ) : (
          <View style={styles.main_container}>
            <View style={styles.row}>
              <View style={styles.share_item}>    
                    <WebView
                      scalesPageToFit={true}
                      source={{ html: QRCodeImage(providerData.code, 450, 450) }}
                      style={styles.qr_image}
                    />
                <View>
                <TypoGraphyOpenSansSemiBold style={styles.share_item_title} text={"Código QR"}/>
                 <LongSquareButton
                    btnStyle={styles.share_button}
                    onPress={() => shareQR()}
                    isWhiteBackground={true}
                    btnText={
                      <View style={styles.share_button_container}>
                        <ShareIcon {...SIZE.square_19}/>
                          <TypoGraphyOpenSans
                            text={"Compartir"}
                            style={styles.share_button_text}
                          />
                      </View>
                    }
                   />
                </View>
                
              </View>
              <View style={styles.share_item}>
              <View></View>
              <Cartel1Icon style={styles.A4_icon}/>
              <View>
              <TypoGraphyOpenSansSemiBold style={styles.share_item_title} text={"Cartel código A4"}/>  
                <LongSquareButton
                    btnStyle={styles.share_button}
                    onPress={() => shareQRA4()}
                    isWhiteBackground={true}
                    btnText={
                      <View style={styles.share_button_container}>
                        <ShareIcon {...SIZE.square_19}/>
                          <TypoGraphyOpenSans
                            text={"Compartir"}
                            style={styles.share_button_text}
                          />
                      </View>
                    }
                   />
              </View>
              
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.share_item}>
              <View></View>
                <PegatinaIcon style={styles.A4_icon}/>
                <View>
                <TypoGraphyOpenSansSemiBold style={styles.share_item_title} text={"Pegatina código 10cm"}/>
                 <LongSquareButton
                    btnStyle={styles.share_button}
                    onPress={() => shareStickerQR()}
                    isWhiteBackground={true}
                    btnText={
                      <View style={styles.share_button_container}>
                        <ShareIcon {...SIZE.square_19}/>
                          <TypoGraphyOpenSans
                            text={"Compartir"}
                            style={styles.share_button_text}
                          />
                      </View>
                    }
                   />
                </View>
                
              </View>
              <View style={styles.share_item}>
                <View></View>
              <TarjetaIcon style={styles.A4_icon}/>
              <View>
              <TypoGraphyOpenSansSemiBold style={styles.share_item_title} text={"Tarjeta código"}/>
                <LongSquareButton
                    btnStyle={styles.share_button}
                    onPress={() => shareCardQR()}
                    isWhiteBackground={true}
                    btnText={
                      <View style={styles.share_button_container}>
                        <ShareIcon {...SIZE.square_19}/>
                          <TypoGraphyOpenSans
                            text={"Compartir"}
                            style={styles.share_button_text}
                          />
                      </View>
                    }
                   />
              </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </View >
    </SafeAreaView>
  );
};

const ShareQRCarteScreen = withAuthentication(ShareQRCarteScreenComponent);

export { ShareQRCarteScreen };
