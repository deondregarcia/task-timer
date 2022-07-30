import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import HistoryStopwatch from "../components/HistoryStopwatch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const History = () => {
  const [timerArray, setTimerArray] = useState([]);
  const isFocused = useIsFocused();

  // function for getting timers
  const getStopwatches = async () => {
    let unfilteredKeys = [];
    let keyValues = [];
    try {
      unfilteredKeys = await AsyncStorage.getAllKeys();
      // filter out non-timer key-value pairs (others are group pairs)
      let keys = unfilteredKeys.filter((key) => {
        if (key.includes("timer")) {
          console.log(key);
          return key;
        }
      });
      console.log(keys);
      let values = await AsyncStorage.multiGet(keys);
      for (let i = 0; i < values.length; i++) {
        keyValues.push(JSON.parse(values[i][1]));
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(timerArray);
    setTimerArray(keyValues);
  };

  // clear AsyncStorage of all key-value pairs
  const clearHistory = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
    setTimerArray([]);
  };

  useEffect(() => {
    // init stopwatch array
    getStopwatches();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={clearHistory} style={styles.button}>
        <Text style={styles.buttonText}>Clear History</Text>
      </TouchableOpacity>
      {timerArray && (
        <FlatList
          data={timerArray}
          renderItem={(item) => <HistoryStopwatch item={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
  },
});

export default History;
