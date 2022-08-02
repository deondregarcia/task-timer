import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Stopwatch from "../components/Stopwatch";
import CreateTimerOverlay from "../components/CreateTimerOverlay";

// temp import of image
import image2 from "../assets/backgrounds/image2.jpg";
import { imageIndex } from "../assets/backgrounds/imageIndex.js";

const Home = ({ backgroundIndex }) => {
  const [timerNameArray, setTimerNameArray] = useState([]);
  const [timerOverlayState, setTimerOverlayState] = useState(false);

  // delete all timers on screen
  const handleClearAll = () => {
    setTimerNameArray([]);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageIndex[backgroundIndex]}
        resizeMode="cover"
        style={styles.image}
      >
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
        <StatusBar style="light" />
      </ImageBackground>
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
    marginTop: 10,
    width: 130,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#1f1f1f",
    shadowOffset: { height: 5 },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  buttonText: {
    fontSize: 25,
    color: "#cecfd0",
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
});

export default Home;
