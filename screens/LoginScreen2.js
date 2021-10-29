import React, { Component, useEffect, useState, useContext } from "react";
import LinearGradient from "react-native-linear-gradient";
import { windowWidth, windowHeight } from "./../utils/Dimentions";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar
} from "react-native";
import FormInput from "./../components/FormInput";
import FormButton from "./../components/FormButton";
import SocialButton from "./../components/SocialButton";
import { AuthContext } from "./../navigation/AuthProvider";
import * as Animatable from "react-native-animatable";
import validator from "validator";

const LoginScreen2 = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [data, setData] = useState({
    username: "",
    password: "",
    isValidUser: true,
    isValidPassword: true
  });

  const { login } = useContext(AuthContext);

  const handleValidUser = val => {
    // console.log(val);
    if (validator.isEmail(val)) {
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

  const handleValidPassword = val => {
    if (val.trim().length < 8) {
      setData({
        ...data,
        isValidPassword: false
      });
    } else {
      setData({
        ...data,
        isValidPassword: true
      });
    }
  };
  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={["#ff00cc", "#333399"]}
        style={[styles.centerAlign, styles.container]}
      >
        <Image
          source={require("./../assets/img/logo3-02.png")}
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
            labelValue={email}
            onChangeText={userEmail => setEmail(userEmail)}
            placeholderText="No Handphone"
            iconType="user"
            keyboardType="email-address"
            caretHidden={false}
            autoCapitalize="none"
            autoCorrect={false}
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
            onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
            onFocus={() => setData({ ...data, isValidPassword: true })}
          />
          <View style={{ height: 30 }}>
            {data.isValidPassword
              ? null
              : <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMessage}>
                    Password harus lebih dari 8 karakter.
                  </Text>
                </Animatable.View>}
          </View>

          <FormButton
            buttonTitle="Masuk"
            onPress={() => login(email, password)}
            blurOnpress={true}
          />

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.navButtonText}>Lupa Password?</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("./../assets/img/ums.png")}
          style={{ height: 100, width: 100, marginTop: 50 }}
        />
      </View>
    </View>
  );
};

export default LoginScreen2;

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
  }
});
