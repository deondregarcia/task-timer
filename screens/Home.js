import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Stopwatch from "../components/Stopwatch";
import CreateTimerOverlay from "../components/CreateTimerOverlay";

const Home = () => {
  const [timerNameArray, setTimerNameArray] = useState([]);
  const [timerOverlayState, setTimerOverlayState] = useState(false);

  // delete all timers on screen
  const handleClearAll = () => {
    setTimerNameArray([]);
  };

  return (
    <View style={styles.container}>
      {/* conditional rendering of CreateTimerOverlay component */}
      {timerOverlayState && (
        <CreateTimerOverlay
          timerNameArray={timerNameArray}
          setTimerNameArray={setTimerNameArray}
          setTimerOverlayState={setTimerOverlayState}
        />
      )}

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => setTimerOverlayState(true)}
          style={styles.buttons}
        >
          <Text style={styles.buttonText}>New Timer</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClearAll} style={styles.buttons}>
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Render flatlist of stopwatches */}
      <FlatList
        data={timerNameArray}
        renderItem={(item) => (
          <Stopwatch
            item={item}
            timerNameArray={timerNameArray}
            setTimerNameArray={setTimerNameArray}
          />
        )}
      />

      {/* configure statusbar look for expo */}
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  buttons: {
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    fontSize: 25,
  },
});

export default Home;
