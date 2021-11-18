import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import { windowHeight, windowWidth } from "./../utils/Dimentions";

import AntDesign from "react-native-vector-icons/AntDesign";
import { Picker } from "@react-native-picker/picker";
import { database } from "./database";

const FormDropDown = ({ iconType, dateString, usersData, ...rest }) => {
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (iconType == "user") {
      setIsUser(true);
      // usersData.forEach(user => console.log(user["nama"]));
    }
  }, []);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
      {isUser
        ? <Picker style={styles.input} {...rest}>
            <Picker.Item
              label="Pilih Penghuni Kamar"
              value="Pilih Penghuni Kamar"
            />
            {usersData.map(user => {
              return (
                <Picker.Item
                  label={user["nama"] + " (Kamar no: " + user["no_kamar"] + ")"}
                  value={user["no_hp"]}
                  key={user["no_hp"]}
                />
              );
            })}
          </Picker>
        : <TouchableOpacity
            style={[styles.input, { paddingLeft: 15 }]}
            {...rest}
          >
            <Text style={{ color: "black" }}>
              {dateString}
            </Text>
          </TouchableOpacity>}
    </View>
  );
};

export default FormDropDown;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 15,
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    width: 50
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: "Lato-Regular",
    color: "#333"
    // justifyContent: "center",
    // alignItems: "center"
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1
  }
});
