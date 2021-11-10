import React, { Component, useEffect, useState, useContext } from "react";
import LinearGradient from "react-native-linear-gradient";
import { windowWidth, windowHeight } from "./../../utils/Dimentions";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Modal
} from "react-native";
import FormInput from "./../../components/FormInput";
import FormButton from "./../../components/FormButton";
import { AuthContext } from "./../../navigation/AuthProvider";
import * as Animatable from "react-native-animatable";
import validator from "validator";
import FormDropDown from "./../../components/FormDropDown";
// import { Picker } from "@react-native-picker/picker";

const AdminLogScreen1 = () => {
  const [chooseData, setChooseData] = useState("Select Item...");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisibility = bool => {
    setIsModalVisible(bool);
  };
  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={["#ff00cc", "#333399"]}
        style={[styles.centerAlign, styles.container]}
      >
        <Image
          source={require("./../../assets/img/logo3-02.png")}
          style={styles.logo}
        />
      </LinearGradient>
      <View
        style={[
          styles.centerAlign,
          {
            marginTop: 0,
            backgroundColor: "rgba(230, 230, 230, 0.9)",
            height: windowHeight
          }
        ]}
      >
        <View style={[styles.inputContainer, styles.centerAlign]}>
          <FormDropDown iconType="user" />

          <View style={{ height: 30 }}>
            {/* {data.isValidUser
              ? null
              : <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>
                    Nomor Handphone tidak valid.
                  </Text>
                </Animatable.View>} */}
          </View>

          <FormDropDown iconType="calendar" />

          <View style={{ height: 30 }}>
            {/* {data.isValidPassword
              ? null
              : <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>
                    Password harus lebih dari 8 karakter.
                  </Text>
                </Animatable.View>} */}
          </View>

          <FormButton
            buttonTitle="Masuk"
            // onPress={() => login(email, password)}
            blurOnpress={true}
          />
        </View>
        <Image
          source={require("./../assets/img/ums.png")}
          style={{ height: 100, width: 100, marginTop: 50 }}
        />
      </View>
    </View>
  );
};

export default AdminLogScreen1;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight / 2.7
  },
  centerAlign: {
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    height: windowHeight / 14,
    width: windowWidth / 1.2
  },
  inputContainer: {
    backgroundColor: "rgba(255,255,255,1)",
    padding: 20,
    marginTop: -windowHeight / 2.1,
    borderRadius: 20,
    width: windowWidth / 1.2,
    height: windowHeight / 2.1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10
  },
  errorMessage: {
    fontSize: 14,
    paddingBottom: 10,
    color: "#de4d41"
  },
  forgotButton: {
    marginTop: 20
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular"
  },
  dropDown: {
    // alignSelf: 'stretch',
    paddingHorizontal: 20
  },
  dropDownText: {
    marginVertical: 20,
    fontSize: 14
  }
});
