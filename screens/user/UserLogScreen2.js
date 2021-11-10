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
import FormButton from "./../../components/FormButton";
import { AuthContext } from "./../../navigation/AuthProvider";
import * as Animatable from "react-native-animatable";
import faker from "faker";

const UserLogScreen2 = () => {
  faker.seed(2);
  const DATA = [...Array(10).keys()].map((_, i) => {
    return {
      key: faker.datatype.uuid(),
      image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
        "women",
        " men"
      ])}/${faker.datatype.number(60)}.jpg`,
      name: faker.name.findName(),
      jobTitle: faker.name.jobTitle(),
      email: faker.internet.email()
    };
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
            data={DATA}
            keyExtractor={item => item.key}
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
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                        borderRadius: AVATAR_SIZE,
                        marginRight: SPACING / 2
                      }}
                    />
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

export default UserLogScreen2;

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
    marginTop: -180,
    borderRadius: 20,
    width: windowWidth / 1.2,
    height: windowHeight / 1.1,
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
