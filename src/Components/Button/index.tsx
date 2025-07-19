import { TouchableOpacity, TouchableHighlightProps, Text } from "react-native";

import { styles } from "./styles";

type Props = TouchableHighlightProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.conainer} activeOpacity={0.8} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
