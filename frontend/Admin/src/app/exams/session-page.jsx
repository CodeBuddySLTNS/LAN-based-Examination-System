import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Axios2 } from "@/lib/utils";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SessionPage = () => {
  const { sessionId } = useParams();
  const user = useMainStore((state) => state.user);
  const socket = useMainStore((state) => state.socket);
  const [session, setSession] = useState({});
  const [usersTakingExam, setUsersTakingExam] = useState([]);
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: Axios2(`/exams?id=${sessionId}`),
  });

  useEffect(() => {
    if (socket) {
      socket.emit("getUsersTakingExam", sessionId);
      socket.on("allUsersTakingExam", (users) => setUsersTakingExam(users));
      socket.on("userTakingExam", (event) => {
        if (
          event.examinerId === user.id &&
          event.examId === Number(sessionId)
        ) {
          setUsersTakingExam((prev) => [...prev, event.user]);
          console.log(event.user.name, "is taking exam");
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("userTakingExam");
      }
    };
  }, [socket, sessionId, user, usersTakingExam]);

  useEffect(() => {
    if (data) {
      setSession(data[0]);
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
          <div className="grid grid-cols-[1fr_65px_65px] gap-3 text-center">
            <p className="text-left">Students taking exam</p>
            <p className="">Progress</p>
            <p className="">Status</p>
          </div>
          <Separator className="my-1.5" />
          <div className="text-sm font-light">
            {usersTakingExam?.length > 0 ? (
              usersTakingExam.map((user, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_65px_65px] gap-3 text-center"
                >
                  <p className="text-left">{user.name}</p>
                  <p>{user.progress}</p>
                  <p>{user.completed ? "completed" : "ongoing"}</p>
                </div>
              ))
            ) : (
              <p>No Students taking this exam.</p>
            )}
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
