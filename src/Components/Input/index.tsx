import { TextInput, TextInputProps } from "react-native";

import { styles } from "./styles";

export function Input({ ...rest }: TextInputProps) {
  return <TextInput style={styles.conatiner} {...rest} placeholderTextColor="#74798B" />;
}
