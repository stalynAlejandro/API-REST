import React from 'react';
import { TypoGraphyOpenSans, TypoGraphyOpenSansSemiBold } from 'components';
import styles from './ProductSelectProviderScreen.component.styles';

export const LoadingMessageDisplay = () => <TypoGraphyOpenSans text={"Loading..."} />;

export const SelectProviderHeading = () => (
  <TypoGraphyOpenSansSemiBold style={styles.heading} text={"SELECCIONA UN PROVEEDOR"} />
);