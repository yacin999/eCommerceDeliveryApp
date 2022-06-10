import { useState, useEffect, useMemo, useReducer } from "react";
import "react-native-gesture-handler";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import CustomerDrawerNavigator from "./navigations/CustomerDrawerNavigator";
import axios from "axios";
import RootStack from "./navigations/RootStack";
import { AuthContext } from "./components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DriverDrawerNavigator from "./navigations/DriverDrawerNavigator";

export default function App() {
  const initialLoginState = {
    isLoading: true,
    username: null,
    userToken: null,
  };

  const [userType, setUserType] = useState(null);

  const loginReducer = (preState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...preState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...preState,
          userToken: action.token,
          username: action.id,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...preState,
          username: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...preState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispach] = useReducer(loginReducer, initialLoginState);

  const userTypeContext = useMemo(
    () => ({
      changeUserType: async (userT) => {
        try {
          await AsyncStorage.setItem("userType", userT);
        } catch (e) {
          console.log("error from async Storage (changeUserType):", e);
        }
        setUserType(userT);
        console.log("testing usertype state :", userT);
      },
    }),
    []
  );

  const authContext = useMemo(
    () => ({
      signIn: async (username, password, token) => {
        try {
          await AsyncStorage.setItem("userToken", token);
        } catch (e) {
          console.log("error from async Storage :", e);
        }
        dispach({ type: "LOGIN", id: username, token: token });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log("error from signout (async storage)", e);
        }
        dispach({ type: "LOGOUT" });
      },
      signUp: async () => {
        alert("sign up !!");
      },
    }),
    []
  );

  useEffect(() => {
    axios.defaults.baseURL = "https://73b3-105-235-138-111.eu.ngrok.io/";
    axios.defaults.timeout = 1500;
    setTimeout(async () => {
      let userToken = null;
      let userType = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        userType = await AsyncStorage.getItem("userType");
      } catch (e) {
        console.log("error from async Storage :", e);
      }
      dispach({ type: "RETRIEVE_TOKEN", token: userToken });
      setUserType(userType);
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  // Defining the useLayoutEffect hook
  // useLayoutEffect(() => {
  //   console.log("use layout effect hook !!");
  //   axios.defaults.baseURL = "https://a994-41-96-130-118.eu.ngrok.io/vrp-api";
  //   axios.defaults.timeout = 1500;
  // }, []);

  return (
    <AuthContext.Provider value={[authContext, userTypeContext, userType]}>
      <NavigationContainer>
        {loginState.userToken == null ? (
          <RootStack />
        ) : loginState.userToken !== null && userType === "CUSTOMER" ? (
          <CustomerDrawerNavigator />
        ) : loginState.userToken !== null && userType === "DRIVER" ? (
          <DriverDrawerNavigator />
        ) : null}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
