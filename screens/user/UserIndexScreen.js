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

const UserIndexScreen = ({ navigation }) => {
  const [dataUser, setDataUser] = useState(null);
  const [terbuka, setTerbuka] = useState(false);

  const bukaPintu = async () => {
    var date = new Date();
    var month = date.getMonth() + 1;
    var jam =
      (date.getHours().toString().length == 1
        ? "0" + date.getHours()
        : date.getHours()) +
      ":" +
      (date.getMinutes().toString().length == 1
        ? "0" + date.getMinutes()
        : date.getMinutes()) +
      ":" +
      (date.getSeconds().toString().length == 1
        ? "0" + date.getSeconds()
        : date.getSeconds());
    date =
      (date.getDate().toString().length == 1
        ? "0" + date.getDate()
        : date.getDate()) +
      "-" +
      (month.toString().length == 1 ? "0" + month : month) +
      "-" +
      date.getFullYear();
    if (terbuka) {
      setTerbuka(false);
      await database
        .ref("/pintu/")
        .set({
          pintu: false
        })
        .then(() => console.log("pintu tertutup"));
    } else {
      setTerbuka(true);
      await database
        .ref("/log/" + dataUser["no_hp"] + "/" + date + "/" + jam)
        .set({
          jam: jam
        })
        .then(() => console.log("Data set."));
      await database
        .ref("/pintu/")
        .set({
          pintu: true
        })
        .then(() => console.log("pintu terbuka"));
    }
  };

  const logoutButton = async () => {
    try {
      await AsyncStorage.removeItem("Data_User");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("Data_User").then(value => {
      if (value != null) {
        setDataUser(JSON.parse(value));
      }
    });
  }, []);

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient colors={["#ff00cc", "#333399"]} style={styles.container}>
        <Image
          source={require("./../../assets/img/logo3-02.png")}
          style={styles.logo}
        />
        <TouchableOpacity
          style={{
            right: 30,
            top: 50,
            position: "absolute",
            backgroundColor: "white",
            borderRadius: 35,
            width: 35,
            height: 35,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            logoutButton();
          }}
        >
          <Image
            source={require("./../../assets/img/logout_icon.png")}
            style={{ height: 25, width: 25 }}
          />
        </TouchableOpacity>
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
          {!terbuka
            ? <Image source={require("./../../assets/img/pintu-01.png")} />
            : <Image source={require("./../../assets/img/pintu2-01.png")} />}

          <View style={{ width: "100%", padding: 20 }}>
            <FormButton
              buttonTitle={terbuka ? "Tutup" : "Buka"}
              onPress={() => {
                bukaPintu();
              }}
            />
          </View>
          <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
            <View style={{ width: "100%" }}>
              <FormButton
                buttonTitle="Log"
                onPress={() =>
                  navigation.navigate("User Log 1", {
                    dataUser: dataUser
                  })}
              />
            </View>
            {/* <View style={{ width: "46%" }}>
              <FormButton
                buttonTitle="User"
                onPress={() => navigation.navigate("Admin User List")}
              />
            </View> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserIndexScreen;

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
    top: 55,
    left: 20,
    height: 25,
    width: 150,
    position: "absolute"
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
