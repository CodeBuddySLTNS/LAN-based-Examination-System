import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Axios } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpDown,
  ChevronsUpDown,
  InfoIcon,
  LucideDelete,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTable from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
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
                <TooltipTrigger>View</TooltipTrigger>
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
              <TooltipTrigger>View</TooltipTrigger>
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
                  placeholder="Enter hour(s)"
                  {...register("duration_hours")}
                  required
                />
                <Input
                  id="duration_minutes"
                  type="number"
                  min="1"
                  max="59"
                  placeholder="Enter minute(s)"
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
