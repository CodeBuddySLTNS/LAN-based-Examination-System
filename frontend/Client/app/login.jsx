import { useMainStore, useSocketStore } from "@/states/store";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Button, Text, ToastAndroid, View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { useToast } from "@/components/ui/toast";

const LoginPage = () => {
  const [formdata, setFormdata] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: Axios2("/auth/login", "POST"),
    onError: (e) => {
      console.log(e);
      if (e.response.data.message)
        return ToastAndroid.show(e.response.data.message, ToastAndroid.LONG);
      ToastAndroid.showWithGravity(
        "Unable to connect to the server.",
        ToastAndroid.LONG
      );
    },
    onSuccess: (d) => {
      SecureStore.setItemAsync("token", d.token);
      useMainStore.getState().setUser(d.user);
      useSocketStore.getState().initializeSocket(d.user, toast, router);
      router.push("/(drawer)/home");
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
    usernameRef.current.blur();
    passwordRef.current.blur();

    if (validateForm()) {
      try {
        await login(formdata);
        setFormdata({ username: "", password: "" });
        setErrors({});
      } catch (e) {}
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Card className="w-[80%] gap-2 rounded-md elevation-md pb-4">
        <Text className="font-Nunito-Bold text-xl text-center">
          CodeBuddy Exam
        </Text>
        <VStack className="gap-0.5">
          <Text className="font-Nunito-SemiBold pl-0.5 mb-1">Username</Text>
          <Input>
            <InputField
              ref={usernameRef}
              className="font-Nunito-Regular"
              placeholder="Enter your username"
              value={formdata.username}
              onChangeText={(text) =>
                setFormdata((prev) => ({ ...prev, username: text }))
              }
            />
          </Input>
          {errors.username && (
            <Text className="font-Nunito-Regular text-red-600">
              {errors.username}
            </Text>
          )}
        </VStack>
        <VStack className="gap-0.5 mb-2">
          <Text className="font-Nunito-SemiBold pl-0.5 mb-1">Password</Text>
          <Input>
            <InputField
              type={showPassword ? "text" : "password"}
              ref={passwordRef}
              className="font-Nunito-Regular"
              placeholder="Enter your password"
              onChangeText={(text) =>
                setFormdata((prev) => ({ ...prev, password: text }))
              }
            />
            <InputSlot
              className="pr-3"
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <FontAwesome
                name={showPassword ? "eye-slash" : "eye"}
                size={19}
                color="gray"
              />
            </InputSlot>
          </Input>
          {errors.password && (
            <Text className="font-Nunito-Regular text-red-600">
              {errors.password}
            </Text>
          )}
        </VStack>
        <Button
          title={isPending ? "Logging in..." : "Login"}
          disabled={isPending}
          onPress={handleSubmit}
        />
      </Card>
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
