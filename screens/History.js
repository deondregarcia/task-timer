import { View, Text, Button } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const displayKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (error) {
    console.log(error);
  }
  console.log(keys);
};

const deleteAllKeys = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

const History = () => {
  return (
    <View>
      <Button title="console log all keys" onPress={displayKeys} />
      <Button title="delete all keys" onPress={deleteAllKeys} />
    </View>
  );
};

export default History;
