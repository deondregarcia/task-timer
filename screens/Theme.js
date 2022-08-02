import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useContext, createContext, useRef } from "react";
import Carousel from "react-native-snap-carousel";
import { imageIndex } from "../assets/backgrounds/imageIndex";
import image1 from "../assets/backgrounds/image1.jpg";
import { Slider } from "@rneui/themed/dist/Slider";
import { ThemeContext } from "../App";

const Theme = ({ route, navigation }) => {
  const setBackgroundIndex = route.params.setBackgroundIndex;

  const SliderImage = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setBackgroundIndex(item.index);
          navigation.navigate({
            name: "TabNavigator",
            params: { backgroundIndex: item.index },
          });
        }}
      >
        <Image source={item.item} style={{ height: 400, width: 300 }} />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Text style={{ fontSize: 25, textAlign: "center", marginVertical: 30 }}>
        Select your favorite background!
      </Text>
      <Carousel
        data={imageIndex}
        renderItem={(item) => <SliderImage item={item} />}
        sliderWidth={400}
        itemWidth={300}
      />
    </View>
  );
};

export default Theme;
