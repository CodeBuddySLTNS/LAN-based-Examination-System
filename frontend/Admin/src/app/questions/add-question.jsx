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

const schema = Joi.object({});

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
          <CardTitle>Add Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6"></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddQuestion;
