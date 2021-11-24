import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./../screens/login/LoginScreen";
import AdminIndexScreen from "./../screens/admin/AdminIndexScreen";
import AdminUserListScreen from "./../screens/admin/AdminUserListScreen";
import AdminUserInfoScreen from "./../screens/admin/AdminUserInfoScreen";
import AdminLogScreen1 from "./../screens/admin/AdminLogScreen1";
import AdminLogScreen2 from "./../screens/admin/AdminLogScreen2";
import AdminRegisterScreen from "./../screens/admin/AdminRegisterScreen";
import UserIndexScreen from "./../screens/user/UserIndexScreen";
import UserLogScreen1 from "./../screens/user/UserLogScreen1";
import UserLogScreen2 from "./../screens/user/UserLogScreen2";

const Stack = createStackNavigator();

const AppStack = () => {
  let routeName;
  const [isLogin, setIsLogin] = useState(null);
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("Data_User").then(value => {
      setDataUser(JSON.parse(value));
      if (value == null) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
        // console.log(dataUser["no_hp"]);
      }
    });
  }, []);

  if (isLogin === null) {
    return null;
  } else if (isLogin == true) {
    if (dataUser["nama"] == "admin") {
      routeName = "Admin Home";
    } else {
      routeName = "User Home";
      // console.log(dataUser["nama"]);
    }
  } else {
    routeName = "Login";
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Admin Home"
        // component={AdminIndexScreen}
        component={AdminIndexScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Admin User List"
        component={AdminUserListScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Admin User Info"
        component={AdminUserInfoScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Admin Log 1"
        component={AdminLogScreen1}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Admin Log 2"
        component={AdminLogScreen2}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Admin Register"
        component={AdminRegisterScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="User Home"
        component={UserIndexScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="User Log 1"
        component={UserLogScreen1}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="User Log 2"
        component={UserLogScreen2}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
