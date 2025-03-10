import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Axios } from "@/lib/utils";
import { AlertCircle, CheckCircle } from "lucide-react";

const schema = Joi.object({
  lastname: Joi.string().label("Last Name").required(),
  firstname: Joi.string().label("First Name").required(),
  middlename: Joi.string().label("Middle Name").required(),
  department: Joi.string().label("Department").required(),
  year: Joi.number().label("Year").required(),
  username: Joi.string().max(15).label("Username").required(),
  password: Joi.string().min(3).label("Password").required(),
});

export const AddQuestion = () => {
  const postRequest = async (user) => {
    const token = localStorage.getItem("token");
    const response = await Axios.post("/auth/signup", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const {
    mutateAsync: signup,
    data,
    isPending,
    error,
  } = useMutation({
    mutationFn: postRequest,
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    const user = {
      name: `${data.lastname}, ${data.firstname} ${data.middlename[0]}.`,
      username: data.username,
      password: data.password,
      department: data.department,
      year: data.year,
    };

    try {
      await signup(user);
    } catch (error) {}
  };

  React.useEffect(() => {
    if (data) reset();
  }, [data]);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-2">
                <div className="grid gap-3">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    {...register("lastname")}
                    id="lastname"
                    type="text"
                    required
                  />
                  {errors?.lastname && (
                    <p className="text-[0.8rem] font-normal text-red-600 flex items-center gap-1">
                      {errors?.lastname?.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    {...register("firstname")}
                    id="firstname"
                    type="text"
                    required
                  />
                  {errors?.firstname && (
                    <p className="text-[0.8rem] font-normal text-red-600 flex items-center gap-1">
                      {errors?.firstname?.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="middlename">Middle Name</Label>
                  <Input
                    {...register("middlename")}
                    id="middlename"
                    type="text"
                    required
                  />
                  {errors?.middlename && (
                    <p className="text-[0.8rem] font-normal text-red-600 flex items-center gap-1">
                      {errors?.middlename?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-3">
                  <Label>Department</Label>
                  <Select
                    onValueChange={(value) => setValue("department", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="BSCS">BSCS</SelectItem>
                        <SelectItem value="BSSW">BSSW</SelectItem>
                        <SelectItem value="BSIT">BSIT</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors?.department && (
                    <p className="text-[0.8rem] font-normal text-red-600 flex items-center gap-1">
                      {errors?.department?.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    {...register("year")}
                    id="year"
                    type="number"
                    min="1"
                    max="4"
                    required
                  />
                  {errors?.year && (
                    <p className="text-[0.8rem] font-normal text-red-600 flex items-center gap-1">
                      {errors?.year?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...register("username")}
                  id="username"
                  type="text"
                  required
                />
                {errors?.username && (
                  <p className="text-[0.8rem] font-normal text-red-600 flex items-center gap-1">
                    {errors?.username?.message}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  required
                />
                {errors?.password && (
                  <p className="text-[0.8rem] font-normal text-red-600 flex items-center gap-1">
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isPending ? "Processing..." : "Add Account"}
                </Button>
                {error?.code === "ERR_NETWORK" && (
                  <p className="text-sm font-normal text-red-600 flex justify-center items-center gap-1">
                    <AlertCircle className="w-[17px]" /> Unable to connect to
                    the server.
                  </p>
                )}
                {error?.response?.data?.status === 500 && (
                  <p className="text-sm font-normal text-red-600 flex justify-center items-center gap-1">
                    <AlertCircle className="w-[17px]" /> Internal Server Error
                  </p>
                )}
                {data && (
                  <p className="text-sm font-normal text-green-600 flex justify-center items-center gap-1">
                    <CheckCircle className="w-[17px]" /> Added Successfully
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddQuestion;
