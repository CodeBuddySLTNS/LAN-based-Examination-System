import { useParams } from "react-router-dom";

const SessionPage = () => {
  const { sessionId } = useParams();
  return <div className="p-6 pt-3">{sessionId}</div>;
};

export default SessionPage;
