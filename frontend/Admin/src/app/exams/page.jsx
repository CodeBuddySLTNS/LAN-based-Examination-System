import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Axios, Axios2 } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDown, LucideDelete, MoreHorizontal } from "lucide-react";

const Page = () => {
  const { data } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

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
      cell: ({ row }) => (
        <div className="text-center hover:underline">View/Edit</div>
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

  return (
    <div className="p-6 pt-3">
      <DataTable
        data={data}
        columns={columns}
        filter={{ column: "subject", placeholder: "subject (course code)" }}
      />
    </div>
  );
};

export default Page;
