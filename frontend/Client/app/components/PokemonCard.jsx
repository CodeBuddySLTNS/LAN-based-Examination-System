import { Image, StyleSheet, Text, View } from "react-native";

const PokemonCard = ({ name, hp, image, type, moves, weaknesses }) => {
  return (
    <View style={styles.card}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.hp}>♥{hp}</Text>
      </View>

      <Image
        style={styles.image}
        source={image}
        accessibilityLabel={`${name} pokemon`}
        resizeMode="contain"
      />

      <View style={styles.typeContainer}>
        <View style={styles.badge}>
          <Text style={styles.emoji}>🔥</Text>
          <Text style={styles.type}>{type}</Text>
        </View>
      </View>

      <View style={styles.movesContainer}>
        <Text style={styles.moves}>Moves: {moves.join(", ")}</Text>
      </View>

      <View style={styles.weaknessesContainer}>
        <Text style={styles.weaknesses}>
          Weaknesses: {weaknesses.join(", ")}
        </Text>
      </View>
    </View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: "plum",
  },

  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  hp: {
    fontSize: 18,
    fontWeight: "semi-bold",
  },

  image: {
    width: "100%",
    height: 200,
    marginVertical: 15,
  },

  typeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    padding: 5,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 10,
    gap: 5,
  },
  emoji: {},
  type: {
    fontWeight: "bold",
  },

  movesContainer: {},
  moves: { fontSize: 18, fontWeight: "bold", marginVertical: 5, marginTop: 10 },
  weaknessesContainer: {},
  weaknesses: { fontSize: 18, fontWeight: "bold", marginVertical: 5 },
});
