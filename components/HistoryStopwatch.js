import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryStopwatch = ({ item }) => {
  const [addGroupOverlayState, setAddGroupOverlayState] = useState(false);

  // convert seconds to HH:MM:SS format
  const convertTime = (time) => {
    var date = new Date(0);
    date.setSeconds(time);
    var timeString = date.toISOString().substr(11, 8);
    return timeString;
  };

  return (
    <View style={styles.container}>
      {!addGroupOverlayState ? (
        <View>
          <Text style={styles.header}>{item.item.name}</Text>
          <Text style={styles.timer}>{convertTime(item.item.timer)}</Text>
          <Text style={styles.text}>Goal: {item.item.goal} </Text>
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <Text>Which Group?</Text>
          <ScrollView style={{ marginLeft: 30 }}>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
            <Text>Test</Text>
          </ScrollView>
        </View>
      )}
      <TouchableOpacity
        onPress={
          !addGroupOverlayState
            ? () => setAddGroupOverlayState(true)
            : () => setAddGroupOverlayState(false)
        }
        style={styles.switchButton}
      >
        {!addGroupOverlayState ? (
          <Text>Add to Group</Text>
        ) : (
          <Text style={{ fontSize: 30 }}>X</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3E3E3",
    height: 150,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 20,
    paddingBottom: 10,
    justifyContent: "center",

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
  text: {
    alignSelf: "center",
    fontSize: 15,
  },
  switchButton: {
    position: "absolute",
    right: 0,
    top: 0,
    marginTop: 10,
    marginRight: 20,
  },
});

export default HistoryStopwatch;
