import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Group = ({ item }) => {
  console.log(item);
  return (
    <View style={styles.container}>
      <Text>{item.item.groupName}</Text>
      <Text>{item.item.keys}</Text>
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
