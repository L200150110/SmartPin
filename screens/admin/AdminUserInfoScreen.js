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
import { AuthContext } from "./../../navigation/AuthProvider";
import * as Animatable from "react-native-animatable";
import validator from "validator";
import FormDropDown from "./../../components/FormDropDown";
import { database } from "./../../components/database";

const AdminUserInfoScreen = ({ route, navigation }) => {
  const { no_hp } = route.params;
  const [userData, setUserData] = useState({
    nama: "",
    no_hp: "",
    no_kamar: "",
    password: "",
    isValidNama: false,
    isValidNoHp: false,
    isValidNoKamar: false,
    isValidPassword: false
  });
  const [isEdited, setIsEdited] = useState(false);

  const alertRegister = (title, message) => {
    Alert.alert(title, message, [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
  };

  // validation input
  const inputValidation = () => {
    userData["isValidNoHp"] = validator.isNumeric(userData["no_hp"]);
    userData["isValidNama"] = !validator.isEmpty(userData["nama"]);
    userData["isValidNoKamar"] = validator.isNumeric(userData["no_kamar"]);
    userData["isValidPassword"] = validator.isStrongPassword(
      userData["password"]
    );
  };

  const getUserData = async () => {
    // firebase ambil data user berdasar no_hp
    await database.ref("/users/" + no_hp).once("value").then(snapshot => {
      setUserData(snapshot.val());
    });
  };

  const sendFirebase = async () => {
    await database
      .ref("/users/" + userData["no_hp"])
      .update({
        nama: userData["nama"],
        no_hp: userData["no_hp"],
        no_kamar: userData["no_kamar"],
        password: userData["password"]
      })
      .then(() => console.log("Data updated."));
    console.log("masuk fungsi sendFirebase()");
  };

  const updateUserData = () => {
    // firebase update data berdasar input
    var message = "";
    Keyboard.dismiss();
    inputValidation();
    userData["isValidNoHp"] ? null : (message += "No Handphone tidak sesuai\n");
    userData["isValidNama"] ? null : (message += "Nama tidak sesuai\n");
    userData["isValidNoKamar"] ? null : (message += "No Kamar tidak sesuai\n");
    userData["isValidPassword"]
      ? null
      : (message += "Password harus lebih dari 8 karakter");
    message != ""
      ? alertRegister("Kesalahan Input Data", message)
      : sendFirebase() && setIsEdited(false);
  };

  useEffect(() => {
    getUserData();
    // console.log(userData);
  }, []);

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
            labelValue={userData["nama"]}
            onChangeText={nama =>
              setUserData(data => ({ ...data, nama: nama }))}
            placeholderText="Nama"
            secureTextEntry={false}
            iconType="user"
            editable={isEdited}
          />

          <FormInput
            labelValue={userData["no_hp"]}
            onChangeText={no_hp =>
              setUserData(data => ({ ...data, no_hp: no_hp }))}
            placeholderText="No Telpon"
            secureTextEntry={false}
            iconType="phone"
            editable={isEdited}
          />

          <FormInput
            labelValue={userData["no_kamar"]}
            onChangeText={no_kamar =>
              setUserData(data => ({ ...data, no_kamar: no_kamar }))}
            placeholderText="No Kamar"
            secureTextEntry={false}
            iconType="book"
            editable={isEdited}
          />
          <FormInput
            labelValue={userData["password"]}
            onChangeText={password =>
              setUserData(data => ({ ...data, password: password }))}
            placeholderText="Password"
            iconType="lock"
            editable={isEdited}
          />

          <FormButton
            buttonTitle={isEdited ? "Simpan" : "Edit"}
            onPress={() => (isEdited ? updateUserData() : setIsEdited(true))}
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

export default AdminUserInfoScreen;

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
