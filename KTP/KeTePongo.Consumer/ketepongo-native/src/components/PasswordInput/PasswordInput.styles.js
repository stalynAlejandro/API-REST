import { StyleSheet } from 'react-native';
import { COLORS, SIZE, TYPOGRAPHY, FONTSIZE } from "constants";
import styled from "styled-components/native";
import { TextInput, View } from "react-native";

export const PasswordInputWithError = styled.TextInput`
    ${TYPOGRAPHY.openSans};
    ${FONTSIZE.tertiary};
    color: ${(props) => (props.hasError ? COLORS.KO : COLORS.main)};
    paddingBottom: 0;
    paddingLeft: 0;
    width: 90%;
`;

export const Wrapper = styled.View`
  borderBottomWidth: 1;
  paddingBottom: 0;
  marginBottom: ${(props) => (props.hasError ? 15 : 30)};
  width: 100%;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  borderBottomColor: ${(props) =>
    props.hasError ? COLORS.KO : COLORS.main};
  marginTop: ${(props) => (props.isLogin ? 74 : 0)};
`;
