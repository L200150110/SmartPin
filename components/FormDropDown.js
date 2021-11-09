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
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";
import { format } from "date-fns";

const FormDropDown = ({ labelValue, placeholderText, iconType, ...rest }) => {
  const [pickerValue, setPickerValue] = useState("JavaScript");
  const [isUser, setIsUser] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateString, setDateString] = useState("Pilih Tanggal");

  useEffect(() => {
    if (iconType == "user") {
      setIsUser(true);
    }
  });

  const dateToString = date => {
    var formatedDate = format(date, "dd-MM-yyyy", {
      awareOfUnicodeTokens: true
    });
    setDateString(formatedDate);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
      {isUser
        ? <Picker
            style={styles.input}
            selectedValue={pickerValue}
            enabled={false}
            onValueChange={itemValue => setPickerValue(itemValue)}
          >
            <Picker.Item label="JavaScript" value="JavaScript" />
            <Picker.Item label="Flutter" value="Flutter" />
            <Picker.Item label="PHP" value="PHP" />
          </Picker>
        : <TouchableOpacity
            style={[styles.input, { paddingLeft: 15 }]}
            onPress={() => setOpen(true)}
          >
            <Text style={{color: 'black'}}>{dateString}</Text>
          </TouchableOpacity>}
      <DatePicker
        modal
        open={open}
        date={date}
        mode='date'
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          dateToString(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
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
