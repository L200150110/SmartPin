import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FormInput from "./../components/FormInput";
import FormButton from "./../components/FormButton";
import SocialButton from "./../components/SocialButton";
import { AuthContext } from "./../navigation/AuthProvider";
import * as Animatable from "react-native-animatable";
import validator from "validator";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [data, setData] = useState({
    username: "",
    password: "",
    isValidUser: true,
    isValidPassword: true
  });

  const { login } = useContext(AuthContext);

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
    } else {
      setData({
        ...data,
        isValidPassword: true
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/img/logo-square.png")}
        style={styles.logo}
      />

      <Text style={styles.text}>SmartPin Project</Text>

      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        caretHidden={false}
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={e => handleValidUser(e.nativeEvent.text)}
        onFocus={() => setData({...data, isValidUser: true})}
      />

      {data.isValidUser
        ? null
        : <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>Email is not correct.</Text>
          </Animatable.View>}

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        // secureTextEntry={true}
        autoCapitalize="none"
        onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
        onFocus={() => setData({...data, isValidPassword: true})}
      />

      {data.isValidPassword
        ? null
        : <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>Password must be more than 8 characters.</Text>
          </Animatable.View>}

      <FormButton
        buttonTitle="Sign In"
        onPress={() => login(email, password)}
        blurOnpress={true}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password? </Text>
      </TouchableOpacity>

      <SocialButton
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />

      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.navButtonText}>
          Don't have an account? Create here
        </Text>
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
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover"
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
  forgotButton: {
    marginVertical: 35
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular"
  },
  errorMessage: {
    fontSize: 14,
    paddingBottom: 10,
    color: "#de4d41"
  }
});
