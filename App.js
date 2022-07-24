import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// screen imports
import Home from "./screens/Home";
import History from "./screens/History";
import Charts from "./screens/Charts";

// react navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Charts" component={Charts} />
    </Tab.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
