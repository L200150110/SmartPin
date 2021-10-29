import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen2 from "./../screens/LoginScreen2";
import LoginScreen from "./../screens/LoginScreen";
import OnboardingScreen from "./../screens/OnboardingScreen";
import SignupScreen2 from "./../screens/SignupScreen2";
import SignupScreen from "./../screens/SignupScreen";
import AdminScreen from "./../screens/AdminScreen";

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
        component={AdminScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({ navigation }) => ({
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          }
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
