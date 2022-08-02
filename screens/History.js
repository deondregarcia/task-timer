import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import HistoryStopwatch from "../components/HistoryStopwatch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { imageIndex } from "../assets/backgrounds/imageIndex.js";

const History = ({ backgroundIndex }) => {
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageIndex[backgroundIndex]}
        resizeMode="cover"
        style={styles.image}
      >
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 10,
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#1f1f1f",
    shadowOffset: { height: 5 },
    shadowRadius: 10,
    shadowOpacity: 1,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 25,
    color: "#cecfd0",
    textAlign: "center",
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
});

export default History;
