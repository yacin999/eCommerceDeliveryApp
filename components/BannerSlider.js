import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import ViewSlider from "../components/ViewSlider";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

function BannerSlider(props) {
  return (
    <ViewSlider
      renderSlides={
        <>
          <View style={styles.viewBox}>
            <TouchableOpacity onPress={() => alert("hii")}>
              <Image
                style={[styles.bannerImage, { height: 200, width }]}
                source={{
                  uri: "https://paytm.com/offers/img/addmoneyupiMob.jpg",
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.viewBox}>
            <Image
              style={[styles.bannerImage, { height: 200, width }]}
              source={{
                uri: "https://images-eu.ssl-images-amazon.com/images/G/31/img17/Pantry/MARCH_2020/SVD_Teaser/Desktop_Teaser_Header.jpg",
              }}
            />
          </View>
          <View style={styles.viewBox}>
            <Image
              style={[styles.bannerImage, { height: 200, width }]}
              source={{
                uri: "https://dog55574plkkx.cloudfront.net/images/big-bazaar-todays-offers.png",
              }}
            />
          </View>
        </>
      }
      style={styles.slider} //Main slider container style
      height={180} //Height of your slider
      slideCount={3} //How many views you are adding to slide
      dots={true} // Pagination dots visibility true for visibile
      dotActiveColor="#27AE60" //Pagination dot active color
      dotInactiveColor="gray" // Pagination do inactive color
      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
      autoSlide={true} //The views will slide automatically
      slideInterval={3000} //In Miliseconds
    />
  );
}
const styles = StyleSheet.create({
  viewBox: {
    paddingHorizontal: 20,
    justifyContent: "center",
    width: width,
    alignItems: "center",
    height: "100%",
  },
  slider: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  dotContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
  },
});

export default BannerSlider;
