import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// functional component for the overlay to create a group
const CreateGroupOverlay = ({
  setGroupArray,
  setGroupOverlayState,
  groupArray,
}) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [key, setKey] = useState(null);

  // update groupNameArray and close overlay
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
      { groupName: groupName, description: description, key: key },
    ]);
    setGroupOverlayState(false);
    saveGroup();
  };

  // save group object in AsyncStorage, to be called in above handleCreate function
  const saveGroup = async () => {
    try {
      const jsonValue = JSON.stringify({
        groupName: groupName,
        keys: [],
        key: key,
        description: description,
        avg: 0,
        lowest: 0,
        highest: 0,
      });
      await AsyncStorage.setItem(`${key}`, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  // gen group key
  const generateKey = async () => {
    // get array of all stored keys
    let allKeys = [];
    try {
      allKeys = await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log(error);
    }

    // generate number from 0 to 99
    let groupKey = Math.floor(Math.random() * 100);
    // set state variable 'key' as groupKey if groupKey value not already stored
    if (!("group" + groupKey in allKeys)) {
      // pre-pend "group" to differentiate group key-value pairs from group pairs
      setKey("group" + groupKey);
    } else {
      while (groupKey in allKeys) {
        groupKey = Math.floor(Math.random() * 100);
      }
      // pre-pend "group" to differentiate group key-value pairs from group pairs
      setKey("group" + groupKey);
    }
  };

  useEffect(() => {
    if (!key) generateKey();
  }, []);

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
