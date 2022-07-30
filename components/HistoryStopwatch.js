import { View, Text, StyleSheet } from "react-native";
import React from "react";

const HistoryStopwatch = ({ item }) => {
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
      <Text style={styles.timer}>{convertTime(item.item.timer)}</Text>
      <Text style={styles.text}>Goal: (hard code rn) </Text>
      {/* <Text>{item.item.id}</Text> */}

      <View style={styles.buttonView}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3E3E3",
    height: "auto",
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
  text: {
    alignSelf: "center",
    fontSize: 15,
  },
});

export default HistoryStopwatch;
