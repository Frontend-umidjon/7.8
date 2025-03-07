import Movies from "@/components/Movies";
import { Empty } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Saved = () => {
  const saved = useSelector((state) => state.saved.value);
  const data = { results: saved };

  return (
    <>
      {saved && saved.length > 0 ? (
        <Movies data={data} />
      ) : (
        <div className="w-full h-screen grid place-items-center">
          <Empty description={"You haven't saved any movies yet. Try to save something from the Movies section."} />
        </div>
      )}
    </>
  );
};

export default Saved;