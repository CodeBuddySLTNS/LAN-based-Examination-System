import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useMainStore } from "../../zustand/store";

const Faculty: React.FC = () => {
  const user = useMainStore(state => state.user);
  return (
    <>
      <h1>Faculty</h1>
      <p>{user?.name}</p>
    </>
  );
};

export default Faculty;
