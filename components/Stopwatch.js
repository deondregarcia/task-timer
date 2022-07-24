import { View, Text, StyleSheet, Button } from "react-native";
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

  // func to convert seconds count to HH:MM:SS format
  // Number.prototype.toHHMMSS = function(timer) {
  //   var seconds = timer
  // }

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
      {timerState == true ? (
        <Button title="Start" onPress={startTimer} />
      ) : (
        <Button title="Stop" onPress={stopTimer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F1E8",
    height: 200,
  },
  timer: {
    alignSelf: "center",
  },
});

export default Stopwatch;
