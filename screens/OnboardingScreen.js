import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const Skip = ({ ...props }) =>
  <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>;
const Next = ({ ...props }) =>
  <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
    <Text style={{ fontSize: 16 }}>Next</Text>
  </TouchableOpacity>;
const Done = ({ ...props }) =>
  <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>;

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      pages={[
        {
          backgroundColor: "#a6e4d0",
          image: (
            <Image
              source={require("./../assets/img/logo1.png")}
              style={styles.imageSize}
            />
          ),
          title: "Login",
          subtitle: "Login with your id & password"
        },
        {
          backgroundColor: "#fdeb93",
          image: (
            <Image
              source={require("./../assets/img/logo1.png")}
              style={styles.imageSize}
            />
          ),
          title: "Open the Door",
          subtitle: "Open the door with touch the door picture"
        },
        {
          backgroundColor: "#e9bcbe",
          image: (
            <Image
              source={require("./../assets/img/logo1.png")}
              style={styles.imageSize}
            />
          ),
          title: "Open Door Log",
          subtitle: "Your Log every open the door"
        }
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageSize: {
    height: 200,
    width: 200
  }
});
