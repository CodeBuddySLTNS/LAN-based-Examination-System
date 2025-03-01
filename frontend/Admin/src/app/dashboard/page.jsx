import { Card } from "@/components/ui/card";
import React from "react";
import ChartStats from "@/components/chart";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card className="bg-muted/50 aspect-video rounded-xl text-center">
          <div className="flex flex-col justify-between gap-1">
            <div className="text-xl font-bold font-['Nunito']">
              Total Students
            </div>
            <div className="text-4xl">321</div>
          </div>
        </Card>
        <Card className="bg-muted/50 aspect-video rounded-xl text-center">
          <div className="flex flex-col justify-between gap-1">
            <div className="text-xl font-bold font-['Nunito']">
              Scheduled Exams
            </div>
            <div className="text-4xl">8</div>
          </div>
        </Card>
        <Card className="bg-muted/50 aspect-video rounded-xl text-center">
          <div className="flex flex-col justify-between gap-1">
            <div className="text-xl font-bold font-['Nunito']">
              Total Questions
            </div>
            <div className="text-4xl">61</div>
          </div>
        </Card>
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <ChartStats />
      </div>
    </div>
  );
}
