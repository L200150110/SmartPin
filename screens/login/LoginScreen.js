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
  Keyboard,
  Linking
} from "react-native";
import FormInput from "./../../components/FormInput";
import FormButton from "./../../components/FormButton";
import { AuthContext } from "./../../navigation/AuthProvider";
import * as Animatable from "react-native-animatable";
import validator from "validator";
import { database } from "./../../components/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [nohp, setNohp] = useState();
  const [password, setPassword] = useState();

  const [data, setData] = useState({
    username: "",
    password: "",
    isValidUser: true,
    isValidPassword: true,
    dataUser: null
  });

  const { login } = useContext(AuthContext);

  const handleValidUser = val => {
    if (validator.isNumeric(val)) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  };

  const loginButton = async () => {
    Keyboard.dismiss();
    try {
      await database.ref("/users/" + nohp).once("value").then(snapshot => {
        if (snapshot.val()) {
          setData({ ...data, dataUser: snapshot.val(), isValidUser: true });
          if (snapshot.val()["password"] != password) {
            setData({ ...data, isValidPassword: false });
          } else {
            setData({ ...data, isValidPassword: true });
            // isi perintah async storage data + next screen
            try {
              const jsonValue = JSON.stringify(snapshot);
              AsyncStorage.setItem("Data_User", jsonValue);
              if (snapshot.val()["nama"] == "admin") {
                navigation.navigate("Admin Home");
              } else {
                navigation.navigate("User Home");
                // console.log(snapshot.val()["nama"]);
              }
            } catch (e) {
              console.log(e);
            }
          }
        } else {
          setData({ ...data, dataUser: null, isValidUser: false });
        }
      });
    } catch (e) {}
  };

  const lupaPassword = () => {
    Linking.openURL("https://wa.me/6285600041621");
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
            labelValue={nohp}
            onChangeText={userNohp => setNohp(userNohp)}
            placeholderText="No Handphone"
            iconType="phone"
            // keyboardType="email-address"
            secureTextEntry={false}
            caretHidden={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            onFocus={() => setData({ ...data, isValidUser: true })}
          />
          <View style={{ height: 30 }}>
            {data.isValidUser
              ? null
              : <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>
                    Nomor Handphone tidak valid.
                  </Text>
                </Animatable.View>}
          </View>

          <FormInput
            labelValue={password}
            onChangeText={userPassword => setPassword(userPassword)}
            placeholderText="Password"
            iconType="lock"
            // secureTextEntry={true}
            autoCapitalize="none"
            // onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
            onFocus={() => setData({ ...data, isValidPassword: true })}
          />
          <View style={{ height: 30 }}>
            {data.isValidPassword
              ? null
              : <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>Password salah.</Text>
                </Animatable.View>}
          </View>

          <FormButton
            buttonTitle="Masuk"
            onPress={() => loginButton()}
            blurOnpress={true}
          />

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => {
              lupaPassword();
            }}
          >
            <Text style={styles.navButtonText}>Lupa Password?</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("./../../assets/img/ums.png")}
          style={{ height: 100, width: 100, marginTop: 50 }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

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
    height: windowHeight / 2.3,
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
