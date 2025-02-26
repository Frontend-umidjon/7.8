import Movies from "@/components/Movies";
import React from "react";
import { useSelector } from "react-redux";

const Saved = () => {
  const saved = useSelector((state) => state.saved.value);
  const data = { results: saved }; 

  return (
    <>
      <Movies data={data} />
    </>
  );
};

export default Saved;