import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DeliveriesContext } from "../components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Item = ({ item }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemInfos}>
        <Text>clients Number : {item.clientsNumber}</Text>
        <Text>Capacity : {item.capacity}g</Text>
      </View>
      <TouchableOpacity style={styles.detailButton}>
        <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 17 }}>
          Detail
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DriverMissionScreen = () => {
  // const [deliveries, setDeliveries] = useState([]);
  // const [orders, setOrders] = useState([]);
  // const [orderItems, setOrderItems] = useState([]);
  const [deliveryCards, setDeliveryCards] = useState([]);
  // const deliveries = useContext(DeliveriesContext);

  const getUserToken = async () => {
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (e) {
      console.log("error caused by getting usertoken", e);
    }
    return userToken;
  };

  const getDeliveryData = async () => {
    let userToken = null;
    let locationsCoords = [];
    userToken = await getUserToken();
    axios
      .get("api/get-driver-mission/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
      })
      .then((res) => {
        let deliveriesC = [];
        const deliveries = res.data.deliveries;
        const orders = res.data.orders;
        const orderItems = res.data.orderItems;

        deliveries.forEach((delivery) => {
          let clientsNumber = 0;
          let capacity = 0;

          orders.forEach((order) => {
            if (delivery.id === order.deliveryVehicle.id) {
              clientsNumber++;
              orderItems.forEach((orderItem) => {
                if (order.id === orderItem.order.id) {
                  capacity += orderItem.quantity * orderItem.product.weight;
                }
              });
            }
          });
          deliveriesC.push({
            clientsNumber: clientsNumber,
            capacity: capacity,
          });
        });
        setDeliveryCards(deliveriesC);
      })
      .catch((err) =>
        console.log(
          "ERROR after trying to retrieve deliveries data in (DriverDrawerNavigator)",
          err
        )
      );
  };

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  useEffect(() => {
    getDeliveryData().then();
  }, []);
  return (
    <View style={styles.container}>
      <Text>All your missions : </Text>
      <View style={styles.missionContainer}>
        {deliveryCards.length > 0 && (
          <FlatList
            data={deliveryCards}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        )}
      </View>
    </View>
  );
};

export default DriverMissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    elevation: 9,
    shadowColor: "#000",
  },
  detailButton: {
    backgroundColor: "#3ecd66",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
