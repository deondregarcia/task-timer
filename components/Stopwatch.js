import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";

var intervalID;

const Stopwatch = () => {
  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(0);

  const startTimer = () => {
    // if a timer already exists, clear first
    if (intervalID) clearInterval(intervalID);

    // set interval of 1000 ms
    intervalID = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1); // have to use this notation instead of timer + 1
    }, 1000);
    console.log("intervalID in start" + intervalID);
  };

  const stopTimer = () => {
    console.log("intervalID in stop" + intervalID);
    clearInterval(intervalID);
  };
  return (
    <View style={styles.container}>
      <Text>{timer}</Text>
      <Button title="Start" onPress={startTimer} />
      <Button title="Stop" onPress={stopTimer} />
      <Button title="Counter" onPress={() => setCounter(counter + 1)} />
      <Button title="Counter" onPress={() => console.log(timer)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F1E8",
    height: 150,
  },
});

export default Stopwatch;
