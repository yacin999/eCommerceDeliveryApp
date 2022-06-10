import { Button, View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const LoginOrCreateForm = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const navigation = useNavigation();

  const onUsernameChange = (text) => {
    setFormData({ ...formData, username: text });
  };

  const onPasswordChange = (text) => {
    setFormData({ ...formData, password: text });
  };

  const onFirstNameChange = (text) => {
    setFormData({ ...formData, firstName: text });
  };

  const onLastNameChange = (text) => {
    setFormData({ ...formData, lastName: text });
  };

  const handleRequest = () => {
    console.log("request was handled !!!");
    const endpoint = props.create ? "register" : "login";
    const payload = {
      username: formData.username,
      password: formData.password,
    };

    if (props.create) {
      payload.first_name = formData.firstName;
      payload.last_name = formData.lastName;
    }
    console.log("payload :", payload);

    // fetch("http://192.168.1.2:8000/vrp-api/auth/login/", {
    //   method: "POST",
    //   body: JSON.stringify(payload),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log("returned data", data))
    //   .catch((error) => console.log("error from server", error));

    axios
      .post(`vrp-api/auth/${endpoint}/`, payload)
      .then((response) => {
        const { token, user } = response.data;
        console.log("response :", response);
        // We set the returned token as the default authorization header
        axios.defaults.headers.common.Authorization = `Token ${token}`;

        // Navigate to the home screen
        if (endpoint === "register") {
          navigation.navigate("login");
        } else if (endpoint === "login") {
          navigation.navigate("main");
        }
        console.log("token :", token);
      })
      .catch((error) => {
        console.log("ERROR", error);
        alert("Verify your cridentials !!!");
      });
  };

  const renderCreateForm = () => {
    const { fieldStyle, textInputStyle } = style;
    if (props.create) {
      return (
        <View style={fieldStyle}>
          <TextInput
            placeholder="First name"
            autoCorrect={false}
            onChangeText={onFirstNameChange}
            style={textInputStyle}
          />
          <TextInput
            placeholder="Last name"
            autoCorrect={false}
            onChangeText={onLastNameChange}
            style={textInputStyle}
          />
        </View>
      );
    }
  };

  const renderButton = () => {
    const buttonText = props.create ? "Create" : "Login";
    console.log("button was rendered !!!");
    return <Button title={buttonText} onPress={handleRequest} />;
  };

  const renderCreateLink = () => {
    if (!props.create) {
      const { accountCreateTextStyle } = style;
      return (
        <Text style={accountCreateTextStyle}>
          Or
          <Text
            style={{ color: "blue" }}
            onPress={() => navigation.navigate("register")}
          >
            {" Sign-up"}
          </Text>
        </Text>
      );
    }
  };

  const {
    formContainerStyle,
    fieldStyle,
    textInputStyle,
    buttonContainerStyle,
    accountCreateContainerStyle,
  } = style;

  console.log("props :", props);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={formContainerStyle}>
        <View style={fieldStyle}>
          <TextInput
            placeholder="username"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={onUsernameChange}
            style={textInputStyle}
          />
        </View>
        <View style={fieldStyle}>
          <TextInput
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="password"
            onChangeText={onPasswordChange}
            style={textInputStyle}
          />
        </View>
        {renderCreateForm()}
      </View>
      <View style={buttonContainerStyle}>
        {renderButton()}
        <View style={accountCreateContainerStyle}>{renderCreateLink()}</View>
      </View>
    </View>
  );
};

export default LoginOrCreateForm;

const style = StyleSheet.create({
  formContainerStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    flex: 1,
    padding: 15,
  },
  fieldStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainerStyle: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },
  accountCreateTextStyle: {
    color: "black",
  },
  accountCreateContainerStyle: {
    padding: 25,
    alignItems: "center",
  },
});
