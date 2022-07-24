import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Stopwatch from "../components/Stopwatch";
import CreateTimerOverlay from "../components/CreateTimerOverlay";

const Home = () => {
  const [timerNameArray, setTimerNameArray] = useState([]);
  const [timerOverlayState, setTimerOverlayState] = useState(false);

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

      <Button
        title="Create New Timer"
        onPress={() => setTimerOverlayState(true)}
      />
      <Button title="console log" onPress={() => console.log(timerNameArray)} />

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
});

export default Home;
