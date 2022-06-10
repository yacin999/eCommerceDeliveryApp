import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import WebView from "react-native-webview";
import mapTemplate from "../map-template";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const MapScreen = ({ navigation }) => {
  let webViewRef = null;
  let [mapCenter, setMapCenter] = useState("0.1378, 35.3944");
  const [marker, setMarker] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const getUserToken = async () => {
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (e) {
      console.log("error caused by getting usertoken", e);
    }
    return userToken;
  };

  const handleMapEvent = (event) => {
    setMapCenter(event.nativeEvent.data);
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
        const deliveries = res.data.deliveries;
        const orders = res.data.orders;
        const orderItems = res.data.orderItems;
        console.log("deliveries :", deliveries);
        let depoCoords = "";
        if (deliveries[0]) {
          depoCoords = {
            lon: Number(deliveries[0].delivery.depo_coords.split(",")[0]),
            lat: Number(deliveries[0].delivery.depo_coords.split(",")[1]),
          };
          locationsCoords.push(depoCoords);
        }

        orders.forEach((order) => {
          if (deliveries[0].id === order.deliveryVehicle.id) {
            let orderCoords = {
              lon: Number(order.destination.split(",")[0]),
              lat: Number(order.destination.split(",")[1]),
            };
            locationsCoords.push(orderCoords);
          }
        });

        let route = JSON.parse(deliveries[0].active_arcs);
        let formattedLocations = [];

        console.log("locationsCoords ", locationsCoords);
        route.forEach((arc, i) => {
          let formattedLocation = `${locationsCoords[arc[0]].lon},${
            locationsCoords[arc[0]].lat
          }:${locationsCoords[arc[1]].lon},${locationsCoords[arc[1]].lat}`;
          formattedLocations.push(formattedLocation);
        });

        const locsWV = JSON.stringify(locationsCoords);
        const routeWV = JSON.stringify(route);
        const formattedLocationsWV = JSON.stringify(formattedLocations);
        console.log("locsWV : ", locsWV);
        webViewRef.injectJavaScript(`
        let locations = ${locsWV}
        let route = ${routeWV}
        let formattedLocations = ${formattedLocationsWV}

        locations.forEach((location, i)=>{
          let element = document.createElement("div")
          if ( i === 0) {
            element.className = "depo-marker"
          }else {
            element.className = "marker"
          }
          var marker = new tt.Marker({
            element : element
          })
          .setLngLat([location.lon, location.lat])
          .addTo(map)
        })


        route.forEach((arc, i)=> {
          tt.services.calculateRoute({
            key: "I6kBz902v7AXAGvD9J7DNysPz9DkfQMP",
            locations: formattedLocations[i]
            })
            .then((routeData) => {
              const geoJson = routeData.toGeoJson();
                map.addLayer({
                id: '\${i}',
                type: "line",
                source: {
                  type: "geojson",
                  data: geoJson,
                },
                paint: {
                  "line-color": "red",
                  "line-width": 5,
                },
              });
          });
        })
        `);
      })
      .catch((err) =>
        console.log("error after trying to retrieve delivery data", err)
      );
  };

  useEffect(() => {
    setTimeout(() => {
      getDeliveryData();
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather
          name="menu"
          size={20}
          style={styles.menuIcon}
          onPress={() => navigation.toggleDrawer()}
        />
        <TextInput
          style={styles.searchBarInput}
          placeholder="enter a location !"
        />
      </View>

      <WebView
        ref={(r) => (webViewRef = r)}
        onMessage={(event) => {}}
        style={styles.map}
        originWhitelist={["*"]}
        source={{ html: mapTemplate }}
      />

      {/* <Button title="add marker" onPress={onPressItem} /> */}
    </View>
  );
};

export default MapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    alignSelf: "center",
    position: "absolute",
    top: 30,
    width: "90%",
    // height: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FFF",
    zIndex: 10,
    elevation: 15,
    shadowColor: "#000",
  },
  searchBarInput: {
    flex: 9,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "#000",
  },
  menuIcon: {
    flex: 1,
  },
  // map: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: "100%",
  //   height: "100%",
  // },
});
