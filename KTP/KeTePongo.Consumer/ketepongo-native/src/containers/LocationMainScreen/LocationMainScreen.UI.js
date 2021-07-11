import React from 'react';
import { TypoGraphyOpenSansSemiBold } from 'components';

import styles from './LocationMainScreen.component.styles';

export const SelectLocationHeading = () => (
  <TypoGraphyOpenSansSemiBold style={styles.heading} text={"MIS LUGARES"} />
);

export const LoadingMessageDisplay = () => (
  <TypoGraphyOpenSansSemiBold text={"Loading...."} />
);