import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./../screens/login/LoginScreen";
import OnboardingScreen from "./../screens/OnboardingScreen";
import AdminRegister from "./../screens/admin/AdminRegister";
import SignupScreen from "./../screens/SignupScreen";
import AdminIndexScreen from "./../screens/admin/AdminIndexScreen";
import AdminLogScreen1 from "./../screens/admin/AdminLogScreen1";
import AdminLogScreen2 from "./../screens/admin/AdminLogScreen2";
import AdminUserListScreen from "./../screens/admin/AdminUserListScreen";
import AdminRegisterScreen from "./../screens/admin/AdminRegisterScreen";
import UserIndexScreen from "./../screens/user/UserIndexScreen";
import UserLogScreen1 from "./../screens/user/UserLogScreen1";
import UserLogScreen2 from "./../screens/user/UserLogScreen2";
import AdminUserInfoScreen from "./../screens/admin/AdminUserInfoScreen";

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
        component={LoginScreen2}
        // component={AdminUserInfoScreen}
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
