import React from "react";
import MealList from "../components/MealList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";

export default function FavoritesScreen(props) {
  const availableMeals = useSelector((state) => state.meals.favoriteMeals);

  if (availableMeals.length === 0 || !availableMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorites found.</DefaultText>
      </View>
    );
  }

  return <MealList listData={availableMeals} navigation={props.navigation} />;
}

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Favorites",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
