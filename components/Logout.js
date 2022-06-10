import { StyleSheet, View, Button, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Logout = () => {
  const navigation = useNavigation();
  const handleRequest = () => {
    axios
      .get("vrp-api/auth/logout/")
      .then((response) => {
        axios.defaults.headers.common.Authorization = null;
        navigation.navigate("login");
      })
      .catch((error) => console.log(error));
  };

  const { buttonContainerStyle, text } = styles;
  return (
    <View style={buttonContainerStyle}>
      <Text style={text}>this is text</Text>
      <Button title="Logout" onPress={handleRequest} />
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  buttonContainerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
});
