import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { ProductsContext } from "../components/context";

const ItemList = ({ item }) => {
  const [productsContext, UserPurchaseState] = useContext(ProductsContext);
  const { addProduct } = productsContext;
  return (
    <View style={styles.item}>
      <Image
        style={styles.itemImage}
        source={{
          uri: `${item.image}`,
        }}
      />
      <Text style={styles.title}>{item.name}</Text>
      <TouchableOpacity style={styles.cartBtn} onPress={() => addProduct(item)}>
        <Text style={styles.btnText}>Add To Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    // backgroundColor: "red",
    marginVertical: 8,
    marginHorizontal: 16,
    width: Dimensions.get("window").width / 2,
    borderRadius: 5,
    elevation: 5,
    shadowColor: "#000",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    color: "#000",
    marginBottom: 10,
  },
  cartBtn: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    backgroundColor: "#44c062",
    borderRadius: 26,
  },
  btnText: {
    color: "#FFF",
  },
});
