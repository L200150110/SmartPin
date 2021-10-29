import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { windowHeight } from "./../utils/Dimentions";
import LinearGradient from "react-native-linear-gradient";

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <LinearGradient colors={["#ff00cc", "#333399"]} style={styles.buttonContainer} >
        <Text style={styles.buttonText}>
          {buttonTitle}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginsTop: 10,
    width: "100%",
    height: windowHeight / 15,
    // backgroundColor: "#2e64e5",
    // padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Lato-Regular"
  }
});
