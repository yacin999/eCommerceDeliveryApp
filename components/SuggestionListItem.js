import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function SuggestionListItem(props) {
  return (
    <TouchableOpacity onPress={() => props.onPressItem(props.item)}>
      <View style={styles.searchListItem}>
        <View style={styles.searchListItemIcon}>
          <FontAwesome5 name="map-marker-alt" size={20} color={"#000"} />
        </View>
        <View>
          <Text style={styles.searchListItemTitle}>{props.item.p1}</Text>
          {props.item.p2 && props.item.p3 ? (
            <Text>
              {props.item.p2} {props.item.p3}
            </Text>
          ) : null}
          {props.item.p2 && !props.item.p3 ? (
            <Text>{props.item.p2}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchListItemIcon: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  searchListItem: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
  },
  searchListItemTitle: {
    fontWeight: "bold",
  },
});
