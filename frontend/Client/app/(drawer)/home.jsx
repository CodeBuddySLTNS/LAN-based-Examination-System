import { FlatList, Text, View } from "react-native";
import { styles } from "@/styles/home.styles";
import { Link, useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/wrapper/query-provider";

const Homepage = () => {
  const router = useRouter();
  const user = useMainStore((state) => state.user);

  const { data: exams, error } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Welcome g {user.name}</Text>
      </View>

      <Link href="/login" style={{ fontFamily: "Nunito-Regular" }}>
        Login
      </Link>
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
