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

import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Axios, Axios2, cn } from "@/lib/utils";
import {
  Check,
  ChevronsUpDown,
  PlusSquareIcon,
  XSquareIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

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
  const [isSubjectOptions, setIsSubjectOptions] = useState(false);
  const [subjectOptionValue, setSubjectOptionValue] = useState("");
  const [questionType, setQuestionType] = useState(null);
  const [choicesCount, setChoicesCount] = useState(4);
  const [answersCount, setAnswersCount] = useState(1);
  const [isMultipleAnswer, setIsMultipleAnswer] = useState(false);
  const [isValidCorrectAnswer, setIsValidCorrectAnswer] = useState(true);

  const { mutateAsync: addquestion, isPending } = useMutation({
    mutationFn: Axios2("/questions/add", "POST"),
    onSuccess: (data) => {
      toast.success("Question added succesfully.");
      resetForm();
    },
    onError: (error) => {
      if (error?.response?.data?.body?.code === "ER_DUP_ENTRY") {
        return toast.error("This question already exists.");
      }
      toast.error("Unable to add this question.");
    },
  });

  const { data: subjectOptions } = useQuery({
    queryKey: ["subjectOptions"],
    queryFn: Axios2("/subjects", "GET"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    data.choices = data.choices || [];
    let valid = false;

    if (data.questionType === "multiple_choice") {
      for (let i = 0; i < data.choices.length; i++) {
        for (let x = 0; x < data.correctAnswer.length; x++) {
          if (data.choices[i] === data.correctAnswer[x]) {
            valid = true;
          }
        }
      }
    }

    if (valid || data.questionType !== "multiple_choice") {
      try {
        await addquestion(data);
      } catch (error) {}

      setIsValidCorrectAnswer(true);
    } else {
      setIsValidCorrectAnswer(false);
    }
  };

  const resetForm = () => {
    reset();
    setSubjectOptionValue("");
    setQuestionType(null);
    setChoicesCount(4);
    setAnswersCount(1);
    setIsMultipleAnswer(false);
    setIsValidCorrectAnswer(true);
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
                <Label>Subject</Label>
                <Popover
                  open={isSubjectOptions}
                  onOpenChange={setIsSubjectOptions}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {subjectOptionValue
                        ? subjectOptions?.find(
                            (subject) =>
                              subject.course_code === subjectOptionValue
                          )?.name
                        : "Select subject..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[auto] p-0">
                    <Command>
                      <CommandInput placeholder="Search subject..." />
                      <CommandList>
                        <CommandEmpty>No subject found.</CommandEmpty>
                        <CommandGroup>
                          {subjectOptions?.map((subject) => (
                            <CommandItem
                              key={subject.course_code}
                              value={subject.course_code}
                              onSelect={(currentValue) => {
                                setSubjectOptionValue(
                                  currentValue === subjectOptionValue
                                    ? ""
                                    : currentValue
                                );
                                setValue("subject", currentValue);
                                setIsSubjectOptions(false);
                              }}
                            >
                              {subject.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  subjectOptionValue === subject.course_code
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                  value={questionType}
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
                    <p>Multiple Answers</p>
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
                    onChange={(e) => {
                      setValue("correctAnswer[0]", e.target.value);
                      setIsValidCorrectAnswer(true);
                    }}
                    placeholder="Type the correct answer here."
                    id="correctAnswer"
                    required
                  />
                )}
                {!isValidCorrectAnswer && (
                  <p className="text-sm text-red-600">
                    The correct answer(s) you provided doesn't match any of the
                    given choices.
                  </p>
                )}
              </div>
            </div>
            <Button disabled={isPending} type="submit" className="w-full mt-5">
              Add Question
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddQuestion;
