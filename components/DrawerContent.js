import { StyleSheet, View } from "react-native";
import React, { useState, useContext } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Avatar,
  Caption,
  Title,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "./context";

const DrawerContent = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const [authContext] = useContext(AuthContext);
  const { signOut } = authContext;
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
              }}
            >
              <Avatar.Image
                source={{
                  uri: "https://api.adorable.io/avatars/50/abott@adorable.png",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15 }}>
                <Title style={styles.title}>Kelalech Omar</Title>
                <Caption style={styles.caption}>@Omar12</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Folowing</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Folowers</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Item
              icon={(color, size) => (
                <Icon name="home-outline" color={color} size={20} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />

            <Drawer.Item
              icon={(color, size) => (
                <Icon name="account-outline" color={color} size={20} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />

            <Drawer.Item
              icon={(color, size) => (
                <Icon name="bookmark-outline" color={color} size={20} />
              )}
              label="Bookmarks"
              onPress={() => {
                alert("go home screen");
              }}
            />

            <Drawer.Item
              icon={(color, size) => (
                <Ionicons name="md-settings-outline" color={color} size={20} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />

            <Drawer.Item
              icon={(color, size) => (
                <Icon name="account-check-outline" color={color} size={20} />
              )}
              label="Support"
              onPress={() => {
                alert("go home screen");
              }}
            />
          </Drawer.Section>

          <Drawer.Section title="preferences">
            <TouchableRipple onPress={() => toggleTheme()}>
              <View style={styles.preference}>
                <Text>Dark theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Item
          icon={(color, size) => (
            <Icon name="exit-to-app" color={color} size={20} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 16,
    alignItems: "center",
  },
});
