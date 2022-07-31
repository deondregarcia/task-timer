import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import HistoryStopwatch from "../components/HistoryStopwatch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const History = () => {
  const [timerArray, setTimerArray] = useState([]);
  const isFocused = useIsFocused();
  const [groupNames, setGroupNames] = useState([]);

  // function for getting timers AND group names, despite func name
  const getStopwatches = async () => {
    let unfilteredKeys = [];
    let keyValues = [];
    let filteredGroupKeys = [];
    let filteredGroupValues = [];
    try {
      unfilteredKeys = await AsyncStorage.getAllKeys();
      // filter out non-timer key-value pairs (others are group pairs)
      let keys = unfilteredKeys.filter((key) => {
        if (key.includes("timer")) {
          return key;
        } else {
          // get group names
          filteredGroupKeys.push(key);
        }
      });
      let values = await AsyncStorage.multiGet(keys);
      for (let i = 0; i < values.length; i++) {
        keyValues.push(JSON.parse(values[i][1]));
      }
    } catch (error) {
      console.log(error);
    }

    try {
      // get group names from keys
      let groupValues = await AsyncStorage.multiGet(filteredGroupKeys);
      for (let i = 0; i < groupValues.length; i++) {
        filteredGroupValues.push(JSON.parse(groupValues[i][1]));
      }
    } catch (error) {
      console.log(error);
    }
    // set group names
    setGroupNames(filteredGroupValues);

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

  const logStorage = async () => {
    try {
      // let theKeys = await AsyncStorage.getAllKeys();
      // console.log(theKeys);
      let item = await AsyncStorage.getItem("group95");
      let value = JSON.parse(item);
      console.log(value);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={clearHistory} style={styles.button}>
        <Text style={styles.buttonText}>Clear History</Text>
      </TouchableOpacity>
      {timerArray && (
        <FlatList
          data={timerArray}
          renderItem={(item) => (
            <HistoryStopwatch item={item} groupNames={groupNames} />
          )}
        />
      )}
      <Button onPress={logStorage} title="log storage" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignSelf: "center",
    borderRadius: 5,
    marginTop: 10,
    borderBottomWidth: 1,
    paddingBottm: 0,
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
  },
});

export default History;
