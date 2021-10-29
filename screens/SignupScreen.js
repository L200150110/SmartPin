import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard
} from "react-native";
import FormInput from "./../components/FormInput";
import FormButton from "./../components/FormButton";
import SocialButton from "./../components/SocialButton";
import { AuthContext } from "./../navigation/AuthProvider";
import validator from "validator";
import * as Animatable from "react-native-animatable";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [data, setData] = useState({
    username: "",
    password: "",
    isValidUser: true,
    isValidPassword: true,
    isValidConfirmPassword: true
  });

  const { register } = useContext(AuthContext);

  const handleValidUser = val => {
    // console.log(val);
    if (validator.isEmail(val)) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  };

  const handleValidPassword = val => {
    if (val.trim().length < 8) {
      setData({
        ...data,
        isValidPassword: false
      });
      // } else {
      //   setData({
      //     ...data,
      //     isValidPassword: true
      //   });
    }
  };

  const handleValidConfirmPassword = val => {
    if (val != password) {
      setData({
        ...data,
        isValidConfirmPassword: false
      });
    }
  };

  const onRegisterPressed = () => {
    Keyboard.dismiss();
    if (password == confirmPassword) {
      register(email, password);
    } else {
      console.log("password didn't match");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an Account</Text>

      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        caretHidden={false}
        autoCorrect={false}
        onEndEditing={e => handleValidUser(e.nativeEvent.text)}
        onFocus={() => setData({ ...data, isValidUser: true })}
      />
      {data.isValidUser
        ? null
        : <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>Bad Email format.</Text>
          </Animatable.View>}
      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
        // securityTextEntry={true}
        autoCapitalize="none"
        onFocus={() => setData({ ...data, isValidPassword: true })}
      />
      {data.isValidPassword
        ? null
        : <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>
              Password must be more than 8 characters.
            </Text>
          </Animatable.View>}
      <FormInput
        labelValue={confirmPassword}
        onChangeText={userPassword => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        onEndEditing={e => handleValidConfirmPassword(e.nativeEvent.text)}
        // securityTextEntry={true}
        autoCapitalize="none"
        onFocus={() => setData({ ...data, isValidConfirmPassword: true })}
      />
      {data.isValidConfirmPassword
        ? null
        : <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>Password didn't match.</Text>
          </Animatable.View>}
      <FormButton
        buttonTitle="Sign Up"
        // onPress={() => register(email, password)}
        onPress={() => onRegisterPressed()}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{" "}
        </Text>
        <TouchableOpacity onPress={() => alert("Term of service")}>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Term of service{" "}
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}>and </Text>
        <TouchableOpacity onPress={() => alert("Privacy policy")}>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Privacy policy
          </Text>
        </TouchableOpacity>
      </View>

      <SocialButton
        buttonTitle="Sign Up with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />
      <SocialButton
        buttonTitle="Sign Up with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      />
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgrounColor: "#f9fafd",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f"
  },
  navButton: {
    marginTop: 15
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular"
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center"
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Lato-Regular",
    color: "grey"
  },
  errorMessage: {
    fontSize: 14,
    paddingBottom: 10,
    color: "#de4d41"
  }
});
