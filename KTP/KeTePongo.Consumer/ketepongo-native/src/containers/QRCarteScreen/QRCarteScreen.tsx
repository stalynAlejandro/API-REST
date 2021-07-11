import React, { useState, useEffect } from "react";
import { View, SafeAreaView  } from "react-native";
import { useDispatch } from "react-redux";
import * as Print from "expo-print";
import * as Share from "expo-sharing";
import { withAuthentication } from "../../HOC";
import styles from "./QRCarteScreen.component.styles";
import {
  BackRoundButton,
  TitleSectionWithLeftAndOptionalRightButton,
  TouchableIcon,
  Spinner,
  DefaultServerErrorMessage,
  LongSquareButton,
  TypoGraphyOpenSans,
  BackGreyArrowButton
} from "components";

import { navigateToCatalogCarte, navigateToShareQRCarteScreen } from "../../store/authentication";
import {refreshProviderCatalogProductsFromServer} from '../../store/providerCatalogProducts';
import { template, QRCodeHint, QRCodeImage } from "./QRCarteScreen.UI";
import db from "../../store/apis/db";
import { store } from "../../App";
import { WebView } from "react-native-webview";
import { ProviderDTO } from "model/DTOs";

const QRCarteScreenComponent = () => {
  const [providerData, setProviderData] = useState<ProviderDTO>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErroredGettingData, setHasErroredGettingData] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getProviderData() {
      try {
        const result = await db
          .apiConsumers({}, store.getState)
          .get("Consumer");
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
      html: template(providerData.code, providerData.tradeName),
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
              onPress={() => {
                dispatch(refreshProviderCatalogProductsFromServer())
                dispatch(navigateToCatalogCarte())
              }}
            />
          }
          headerText={"Código QR"}
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
          <View style={{ flex: 1 }}>
            <QRCodeHint />
            <TouchableIcon
              onPress={navigateToShareQRCarteScreen}
              styles={{ flex: 1 }}
              icon={
                <WebView
                  scalesPageToFit={true}
                  source={{ html: QRCodeImage(providerData.code, 900, 900) }}
                  style={styles.qr_image}
                />
              }
            />
            <LongSquareButton
              btnStyle={styles.share_button}
              onPress={() => dispatch(navigateToShareQRCarteScreen())}
              isWhiteBackground={true}
              btnText={
                <TypoGraphyOpenSans
                  text={"Compartir código"}
                  style={styles.share_button_text}
                />
              }
            />
          </View>
        )}
      </View>
    </View >
    </SafeAreaView>
  );
};

const QRCarteScreen = withAuthentication(QRCarteScreenComponent);

export { QRCarteScreen };
