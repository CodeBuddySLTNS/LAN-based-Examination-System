"use client";

import {
  ArrowUpDown,
  Check,
  Edit,
  LucideDelete,
  MoreHorizontal,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios2 } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import DataTable from "@/components/data-table";
import DeleteDialog from "@/components/delete-dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [actionData, setActionData] = useState(null);
  const [isEditDialog, setIsEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const queryClient = useQueryClient();

  const handleAction = async (data) => {
    let response;
    switch (data?.action) {
      case "verify":
        delete data.action;
        response = await Axios2("/users/user/verify", "PATCH")(data);
        queryClient.invalidateQueries(["users"]);
        return response;

      case "edit":
        delete data.action;
        response = await Axios2("/users/user/edit", "PATCH")(data);
        queryClient.invalidateQueries(["users"]);
        return response;

      case "delete":
        response = await Axios2("/users/user/delete", "DELETE")(data);
        queryClient.invalidateQueries(["users"]);
        return response;

      default:
        throw new Error("Invalid action.");
    }
  };

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: Axios2("/users", "GET"),
  });

  const { mutateAsync: action } = useMutation({
    mutationFn: handleAction,
    onSuccess: (d) => toast.success(d?.data?.message || "Action successful"),
    onError: (e) =>
      toast.error(e?.response?.data?.message || "An error occurred"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const username = actionData?.username;
    const updateBody = {
      name: `${data.lastname}, ${data.firstname} ${data.middlename[0]}.`,
      username: data.username,
      department: data.department,
      year: data.year,
    };

    await action({ username, updateBody, action: "edit" });
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
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Username
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue("username")}</div>
      ),
    },
    {
      accessorKey: "department",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
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
            className="w-full"
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
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "isVerified",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue("isVerified") ? (
            <span className="text-green-500">verified</span>
          ) : (
            <span className="text-red-500">unverified</span>
          )}
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
                onClick={() =>
                  action({
                    username,
                    toVerify: !row.getValue("isVerified"),
                    action: "verify",
                  })
                }
              >
                {row.getValue("isVerified") ? (
                  <>
                    <XIcon /> Unverify Account
                  </>
                ) : (
                  <>
                    <Check /> Verify Account
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsEditDialog(true);
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

  useEffect(() => {
    if (actionData) {
      setValue("lastname", actionData?.name?.split(",")[0]);
      setValue(
        "firstname",
        actionData?.name?.split(",")[1]?.slice(0, -2)?.trim()
      );
      setValue("middlename", actionData?.name?.split(",")[1]?.slice(-2));
      setValue("username", actionData?.username);
      setValue("department", actionData?.department);
      setValue("year", actionData?.year);
    }
  }, [actionData, setValue]);

  return (
    <div className=" box-border px-8 py-4">
      <DataTable
        data={data}
        columns={columns}
        filter={{ column: "name", placeholder: "name" }}
      />

      {/* Dialog for edit account action */}
      <Dialog open={isEditDialog} onOpenChange={setIsEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
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
      <DeleteDialog
        open={deleteDialog}
        setOpen={setDeleteDialog}
        action={action}
        actionData={actionData}
        message={
          <>
            This action cannot be undone. This will permanently delete
            <span className="text-red-500"> @{actionData?.username}</span>
            &apos;s account and remove his/her data from our servers.
          </>
        }
      />
    </div>
  );
}
