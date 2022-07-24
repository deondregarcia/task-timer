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
          style={styles.button}
        >
          <Text>New Timer</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClearAll} style={styles.button}>
          <Text>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Render flatlist of stopwatches */}
      <FlatList
        data={timerNameArray}
        renderItem={(item) => <Stopwatch item={item} />}
      />

      {/* configure statusbar look for expo */}
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});

export default Home;
