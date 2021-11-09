import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen2 from "./../screens/LoginScreen2";
import LoginScreen from "./../screens/LoginScreen";
import OnboardingScreen from "./../screens/OnboardingScreen";
import AdminRegister from "./../screens/AdminRegister";
import SignupScreen from "./../screens/SignupScreen";
import AdminIndexScreen from "./../screens/AdminIndexScreen";
import AdminLogScreen1 from "./../screens/AdminLogScreen1";
import AdminLogScreen2 from "./../screens/AdminLogScreen2";
import AdminUserListScreen from "./../screens/AdminUserListScreen";
import AdminRegisterScreen from "./../screens/AdminRegisterScreen";
import UserIndexScreen from "./../screens/UserIndexScreen";
import UserLogScreen1 from "./../screens/UserLogScreen1";
import UserLogScreen2 from "./../screens/UserLogScreen2";
import AdminUserInfoScreen from "./../screens/AdminUserInfoScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then(value => {
      if (value == null) {
        // AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = "Onboarding";
  } else {
    routeName = "Login";
  }

  return (
    <Stack.Navigator
      initialRouteName={routeName}
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent"
        }
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Login"
        // component={LoginScreen2}
        component={AdminUserInfoScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({ navigation }) => ({
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 0
          }
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
