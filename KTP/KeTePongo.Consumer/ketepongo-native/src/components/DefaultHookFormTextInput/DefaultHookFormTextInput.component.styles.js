import { TextInput } from "react-native";
import styled from "styled-components/native";
import { COLORS, FONTSIZE, TYPOGRAPHY } from "constants";

export const FormInput = styled.TextInput`
  ${props =>
    !props.isEmpty ? TYPOGRAPHY.openSans : TYPOGRAPHY.openSans};
  ${props =>
    !props.isEmpty ? FONTSIZE.normal : FONTSIZE.medium };
  color: ${props => (props.textColor )};
  border-bottom-color: ${props => !props.errorColor ? props.borderColor : COLORS.KO};
  border-bottom-width: 1px;
  padding-bottom: 0px;
  margin-bottom: ${props => (!props.errorColor ? "15px" : "0px")};
`;