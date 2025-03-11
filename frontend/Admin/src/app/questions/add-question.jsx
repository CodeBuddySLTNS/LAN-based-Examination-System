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
import {
  AlertCircle,
  CheckCircle,
  Plus,
  PlusIcon,
  PlusSquareIcon,
  XSquareIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Switch } from "@/components/ui/switch";

const schema = Joi.object({
  subject: Joi.string().label("Subject").required(),
  question: Joi.string().label("Question").required(),
  questionType: Joi.string().label("Question Type").required(),
  choices: Joi.array().items(Joi.string().allow("")).label("Choices"),
  correctAnswer: Joi.array()
    .items(Joi.string().allow(""))
    .label("Correct Answer")
    .required(),
});

export const AddQuestion = () => {
  const [questionType, setQuestionType] = React.useState(null);
  const [choicesCount, setChoicesCount] = React.useState(4);
  const [answersCount, setAnswersCount] = React.useState(1);
  const [isMultipleAnswer, setIsMultipleAnswer] = React.useState(false);

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
  } = useForm({ resolver: joiResolver(schema) });
  console.log(errors);
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
                <Label>Subject</Label>
                <Select onValueChange={(value) => setValue("subject", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="GPRH">Philippine History</SelectItem>
                      <SelectItem value="SDP104">
                        Skills Development Program
                      </SelectItem>
                      <SelectItem value="PATHFit4">Team Sports</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors?.subject && (
                  <p className="text-[0.8rem] font-normal text-red-600 flex items-center gap-1">
                    {errors?.subject?.message}
                  </p>
                )}
              </div>

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
                  onValueChange={(value) => {
                    setValue("questionType", value);
                    setQuestionType(value);
                  }}
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
                {errors?.questionType && (
                  <p className="text-[0.8rem] font-normal text-red-600 flex items-center gap-1">
                    {errors?.questionType?.message}
                  </p>
                )}
              </div>

              {questionType === "multiple_choice" && (
                <div className="flex flex-col gap-3">
                  <Label>Choices</Label>
                  <Card className="p-4.5 gap-3">
                    {Array.from({ length: choicesCount }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <p className="text-nowrap">Option {i + 1}</p>
                        <Input {...register(`choices[${i}]`)} required />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setChoicesCount((prev) => prev + 1)}
                      >
                        <PlusSquareIcon className="text-green-600" />
                        Add 1 option
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                          setChoicesCount((prev) =>
                            prev > 1 ? prev - 1 : prev
                          )
                        }
                      >
                        <XSquareIcon className="text-red-600" />
                        Remove 1 option
                      </Button>
                    </div>
                  </Card>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="correctAnswer"
                  className="flex items-center gap-3 justify-between"
                >
                  Correct Answer(s)
                  <div className="flex items-center gap-3">
                    <p>Multiple</p>
                    <Switch
                      checked={isMultipleAnswer}
                      onCheckedChange={setIsMultipleAnswer}
                    />
                  </div>
                </Label>
                {isMultipleAnswer ? (
                  <Card className="p-4.5 gap-3">
                    {Array.from({ length: answersCount }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <p className="text-nowrap">Answer {i + 1}</p>
                        <Input {...register(`correctAnswer[${i}]`)} required />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setAnswersCount((prev) => prev + 1)}
                      >
                        <PlusSquareIcon className="text-green-600" />
                        Add 1 answer
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                          setAnswersCount((prev) =>
                            prev > 1 ? prev - 1 : prev
                          )
                        }
                      >
                        <XSquareIcon className="text-red-600" />
                        Remove 1 answer
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Input
                    {...register("correctAnswer[0]")}
                    placeholder="Type the correct answer here."
                    id="correctAnswer"
                    required
                  />
                )}
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
