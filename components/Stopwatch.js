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
      <Text style={styles.header}>{item.item.name}</Text>
      <Text style={styles.timer}>{convertTime(timer)}</Text>
      <Text style={styles.text}>Goal: (hard code rn) </Text>

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
          style={[styles.buttons, { backgroundColor: "#dc2f02" }]}
        >
          <Text style={styles.buttonText}>End</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3E3E3",
    height: 200,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 20,

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
    paddingVertical: 10,
    paddingHorizontal: 35,
    alignSelf: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 30,
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
  },
});

export default Stopwatch;
