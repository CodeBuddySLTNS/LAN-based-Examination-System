"use client";

import * as React from "react";
import { ArrowUpDown, LucideDelete, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import DataTable from "@/components/data-table";

export default function Page() {
  const [actionData, setActionData] = React.useState(null);
  const [isEditDialog, setIsEditDialog] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false);

  const queryClient = useQueryClient();

  const fetchQuestions = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const deleteQuestion = async (data) => {
    const token = localStorage.getItem("token");
    const response = await Axios.delete(`/questions/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
    return response.data;
  };

  const editQuestion = async (data) => {
    const token = localStorage.getItem("token");
    const response = await Axios.patch(`/questions/edit`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const handleAction = async (data) => {
    let response;
    switch (data?.action) {
      case "edit":
        delete data.action;
        response = await editQuestion(data);
        queryClient.invalidateQueries(["questions"]);
        return response;

      case "delete":
        delete data.action;
        response = await deleteQuestion(data);
        queryClient.invalidateQueries(["questions"]);
        return response;

      default:
        throw new Error("Invalid action.");
    }
  };

  const { data: questions } = useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
  });

  const {
    mutateAsync: action,
    data: actionResponse,
    error,
  } = useMutation({
    mutationFn: handleAction,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const updateBody = {};

    await action({ updateBody, action: "edit" });
    setIsEditDialog(false);
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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const question = row.original;

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
              {/* <DropdownMenuItem
                onClick={() => {
                  setIsEditDialog(true);
                  setActionData(question);
                }}
              >
                <Edit className="text-green-600" />
                Edit Question
              </DropdownMenuItem> */}
              <DropdownMenuItem
                onClick={() => {
                  setDeleteDialog(true);
                  setActionData(question);
                }}
              >
                <LucideDelete className="text-red-500" />
                Delete Question
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  React.useEffect(() => {
    if (actionResponse) {
      toast.success(actionResponse.message);
    }

    if (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error(error.message);
      }
    }
  }, [actionResponse, error]);

  return (
    <div className=" box-border px-8">
      <DataTable
        data={questions}
        columns={columns}
        filter={{ column: "subject", placeholder: "subject (course code)" }}
      />

      {/* Dialog for edit account action */}
      <Dialog open={isEditDialog} onOpenChange={setIsEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastname" className="text-right">
                Last Name
              </Label>
              <Input
                {...register("lastname")}
                id="lastname"
                type="text"
                defaultValue={actionData?.name?.split(",")[0]}
                className="col-span-3"
                required
              />
              {errors?.lastname && (
                <p className="text-[0.8rem] font-normal text-red-600 flex items-center gap-1">
                  {errors?.lastname?.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstname" className="text-right">
                First Name
              </Label>
              <Input
                {...register("firstname")}
                id="firstname"
                type="text"
                defaultValue={actionData?.name
                  ?.split(",")[1]
                  ?.slice(0, -2)
                  ?.trim()}
                className="col-span-3"
                required
              />
              {errors?.firstname && (
                <p className="text-[0.8rem] font-normal text-red-600 flex items-center gap-1">
                  {errors?.firstname?.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="middlename" className="text-right">
                Middle Name
              </Label>
              <Input
                {...register("middlename")}
                id="middlename"
                type="text"
                defaultValue={actionData?.name?.split(",")[1]?.slice(-2)}
                className="col-span-3"
                required
              />
              {errors?.middlename && (
                <p className="text-[0.8rem] font-normal text-red-600 flex items-center gap-1">
                  {errors?.middlename?.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                {...register("username")}
                id="username"
                defaultValue={actionData?.username}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <p className="text-right">Department</p>
              <div className="col-span-3">
                <Select
                  defaultValue={actionData?.department}
                  onValueChange={(value) => setValue("department", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="BSCS">BSCS</SelectItem>
                      <SelectItem value="BSSW">BSSW</SelectItem>
                      <SelectItem value="BSIT">BSIT</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Input
                {...register("year")}
                id="year"
                type="number"
                className="col-span-3"
                min="1"
                max="4"
                defaultValue={actionData?.year}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog for delete account action */}
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              question and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                try {
                  action({ questionId: actionData?.id, action: "delete" });
                } catch (error) {}
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
