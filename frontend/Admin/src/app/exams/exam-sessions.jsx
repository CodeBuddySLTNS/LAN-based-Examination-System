import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Axios2 } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDown } from "lucide-react";
import React from "react";

const ExamSessions = () => {
  const { data: exams } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  const handleRowClick = (row) => {
    console.log(row.original);
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
      id: "actions",
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="w-full">
            Actions
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Button className="">Start Exam</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full p-6 pt-3">
      <DataTable
        data={exams}
        columns={examColumns}
        filter={{ column: "subject", placeholder: "subject" }}
        handleRowClick={handleRowClick}
      />
    </div>
  );
};

export default ExamSessions;
