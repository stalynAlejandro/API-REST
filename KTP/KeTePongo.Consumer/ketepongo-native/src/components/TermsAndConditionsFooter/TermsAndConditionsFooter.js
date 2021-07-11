import React from 'react';
import { View, Text, Linking } from 'react-native';
import styles from './TermsAndConditionsFooter.component.styles';

const TermsAndConditionsFooter = () => (
  <View>
    <Text onPress={() =>
            Linking.openURL("http://www.ketepongo.com/ketepongoPRO/terminosycondiciones.html")
          }
           style={styles.footer_teext}>Registrándote o Iniciando Sesión aceptas los
    <Text style={styles.terms_text}> Términos de uso y Condiciones </Text>
      de Ketepongo.
    </Text>
  </View>
);

export { TermsAndConditionsFooter };