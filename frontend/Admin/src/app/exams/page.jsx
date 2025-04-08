import DataTable from "@/components/data-table";
import DeleteDialog from "@/components/delete-dialog";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Axios2 } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpDown, Edit, LucideDelete, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [actionData, setActionData] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const queryClient = useQueryClient();
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionsDialog, setQuestionsDialog] = useState({
    open: false,
    data: null,
    initialSelectedRows: {},
  });

  const handleOpenQuestionsDialog = ({ row }) => {
    const questions = row.original.questions;
    setQuestionsDialog({
      open: true,
      data: { ...row.original, questions },
      initialSelectedRows: questions,
    });
    setSelectedQuestions(questions);
  };

  const handleEditQuestions = async (mode) => {
    const data = {
      examId: questionsDialog.data.id,
      examQuestionsId: questionsDialog.data.exam_questions_id,
      subject: questionsDialog.data.subject,
      department: questionsDialog.data.department,
      year: questionsDialog.data.year,
      label: questionsDialog.data.label,
      description: questionsDialog.data.description,
      durationHours: questionsDialog.data.duration_hours,
      durationMinutes: questionsDialog.data.duration_minutes,
      startTime: questionsDialog.data.start_time,
      examinerId: questionsDialog.data.examiner_id,
      questions: selectedQuestions.map((q) => ({
        questionId: q.id,
        points: 1,
      })),
    };

    if (mode.questionsOnly) {
      return await Axios2("/exams/edit/questions", "PATCH")(data);
    }

    return await Axios2("/exams/edit/exam", "PATCH")(data);
  };

  const handleAction = async (data) => {
    let response;
    switch (data?.action) {
      case "editQuestions":
        response = await handleEditQuestions(data);
        queryClient.invalidateQueries(["exams"]);
        return response;

      case "delete":
        response = await Axios2(`/exams/delete/${data.id}`, "DELETE")(data);
        queryClient.invalidateQueries(["exams"]);
        return response;

      default:
        throw new Error("Invalid action.");
    }
  };

  const { data: exams } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  const { data: questions } = useQuery({
    queryKey: ["questions"],
    queryFn: Axios2("/questions", "GET"),
  });

  const { mutateAsync: action } = useMutation({
    mutationFn: handleAction,
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setQuestionsDialog((prev) => ({ ...prev, open: false }));
    },
  });

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
      accessorKey: "label",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Label
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("label")}</div>
      ),
    },
    {
      accessorKey: "department",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Department
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("department")}</div>
      ),
    },
    {
      accessorKey: "year",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Year
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("year")}</div>
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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
        const username = row.original.username;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  // setIsEditDialog(true);
                  setActionData(user);
                }}
              >
                <Edit className="text-green-600" />
                Edit Account
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDeleteDialog(true);
                  setActionData(user);
                }}
              >
                <LucideDelete className="text-red-500" />
                Delete Account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
          (q) => q.id === row.original.id
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
    <div className="w-full p-6 pt-3">
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
        <DialogContent className="h-[90%] md:w-full md:max-w-[90dvw]">
          <DialogHeader>
            <DialogTitle>Exam Questions</DialogTitle>
            <DialogDescription>Add or remove questions here.</DialogDescription>
          </DialogHeader>
          <div className="w-full overflow-auto">
            <DataTable
              data={questions}
              columns={questionColumns}
              filter={{
                column: "subject",
                placeholder: "subject (course code)",
              }}
              initialSelectedRows={questionsDialog.initialSelectedRows}
            />
            <div className="mt-6 flex justify-end gap-4">
              <Button
                variant="secondary"
                onClick={() =>
                  setQuestionsDialog((prev) => ({ ...prev, open: false }))
                }
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  try {
                    await action({
                      questionsOnly: true,
                      action: "editQuestions",
                    });
                  } catch (e) {}
                }}
              >
                Save changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog for delete exam action */}
      <DeleteDialog
        open={deleteDialog}
        setOpen={setDeleteDialog}
        action={action}
        actionData={actionData}
      />
    </div>
  );
};

export default Page;
