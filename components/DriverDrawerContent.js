import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Drawer } from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { AuthContext } from "./context";

const DriverDrawerContent = (props) => {
  const [authContext] = useContext(AuthContext);
  const { signOut } = authContext;
  return (
    <DrawerContentScrollView>
      <Drawer.Section style={styles.drawerSection}>
        <Drawer.Item
          label="Home"
          onPress={() => props.navigation.navigate("Map Screen")}
        />
        <Drawer.Item label="parameters" />
        <Drawer.Item label="logout" onPress={() => signOut()} />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

export default DriverDrawerContent;

const styles = StyleSheet.create({});
