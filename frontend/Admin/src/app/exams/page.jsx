import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Axios, Axios2 } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [questionsDialog, setQuestionsDialog] = useState({
    open: false,
    data: null,
    initialSelectedRows: {},
  });
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const { data: exams } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  const { data: questions } = useQuery({
    queryKey: ["questions"],
    queryFn: Axios2("/questions", "GET"),
  });

  const handleOpenQuestionsDialog = ({ row, table }) => {
    const questions = row.original.questions
      ? JSON.parse(row.original.questions)
      : [];
    setQuestionsDialog({
      open: true,
      data: { questions },
      initialSelectedRows: questions,
    });
    setSelectedQuestions(questions);
  };

  const examColumns = [
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Subject
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row.getValue("subject")}</div>,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue("description") ? row.getValue("description") : "None"}
        </div>
      ),
    },
    {
      accessorKey: "questions",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Questions
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row, table }) => (
        <div
          className="text-center hover:underline"
          onClick={() => handleOpenQuestionsDialog({ row, table })}
        >
          View/Edit
        </div>
      ),
    },
    {
      accessorKey: "duration",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Duration
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("duration")}</div>
      ),
    },
    {
      accessorKey: "start_time",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Start Time
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          {new Date(row.getValue("start_time")).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      ),
    },
  ];

  const questionColumns = [
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
      cell: ({ row, table }) => {
        const isSelected = selectedQuestions.some(
          (q) => q.question_text === row.original.question_text
        );

        return (
          <Checkbox
            checked={isSelected || row.getIsSelected()}
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
        );
      },
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
      <DataTable
        data={exams}
        columns={examColumns}
        filter={{ column: "subject", placeholder: "subject (course code)" }}
      />

      <Dialog
        open={questionsDialog.open}
        onOpenChange={(open) =>
          setQuestionsDialog({ ...questionsDialog, open })
        }
      >
        <DialogContent className="md:w-full md:max-w-[90dvw]">
          <DialogHeader>
            <DialogTitle>Exam Questions</DialogTitle>
            <DialogDescription>Add or remove questions here.</DialogDescription>
          </DialogHeader>
          <div className="w-full">
            <DataTable
              data={questions}
              columns={questionColumns}
              filter={{
                column: "subject",
                placeholder: "subject (course code)",
              }}
              initialSelectedRows={questionsDialog.initialSelectedRows}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
