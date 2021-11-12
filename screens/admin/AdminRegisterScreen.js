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
  Alert,
  Keyboard
} from "react-native";
import FormInput from "./../../components/FormInput";
import FormButton from "./../../components/FormButton";
import SocialButton from "./../../components/SocialButton";
import * as Animatable from "react-native-animatable";
import validator from "validator";
import { database } from "./../../components/database";

const AdminRegister = () => {
  const [data, setData] = useState({
    nama: "",
    no_hp: "",
    no_kamar: "",
    password: "",
    isValidNama: false,
    isValidNoHp: false,
    isValidNoKamar: false,
    isValidPassword: false
  });

  const alertRegister = (title, message) => {
    Alert.alert(title, message, [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
  };

  // validation input
  const inputValidation = () => {
    data["isValidNoHp"] = validator.isNumeric(data["no_hp"]);
    data["isValidNama"] = validator.isAlpha(data["nama"]);
    data["isValidNoKamar"] = validator.isNumeric(data["no_kamar"]);
    data["isValidPassword"] = validator.isStrongPassword(data["password"]);
  };

  const sendFirebase = async () => {
    await database
      .ref("/users/" + data["no_hp"])
      .set({
        nama: data["nama"],
        no_hp: data["no_hp"],
        no_kamar: data["no_kamar"],
        password: data["password"]
      })
      .then(() => {
        console.log("send to firebase success");
      });
  };

  const tambahUser = () => {
    // validasi + if kosong / isi + add data firebase
    var message = "";
    Keyboard.dismiss();
    inputValidation();
    data["isValidNoHp"] ? null : (message += "No Handphone tidak sesuai\n");
    data["isValidNama"] ? null : (message += "Nama tidak sesuai\n");
    data["isValidNoKamar"] ? null : (message += "No Kamar tidak sesuai\n");
    data["isValidPassword"]
      ? null
      : (message += "Password harus lebih dari 8 karakter");
    message != ""
      ? alertRegister("Kesalahan Input Data", message)
      : sendFirebase();
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
          <FormInput
            labelValue={data["no_hp"]}
            onChangeText={no_hp => setData({ ...data, no_hp: no_hp })}
            placeholderText="No Handphone"
            iconType="phone"
            keyboardType="number-pad"
            caretHidden={false}
            secureTextEntry={false}
          />

          <FormInput
            labelValue={data["nama"]}
            onChangeText={nama => setData({ ...data, nama: nama })}
            placeholderText="Nama"
            iconType="user"
            keyboardType="email-address"
            caretHidden={false}
          />

          <FormInput
            labelValue={data["no_kamar"]}
            onChangeText={no_kamar => setData({ ...data, no_kamar: no_kamar })}
            placeholderText="No Kamar"
            iconType="book"
            keyboardType="number-pad"
            caretHidden={false}
            secureTextEntry={false}
          />

          <FormInput
            labelValue={data["password"]}
            onChangeText={password => setData({ ...data, password: password })}
            placeholderText="Password"
            iconType="lock"
            autoCapitalize="none"
          />

          <FormButton
            buttonTitle="Tambah User"
            onPress={() => {
              tambahUser();
            }}
            blurOnpress={true}
          />
        </View>
        <Image
          source={require("./../../assets/img/ums.png")}
          style={{ height: 100, width: 100, marginTop: 50 }}
        />
      </View>
    </View>
  );
};

export default AdminRegister;

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
    elevation: 5
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
  }
});
