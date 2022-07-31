import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Touchable,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// NOTE: when referencing item, must use item.item, e.g. item.item.name
const Stopwatch = ({ item, setTimerNameArray }) => {
  const [timer, setTimer] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const [timerState, setTimerState] = useState(true);
  const [key, setKey] = useState(null); // key state management

  const startTimer = () => {
    // if a timer already exists, clear first
    if (intervalID) clearInterval(intervalID);
    setTimerState(false);

    // set interval of 1000 ms
    setIntervalID(
      setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1); // have to use this notation instead of timer + 1
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(intervalID);
    setTimerState(true);
  };

  // convert seconds to HH:MM:SS format
  const convertTime = (time) => {
    var date = new Date(0);
    date.setSeconds(time);
    var timeString = date.toISOString().substr(11, 8);
    return timeString;
  };

  // store timer info and then clear off screen
  const handleSave = () => {
    if (intervalID) clearInterval(intervalID);

    // store data in AyncStorage through arrow func IIFE
    (async () => {
      try {
        const jsonValue = JSON.stringify({
          name: item.item.name,
          goal: item.item.goal,
          timer: timer,
          key: key,
        });
        await AsyncStorage.setItem(`${key}`, jsonValue);
      } catch (error) {
        console.log(error);
      }
    })();

    handleDelete();
  };

  // update timerNameArray to filter out deleted timer
  const handleDelete = () => {
    setTimerNameArray((array) =>
      array.filter((timer) => {
        return timer.name !== item.item.name;
      })
    );
  };

  const generateKey = async () => {
    // get array of all stored keys
    let allKeys = [];
    try {
      allKeys = await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log(error);
    }

    // generate number from 0 to 99
    let timerKey = Math.floor(Math.random() * 100);
    // set state variable 'key' as timerKey if timerKey value not already stored
    if (!("timer" + timerKey in allKeys)) {
      // pre-pend "timer" to differentiate timer key-value pairs from group pairs
      setKey("timer" + timerKey);
    } else {
      while (timerKey in allKeys) {
        timerKey = Math.floor(Math.random() * 100);
      }
      // pre-pend "timer" to differentiate timer key-value pairs from group pairs
      setKey("timer" + timerKey);
    }
  };

  // useEffect to initialize key once
  useEffect(() => {
    if (!key) generateKey();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{item.item.name}</Text>
      <Text style={styles.timer}>{convertTime(timer)}</Text>
      <Text style={styles.text}>Goal: {item.item.goal} </Text>

      <View style={styles.buttonView}>
        {/* conditional render of start or stop */}
        {timerState == true ? (
          <TouchableOpacity
            onPress={startTimer}
            style={[styles.buttons, { backgroundColor: "#38b000" }]}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={stopTimer}
            style={[styles.buttons, { backgroundColor: "gray" }]}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleSave}
          style={[styles.buttons, { backgroundColor: "lightblue" }]}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* exit button */}
      <TouchableOpacity onPress={handleDelete} style={styles.exitButton}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6bd60",
    height: "auto",
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 20,
    paddingVertical: 20,

    // shadow props are different for ios and android
    // android
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { height: 5 },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },
  header: {
    alignSelf: "center",
    fontSize: 30,
    marginTop: 5,
  },
  timer: {
    alignSelf: "center",
    fontSize: 55,
  },
  buttonView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttons: {
    borderRadius: "50%",
    // paddingVertical: 10,
    // paddingHorizontal: 35,
    height: 50,
    width: 120,
    alignSelf: "center",
    marginHorizontal: 20,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 30,
    textAlign: "center",
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
  },
  exitButton: {
    position: "absolute",
    right: 0,
    top: 0,
    marginTop: 10,
    marginRight: 20,
  },
});

export default Stopwatch;
