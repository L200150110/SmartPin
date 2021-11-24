import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import { database } from "./database";
import { Keyboard } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            // Keyboard.dismiss();
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.log(error);
          }
        },
        register: async (email, password) => {
          try {
            // Keyboard.dismiss();
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (error) {
            console.log(error);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.log(error);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
