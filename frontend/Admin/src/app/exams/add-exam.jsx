import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Axios2, cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowUpDown, Check, ChevronsUpDown, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DataTable from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

const AddExam = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isSubjectOptions, setIsSubjectOptions] = useState(false);
  const [subjectOptionValue, setSubjectOptionValue] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const { data: questions } = useQuery({
    queryKey: ["questions"],
    queryFn: Axios2("/questions", "GET"),
  });

  const { data: subjectOptions } = useQuery({
    queryKey: ["subjectOptions"],
    queryFn: Axios2("/subjects", "GET"),
  });

  const { mutateAsync: addexam } = useMutation({
    mutationFn: Axios2("/exams/add", "POST"),
    onError: (e) => {
      if (e?.response?.data?.body?.code === "ER_DUP_ENTRY")
        return toast.error("This exam already exists.");
      if (e?.response?.data?.message)
        return toast.error(e.response.data.message);
      toast.error("Unable to connect to the server.");
    },

    onSuccess: (d) => {
      toast.success("Exam successfully created.");
      setSubjectOptionValue("");
      reset();
    },
  });

  const onSubmit = async (data) => {
    if (!subjectOptionValue) return toast.error("Subject is required.");
    const examData = {
      subject: subjectOptionValue,
      title: data.title,
      description: data.description,
      durationHours: Number(data.durationHours),
      durationMinutes: Number(data.durationMinutes) || 0,
      startTime: `${data.startDate} ${data.startTime}`,
      questions: selectedQuestions,
    };

    try {
      await addexam(examData);
    } catch (e) {}
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            value
              ? setSelectedQuestions(
                  table.getFilteredRowModel().rows.map((r) => r.original)
                )
              : setSelectedQuestions([]);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row, table }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            value
              ? setSelectedQuestions((prev) => [...prev, row.original])
              : setSelectedQuestions((prev) =>
                  prev.filter((q) => q.id !== row.original.id)
                );
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "subject",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Subject
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("subject")}</div>
      ),
    },
    {
      accessorKey: "question_text",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Question
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="">{row.getValue("question_text")}</div>
      ),
    },
    {
      accessorKey: "question_type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Question Type
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("question_type")}</div>
      ),
    },
    {
      accessorKey: "choices",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Choices
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) =>
        JSON.parse(row.getValue("choices"))?.length > 0 ? (
          <div className="text-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger type="button">View</TooltipTrigger>
                <TooltipContent>
                  {JSON.parse(row.getValue("choices"))?.join(", ")}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <div className="text-center">N/A</div>
        ),
    },
    {
      accessorKey: "correct_answer",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Correct Answer
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger type="button">View</TooltipTrigger>
              <TooltipContent>
                {JSON.parse(row.getValue("correct_answer"))?.join(", ")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
    {
      accessorKey: "created_by",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Author
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("created_by")}</div>
      ),
    },
  ];

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
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Exam Title</Label>
              <Input id="title" {...register("title")} required />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
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
                  placeholder="Enter hour(s)"
                  {...register("durationHours")}
                  required
                />
                <Input
                  id="durationMinutes"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Enter minutes (default 0 minutes)"
                  {...register("duration_minutes")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-3">
                  <Label>Date Schedule</Label>
                  <Input
                    id="date"
                    type="date"
                    {...register("startDate")}
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Time Schedule (e.g. 8:00 AM)</Label>
                  <Input
                    id="time"
                    type="time"
                    {...register("startTime")}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Exam Questions</Label>
              <div className="p-0">
                <CardContent className="p-0">
                  <DataTable
                    data={questions}
                    columns={columns}
                    filter={{
                      column: "subject",
                      placeholder: "subject (course code)",
                    }}
                  />
                </CardContent>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-700 text-sm">
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
