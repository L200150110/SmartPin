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
import DatePicker from "react-native-date-picker";
import { format } from "date-fns";
import { database } from "./../../components/database";

const AdminLogScreen1 = () => {
  const [selectedUser, setSelectedUser] = useState("Pilih Penghuni Kamar");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateString, setDateString] = useState("Pilih Tanggal");
  const [usersData, setUsersData] = useState([]);

  const cekData = () => {
    console.log(selectedUser);
    console.log(selectedDate);
    console.log(usersData);
  };

  const dateToString = date => {
    var formatedDate = format(date, "dd-MM-yyyy", {
      awareOfUnicodeTokens: true
    });
    setDateString(formatedDate);
  };

  const getUsersData = async () => {
    var data = [];
    await database.ref("/users").once("value").then(snapshot => {
      snapshot.forEach(user => {
        data.push({
          nama: user.val().nama,
          no_hp: user.val().no_hp,
          no_kamar: user.val().no_kamar
        });
      });
    });
    setUsersData(data);
  };

  useEffect(() => {
    getUsersData();
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
          <FormDropDown
            iconType="user"
            enable={true}
            selectedValue={selectedUser}
            usersData={usersData}
            onValueChange={itemValue => setSelectedUser(itemValue)}
          />

          <View style={{ height: 30 }} />

          <FormDropDown
            iconType="calendar"
            dateString={dateString}
            onPress={() => setOpen(true)}
          />

          <DatePicker
            modal
            open={open}
            date={selectedDate}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setSelectedDate(date);
              dateToString(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <View style={{ height: 30 }} />

          <FormButton
            buttonTitle="Lihat Riwayat"
            // blurOnpress={true}
            onPress={() => {
              cekData();
            }}
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
