import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";

import CreateGroupOverlay from "../components/CreateGroupOverlay";
import Group from "../components/Group";

const Stats = () => {
  const [groupOverlayState, setGroupOverlayState] = useState(false);
  const [groupArray, setGroupArray] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
  },
});

export default Stats;
