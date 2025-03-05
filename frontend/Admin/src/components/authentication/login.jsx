import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Axios } from "@/lib/utils";
import { useMainStore } from "@/states/store";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export default function Page({ setForm }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {}
  };

  const postRequest = async (credentials) => {
    const response = await Axios.post("/auth/login", credentials);
    return response.data;
  };

  const {
    mutateAsync: login,
    data,
    error,
    isPending,
  } = useMutation({
    mutationFn: postRequest,
    onError: (error) => {
      // console.log(error);
    },
  });

  React.useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.token);
      useMainStore.getState().setIsLoggedIn(true);
      useMainStore.getState().setIsLoading(true);
      setTimeout(() => {
        useMainStore.getState().setIsLoading(false);
      }, 1000);
    }
  }, [data]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-center text-2xl">
                Welcome Back!
              </CardTitle>
              <CardDescription>
                Enter your credentials below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      {...register("username")}
                      id="username"
                      type="text"
                      required
                    />
                    {error?.response?.data?.body?.username && (
                      <p className="text-sm font-normal text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-[17px]" /> User not found
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      {...register("password")}
                      id="password"
                      type="password"
                      required
                    />
                    {error?.response?.data?.body?.password && (
                      <p className="text-sm font-normal text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-[17px]" /> Incorrect password
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      {isPending ? "Logging in..." : "Login"}
                    </Button>
                    {error?.code === "ERR_NETWORK" && (
                      <p className="text-sm font-normal text-red-600 flex justify-center items-center gap-1">
                        <AlertCircle className="w-[17px]" /> Unable to connect
                        to the server
                      </p>
                    )}
                    {error?.response?.data?.status === 500 && (
                      <p className="text-sm font-normal text-red-600 flex justify-center items-center gap-1">
                        <AlertCircle className="w-[17px]" /> Internal server
                        error
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <p
                    className="underline underline-offset-4"
                    onClick={() => setForm((prev) => !prev)}
                  >
                    Sign up
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
