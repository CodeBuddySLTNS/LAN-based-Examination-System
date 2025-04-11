import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Axios2 } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SessionPage = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState({});
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: Axios2(`/exams?id=${sessionId}`),
  });

  useEffect(() => {
    if (data) {
      setSession(data[0]);
      console.log(data[0]);
    }
  }, [data]);

  return (
    <div className="w-full mb-6">
      <Card className="mx-6 mt-6 px-5 gap-1">
        <div className="flex justify-between">
          <h1 className="">
            {session.subject} (
            <span className="italic font-normal">{session.label}</span>)
          </h1>
          <h1 className="">
            {session.department}-{session.year}
          </h1>
        </div>
        <div>Description: {session.description}</div>
        <div>Duration: {session.duration}</div>
        <div>Status: {session.is_started ? "Ongoing" : "Not Yet Started"}</div>
      </Card>

      <div className="w-full grid md:grid-cols-2 px-6 mt-6 gap-5">
        <Card className="h-[300px] max-h-[300px] py-2 px-5 gap-0">
          <div>Students taking exam</div>
          <Separator className="my-1.5" />
          <div className="text-sm font-light">
            <p>Dela Cruz, Juan</p>
            <p>Dela Cruz, Juan</p>
          </div>
        </Card>
        <Card className="h-[300px] max-h-[300px] py-2 px-5 gap-0">
          <div>Activity Logs</div>
          <Separator className="my-1.5" />
          <div className="text-sm font-light">
            <p>Dela Cruz, Juan</p>
            <p>Dela Cruz, Juan</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SessionPage;
