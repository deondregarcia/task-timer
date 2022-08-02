import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import React, { useState } from "react";

// screen imports
import Home from "./screens/Home";
import History from "./screens/History";
import Stats from "./screens/Stats";
import Theme from "./screens/Theme";

// react navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ThemeButton = ({ navigation, setBackgroundIndex }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Theme", {
          // setBackgroundIndex: setBackgroundIndex,
        })
      }
      style={{ marginRight: 20 }}
    >
      <Icon name="image" size={30} color="#ebad11" />
    </TouchableOpacity>
  );
};

const TabNavigator = ({ navigation, route }) => {
  const setBackgroundIndex = route.params.setBackgroundIndex;
  const backgroundIndex = route.params.backgroundIndex;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: () => (
          <ThemeButton
            navigation={navigation}
            setBackgroundIndex={setBackgroundIndex}
          />
        ),
        headerStyle: { backgroundColor: "#1f1f1f" },
        tabBarStyle: {
          backgroundColor: "#1f1f1f",
          borderTopWidth: 0,
        },
        headerTintColor: "#ebad11",
        tabBarActiveTintColor: "#ebad11",
        tabBarInactiveTintColor: "#cecfd0",
      }}
    >
      <Tab.Screen
        name="History"
        children={() => <History backgroundIndex={backgroundIndex} />}
        options={{
          tabBarIcon: ({ color }) => <Icon name="article" color={color} />,
        }}
      />
      <Tab.Screen
        name="Home"
        children={() => <Home backgroundIndex={backgroundIndex} />}
        options={{
          tabBarIcon: ({ color }) => <Icon name="timer" color={color} />,
        }}
      />
      <Tab.Screen
        name="Stats"
        children={() => <Stats backgroundIndex={backgroundIndex} />}
        options={{
          tabBarIcon: ({ color }) => <Icon name="equalizer" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
export default function App() {
  const [backgroundIndex, setBackgroundIndex] = useState(1);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
          initialParams={{
            setBackgroundIndex: setBackgroundIndex,
            backgroundIndex: backgroundIndex,
          }}
        />
        <Stack.Screen
          name="Theme"
          component={Theme}
          initialParams={{ setBackgroundIndex: setBackgroundIndex }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
