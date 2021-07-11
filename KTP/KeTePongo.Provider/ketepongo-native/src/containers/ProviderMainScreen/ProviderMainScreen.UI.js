import React from 'react';
import { TypoGraphyOpenSansSemiBold } from 'components';

import styles from './ProviderMainScreen.component.styles';

export const SelectProviderHeading = () => (
  <TypoGraphyOpenSansSemiBold style={styles.heading} text={"MIS PROVEEDORES"} />
);

export const LoadingMessageDisplay = () => <TypoGraphyOpenSansSemiBold text={"Loading..."} />;