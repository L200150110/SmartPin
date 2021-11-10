import { firebase } from "@react-native-firebase/database";

export const database = firebase
  .app()
  .database(
    "https://smartpin-f0485-default-rtdb.asia-southeast1.firebasedatabase.app/"
  );
