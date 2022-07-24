import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Stopwatch = () => {
  return (
    <View style={styles.container}>
      <Text>Stopwatch</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    height: 150,
  },
});

export default Stopwatch;
