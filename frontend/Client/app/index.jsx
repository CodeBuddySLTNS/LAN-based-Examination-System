import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import PokemonCard from "./components/PokemonCard";

const index = () => {
  const pokemons = [
    {
      name: "Charmander",
      image: require("@/assets/images/charmander.png"),
      type: "Fire",
      hp: 39,
      moves: ["Scratch", "Ember", "Growl", "Leer"],
      weaknesses: ["Water", "Rock"],
    },
    {
      name: "Bulbasaur",
      image: require("@/assets/images/bulbasaur.png"),
      type: "Grass",
      hp: 45,
      moves: ["Tackle", "Vine Whip", "Growl", "Leech Seed"],
      weaknesses: ["Fire", "Ice", "Flying", "Physic"],
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contents}>
        <PokemonCard {...pokemons[0]} />
        <PokemonCard {...pokemons[1]} />
        <PokemonCard {...pokemons[1]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contents: {},
});
