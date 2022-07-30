import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

// functional component for the overlay to create a group
const CreateGroupOverlay = ({
  setGroupArray,
  setGroupOverlayState,
  groupArray,
}) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  // update timerNameArray and close overlay
  const handleCreate = () => {
    if (!groupName) {
      alert("Please enter a name");
      return;
    }
    if (!description) {
      alert("Please enter a description");
      return;
    }
    setGroupArray([
      ...groupArray,
      { groupName: groupName, description: description },
    ]);
    setGroupOverlayState(false);
  };

  return (
    <View style={styles.wholeContainer}>
      {/* whole container has greater height to add black layer over rest of app for defocusing */}
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Create New Group</Text>
        <TextInput
          placeholder="Enter Name"
          onChangeText={(text) => setGroupName(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Enter description"
          onChangeText={(text) => setDescription(text)}
          style={[styles.textInput, { marginTop: 15 }]}
        />

        <TouchableOpacity onPress={handleCreate} style={styles.createButton}>
          <Text>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGroupOverlayState(false)}
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
    paddingTop: 15,
    paddingBottom: 20,
    backgroundColor: "white",
    height: "auto",
    width: "100%",
  },
  header: {
    alignSelf: "center",
    marginBottom: 20,
    fontSize: 25,
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
  },
});

export default CreateGroupOverlay;
