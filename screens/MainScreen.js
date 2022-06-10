import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
// import AppStatusBar from "../components/AppStatusBar";
import { Dimensions } from "react-native";

// import ToolBar from "../components/ToolBar";

import { TouchableOpacity } from "react-native-gesture-handler";
// import Icon from "react-native-feather1s";
// import BadgeIcon from "../components/BadgeIcon";
import BannerSlider from "../components/BannerSlider";
import Loading from "../components/Loading";
import ItemList from "../components/ItemList";

// import { CategoryImage } from "../axios/ServerRequest";

import SearchBar from "../components/SearchBar";
import Offer1 from "../assets/images/offer1.jpg";
import Offer2 from "../assets/images/offer2.jpg";
import axios from "axios";

const MainScreen = ({ navigation }) => {
  const loading = useRef();
  const [state, setState] = useState({
    loading: true,
    categoryData: [],
    popularProduct: [],
    newProduct: [],
    selected: false,
    cartCount: 0,
    cartList: [],
    showSearch: false,
    searchData: [],
    searchText: "",
  });
  const [newProducts, setNewProducts] = useState([]);

  const renderItem = ({ item }) => {
    // console.log("testing Item object :", item);
    return <ItemList item={item} />;
  };

  useEffect(() => {
    // reRenderSomething = navigation.addListener('focus', () => {
    //     this.init();
    // });
    const categories = [
      {
        categry: "laptop",
        cateimg: "",
      },
      {
        categry: "toys",
        cateimg: "",
      },
      {
        categry: "video games",
        cateimg: "",
      },
      {
        categry: "clothes",
        cateimg: "",
      },
      {
        categry: "books",
        cateimg: "",
      },
      {
        categry: "smartphone",
        cateimg: "",
      },
      {
        categry: "shoes",
        cateimg: "",
      },
    ];
    // loading.current.show();
    axios
      .get("api/products/")
      .then((res) => {
        // console.log("res from store", res.data);
        setNewProducts(res.data);
        // loading.current.close();
      })
      .catch((err) => {
        console.log("error from stare", err);
        // loading.current.close();
      });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollView}>
          <View>
            <BannerSlider />
            <View style={styles.categoryMainContainer}>
              <View style={styles.categoryHeaderContainer}>
                <Text style={styles.title}>All Categories</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Category");
                  }}
                >
                  <Text style={styles.subtitle}>View All</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {state.categoryData ? (
                  state.categoryData.slice(0, 7).map((item, index) => {
                    return (
                      <View style={styles.categoryDetailsContainer} key={index}>
                        <TouchableOpacity activeOpacity={1}>
                          <View style={styles.categoryContainer}>
                            <Image
                              source={{
                                uri: `${CategoryImage + item.cateimg}`,
                              }}
                              style={{
                                height: 65,
                                width: 65,
                                resizeMode: "cover",
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <Text style={styles.catTitle}>{item.categry}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })
                ) : (
                  <ActivityIndicator size="large" />
                )}
              </ScrollView>
            </View>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Text style={styles.title}>New Products</Text>
            </View>
            <FlatList
              style={{ marginLeft: 10 }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              key={"flatlist"}
              data={newProducts}
              renderItem={renderItem}
            />

            <ScrollView horizontal={true}>
              <View
                style={{ display: "flex", flexDirection: "row", padding: 10 }}
              >
                <Image
                  source={Offer1}
                  style={{
                    width: Dimensions.get("window").width - 70,
                    resizeMode: "contain",
                    borderRadius: 10,
                  }}
                />
                <Image
                  source={Offer2}
                  style={{
                    width: Dimensions.get("window").width - 70,
                    resizeMode: "contain",
                    marginLeft: 20,
                    borderRadius: 10,
                  }}
                />
              </View>
            </ScrollView>

            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Text style={styles.title}>Popular Products</Text>
            </View>
            <FlatList
              style={{ marginLeft: 10 }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              key={"flatlist1"}
              data={state.popularProduct}
              renderItem={({ item, index }) => renderProductItem(item, index)}
              keyExtractor={(item) => item.id}
              extraData={state}
            />
          </View>
        </ScrollView>
      </View>
      {state.showSearch ? (
        <View style={styles.searchContainer}>
          <SearchBar
            onChangeText={(text) => onchangeSearchText(text)}
            onClose={() => {
              setState({ showSearch: false, searchData: [] });
            }}
            data={state.searchData}
          />

          <FlatList
            key={"flatlist3"}
            data={state.searchData}
            renderItem={({ item, index }) =>
              renderSearchProductItem(item, index)
            }
            keyExtractor={(item) => item.id}
            extraData={props}
          />
        </View>
      ) : null}

      <Loading ref={loading} indicatorColor={"blue"} />
    </View>
  );
};

export default MainScreen;

const BAR_HEIGHT = Platform.OS === "ios" ? 35 : StatusBar.currentHeight;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "column",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "column",
  },
  categoryMainContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 20,
    flexDirection: "column",
  },
  categoryHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  categoryContainer: {
    height: 75,
    width: 75,
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  categoryDetailsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  title: {
    fontFamily: "sans-serif",
    color: "#000",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontFamily: "sans-serif",
    color: "#5A5858",
    fontSize: 12,
    marginLeft: 10,
  },
  catTitle: {
    fontFamily: "sans-serif",
    color: "#000",
    fontSize: 12,
    width: 80,
    height: 35,
    textAlign: "center",
    marginLeft: 10,
  },
  searchContainer: {
    marginTop: BAR_HEIGHT,
    width: "100%",
    backgroundColor: "#ffffff",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemContainer: {
    marginTop: 10,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
