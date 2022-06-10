import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import React, { useContext, useState } from "react";
import { ProductsContext } from "../components/context";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalPopup from "../components/ModalPopup";
import axios from "axios";
import ChangeLocation from "../components/ChangeLocation";

const Item = ({ item, incrementItem, decrementItem, deleteProduct }) => {
  return (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: `${item.product.image}` }} />
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>${item.product.price}</Text>
        <View style={styles.changeItem}>
          <AntDesign
            style={styles.reduceItemBtn}
            name="minuscircle"
            color="#CCC"
            size={20}
            onPress={() => decrementItem(item)}
          />
          <Text style={styles.itemQuantity}>{item.itemQuanity}</Text>
          <AntDesign
            style={styles.addItemBtn}
            color="#CCC"
            name="pluscircle"
            size={20}
            onPress={() => incrementItem(item)}
          />
        </View>
      </View>
      <Ionicons
        style={styles.removeItemBtn}
        name="trash-outline"
        color="red"
        size={20}
        onPress={() => deleteProduct(item)}
      />
    </View>
  );
};

const CartScreen = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [locationType, setLocationType] = useState(null);
  const [modalType, setModalType] = useState(null);
  let [placeholder, setPlaceholder] = useState("Query e.g. Oran");
  let [showList, setShowList] = useState(false);
  let [suggestionListData, setSuggestionListData] = useState([]);
  const tomtomKey = process.env.TOMTOM_DEVELOPER_KEY;

  const [productsContext, UserPurchaseState, totalPurchase] =
    useContext(ProductsContext);
  const { incrementItem, decrementItem, deleteProduct } = productsContext;

  const getUserToken = async () => {
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (e) {
      console.log("error caused by getting usertoken", e);
    }
    return userToken;
  };

  const getLocationAuto = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        incrementItem={incrementItem}
        decrementItem={decrementItem}
        deleteProduct={deleteProduct}
        keyExtractor={(item) => item.product.id}
      />
    );
  };

  const handleSearchTextChange = (changedSearchText) => {
    if (!changedSearchText || changedSearchText.length < 4) return;

    let baseUrl = `https://api.tomtom.com/search/2/search/${changedSearchText}.json?`;
    let searchUrl = baseUrl + `key=${tomtomKey}`;

    axios
      .get(searchUrl)
      .then((response) => {
        let addresses = response.data.results.map((v) => {
          let parts = v.address.freeformAddress.split(",");
          return {
            p1: parts.length > 0 ? parts[0] : null,
            p2: parts.length > 1 ? parts[1] : null,
            p3: parts.length > 2 ? parts[2] : null,
            address: v.address.freeformAddress,
            lat: v.position.lat,
            lon: v.position.lon,
          };
        });

        setSuggestionListData(addresses);
        setShowList(true);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  const onPressItem = (item) => {
    console.log("testing setUserLocation", item.lon, item.lat);
    setPlaceholder(item.address);
    setShowList(false);
    setUserLocation({
      longitude: item.lon,
      latitude: item.lat,
    });
  };

  const handleLocation = new Promise((resolve) => {
    if (modalType !== "changeLocation") getLocationAuto();
    const usertoken = getUserToken();
    resolve(usertoken);
  });

  const handleMyLocation = (modalType) => {
    setModalType(modalType);
    handleLocation.then((userToken) => {
      console.log("user token testing :", userToken);
      const data = {
        userPurchases: UserPurchaseState,
        total: totalPurchase,
        userLocation: userLocation,
      };
      axios
        .post("api/checkout/", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        })
        .then((res) => {
          console.log("response :", res.data);
        })
        .catch((err) => {
          console.log("error ", err);
        });
    });
  };

  return (
    <View style={styles.container}>
      {UserPurchaseState.length !== 0 ? (
        <FlatList
          data={UserPurchaseState}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <Text style={{ textAlign: "center" }}>Cart is empty</Text>
      )}
      <View style={styles.checkOutCotainer}>
        <View style={styles.total}>
          <Text style={{ color: "#333", marginBottom: 5 }}>Total</Text>
          <Text style={{ fontSize: 20 }}> ${totalPurchase}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => {
            setModalVisible(true);
            setModalType("chooseLocation");
          }}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
          <Ionicons name="arrow-forward-sharp" color="#FFF" size={20} />
        </TouchableOpacity>
      </View>

      <ModalPopup visible={modalVisible} style={{ position: "relative" }}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          <Image
            source={require("../assets/images/x.png")}
            style={{ height: 20, width: 20 }}
          />
        </TouchableOpacity>

        {modalType === "chooseLocation" ? (
          <View>
            <Text style={{ fontSize: 23, marginBottom: 40 }}>
              choose how to set location :
            </Text>
            <TouchableOpacity onPress={() => handleMyLocation("success")}>
              <Text
                style={{ fontSize: 20, marginBottom: 10, color: "#049bd6" }}
              >
                my location
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalType("changeLocation")}>
              <Text style={{ fontSize: 20, color: "#049bd6" }}>
                select location manully
              </Text>
            </TouchableOpacity>
          </View>
        ) : modalType === "success" ? (
          <View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/images/success.png")}
                style={{ height: 150, width: 150, marginVertical: 10 }}
              />
            </View>

            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
            >
              Congratulations! purchase was successful
            </Text>
          </View>
        ) : modalType === "changeLocation" ? (
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <ChangeLocation
              placeholder={placeholder}
              showList={showList}
              suggestionListData={suggestionListData}
              onPressItem={onPressItem}
              handleSearchTextChange={handleSearchTextChange}
            />
            <TouchableOpacity
              style={{
                marginTop: 30,
                backgroundColor: "#049bd6",
                paddingVertical: 10,
                paddingHorizontal: 15,
                width: "40%",
                borderRadius: 5,
              }}
              onPress={() => handleMyLocation("success")}
            >
              <Text style={{ color: "#FFF", textAlign: "center" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ModalPopup>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    position: "relative",
  },
  item: {
    position: "relative",
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 5,
    elevation: 5,
    shadowColor: "#000",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    flex: 2,
    width: "100%",
    height: "100%",
    marginRight: 20,
  },
  itemContent: {
    flex: 8,
  },
  itemName: {
    fontSize: 20,
    color: "#000",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 15,
    color: "#049bd6",
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 21,
    color: "#000",
  },
  removeItemBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  changeItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width / 4,
  },
  checkOutCotainer: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "#FFF",
    elevation: 1,
    shadowColor: "#CCC",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  checkoutBtn: {
    backgroundColor: "#3ecd66",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  total: {
    flex: 3,
  },
  header: {
    width: "100%",
    height: 30,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
