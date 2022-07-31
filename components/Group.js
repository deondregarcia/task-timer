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
  console.log("test item key: " + item.item.key);
  const getValues = async () => {
    try {
      let unparsedValues = await AsyncStorage.getItem(item.item.key);
      let values = JSON.parse(unparsedValues);
      console.log(values);

      // set values
      setDescription(values.description);
      setHighest(values.highest);
      setLowest(values.lowest);
      setAverage(values.avg);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getValues();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text>{item.item.groupName}</Text>
      <Text>{description}</Text>
      <Text>{highest}</Text>
      <Text>{lowest}</Text>
      <Text>{average}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3E3E3",
    height: 100,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 20,

    // shadow props are different for ios and android
    // android
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { height: 5 },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },
});

export default Group;
