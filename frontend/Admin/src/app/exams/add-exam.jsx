import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronsUpDown } from "lucide-react";
import React from "react";

const AddExam = () => {
  return (
    <div className="p-6 pt-3">
      <Card>
        <CardHeader>
          <CardTitle>Schedule an Exam</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Exam Title</Label>
              <Input id="title" required />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" required></Textarea>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="duration">Exam Duration</Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="8"
                  placeholder="Enter hours(s)"
                  required
                />
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="59"
                  placeholder="Enter minutes(s)"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-3">
                  <Label>Date Schedule</Label>
                  <Input id="duration" type="date" required />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Time Schedule (e.g. 8:00 AM)</Label>
                  <Input id="duration" type="time" required />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Exam Questions</Label>
              <Card className="p-3">
                <CardContent className="p-0">
                  <Collapsible>
                    <CollapsibleTrigger className="w-full">
                      <div className="flex justify-between">
                        1. Question
                        <ChevronsUpDown className="w-4.5" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>heyy</CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </div>
            <div className="w-full mt-3">
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
