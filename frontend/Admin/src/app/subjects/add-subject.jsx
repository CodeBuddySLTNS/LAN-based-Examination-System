import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Axios } from "@/lib/utils";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "sonner";

const schema = Joi.object({
  courseCode: Joi.string().label("Course Code").required(),
  subjectName: Joi.string().label("Subject Name").required(),
});

export const AddSubject = () => {
  const postRequest = async (data) => {
    const token = localStorage.getItem("token");
    const response = await Axios.post("/subjects/add", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { mutateAsync: addSubject, isPending } = useMutation({
    mutationFn: postRequest,
    onSuccess: () => {
      toast.success("Subject added succesfully.");
      reset();
    },
    onError: (error) => {
      if (error?.response?.data?.body?.code === "ER_DUP_ENTRY") {
        return toast.error("This subject already exists.");
      }
      if (error?.response?.data?.message) {
        return toast.error(error.response.data.message);
      }
      toast.error("Unable to add this subject.");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    try {
      addSubject(data);
    } catch (error) {}
  };

  return (
    <div className="p-6 pt-3">
      <Card>
        <CardHeader>
          <CardTitle>Add New Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="courseCode"
                  className="flex items-center gap-3 justify-between"
                >
                  Course Code
                </Label>
                <Input
                  {...register("courseCode")}
                  placeholder="Type the course code here."
                  id="courseCode"
                  required
                />

                {errors?.courseCode?.message && (
                  <p className="text-sm text-red-600">
                    {errors.courseCode.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="name"
                  className="flex items-center gap-3 justify-between"
                >
                  Subject Name
                </Label>
                <Input
                  {...register("subjectName")}
                  placeholder="Type subject name here."
                  id="name"
                  required
                />

                {errors?.name?.message && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>
            <Button disabled={isPending} type="submit" className="w-full mt-5">
              {isPending ? "Processing.." : "Add Subject"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSubject;
