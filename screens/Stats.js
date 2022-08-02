import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";

import CreateGroupOverlay from "../components/CreateGroupOverlay";
import Group from "../components/Group";
import { imageIndex } from "../assets/backgrounds/imageIndex.js";

const Stats = ({ backgroundIndex }) => {
  const [groupOverlayState, setGroupOverlayState] = useState(false);
  const [groupArray, setGroupArray] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={imageIndex[backgroundIndex]}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableOpacity
          onPress={() => setGroupOverlayState(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create New Group</Text>
        </TouchableOpacity>

        {/* render  create group overlay  */}
        {groupOverlayState && (
          <CreateGroupOverlay
            setGroupArray={setGroupArray}
            setGroupOverlayState={setGroupOverlayState}
            groupArray={groupArray}
          />
        )}

        <FlatList
          data={groupArray}
          renderItem={(item) => <Group item={item} />}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 10,
    width: 215,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#1f1f1f",
    shadowOffset: { height: 5 },
    shadowRadius: 10,
    shadowOpacity: 1,
    alignSelf: "center",
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

export default Stats;
