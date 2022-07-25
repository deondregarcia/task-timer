import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import HistoryStopwatch from "../components/HistoryStopwatch";
import AsyncStorage from "@react-native-async-storage/async-storage";

const History = () => {
  const [timerArray, setTimerArray] = useState([]);

  // function for getting timers
  const getStopwatches = async () => {
    let keys = [];
    let keyValues = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      let values = await AsyncStorage.multiGet(keys);
      for (let i = 0; i < values.length; i++) {
        keyValues.push(JSON.parse(values[i][1]));
      }
    } catch (error) {
      console.log(error);
    }

    setTimerArray(keyValues);
  };

  // clear AsyncStorage of all key-value pairs
  const clearHistory = async () => {
    setTimerArray([]);
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // init stopwatch array
    getStopwatches();
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={clearHistory}>
        <Text>Clear History</Text>
      </TouchableOpacity>
      {timerArray && (
        <FlatList
          data={timerArray}
          renderItem={(item) => <HistoryStopwatch item={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default History;

// ----------- DELETE AFTER TRANSFER ---------------------

// const displayKeys = async () => {
//   let keys = [];
//   try {
//     keys = await AsyncStorage.getAllKeys();
//   } catch (error) {
//     console.log(error);
//   }
//   console.log(keys);
// };

// const deleteAllKeys = async () => {
//   try {
//     await AsyncStorage.clear();
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getAllItems = async () => {
//   let keys = [];
//   let keyValues = [];
//   try {
//     keys = await AsyncStorage.getAllKeys();
//     // console.log(keys);
//     let values = await AsyncStorage.multiGet(keys);
//     // console.log(values[0][1]);
//     for (let i = 0; i < values.length; i++) {
//       keyValues.push(JSON.parse(values[i][1]));
//     }
//     console.log(keyValues);
//     // console.log(testVal);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getOneValue = async () => {
//   try {
//     const key = await AsyncStorage.getItem("24");
//     const testVal = JSON.parse(key);
//     console.log(testVal);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const History = () => {
//   return (
//     <View>
//       <Button title="console log all keys" onPress={displayKeys} />
//       <Button title="delete all keys" onPress={deleteAllKeys} />
//       <Button title="get one value" onPress={getOneValue} />
//       <Button title="display key values" onPress={getAllItems} />
//     </View>
//   );
// };

// export default History;
