import { FlatList, Text, View } from "react-native";
import { styles } from "@/styles/home.styles";
import { Link, useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
import { Badge, BadgeText } from "@/components/ui/badge";
import Entypo from "@expo/vector-icons/Entypo";

const dummyuser = {
  id: 1,
  name: "Lansano, Leo P.",
  username: "leo",
  department: "BSIT",
  year: 3,
  role: "user",
};

const Homepage = () => {
  const router = useRouter();
  const user = useMainStore((state) => state.user) || dummyuser;

  const { data: exams, error } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  return (
    <View style={styles.container}>
      <View className="">
        <Text className="">
          Magandang umaga, {user.username}{" "}
          <Entypo name="emoji-happy" size={24} color="black" />
        </Text>

        <View className="">
          <Text className="">
            "Believe in yourself, and all that you are. Know that there is
            something inside you that is greater than any obstacle." – Christian
            D. Larson
          </Text>
        </View>
      </View>
    </View>
  );
};

const Home = () => {
  return (
    <QueryProvider>
      <Homepage />
    </QueryProvider>
  );
};

export default Home;
