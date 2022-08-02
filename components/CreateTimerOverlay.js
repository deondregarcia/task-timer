import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

// functional component for the overlay to create a timer
const CreateTimerOverlay = ({
  timerNameArray,
  setTimerNameArray,
  setTimerOverlayState,
}) => {
  const [inputText, setInputText] = useState("");
  const [goal, setGoal] = useState("");

  // update timerNameArray and close overlay
  const handleCreate = () => {
    if (!inputText) {
      alert("Please enter a name");
      return;
    }
    if (!goal) {
      alert("Please enter a goal");
      return;
    }
    setTimerNameArray([...timerNameArray, { name: inputText, goal: goal }]);
    setTimerOverlayState(false);
  };

  return (
    <View style={styles.wholeContainer}>
      {/* whole container has greater height to add black layer over rest of app for defocusing */}
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Create New Timer</Text>
        <TextInput
          placeholder="Enter Name"
          placeholderTextColor="gray"
          onChangeText={(text) => setInputText(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder='Enter a goal (e.g. "30 minutes")'
          placeholderTextColor="gray"
          onChangeText={(text) => setGoal(text)}
          style={[styles.textInput, { marginTop: 15 }]}
        />

        <TouchableOpacity onPress={handleCreate} style={styles.createButton}>
          <Text style={{ color: "#cecfd0" }}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTimerOverlayState(false)}
          style={styles.exitButton}
        >
          <Text style={{ fontSize: 30, color: "#cecfd0" }}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wholeContainer: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    width: "100%",
    zIndex: 2,
  },
  mainContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#1f1f1f",
    height: "auto",
    width: "100%",
  },
  header: {
    alignSelf: "center",
    marginBottom: 20,
    fontSize: 20,
    color: "#cecfd0",
  },
  textInput: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#cecfd0",
    color: "#cecfd0",
  },
  exitButton: {
    position: "absolute",
    right: 0,
    top: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  createButton: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    padding: 10,
    borderColor: "#cecfd0",
  },
});
export default CreateTimerOverlay;
