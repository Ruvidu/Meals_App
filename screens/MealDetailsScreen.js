import React, { useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";
import CustomHeaderButton from "../components/HeaderButton";
import { toggleFavorite } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

export default function MealDetailsScreen(props) {
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = props.navigation.getParam("mealId");
  const currentMealIsFav = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  const selectedmeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavHandler });
  }, [toggleFavHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFav });
  }, [currentMealIsFav]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedmeal.imageUrl }} style={styles.image} />
      <View style={styles.detail}>
        <DefaultText>{selectedmeal.duration}m</DefaultText>
        <DefaultText>{selectedmeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedmeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedmeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedmeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
}

MealDetailsScreen.navigationOptions = (navigationData) => {
  //const mealId = navigationData.navigation.getParam("mealId");
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const isFav = navigationData.navigation.getParam("isFav");

  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFav ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  detail: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});
