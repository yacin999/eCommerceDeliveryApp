import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapScreen from "../screens/MapScreen";
import DriverDrawerContent from "../components/DriverDrawerContent";
import DriverMissionScreen from "../screens/DriverMissionScreen";
import { DeliveriesContext } from "../components/context";
import MissionDetailScreen from "../screens/MissionDetailScreen";

const DriverDrawerNavigator = () => {
  const [deliveryMap, setDeliveryMap] = useState({});
  const DriverDrawer = createDrawerNavigator();

  useEffect(() => {});

  return (
    <DeliveriesContext.Provider value={deliveryMap}>
      <DriverDrawer.Navigator
        initialRouteName="Secondary"
        drawerContent={(props) => <DriverDrawerContent {...props} />}
      >
        <DriverDrawer.Screen
          name="Driver Missions"
          component={DriverMissionScreen}
        />
        <DriverDrawer.Screen
          name="Mission Detail"
          component={MissionDetailScreen}
        />
        <DriverDrawer.Screen
          name="Map Screen"
          component={MapScreen}
          screenOptions={{ headerShown: false }}
        />
      </DriverDrawer.Navigator>
    </DeliveriesContext.Provider>
  );
};

export default DriverDrawerNavigator;

const styles = StyleSheet.create({});
