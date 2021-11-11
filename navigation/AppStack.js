import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./../screens/HomeScreen";
import LoginScreen from "./../screens/login/LoginScreen";
import AdminIndexScreen from "./../screens/admin/AdminIndexScreen";

const Stack = createStackNavigator();

// const [dataUser, setDataUser] = useState(null);

const AppStack = () => {
  const routeName = "Login";
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("Data_User").then(value => {
      if (value == null) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
        // dataUser = value;
        console.log(value);
      }
    });
  }, []);

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Admin Home"
        component={AdminIndexScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
