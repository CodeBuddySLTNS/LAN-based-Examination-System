import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Axios } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown, InfoIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddExam = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const fetchQuestions = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: questions } = useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
  });

  const onSubmit = async (data) => {
    const examData = {
      ...data,
      questions: selectedQuestions,
    };

    const token = localStorage.getItem("token");
    await Axios.post(`/exams`, examData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    reset();
  };

  const handleQuestionSelect = (question) => {
    setSelectedQuestions((prev) => {
      if (prev.includes(question)) {
        return prev.filter((q) => q !== question);
      } else {
        return [...prev, question];
      }
    });
  };

  return (
    <div className="p-6 pt-3">
      <Card>
        <CardHeader>
          <CardTitle>Schedule an Exam</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Exam Title</Label>
              <Input id="title" {...register("title")} required />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                required
              ></Textarea>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="duration">Exam Duration</Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="duration_hours"
                  type="number"
                  min="1"
                  max="8"
                  placeholder="Enter hours(s)"
                  {...register("duration_hours")}
                  required
                />
                <Input
                  id="duration_minutes"
                  type="number"
                  min="1"
                  max="59"
                  placeholder="Enter minutes(s)"
                  {...register("duration_minutes")}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-3">
                  <Label>Date Schedule</Label>
                  <Input id="date" type="date" {...register("date")} required />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Time Schedule (e.g. 8:00 AM)</Label>
                  <Input id="time" type="time" {...register("time")} required />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Exam Questions</Label>
              <Card className="p-3">
                <CardContent className="p-0">
                  {questions?.map((question) => (
                    <Collapsible key={question.id}>
                      <CollapsibleTrigger className="w-full">
                        <div className="flex justify-between">
                          {question.question_text}
                          <ChevronsUpDown className="w-4.5" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedQuestions.includes(question)}
                            onChange={() => handleQuestionSelect(question)}
                          />
                          <span>{question.question_text}</span>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <InfoIcon className="w-[1.15rem]" /> Note that you can still add
              and remove questions after you save this exam.
            </div>
            <div className="w-full">
              <Button type="submit" className="w-full">
                Add Exam Schedule
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExam;
