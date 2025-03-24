import { FlatList, Pressable, Text, View } from "react-native";
import { styles } from "@/styles/home.styles";
import { Link, useRouter } from "expo-router";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/wrapper/query-provider";
import { useEffect } from "react";

const Homepage = () => {
  const router = useRouter();
  const user = useMainStore((state) => state.user);

  const { data: exams, error } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  useEffect(() => {
    if (exams) {
      console.log(exams);
      console.log(user);
    }
    if (error) {
      console.log(error);
    }
  }, [exams, error]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Welcome {user.name}</Text>
      </View>
      <FlatList
        data={exams}
        renderItem={({ item }) => {
          <View style={{ flex: 1 }} key={item.id}>
            <Text>{item.title}</Text>
          </View>;
        }}
      />
      <Link href="/login">Login</Link>
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
