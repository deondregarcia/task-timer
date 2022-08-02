import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const Group = ({ item }) => {
  const isFocused = useIsFocused();
  const [description, setDescription] = useState("");
  const [highest, setHighest] = useState(0);
  const [lowest, setLowest] = useState(0);
  const [average, setAverage] = useState(0);

  // use item.item.key to getItem and get rest of values
  const getValues = async () => {
    try {
      let unparsedValues = await AsyncStorage.getItem(item.item.key);
      let values = JSON.parse(unparsedValues);

      // set values
      setDescription(values.description);
      setHighest(values.highest);
      setLowest(values.lowest);
      setAverage(values.avg);
    } catch (error) {
      console.log(error);
    }
  };

  // convert seconds to HH:MM:SS format
  const convertTime = (time) => {
    var date = new Date(0);
    date.setSeconds(time);
    var timeString = date.toISOString().substr(11, 8);
    return timeString;
  };

  useEffect(() => {
    getValues();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={{ width: 280 }}>
        <Text style={styles.header}>{item.item.groupName}</Text>
        <Text style={styles.description}>Description:</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View
        style={{
          borderLeftWidth: 2,
          borderColor: "#cecfd0",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text style={styles.stats}>Highest: {convertTime(highest)}</Text>
        <Text style={styles.stats}>Lowest: {convertTime(lowest)}</Text>
        <Text style={styles.stats}>Average: {convertTime(average)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1f1f1f",
    height: 150,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 20,
    flexDirection: "row",

    // shadow props are different for ios and android
    // android
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { height: 5 },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },
  header: {
    color: "#cecfd0",
    textAlign: "center",
    fontSize: 35,
  },
  description: {
    color: "#cecfd0",
    fontSize: 20,
    marginLeft: 10,
  },
  stats: {
    color: "#cecfd0",
    alignSelf: "center",
    marginVertical: 5,
  },
});

export default Group;
