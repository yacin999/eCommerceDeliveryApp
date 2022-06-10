import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useReducer, useMemo, useState } from "react";
import MainTapScreen from "../screens/MainTapScreen";
import DrawerContent from "../components/DrawerContent";
import Profile from "../screens/Profile";
import SettingsScreen from "../screens/SettingsScreen";
import CartScreen from "../screens/CartScreen";
import { ProductsContext } from "../components/context";
import ChangeLocationScreen from "../screens/ChangeLocationScreen";

const Drawer = createDrawerNavigator();
const CustomerDrawerNavigator = () => {
  const [totalPurchase, setTotalPurchase] = useState(0);
  const InitUserPurchaseState = [];

  const calculateTotal = (state) => {
    let total = 0;
    state.forEach((item) => {
      total += item.product.price * item.itemQuanity;
    });
    setTotalPurchase(total);
  };

  const Purchasereducer = (state, action) => {
    let finalState = [];
    switch (action.type) {
      case "ADD_PRODUCT":
        finalState = [...state, { product: action.item, itemQuanity: 1 }];
        calculateTotal(finalState);
        return finalState;
      case "DELETE_PRODUCT":
        finalState = [...state.filter((item) => item.product.id !== action.id)];
        calculateTotal(finalState);
        return finalState;
      case "INCREMENT_ITEM":
        let indexIncrementedItem = null;
        let incrementedItem = null;
        state.forEach((item, index) => {
          if (item.product.id === action.id) {
            indexIncrementedItem = index;
            incrementedItem = item;
            return;
          }
        });
        finalState = state.filter((item) => item.product.id !== action.id);
        finalState.splice(indexIncrementedItem, 0, {
          product: action.item,
          itemQuanity: incrementedItem.itemQuanity + 1,
        });
        calculateTotal(finalState);
        return finalState;
      case "DECREMENT_ITEM":
        let indexDecrementedItem = null;
        let decrementedItem = null;
        if (action.quantity > 1) {
          state.forEach((item, index) => {
            if (item.product.id === action.id) {
              indexDecrementedItem = index;
              decrementedItem = item;
              return;
            }
          });
          finalState = state.filter((item) => item.product.id !== action.id);
          finalState.splice(indexDecrementedItem, 0, {
            product: action.item,
            itemQuanity: decrementedItem.itemQuanity - 1,
          });
          calculateTotal(finalState);
          return finalState;
        } else {
          return state;
        }
      default:
        return state;
    }
  };

  const [UserPurchaseState, dispatch] = useReducer(
    Purchasereducer,
    InitUserPurchaseState
  );

  const productsContext = {
    addProduct: (item) => {
      dispatch({ type: "ADD_PRODUCT", item: item });
      // calculateTotal();
    },
    deleteProduct: (item) => {
      dispatch({ type: "DELETE_PRODUCT", id: item.product.id });
      // calculateTotal();
    },
    incrementItem: (item) => {
      dispatch({
        type: "INCREMENT_ITEM",
        id: item.product.id,
        item: item.product,
      });
      // calculateTotal();
    },
    decrementItem: (item) => {
      dispatch({
        type: "DECREMENT_ITEM",
        id: item.product.id,
        item: item.product,
        quantity: item.itemQuanity,
      });
    },
  };

  return (
    <ProductsContext.Provider
      value={[productsContext, UserPurchaseState, totalPurchase]}
    >
      <Drawer.Navigator
        initialRouteName="main"
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="Home Customer" component={MainTapScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Cart" component={CartScreen} />
        {/* <Drawer.Screen name="ChangeLocation" component={ChangeLocationScreen} /> */}
      </Drawer.Navigator>
    </ProductsContext.Provider>
  );
};

export default CustomerDrawerNavigator;
