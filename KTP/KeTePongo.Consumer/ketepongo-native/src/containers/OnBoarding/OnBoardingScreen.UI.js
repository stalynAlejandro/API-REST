import React from "react";
import { View ,SafeAreaView, Image } from "react-native";
import {
  LongSquareButton,
  TypoGraphyNunitoBold
} from "components";


import styles from "./OnBoardingScreen.component.styles";
import LogoKTPhorizontal from '../../../assets/All_Icons/logoktp_Splash.svg'
import Step1 from '../../../assets/All_Icons/steps/Step1.svg';
import Step2 from '../../../assets/All_Icons/steps/Step2.svg';
import Step3 from '../../../assets/All_Icons/steps/Step3.svg';
import Step4 from '../../../assets/All_Icons/steps/Step4.svg';
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from "constants";

export function OnBoardingScreen(
    { screenNumber, screenText, buttonText, buttonOnPress }) {

  return (
    <SafeAreaView style={{flex:1}}>
    <LinearGradient start={{x: -1, y: 1}} end={{x: 2, y: -1}} colors={[COLORS.main_strong, COLORS.main_logo]} style={styles.container}> 
    <View style={styles.heading}>
        <LogoKTPhorizontal/>
      </View>
      <View style={styles.image_wrapper}>
        {screenNumber == "1" && <Image source={require(`../../../assets/All_Icons/OnBoarding1.png`)} />}
        {screenNumber == "2" && <Image source={require(`../../../assets/All_Icons/OnBoarding2.png`)} />}
        {screenNumber == "3" && <Image source={require(`../../../assets/All_Icons/OnBoarding3.png`)} />}
        {screenNumber == "4" && <Image source={require(`../../../assets/All_Icons/OnBoarding4.png`)} />}
      </View>
      <View style={styles.footer}>
        {screenNumber == "1" && <Step1 style={styles.step}/>}
        {screenNumber == "2" && <Step2 style={styles.step}/>}
        {screenNumber == "3" && <Step3 style={styles.step}/>}
        {screenNumber == "4" && <Step4 style={styles.step}/>}
      </View>
      <TypoGraphyNunitoBold
        style={styles.text}
        text={screenText}
      />
      <View style={styles.btn_wrapper}>
      <LongSquareButton
          btnText={<TypoGraphyNunitoBold text={buttonText} style={styles.continue_btn_text} />}
          onPress={buttonOnPress}
          btnStyle={styles.btn_style}
        />
      </View>
      </LinearGradient>
      </SafeAreaView>
  );

};