import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

// NOTE: when referencing item, must use item.item, e.g. item.item.name
const Stopwatch = ({ item }) => {
  const [timer, setTimer] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const [timerState, setTimerState] = useState(true);

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

  return (
    <View style={styles.container}>
      <Text>Name: {item.item.name}</Text>
      <Text style={styles.timer}>{convertTime(timer)}</Text>

      {/* conditional render of start or stop */}
      {timerState == true ? (
        <TouchableOpacity onPress={startTimer} style={styles.startStopButtons}>
          <Text>Start</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={stopTimer} style={styles.startStopButtons}>
          <Text>Pause</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2DFD9",
    height: 200,
  },
  timer: {
    alignSelf: "center",
  },
  startStopButtons: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    alignSelf: "center",
  },
});

export default Stopwatch;
