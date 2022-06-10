import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState, useContext } from "react";
import LoginOrCreateForm from "../components/LoginOrCreateForm";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import { AuthContext } from "../components/context";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    check_textInputChange: false,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePassInputChange = (val) => {
    setData({
      ...data,
      password: val,
      check_textInputChange: true,
    });
  };

  const [authContext, userTypeContext, userType] = useContext(AuthContext);
  const { signIn } = authContext;

  const handleLogin = (username, password) => {
    const payload = {
      username: username,
      password: password,
    };

    axios
      .post("vrp-api/auth/login/", payload)
      .then((response) => {
        const { token } = response.data;
        // We set the returned token as the default authorization header
        axios.defaults.headers.common.Authorization = `Token ${token}`;

        console.log("token :", token, username, password);
        signIn(username, password, token);
      })
      .catch((error) => {
        console.log("ERROR", error);
        alert("Verify your cridentials !!!");
      });
  };

  return (
    <View style={styles.container}>
      {/* <LoginOrCreateForm /> */}
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome! {userType}</Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your username"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_textInputChange && (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          )}
        </View>

        <Text style={[styles.text_footer, { marginTop: 30 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={!isPasswordVisible}
            onChangeText={(val) => handlePassInputChange(val)}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Feather
              name={isPasswordVisible ? "eye" : "eye-off"}
              color="grey"
              size={20}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => handleLogin(data.username, data.password)}
          >
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: "#fff" }]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          {userType === "CUSTOMER" ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={[
                styles.signIn,
                {
                  borderColor: "#009387",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#009387",
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.driverWarning}>
              <Entypo name="warning" color="#cc3300" size={26} />
              <Text style={styles.warningText}>
                if you don't have an account, please contact the administration
                !
              </Text>
            </View>
          )}
        </View>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -4,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  driverWarning: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 40,
    borderLeftWidth: 4,
    borderColor: "#cc3300",
    backgroundColor: "#fbd43b",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  warningText: {
    marginLeft: 10,
    color: "#cc3300",
    fontSize: 18,
  },
});
