import React, { Component, useEffect, useState, useContext } from "react";
import LinearGradient from "react-native-linear-gradient";
import { windowWidth, windowHeight } from "./../../utils/Dimentions";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar
} from "react-native";
import FormButton from "./../../components/FormButton";
import { AuthContext } from "./../../navigation/AuthProvider";
import * as Animatable from "react-native-animatable";
import { database } from "./../../components/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminIndexScreen = () => {
  const [dataUser, setDataUser] = useState(null);

  const bukaPintu = () => {
    console.log(dataUser["no_hp"]);
    database
      .ref("/log/" + dataUser["no_hp"])
      .set({
        name: "Ada Lovelace",
        age: 31
      })
      .then(() => console.log("Data set."));
  };

  useEffect(() => {
    AsyncStorage.getItem("Data_User").then(value => {
      if (value == null) {
        // setIsLogin(false);
      } else {
        // setIsLogin(true);
        setDataUser(JSON.parse(value));
      }
    });
  });

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient colors={["#ff00cc", "#333399"]} style={styles.container}>
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
          <Image source={require("./../../assets/img/pintu-01.png")} />
          <View style={{ width: "100%", padding: 20 }}>
            <FormButton
              buttonTitle="Buka"
              onPress={() => {
                bukaPintu();
              }}
            />
          </View>
          <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
            <View style={{ width: "46%", marginRight: 20 }}>
              <FormButton buttonTitle="Log" />
            </View>
            <View style={{ width: "46%" }}>
              <FormButton buttonTitle="User" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdminIndexScreen;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight / 5
  },
  centerAlign: {
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    marginTop: 50,
    marginLeft: 20,
    height: 25,
    width: 150
  },
  inputContainer: {
    backgroundColor: "rgba(255,255,255,1)",
    padding: 20,
    marginTop: -240,
    borderRadius: 20,
    width: windowWidth / 1.2,
    height: windowHeight / 1.2,
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
