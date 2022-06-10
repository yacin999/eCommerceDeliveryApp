import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const ChangeLocationScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <ModalPopup visible={modalVisible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                source={require("../assets/images/x.png")}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/images/success.png")}
            style={{ height: 150, width: 150, marginVertical: 10 }}
          />
        </View>

        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}>
          Congratulations! purchase was successful
        </Text>
      </ModalPopup>
    </View>
  );
};

export default ChangeLocationScreen;

const styles = StyleSheet.create({});
