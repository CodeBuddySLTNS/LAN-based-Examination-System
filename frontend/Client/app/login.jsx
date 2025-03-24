import { useMainStore } from "@/states/store";
import { styles } from "@/styles/auth.styles";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/wrapper/query-provider";

const LoginPage = () => {
  const [formdata, setFormdata] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const { mutateAsync: login } = useMutation({
    mutationFn: Axios2("/auth/login", "POST"),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (d) => {
      console.log(d);
      SecureStore.setItemAsync("token", d.token);
      useMainStore.getState().setUser(d.user);
      router.dismissAll();
      router.replace("/home");
    },
  });

  const validateForm = () => {
    const errors = {};

    if (!formdata.username) errors.username = "username is required.";
    if (!formdata.password) errors.password = "password is required.";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await login(formdata);
        setFormdata({ username: "", password: "" });
        setErrors({});
      } catch (e) {}
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginForm}>
        <Text style={styles.formTitle}>CodeBuddy Exam</Text>
        <View style={styles.inputField}>
          <Text style={styles.inputLabel}>username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={formdata.username}
            onChangeText={(text) =>
              setFormdata((prev) => ({ ...prev, username: text }))
            }
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}
        </View>
        <View style={styles.inputField}>
          <Text style={styles.inputLabel}>password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            secureTextEntry
            value={formdata.password}
            onChangeText={(text) =>
              setFormdata((prev) => ({ ...prev, password: text }))
            }
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>
        <Button title="Login" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const Login = () => {
  return (
    <QueryProvider>
      <LoginPage />
    </QueryProvider>
  );
};

export default Login;
