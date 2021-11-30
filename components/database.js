import { firebase } from "@react-native-firebase/database";

export const database = firebase
  .app()
  // .database("https://smartpin-default-rtdb.firebaseio.com/");
  .database(
    "https://tugas-akhir-b5275-default-rtdb.asia-southeast1.firebasedatabase.app/"
  );
