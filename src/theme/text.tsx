import { TextStyle } from "react-native";

export default {
  rowItemTitle: {
    fontSize: 14,
    color: "#585856",
    fontFamily: "Poppins-regular"
  },
} as const satisfies Record<string, TextStyle>;
