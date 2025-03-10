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
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Axios } from "@/lib/utils";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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
    mutateAsync: addQuestion,
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
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    // try {
    //   await addQuestion(user);
    // } catch (error) {}
  };

  React.useEffect(() => {
    if (data) reset();
  }, [data]);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label htmlFor="question">Question</Label>
                <Textarea
                  {...register("question")}
                  placeholder="Type your question here."
                  id="question"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Question Type</Label>
                <Select
                  onValueChange={(value) => setValue("questionType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="multiple_choice">
                        Multiple Choice
                      </SelectItem>
                      <SelectItem value="identification">
                        Identification
                      </SelectItem>
                      <SelectItem value="enumeration">Enumeration</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="question">Choices</Label>
                <Textarea
                  {...register("question")}
                  placeholder="Type your question here."
                  id="question"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="correctAnswer">Correct Answer</Label>
                <Input {...register("correctAnswer")} id="correctAnswer" />
              </div>
            </div>
            <Button type="submit" className="w-full mt-5">
              Add Question
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddQuestion;
