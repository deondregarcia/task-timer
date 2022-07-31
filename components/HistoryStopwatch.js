import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// group name FlatList component, not the main history stopwacth component
const GroupList = ({ item, stopwatchKey }) => {
  // console.log(item.item.key);

  // get keys array and push this history stopwatches key to it
  const addToGroup = async () => {
    try {
      let unparsedKey = await AsyncStorage.getItem(item.item.key);
      let parsedKey = JSON.parse(unparsedKey);
      parsedKey.keys.push(stopwatchKey);
      getKey(parsedKey);
    } catch (error) {
      console.log(error);
    }
  };

  const getKey = async (inputKey) => {
    try {
      const jsonValue = JSON.stringify({
        groupName: inputKey.groupName,
        keys: inputKey.keys,
        key: inputKey.key,
        description: inputKey.description,
        avg: inputKey.avg,
        lowest: inputKey.lowest,
        highest: inputKey.highest,
      });
      await AsyncStorage.setItem(inputKey.key, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity
      onPress={addToGroup}
      style={{
        backgroundColor: "white",
        width: 120,
        height: 30,
        justifyContent: "center",
        borderRadius: 10,
      }}
    >
      <Text style={{ textAlign: "center" }}>{item.item.groupName}</Text>
    </TouchableOpacity>
  );
};

const HistoryStopwatch = ({ item, groupNames }) => {
  const [addGroupOverlayState, setAddGroupOverlayState] = useState(false);
  const [stopwatchKey, setStopwatchKey] = useState(item.item.key);

  // convert seconds to HH:MM:SS format
  const convertTime = (time) => {
    var date = new Date(0);
    date.setSeconds(time);
    var timeString = date.toISOString().substr(11, 8);
    return timeString;
  };

  return (
    <View style={styles.container}>
      {!addGroupOverlayState ? (
        <View>
          <Text style={styles.header}>{item.item.name}</Text>
          <Text style={styles.timer}>{convertTime(item.item.timer)}</Text>
          <Text style={styles.text}>Goal: {item.item.goal} </Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={{ fontSize: 25, marginBottom: 10 }}>
            Select the Group:
          </Text>
          <FlatList
            data={groupNames}
            renderItem={(item) => (
              <GroupList item={item} stopwatchKey={stopwatchKey} />
            )}
            horizontal
          />
        </View>
      )}
      <TouchableOpacity
        onPress={
          !addGroupOverlayState
            ? () => setAddGroupOverlayState(true)
            : () => setAddGroupOverlayState(false)
        }
        style={styles.switchButton}
      >
        {!addGroupOverlayState ? (
          <Text>Add to Group</Text>
        ) : (
          <Text style={{ fontSize: 30 }}>X</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3E3E3",
    height: 150,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 20,
    paddingBottom: 10,

    // shadow props are different for ios and android
    // android
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { height: 5 },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },
  header: {
    alignSelf: "center",
    fontSize: 30,
    marginTop: 5,
  },
  timer: {
    alignSelf: "center",
    fontSize: 55,
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
  },
  switchButton: {
    position: "absolute",
    right: 0,
    top: 0,
    marginTop: 10,
    marginRight: 20,
  },
  contentContainer: {
    alignItems: "center",
    top: 30,
  },
});

export default HistoryStopwatch;
