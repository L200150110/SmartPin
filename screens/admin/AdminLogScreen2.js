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
  FlatList
} from "react-native";
import { database } from "./../../components/database";

const AdminLogScreen2 = ({ route, navigation }) => {
  const { no_hp, tgl } = route.params;
  const [userData, setUserData] = useState([]);
  const [userLog, setUserLog] = useState([]);

  const getUserData = async () => {
    const data = [];
    await database.ref("/users/" + no_hp).once("value").then(snapshot => {
      console.log(snapshot);
    });
  };

  const getUserLog = async () => {
    const data = [];
    await database
      .ref("/log/" + no_hp + "/" + tgl)
      .once("value")
      .then(snapshot => {
        console.log(snapshot);
      });
  };

  useEffect(() => {
    // ambil data user + log
    getUserData();
    getUserLog();

    console.log(no_hp, tgl);
  });

  const SPACING = 20;
  const AVATAR_SIZE = 70;

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient colors={["#ff00cc", "#333399"]} style={styles.container}>
        <Image
          source={require("./../../assets/img/logo3-02.png")}
          style={[styles.logo]}
        />
        {/* <Text style={{color : 'white', marginTop: 50,}}>LOG</Text> */}
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
          <FlatList
            data={userLog}
            keyExtractor={item => item.jam}
            // contentContainerStyle={{padding: SPACING}}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: SPACING / 2,
                      backgroundColor: "#fff",
                      borderRadius: 12,
                      borderColor: "#000",
                      // backgroundColor: "#f00",
                      marginRight: 70
                    }}
                  >
                    <View style={{ justifyContent: "center" }}>
                      <Text style={{ fontSize: 22, fontWeight: "700" }}>
                        {item.name}
                      </Text>
                      <Text style={{ fontSize: 16, opacity: 0.7 }}>
                        {item.jobTitle}
                      </Text>
                      <Text
                        style={{ fontSize: 12, opacity: 0.8, color: "#0099cc" }}
                      >
                        {item.email}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderColor: "#bbb",
                      // color: "#333",
                      borderBottomWidth: 1,
                      marginLeft: 80
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default AdminLogScreen2;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight / 5,
    flexDirection: "row"
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
