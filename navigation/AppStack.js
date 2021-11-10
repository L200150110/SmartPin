import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./../screens/HomeScreen";
import LoginScreen from "./../screens/login/LoginScreen";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
