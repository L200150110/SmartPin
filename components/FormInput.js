import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { windowHeight, windowWidth } from "./../utils/Dimentions";

import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const FormInput = ({ labelValue, placeholderText, iconType, ...rest }) => {
  const [isPass, setIsPass] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const showPass = () => {
    isShowPass ? setIsShowPass(false) : setIsShowPass(true);
  };

  useEffect(() => {
    if (iconType == "lock") {
      setIsPass(true);
    }
  });

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderColor="#666"
        secureTextEntry={isShowPass ? false : true}
        {...rest}
      />
      {isPass
        ? isShowPass
          ? <TouchableOpacity
              style={styles.iconStyle2}
              onPress={() => showPass()}
            >
              <Ionicons name="eye-off" size={25} color="#666" />
            </TouchableOpacity>
          : <TouchableOpacity
              style={styles.iconStyle2}
              onPress={() => showPass()}
            >
              <Ionicons name="eye" size={25} color="#666" />
            </TouchableOpacity>
        : null}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 15,
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    width: 50
  },
  iconStyle2: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#ccc",
    // borderRightWidth: 1,
    width: 50
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: "Lato-Regular",
    color: "#333",
    justifyContent: "center",
    alignItems: "center"
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1
  }
});
