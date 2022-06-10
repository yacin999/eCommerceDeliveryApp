import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const RootStackCreator = createStackNavigator();
const RootStack = ({ navigation }) => {
  return (
    <RootStackCreator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStackCreator.Screen name="SplashScreen" component={SplashScreen} />
      <RootStackCreator.Screen name="SignIn" component={LoginScreen} />
      <RootStackCreator.Screen name="SignUp" component={RegisterScreen} />
    </RootStackCreator.Navigator>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
