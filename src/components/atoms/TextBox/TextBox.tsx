import React, { useState } from "react";
import {
  View,
  DimensionValue,
  TextInput,
  TextInputProps,
  Image,
  TouchableOpacity
} from "react-native";
import { useTheme } from "@/theme";

type Props = TextInputProps & {
  height?: DimensionValue;
  width?: DimensionValue;
  hintText: string;
  inputValue?: string;
  customStyles?: any;
  textBoxStyles?: any;
  isPassword?: boolean;
  isClearable?: boolean;
  prefixImg?: React.ReactNode;
  handleInputChange: (str: string) => void;
  onClear?: () => void;
};

function TextBox({
  hintText = "",
  inputValue = "",
  handleInputChange,
  isClearable = false,
  isPassword = false,
  customStyles,
  textBoxStyles,
  prefixImg = null,
  onClear = null,
  ...props
}: Props) {
  // const { layout } = useTheme();
  const { layout, components} = useTheme();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  function toggleVisibility() {
    setPasswordVisible(!isPasswordVisible);
  }

  return (
    <View
      style={[
        layout.fullWidth,
        layout.row,
        {
          borderColor: "#929292",
          borderWidth: 1,
          backgroundColor: '#fff',
          borderRadius: 8,
          height: 50
        },
        customStyles
      ]}
    >
      {
        prefixImg && prefixImg
      }
      <View style={{ flex: 8, paddingHorizontal: 10 }}>
        <TextInput
          style={[layout.textBox1, layout.fullWidth, textBoxStyles, {fontSize: 14}]}
          placeholder={hintText}
          value={inputValue}
          secureTextEntry={isPassword && !isPasswordVisible ? true : false}
          onChangeText={handleInputChange}
          {...props}
        />
      </View>
    </View>
  );
}

export default TextBox;
