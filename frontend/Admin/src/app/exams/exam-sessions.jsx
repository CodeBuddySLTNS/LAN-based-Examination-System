import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { Axios2 } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ExamSessions = () => {
  const [startId, setStartId] = useState(null);
  const queryClient = useQueryClient();

  const handleAction = (row) => {
    try {
      setStartId(row?.original?.id);
      startExam({
        examId: row?.original?.id,
        stop: row?.original?.is_started,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const { data: exams } = useQuery({
    queryKey: ["exams"],
    queryFn: Axios2("/exams", "GET"),
  });

  const { mutateAsync: startExam, isPending } = useMutation({
    mutationFn: Axios2("/exams/start", "PATCH"),
    onSuccess: () => {
      queryClient.invalidateQueries(["session"]);
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
      header: () => {
        return (
          <Button variant="ghost" className="w-full">
            Actions
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex justify-center gap-1">
          <Button
            size="sm"
            disabled={isPending}
            className={
              row.original.is_started
                ? "w-13 bg-red-800 hover:bg-red-600"
                : "w-13 bg-green-800 hover:bg-green-600"
            }
            onClick={() => handleAction(row)}
          >
            {startId === row.original.id && isPending ? (
              <Spinner size="small" className="px-[2px] text-amber-400" />
            ) : row.original.is_started ? (
              "Stop"
            ) : (
              "Start"
            )}
          </Button>
          <Link to={`/exams/sessions/${row.original.id}`}>
            <Button size="sm" className="">
              View
            </Button>
          </Link>
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
      />
    </div>
  );
};

export default ExamSessions;
