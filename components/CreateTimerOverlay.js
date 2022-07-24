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

  return (
    <View style={styles.wholeContainer}>
      {/* whole container has greater height to add black layer over rest of app for defocusing */}
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Create New Timer</Text>
        <TextInput
          placeholder="Enter Name"
          onChangeText={(text) => setInputText(text)}
          style={styles.textInput}
        />
        <Button
          title="Create"
          onPress={() =>
            setTimerNameArray([...timerNameArray, { name: inputText }])
          }
        />
        <TouchableOpacity
          onPress={() => setTimerOverlayState(false)}
          style={styles.exitButton}
        >
          <Text style={{ fontSize: 30 }}>X</Text>
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
    backgroundColor: "white",
    height: 150,
    width: "100%",
  },
  header: {
    alignSelf: "center",
    marginBottom: 20,
    fontSize: 20,
  },
  textInput: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  exitButton: {
    position: "absolute",
    left: 0,
    top: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
export default CreateTimerOverlay;
