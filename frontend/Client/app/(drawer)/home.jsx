import { FlatList, Text, View } from "react-native";
import { styles } from "@/styles/home.styles";
import { Link, useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";

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
      <View style={styles.welcomeContainer}>
        <Text style={styles.text}>Welcome {user.name}</Text>
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
