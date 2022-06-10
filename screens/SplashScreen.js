import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { AuthContext } from "../components/context";

const SplashScreen = ({ navigation }) => {
  const [authContext, userTypeContext] = useContext(AuthContext);
  const { changeUserType } = userTypeContext;

  const handleDriverButton = () => {
    changeUserType("DRIVER");
    navigation.navigate("SignIn");
  };

  const handleCustomerButton = () => {
    changeUserType("CUSTOMER");
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          // duration="1500"
          source={require("../assets/delivery.jpg")}
          style={styles.logo}
          //   resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>get your deliveries wherever you are!</Text>
        <Text style={styles.text}>Sign in as :</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <TouchableOpacity onPress={handleDriverButton}>
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Driver</Text>
              {/* <MaterialIcons name="navigate-next" color="#FFF" size={20} /> */}
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCustomerButton} style={{}}>
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Client</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0bb078",
    // backgroundColor: "#eeb934",
    // backgroundColor: "#f08119",
    // backgroundColor: "#2e2e2e",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    // paddingHorizontal: 30,
    paddingRight: 30,
    paddingLeft: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: height_logo / 2,
    borderWidth: 2,
    borderColor: "#000",
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    // alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
