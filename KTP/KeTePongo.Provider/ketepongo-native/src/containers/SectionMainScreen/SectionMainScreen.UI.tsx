import React from 'react';
import { TypoGraphyOpenSansBold, TypoGraphyOpenSansSemiBold } from 'components';

import styles from './SectionMainScreen.component.styles';

export const SelectSectionHeading = () => (
  <TypoGraphyOpenSansBold style={styles.heading} text={"MIS SECCIONES"} />
);

export const LoadingMessageDisplay = () => (
  <TypoGraphyOpenSansSemiBold text={"Loading...."} />
);